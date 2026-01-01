
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Search, Loader2, FolderOpen } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Asset {
    id: number;
    asset_code: string;
    original_name: string;
    project_code: string;
    main_category: string;
    sub_category: string;
    file_type: string;
    size_mb: number;
    drive_link: string;
}

export function AssetExplorer() {
    const [loading, setLoading] = useState(true);
    const [assets, setAssets] = useState<Asset[]>([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const PAGESIZE = 20;

    useEffect(() => {
        fetchAssets();
    }, [page, search]); // Re-fetch on page or search change

    // Convert fetch to a debounced search ideally, but for now direct effect is okay for MVP
    async function fetchAssets() {
        setLoading(true);
        try {
            let query = supabase
                .from("digital_assets")
                .select("*")
                .order("id", { ascending: false })
                .range(page * PAGESIZE, (page + 1) * PAGESIZE - 1);

            if (search) {
                // ILIKE for case-insensitive search on name or code
                query = query.or(`original_name.ilike.%${search}%,asset_code.ilike.%${search}%`);
            }

            const { data, error } = await query;

            if (error) throw error;
            setAssets(data || []);
        } catch (error) {
            console.error("Error fetching assets:", error);
        } finally {
            setLoading(false);
        }
    }


    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setPage(0); // Reset to first page
    };

    return (
        <Card className="bg-neutral-900/40 backdrop-blur-xl border-neutral-800 overflow-hidden shadow-2xl">
            <CardHeader className="border-b border-neutral-800/50 pb-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <CardTitle className="text-lg font-semibold text-neutral-200 flex items-center gap-2">
                            <FolderOpen className="h-5 w-5 text-emerald-500" />
                            Asset Explorer
                        </CardTitle>
                        <p className="text-sm text-neutral-500 mt-1">Browse and manage your digital sovereignty index</p>
                    </div>
                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-neutral-500" />
                        <Input
                            placeholder="Search by code or name..."
                            className="pl-9 bg-black/20 border-neutral-800 text-neutral-200 focus:border-emerald-500/50 focus:ring-emerald-500/20 transition-all rounded-lg"
                            value={search}
                            onChange={handleSearch}
                        />
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                {loading && assets.length === 0 ? (
                    <div className="flex justify-center p-12">
                        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
                    </div>
                ) : (
                    <>
                        <div className="">
                            <Table>
                                <TableHeader className="bg-black/20">
                                    <TableRow className="border-neutral-800 hover:bg-transparent">
                                        <TableHead className="text-neutral-500 font-medium pl-6">Code & Identity</TableHead>
                                        <TableHead className="text-neutral-500 font-medium">Categorization</TableHead>
                                        <TableHead className="text-neutral-500 font-medium">Metadata</TableHead>
                                        <TableHead className="text-right text-neutral-500 font-medium pr-6">Access</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {assets.map((asset) => (
                                        <TableRow key={asset.id} className="border-neutral-800/50 hover:bg-neutral-800/30 transition-colors group">
                                            <TableCell className="pl-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="font-mono text-emerald-400 font-bold tracking-wide text-xs mb-1">
                                                        {asset.asset_code}
                                                    </span>
                                                    <span className="text-neutral-300 font-medium text-sm max-w-[280px] truncate" title={asset.original_name}>
                                                        {asset.original_name}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col gap-1.5">
                                                    <Badge variant="outline" className="w-fit bg-neutral-950/50 border-neutral-800 text-neutral-400 text-[10px] px-2 py-0">
                                                        {asset.project_code}
                                                    </Badge>
                                                    <span className="text-neutral-400 text-xs">
                                                        {asset.main_category} <span className="text-neutral-600 px-1">›</span> {asset.sub_category}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <div className="px-2 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-400 font-mono">
                                                        {asset.size_mb ? `${asset.size_mb.toFixed(2)} MB` : '< 0.1 MB'}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right pr-6">
                                                <Button variant="outline" size="sm" className="bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all h-8 px-3" asChild>
                                                    <a href={asset.drive_link} target="_blank" rel="noopener noreferrer">
                                                        <span className="mr-2 text-xs">Open Drive</span>
                                                        <ExternalLink className="h-3 w-3" />
                                                    </a>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {assets.length === 0 && !loading && (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-16 text-neutral-500">
                                                <div className="flex flex-col items-center gap-2">
                                                    <ShieldCheck className="h-8 w-8 text-neutral-800" />
                                                    <p>No assets found in the sovereign index matching your query.</p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-800/50 bg-black/10">
                            <div className="text-xs text-neutral-600">
                                Showing {page * PAGESIZE + 1} - {Math.min((page + 1) * PAGESIZE, 10000)} of assets
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setPage(p => Math.max(0, p - 1))}
                                    disabled={page === 0 || loading}
                                    className="border-neutral-800 bg-black/20 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors h-8 text-xs"
                                >
                                    Previous
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setPage(p => p + 1)}
                                    disabled={assets.length < PAGESIZE || loading}
                                    className="border-neutral-800 bg-black/20 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors h-8 text-xs"
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
}
```
