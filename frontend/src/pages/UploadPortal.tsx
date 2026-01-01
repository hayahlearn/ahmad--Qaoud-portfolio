
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, FileCode, X, CheckCircle, ShieldAlert, Loader2, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { classifyFile, generateSovereignCode } from "@/lib/taxonomy";
import { toast } from "sonner";

interface StagedFile {
    file: File;
    id: string;
    classification: {
        project: string;
        mainCategory: string;
        subCategory: string;
    };
    proposedCode: string;
    status: 'pending' | 'uploading' | 'success' | 'error';
    progress: number;
}

export default function UploadPortal() {
    const [stagedFiles, setStagedFiles] = useState<StagedFile[]>([]);
    const [isUploading, setIsUploading] = useState(false);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newFiles = acceptedFiles.map(file => {
            const cls = classifyFile(file.name);
            // Simulate serial fetching (In real app, we'd fetch next serial from DB)
            const mockSerial = Math.floor(Math.random() * 999) + 1;
            const code = generateSovereignCode(cls.project, cls.mainCategory, cls.subCategory, mockSerial);

            return {
                file,
                id: Math.random().toString(36).substring(7),
                classification: cls,
                proposedCode: code,
                status: 'pending' as const,
                progress: 0
            };
        });

        setStagedFiles(prev => [...prev, ...newFiles]);
        toast.success(`${newFiles.length} files staged for sovereign processing.`);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const removeFile = (id: string) => {
        setStagedFiles(prev => prev.filter(f => f.id !== id));
    };

    const handleUpload = async () => {
        setIsUploading(true);
        // Simulation of Atomic Upload Transaction
        // 1. Upload to Storage (Supabase/Hostinger/Drive)
        // 2. Insert Record to DB

        for (const f of stagedFiles) {
            if (f.status === 'success') continue;

            // Update status to uploading
            setStagedFiles(prev => prev.map(item => item.id === f.id ? { ...item, status: 'uploading' } : item));

            // Simulate progress
            await new Promise(r => setTimeout(r, 800)); // Fake network lag

            // Mark validation success
            setStagedFiles(prev => prev.map(item => item.id === f.id ? { ...item, status: 'success', progress: 100 } : item));
        }

        setIsUploading(false);
        toast.success("Sovereign Ingestion Complete!");
    };

    return (
        <div className="min-h-screen bg-black text-neutral-100 p-8 relative overflow-hidden flex flex-col items-center">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[100px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="z-10 text-center mb-12"
            >
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-900/30 border border-emerald-800 text-emerald-400 text-xs font-medium mb-4">
                    <ShieldAlert className="w-3 h-3 mr-2" />
                    Gatekeeper Active
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-br from-white to-neutral-500 bg-clip-text text-transparent">
                    Sovereign Gatekeeper
                </h1>
                <p className="text-neutral-400 mt-2 max-w-md mx-auto">
                    Secure ingestion point. All assets are automatically classified, coded, and sanitized before storage.
                </p>
            </motion.div>

            <div className="w-full max-w-4xl z-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Drop Zone */}
                <div className="space-y-4">
                    <div
                        {...getRootProps()}
                        className={`
                            border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center text-center transition-all cursor-pointer h-full min-h-[400px]
                            ${isDragActive ? 'border-emerald-500 bg-emerald-900/10' : 'border-neutral-800 bg-neutral-900/50 hover:border-neutral-700 hover:bg-neutral-900'}
                        `}
                    >
                        <input {...getInputProps()} />
                        <div className="w-20 h-20 rounded-full bg-neutral-800/50 flex items-center justify-center mb-6 border border-neutral-700">
                            <UploadCloud className={`w-10 h-10 ${isDragActive ? 'text-emerald-400' : 'text-neutral-400'}`} />
                        </div>
                        <h3 className="text-xl font-semibold text-neutral-200">
                            {isDragActive ? "Release to Ingest" : "Drag files here"}
                        </h3>
                        <p className="text-neutral-500 mt-2 text-sm">
                            or click to browse your secure vault
                        </p>
                    </div>
                </div>

                {/* Staging Area */}
                <div className="bg-neutral-900/30 backdrop-blur-md border border-neutral-800 rounded-2xl p-6 flex flex-col h-[500px]">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-semibold text-neutral-300 flex items-center gap-2">
                            <FileCode className="w-4 h-4 text-emerald-500" />
                            Staging Area
                        </h3>
                        <span className="text-xs text-neutral-600 font-mono">
                            {stagedFiles.length} Assets
                        </span>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                        <AnimatePresence>
                            {stagedFiles.map((f) => (
                                <motion.div
                                    key={f.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    layout
                                >
                                    <Card className="bg-black/40 border-neutral-800 overflow-hidden relative group">
                                        {/* Status Indicator Bar */}
                                        <div className={`absolute left-0 top-0 bottom-0 w-1 transition-colors ${f.status === 'success' ? 'bg-emerald-500' :
                                                f.status === 'uploading' ? 'bg-blue-500' : 'bg-neutral-700'
                                            }`} />

                                        <CardContent className="p-4 pl-5 flex items-center justify-between">
                                            <div className="overflow-hidden">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <p className="text-xs font-mono text-emerald-400 bg-emerald-950/30 px-1.5 rounded border border-emerald-900/50">
                                                        {f.proposedCode}
                                                    </p>
                                                    <span className="text-[10px] text-neutral-500 uppercase tracking-wider">
                                                        {f.classification.project} • {f.classification.mainCategory}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-neutral-300 truncate w-48 font-medium" title={f.file.name}>
                                                    {f.file.name}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                {f.status === 'uploading' && <Loader2 className="w-4 h-4 animate-spin text-blue-500" />}
                                                {f.status === 'success' && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                                                {f.status === 'pending' && !isUploading && (
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-6 w-6 text-neutral-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                                        onClick={() => removeFile(f.id)}
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </Button>
                                                )}
                                            </div>
                                        </CardContent>
                                        {f.status === 'uploading' && (
                                            <Progress value={45} className="h-[2px] w-full rounded-none bg-neutral-800" wrapperClassName="absolute bottom-0 left-0 right-0" />
                                        )}
                                    </Card>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {stagedFiles.length === 0 && (
                            <div className="h-full flex flex-col items-center justify-center text-neutral-600 text-sm italic">
                                <span>Ready to classify incoming streams...</span>
                            </div>
                        )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-neutral-800">
                        <Button
                            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-lg shadow-emerald-900/20"
                            size="lg"
                            onClick={handleUpload}
                            disabled={stagedFiles.length === 0 || isUploading}
                        >
                            {isUploading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Ingesting...
                                </>
                            ) : (
                                <>
                                    Initiate Sovereign Upload
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
