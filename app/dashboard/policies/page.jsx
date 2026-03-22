"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Button from "@/components/atoms/form/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import DashboardHeader from "@/components/molecules/dashboard/DashboardHeader";
import { Plus, Search, Edit, Trash2, ToggleLeft, Shield, Zap, Globe, Trash, Clock, Info, CheckCircle2, MoreVertical, Terminal, MousePointer2 } from "lucide-react";

const initialPolicies = [
  { id: 1, name: "Block Bad Bots", rule: "ua contains bot -> block", type: "Security", status: "enabled", createdAt: "2d ago", hits: 12430 },
  { id: 2, name: "Rate Limit API", rule: "api/* -> 100rpm", type: "Traffic", status: "enabled", createdAt: "5d ago", hits: 873 },
  { id: 3, name: "Edge Cache: Static Assets", rule: "path matches /*.(jpg|png|webp) -> TTL: 30d", type: "CDN", status: "enabled", createdAt: "10d ago", hits: 4520 },
];

export default function PoliciesPage() {
  const [policies, setPolicies] = useState(initialPolicies);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [newName, setNewName] = useState("");
  const [newRule, setNewRule] = useState("");
  const [newType, setNewType] = useState("CDN");
  const [purgePath, setPurgePath] = useState("");

  const counts = useMemo(() => {
    const total = policies.length;
    const enabled = policies.filter((p) => p.status === "enabled").length;
    const disabled = total - enabled;
    return { total, enabled, disabled };
  }, [policies]);

  const filtered = useMemo(() => {
    return policies.filter((p) => {
      if (statusFilter !== "all" && p.status !== statusFilter) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.rule.toLowerCase().includes(q)
      );
    });
  }, [policies, query, statusFilter]);

  function addPolicy() {
    if (!newName.trim() || !newRule.trim()) return;
    const next = { 
      id: Date.now(), 
      name: newName.trim(), 
      rule: newRule.trim(), 
      type: newType, 
      status: "enabled", 
      createdAt: "just now", 
      hits: 0 
    };
    setPolicies((p) => [next, ...p]);
    setNewName("");
    setNewRule("");
  }

  function removePolicy(id) {
    setPolicies((p) => p.filter((x) => x.id !== id));
    if (selected === id) setSelected(null);
  }

  function toggleStatus(id) {
    setPolicies((p) => p.map((x) => (x.id === id ? { ...x, status: x.status === "enabled" ? "disabled" : "enabled" } : x)));
  }

  return (
    <div className="min-h-screen bg-transparent pb-12">
      <DashboardHeader 
        title="Edge Policies" 
        subtitle="Configure edge routing, caching, and global security rules."
        showButton 
        buttonText="Deploy Policy"
      />

      <div className="px-6 py-8 space-y-8 max-w-[1600px] mx-auto">
        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-cyan-500/10 border-cyan-500/20 shadow-none rounded-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-cyan-500/20 rounded-sm">
                  <Shield className="text-cyan-400" size={18} />
                </div>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Active Rules</p>
              </div>
              <div className="flex items-baseline gap-3">
                <h3 className="text-4xl font-bold text-white tracking-tighter">{counts.enabled}</h3>
                <Badge className="bg-cyan-500 text-black font-bold text-[10px] rounded-full px-2">Ready</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-transparent border-slate-800 shadow-none rounded-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-slate-800 rounded-sm">
                  <MousePointer2 className="text-slate-400" size={18} />
                </div>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Global Propagation</p>
              </div>
              <div className="flex items-baseline gap-3">
                <h3 className="text-4xl font-bold text-white tracking-tighter">~300ms</h3>
                <Badge className="bg-slate-800 text-slate-400 font-bold text-[10px] rounded-full px-2">Optimal</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-transparent border-slate-800 shadow-none rounded-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-slate-800 rounded-sm">
                  <Clock className="text-slate-400" size={18} />
                </div>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Last Deployment</p>
              </div>
              <div className="flex items-baseline gap-3">
                <h3 className="text-4xl font-bold text-white tracking-tighter">2h 14m</h3>
                <Badge className="bg-slate-800 text-slate-400 font-bold text-[10px] rounded-full px-2">v4.2.1</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="rules" className="w-full">
          <TabsList className="bg-transparent border-b border-slate-800 w-full justify-start rounded-none h-auto p-0 gap-8 mb-8">
            {['rules', 'purge', 'settings'].map((tab) => (
              <TabsTrigger 
                key={tab}
                value={tab} 
                className="bg-transparent border-none rounded-none text-xs font-bold uppercase tracking-widest px-0 py-4 data-[state=active]:text-cyan-400 data-[state=active]:border-b-2 data-[state=active]:border-cyan-400 transition-none"
              >
                {tab === 'rules' ? 'Edge Rules' : tab === 'purge' ? 'Cache Purge' : 'Global Settings'}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="rules" className="space-y-8 focus-visible:ring-0">
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Rules List */}
                <div className="lg:col-span-8 space-y-4">
                   <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
                      <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                        <Input 
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          placeholder="Search policies / rules..." 
                          className="pl-10 bg-transparent border-slate-800 text-xs h-10 rounded-sm focus-visible:ring-cyan-500/20"
                        />
                      </div>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-32 bg-transparent border-slate-800 h-10 rounded-sm text-xs font-bold text-slate-400">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-slate-800">
                           <SelectItem value="all">All Status</SelectItem>
                           <SelectItem value="enabled">Active</SelectItem>
                           <SelectItem value="disabled">Paused</SelectItem>
                        </SelectContent>
                      </Select>
                   </div>

                   <div className="space-y-3">
                      <AnimatePresence>
                        {filtered.map((p) => (
                          <motion.div
                            key={p.id}
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className={`group border transition-all rounded-sm p-5 bg-transparent ${
                              selected === p.id ? "border-cyan-500/50" : "border-slate-800 hover:border-slate-700"
                            }`}
                            onClick={() => setSelected(p.id)}
                          >
                             <div className="flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                   <div className={`p-2.5 rounded-sm ${
                                     p.type === "Security" ? "bg-rose-500/10 text-rose-400" :
                                     p.type === "CDN" ? "bg-cyan-500/10 text-cyan-400" :
                                     "bg-slate-800 text-slate-400"
                                   }`}>
                                     {p.type === "Security" ? <Shield size={18} /> : p.type === "CDN" ? <Globe size={18} /> : <Zap size={18} />}
                                   </div>
                                   <div>
                                      <div className="flex items-center gap-3">
                                        <h4 className="text-sm font-bold text-white tracking-tight">{p.name}</h4>
                                        <Badge className="bg-slate-800 text-slate-500 text-[9px] uppercase font-black px-1.5 py-0 rounded-sm">{p.type}</Badge>
                                      </div>
                                      <p className="text-[10px] text-slate-500 font-mono mt-1 font-bold">{p.rule}</p>
                                   </div>
                                </div>
                                <div className="flex items-center gap-6">
                                   <div className="text-right hidden md:block">
                                      <p className="text-[9px] text-slate-600 uppercase font-black tracking-widest">Hits (24h)</p>
                                      <p className="text-xs font-bold font-mono text-cyan-400">{p.hits.toLocaleString()}</p>
                                   </div>
                                   <div className="flex items-center gap-2">
                                      <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        onClick={(e) => { e.stopPropagation(); toggleStatus(p.id); }}
                                        className={`h-8 w-8 transition-colors ${p.status === "enabled" ? "text-cyan-400" : "text-slate-700"}`}
                                      >
                                        <ToggleLeft size={20} className={p.status === "enabled" ? "rotate-180" : ""} />
                                      </Button>
                                      <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        onClick={(e) => { e.stopPropagation(); removePolicy(p.id); }}
                                        className="h-8 w-8 text-slate-700 hover:text-rose-500"
                                      >
                                        <Trash2 size={16} />
                                      </Button>
                                   </div>
                                </div>
                             </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                   </div>
                </div>

                {/* Designer Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                   <Card className="bg-cyan-500/5 border-slate-800 shadow-none rounded-sm overflow-hidden">
                      <CardHeader className="border-b border-slate-800 px-6 py-6 font-bold uppercase tracking-widest text-[11px] text-slate-500 flex flex-row items-center justify-between">
                         Rule Designer
                         <Terminal size={14} className="text-cyan-500" />
                      </CardHeader>
                      <CardContent className="p-6 space-y-6">
                         <div className="space-y-1.5">
                            <label className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Policy Name</label>
                            <Input 
                              value={newName} 
                              onChange={(e) => setNewName(e.target.value)}
                              placeholder="e.g., Global WAF Enforce" 
                              className="bg-transparent border-slate-800 text-xs h-10 rounded-sm focus-visible:ring-cyan-500/20"
                            />
                         </div>
                         <div className="space-y-1.5">
                            <label className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Rule logic (Agemi-DSL)</label>
                            <Input 
                              value={newRule} 
                              onChange={(e) => setNewRule(e.target.value)}
                              placeholder="path matches /* -> cache: HIT" 
                              className="bg-transparent border-slate-800 text-xs h-10 rounded-sm font-mono focus-visible:ring-cyan-500/20"
                            />
                         </div>
                         <div className="space-y-1.5">
                            <label className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Type</label>
                            <Select value={newType} onValueChange={setNewType}>
                               <SelectTrigger className="bg-transparent border-slate-800 text-xs h-10 rounded-sm font-bold text-slate-400">
                                  <SelectValue />
                               </SelectTrigger>
                               <SelectContent className="bg-slate-900 border-slate-800">
                                  <SelectItem value="CDN">CDN / Caching</SelectItem>
                                  <SelectItem value="Security">Security / WAF</SelectItem>
                                  <SelectItem value="Traffic">Traffic Management</SelectItem>
                               </SelectContent>
                            </Select>
                         </div>
                         <Button 
                           onClick={addPolicy}
                           className="w-full bg-cyan-600 hover:bg-cyan-500 text-black font-black uppercase tracking-widest text-[10px] h-10 rounded-sm"
                         >
                           Save & Propagate
                         </Button>
                      </CardContent>
                   </Card>

                   <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-sm flex gap-4">
                      <Info size={16} className="text-cyan-500 shrink-0" />
                      <p className="text-[10px] text-slate-500 leading-relaxed uppercase font-bold tracking-tight">
                        Rules are audited by Agemi‑Guard before deployment. <span className="text-cyan-400">98% pass rate</span> on initial validation.
                      </p>
                   </div>
                </div>
             </div>
          </TabsContent>

          <TabsContent value="purge" className="focus-visible:ring-0">
             <Card className="bg-transparent border-slate-800 shadow-none rounded-sm overflow-hidden max-w-2xl">
                <CardHeader className="border-b border-slate-800 px-6 py-6">
                   <div className="flex items-baseline gap-3">
                      <CardTitle className="text-xl font-bold text-white tracking-tight">Global Invalidation</CardTitle>
                      <span className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">Flush cache on all nodes</span>
                   </div>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                   <div className="space-y-4">
                      <div className="flex flex-col md:flex-row gap-2">
                        <Input 
                          value={purgePath}
                          onChange={(e) => setPurgePath(e.target.value)}
                          placeholder="/static/assets/* or /*" 
                          className="bg-transparent border-slate-800 text-xs h-12 rounded-sm font-mono flex-1 focus-visible:ring-cyan-500/20"
                        />
                        <Button className="bg-rose-600 hover:bg-rose-500 text-white px-8 h-12 font-black uppercase tracking-widest text-[10px] rounded-sm">
                          Purge Path
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <Button variant="ghost" className="h-14 border border-slate-800 text-rose-500 font-black uppercase tracking-widest text-[10px] hover:bg-rose-500/5">
                            Purge Everything
                         </Button>
                         <Button variant="ghost" className="h-14 border border-slate-800 text-cyan-500 font-black uppercase tracking-widest text-[10px] hover:bg-cyan-500/5">
                            Stale-While-Revalidate
                         </Button>
                      </div>
                   </div>

                   <div className="pt-8 border-t border-slate-800">
                      <h5 className="text-[10px] text-slate-600 uppercase font-black tracking-widest mb-6 px-1">Recent Activity</h5>
                      <div className="space-y-4">
                        {[
                          { path: "/api/v1/meta/*", time: "12m ago", status: "Propagated" },
                          { path: "/*", time: "1h 4m ago", status: "Propagated" },
                        ].map((p, idx) => (
                           <div key={idx} className="flex items-center justify-between px-2">
                              <span className="text-xs font-bold text-white font-mono">{p.path}</span>
                              <div className="flex items-center gap-4">
                                <span className="text-[9px] text-slate-600 uppercase font-black font-mono">{p.time}</span>
                                <Badge className="bg-emerald-500/10 text-emerald-500 text-[8px] uppercase px-1.5 rounded-sm border-none">{p.status}</Badge>
                              </div>
                           </div>
                        ))}
                      </div>
                   </div>
                </CardContent>
             </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}