"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Button from "@/components/atoms/form/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardHeader from "@/components/molecules/dashboard/DashboardHeader";
import { Search, Filter, Activity, Terminal, Download, Trash2, StopCircle, PlayCircle } from "lucide-react";

// Initial mock logs
const initialLogs = [
  { id: 1, timestamp: new Date().toISOString(), method: "GET", path: "/api/v1/users", status: 200, ip: "192.168.1.45", cache: "HIT", latency: "12ms" },
  { id: 2, timestamp: new Date().toISOString(), method: "POST", path: "/api/v1/auth/login", status: 200, ip: "45.122.1.10", cache: "BYPASS", latency: "85ms" },
  { id: 3, timestamp: new Date().toISOString(), method: "GET", path: "/static/images/hero.webp", status: 200, ip: "102.44.12.1", cache: "HIT", latency: "8ms" },
  { id: 4, timestamp: new Date().toISOString(), method: "GET", path: "/api/v1/products", status: 404, ip: "12.5.112.55", cache: "MISS", latency: "124ms" },
  { id: 5, timestamp: new Date().toISOString(), method: "GET", path: "/api/v1/configs", status: 200, ip: "10.0.0.1", cache: "HIT", latency: "15ms" },
];

const getStatusColor = (status) => {
  if (status >= 200 && status < 300) return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
  if (status >= 400 && status < 500) return "bg-amber-500/10 text-amber-400 border-amber-500/20";
  if (status >= 500) return "bg-rose-500/10 text-rose-400 border-rose-500/20";
  return "bg-slate-500/10 text-slate-400 border-slate-500/20";
};

const getMethodColor = (method) => {
  switch (method) {
    case "GET": return "text-cyan-400";
    case "POST": return "text-indigo-400";
    case "PUT": return "text-amber-400";
    case "DELETE": return "text-rose-400";
    default: return "text-slate-400";
  }
};

export default function LiveLogsPage() {
  const [logs, setLogs] = useState(initialLogs);
  const [isLive, setIsLive] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Update logs to simulate "live" feed
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      const methods = ["GET", "POST", "PUT", "DELETE"];
      const paths = ["/api/v1/users", "/api/v1/auth/login", "/static/images/hero.webp", "/api/v1/products", "/api/v1/orders", "/health"];
      const statuses = [200, 200, 201, 404, 500, 304];
      const caches = ["HIT", "MISS", "BYPASS", "STALE"];
      
      const newLog = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        method: methods[Math.floor(Math.random() * methods.length)],
        path: paths[Math.floor(Math.random() * paths.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        ip: `${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`,
        cache: caches[Math.floor(Math.random() * caches.length)],
        latency: `${Math.floor(Math.random() * 200)}ms`
      };

      setLogs(prev => [newLog, ...prev.slice(0, 49)]);
    }, 2000);

    return () => clearInterval(interval);
  }, [isLive]);

  const filteredLogs = logs.filter(log => 
    log.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.ip.includes(searchTerm) ||
    log.method.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-transparent pb-12">
      <DashboardHeader 
        title="Live Telemetry" 
        subtitle="Real-time request telemetry streaming from global edge nodes."
        showButton 
        buttonText={isLive ? "Pause Feed" : "Resume Feed"}
        onButtonClick={() => setIsLive(!isLive)}
      />

      <div className="px-6 py-8 space-y-8 max-w-[1600px] mx-auto">
        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-cyan-500/10 border-cyan-500/20 shadow-none rounded-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-cyan-500/20 rounded-sm">
                  <Activity className="text-cyan-400" size={18} />
                </div>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Requests / Sec</p>
              </div>
              <div className="flex items-baseline gap-3">
                <h3 className="text-4xl font-bold text-white tracking-tighter">842</h3>
                <Badge className="bg-emerald-500/20 text-emerald-400 font-bold text-[10px] rounded-full px-2">Optimal</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-transparent border-slate-800 shadow-none rounded-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-slate-800 rounded-sm">
                  <Terminal className="text-slate-400" size={18} />
                </div>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Error Rate (5xx)</p>
              </div>
              <div className="flex items-baseline gap-3">
                <h3 className="text-4xl font-bold text-white tracking-tighter">0.02%</h3>
                <Badge className="bg-slate-800 text-slate-400 font-bold text-[10px] rounded-full px-2">-0.01%</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-transparent border-slate-800 shadow-none rounded-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-slate-800 rounded-sm">
                  <Activity className="text-slate-400" size={18} />
                </div>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Avg. Edge Latency</p>
              </div>
              <div className="flex items-baseline gap-3">
                <h3 className="text-4xl font-bold text-white tracking-tighter">24ms</h3>
                <Badge className="bg-slate-800 text-slate-400 font-bold text-[10px] rounded-full px-2">Stable</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
           <div className="relative w-full md:w-96">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
             <Input 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               placeholder="Search logs (IP, Path, Method)..." 
               className="pl-10 bg-transparent border-slate-800 text-xs h-10 rounded-sm focus-visible:ring-cyan-500/20"
             />
           </div>
           <div className="flex gap-3 w-full md:w-auto">
             <Select defaultValue="all">
               <SelectTrigger className="w-32 bg-transparent border-slate-800 h-10 rounded-sm text-xs font-bold text-slate-400">
                 <SelectValue placeholder="Status" />
               </SelectTrigger>
               <SelectContent className="bg-slate-900 border-slate-800">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="2xx">2xx Success</SelectItem>
                  <SelectItem value="4xx">4xx Error</SelectItem>
                  <SelectItem value="5xx">5xx Critical</SelectItem>
               </SelectContent>
             </Select>
             <Button 
               variant="ghost" 
               size="sm" 
               onClick={() => setLogs([])}
               className="text-slate-500 hover:text-rose-400 text-[10px] font-black uppercase tracking-widest border border-slate-800 h-10 px-4"
             >
               <Trash2 size={14} className="mr-2" /> Clear
             </Button>
           </div>
        </div>

        {/* Live Logs Table */}
        <Card className="bg-transparent border-slate-800 shadow-none rounded-sm overflow-hidden">
          <CardHeader className="border-b border-slate-800 px-6 py-6 flex flex-row items-center justify-between">
             <div className="flex items-baseline gap-3">
               <CardTitle className="text-xl font-bold text-white tracking-tight">Stream Output</CardTitle>
               <div className="flex items-center gap-2">
                 <span className="text-xs text-slate-500 font-medium uppercase tracking-widest">Active nodes</span>
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
               </div>
             </div>
             <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white text-[10px] font-black uppercase tracking-widest">
               <Download size={14} className="mr-2" /> Export
             </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-900/40 border-b border-slate-800">
                <TableRow className="border-none hover:bg-transparent">
                  <TableHead className="text-slate-500 font-bold text-[10px] uppercase tracking-widest px-8">Time</TableHead>
                  <TableHead className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">Method</TableHead>
                  <TableHead className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">Path</TableHead>
                  <TableHead className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">Status</TableHead>
                  <TableHead className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">Origin / IP</TableHead>
                  <TableHead className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">Cache</TableHead>
                  <TableHead className="text-slate-500 font-bold text-[10px] uppercase tracking-widest text-right px-8">Latency</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence initial={false}>
                  {filteredLogs.map((log) => (
                    <motion.tr 
                      key={log.id} 
                      layout
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border-slate-800/40 hover:bg-slate-800/20 transition-colors"
                    >
                      <TableCell className="px-8 py-5 text-slate-500 font-mono text-[10px]">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </TableCell>
                      <TableCell>
                        <span className={`text-[10px] font-black ${getMethodColor(log.method)}`}>
                          {log.method}
                        </span>
                      </TableCell>
                      <TableCell className="max-w-[300px] truncate">
                        <span className="text-xs font-bold text-white font-mono">{log.path}</span>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-widest border border-current ${getStatusColor(log.status)}`}>
                          {log.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-slate-400 font-mono text-[10px]">
                        {log.ip}
                      </TableCell>
                      <TableCell>
                        <span className={`text-[10px] font-bold font-mono ${
                          log.cache === "HIT" ? "text-emerald-400" : 
                          log.cache === "MISS" ? "text-amber-400" : 
                          "text-slate-500"
                        }`}>
                          {log.cache}
                        </span>
                      </TableCell>
                      <TableCell className="text-right px-8 font-mono text-[10px] font-bold text-cyan-400">
                        {log.latency}
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        {filteredLogs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <Terminal size={48} className="mb-4 opacity-20" />
            <p className="text-xs uppercase tracking-widest font-bold">No logs matching your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
