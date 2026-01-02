require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const { google } = require('googleapis');
const stream = require('stream');

// --- Configuration ---
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ROOT_FOLDER_ID = process.env.SOVEREIGN_ROOT_FOLDER_ID;

if (!SUPABASE_URL || !SUPABASE_KEY || !ROOT_FOLDER_ID) {
    console.error("❌ Mising Environment Variables. Please check .env file.");
    process.exit(1);
}

// --- Clients ---
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const auth = new google.auth.GoogleAuth({
    credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/drive'],
});
const drive = google.drive({ version: 'v3', auth });

// --- Cache for Folder IDs ---
const folderCache = {}; // Key: "Project/Category" -> Value: ID

// --- Helpers ---
async function findOrCreateFolder(parentID, name) {
    const cacheKey = `${parentID}/${name}`;
    if (folderCache[cacheKey]) return folderCache[cacheKey];

    // Search
    const q = `'${parentID}' in parents and name = '${name}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`;
    const res = await drive.files.list({ q, fields: 'files(id)' });

    if (res.data.files.length > 0) {
        const id = res.data.files[0].id;
        folderCache[cacheKey] = id;
        return id;
    }

    // Create
    console.log(`📁 Creating folder: ${name}`);
    const createRes = await drive.files.create({
        requestBody: {
            name,
            parents: [parentID],
            mimeType: 'application/vnd.google-apps.folder'
        },
        fields: 'id'
    });
    const id = createRes.data.id;
    folderCache[cacheKey] = id;
    return id;
}

async function getTargetFolderID(project, mainCat, subCat) {
    // 1. Project Folder
    const projectID = await findOrCreateFolder(ROOT_FOLDER_ID, project);

    // 2. Main Category
    const mainID = await findOrCreateFolder(projectID, mainCat);

    // 3. Sub Category (Target)
    const subID = await findOrCreateFolder(mainID, subCat);

    return subID;
}

async function syncAsset(asset) {
    console.log(`🔄 Syncing: ${asset.file_name} (${asset.asset_code})...`);

    try {
        // 1. Download from Supabase
        const { data, error: downError } = await supabase.storage
            .from('sovereign_inbox')
            .download(asset.storage_path);

        if (downError) throw downError;

        // 2. Determine Drive Folder
        const folderID = await getTargetFolderID(asset.project_code, asset.main_category, asset.sub_category);

        // 3. Upload to Drive
        const bufferStream = new stream.PassThrough();
        bufferStream.end(Buffer.from(await data.arrayBuffer()));

        const driveRes = await drive.files.create({
            requestBody: {
                name: `${asset.asset_code}_${asset.file_name}`,
                parents: [folderID],
                description: `Sovereign Asset: ${asset.asset_code}\nProject: ${asset.project_code}\nHash: ${asset.content_hash}`
            },
            media: {
                mimeType: asset.content_type,
                body: bufferStream
            },
            fields: 'id, webViewLink, webContentLink'
        });

        const driveLink = driveRes.data.webViewLink;
        const driveID = driveRes.data.id;

        console.log(`✅ Uploaded to Drive: ${driveID}`);

        // 4. Update Database
        const { error: upError } = await supabase
            .from('digital_assets')
            .update({
                status: 'active',
                drive_link: driveLink,
                drive_id: driveID,
                synced_at: new Date().toISOString()
            })
            .eq('id', asset.id);

        if (upError) throw upError;

        // 5. Cleanup Storage
        const { error: delError } = await supabase.storage
            .from('sovereign_inbox')
            .remove([asset.storage_path]);

        if (delError) console.warn("⚠️ Failed to clean up storage:", delError.message);

    } catch (err) {
        console.error(`❌ Failed to sync ${asset.asset_code}:`, err.message);
        // Update status to error?
        await supabase.from('digital_assets').update({ status: 'sync_error', error_log: err.message }).eq('id', asset.id);
    }
}

async function runSyncLoop() {
    console.log("🦅 Sovereign Sync Agent Started...");

    while (true) {
        try {
            // Poll pending assets
            const { data: assets, error } = await supabase
                .from('digital_assets')
                .select('*')
                .eq('status', 'pending_drive_sync')
                .limit(5);

            if (error) throw error;

            if (assets && assets.length > 0) {
                console.log(`Found ${assets.length} pending assets.`);
                for (const asset of assets) {
                    await syncAsset(asset);
                }
            } else {
                // process.stdout.write(".");
            }

        } catch (err) {
            console.error("Main Loop Error:", err.message);
        }

        // Wait
        await new Promise(r => setTimeout(r, process.env.POLL_INTERVAL_MS || 10000));
    }
}

runSyncLoop();
