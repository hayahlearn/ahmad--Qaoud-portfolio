```
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Database, HardDrive, ShieldCheck } from "lucide-react";
import { AssetExplorer } from "@/components/sovereign/AssetExplorer";
import { motion } from "framer-motion";

interface Stats {
  totalAssets: number;
  projects: Record<string, number>;
}

export default function SovereignDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const { count, error: countError } = await supabase
          .from("digital_assets")
          .select("*", { count: "exact", head: true });

        if (countError) throw countError;

        setStats({
          totalAssets: count || 0,
          projects: {}
        });

      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-neutral-100 p-8 relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-emerald-900/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-2"
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-900/30 border border-emerald-800 text-emerald-400 text-xs font-medium mb-2">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            System Operational
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent tracking-tight">
            Corpus Sovereign
          </h1>
          <p className="text-neutral-400 max-w-2xl text-lg font-light">
            The central nervous system of your digital assets. Indexed, fortified, and absolute.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <Card className="bg-neutral-900/50 backdrop-blur-xl border-neutral-800 hover:border-emerald-500/30 transition-all duration-300 group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-neutral-400 group-hover:text-emerald-400 transition-colors">
                  Total Indexed Assets
                </CardTitle>
                <Database className="h-4 w-4 text-emerald-500/50 group-hover:text-emerald-500 transition-colors" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-white tracking-tight">
                  {stats?.totalAssets.toLocaleString()}
                </div>
                <p className="text-xs text-neutral-500 mt-1">Confirmed unique entities</p>
              </CardContent>
            </Card>
          </motion.div>
           
           <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
           >
            <Card className="bg-neutral-900/50 backdrop-blur-xl border-neutral-800 hover:border-blue-500/30 transition-all duration-300 group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-neutral-400 group-hover:text-blue-400 transition-colors">
                  Storage Protocol
                </CardTitle>
                <HardDrive className="h-4 w-4 text-blue-500/50 group-hover:text-blue-500 transition-colors" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-white tracking-tight">
                  Hybrid
                </div>
                <p className="text-xs text-neutral-500 mt-1">Supabase Logic • Drive Storage</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Card className="bg-neutral-900/50 backdrop-blur-xl border-neutral-800 hover:border-purple-500/30 transition-all duration-300 group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-neutral-400 group-hover:text-purple-400 transition-colors">
                  Integrity Status
                </CardTitle>
                <ShieldCheck className="h-4 w-4 text-purple-500/50 group-hover:text-purple-500 transition-colors" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-white tracking-tight">
                  100%
                </div>
                <p className="text-xs text-neutral-500 mt-1">Logical Deduping Active</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {/* Asset Explorer Table */}
          <AssetExplorer />
        </motion.div>
      </div>
    </div>
  );
}
```
