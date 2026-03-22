"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import DashboardHeader from "@/components/molecules/dashboard/DashboardHeader";
import { Zap, Shield, Activity, Globe, ArrowUpRight, MousePointer2, Clock, Terminal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { 
  Area, 
  AreaChart, 
  CartesianGrid, 
  XAxis, 
  YAxis,
  ResponsiveContainer
} from "recharts";

const chartData = [
  { time: "00:00", latency: 45 },
  { time: "04:00", latency: 52 },
  { time: "08:00", latency: 48 },
  { time: "12:00", latency: 61 },
  { time: "16:00", latency: 55 },
  { time: "20:00", latency: 42 },
  { time: "23:59", latency: 40 },
];

const chartConfig = {
  latency: {
    label: "Latency",
    color: "hsl(var(--cyan-500))",
  },
};

const topEndpoints = [
  { path: "/api/v1/users", requests: "452k", status: "Healthy", latency: "42ms" },
  { path: "/api/v1/products", requests: "312k", status: "Healthy", latency: "38ms" },
  { path: "/static/images/hero.webp", requests: "284k", status: "Healthy", latency: "12ms" },
  { path: "/api/v1/auth/login", requests: "156k", status: "Warning", latency: "115ms" },
  { path: "/api/v1/orders", requests: "98k", status: "Healthy", latency: "56ms" },
];

export default function OverviewPage() {
  return (
    <div className="min-h-screen bg-transparent pb-12">
      <DashboardHeader 
        title="Global Overview" 
        subtitle="Real-time edge telemetry and global security enforcement status."
        showButton 
        buttonText="View Live Logs"
      />

      <div className="px-6 py-8 space-y-8 max-w-[1600px] mx-auto">
        {/* Metric Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-transparent border-slate-800 shadow-none rounded-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-slate-800 rounded-sm">
                  <Globe className="text-slate-400" size={18} />
                </div>
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Global Requests</p>
              </div>
              <div className="flex items-baseline gap-3">
                <h3 className="text-4xl font-bold text-white tracking-tighter">2.4M</h3>
                <Badge className="bg-emerald-500/10 text-emerald-500 font-bold text-[10px] rounded-full px-2 border-none">+12%</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-transparent border-slate-800 shadow-none rounded-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-slate-800 rounded-sm">
                  <Zap className="text-slate-400" size={18} />
                </div>
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Cache Hit Rate</p>
              </div>
              <div className="flex items-baseline gap-3">
                <h3 className="text-4xl font-bold text-white tracking-tighter">94.2%</h3>
                <Badge className="bg-emerald-500/10 text-emerald-500 font-bold text-[10px] rounded-full px-2 border-none">Optimal</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-transparent border-slate-800 shadow-none rounded-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-slate-800 rounded-sm">
                  <Shield className="text-slate-400" size={18} />
                </div>
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Blocked Threats</p>
              </div>
              <div className="flex items-baseline gap-3">
                <h3 className="text-4xl font-bold text-white tracking-tighter">12,842</h3>
                <Badge className="bg-rose-500/10 text-rose-500 font-bold text-[10px] rounded-full px-2 border-none">Critical</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-transparent border-slate-800 shadow-none rounded-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-slate-800 rounded-sm">
                  <Activity className="text-slate-400" size={18} />
                </div>
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Avg. Origin RTT</p>
              </div>
              <div className="flex items-baseline gap-3">
                <h3 className="text-4xl font-bold text-white tracking-tighter">142ms</h3>
                <Badge className="bg-amber-500/10 text-amber-500 font-bold text-[10px] rounded-full px-2 border-none">Warning</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           {/* Main Chart */}
           <Card className="lg:col-span-8 bg-transparent border-slate-800 shadow-none rounded-sm overflow-hidden flex flex-col">
             <CardHeader className="border-b border-slate-800 px-6 py-6 flex flex-row items-center justify-between">
               <div>
                 <CardTitle className="text-sm font-bold text-white uppercase tracking-widest">Edge Latency (Global Mean)</CardTitle>
                 <p className="text-[10px] text-slate-500 uppercase mt-1">Real-time performance distribution across 42 edge nodes</p>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                 <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Streaming Telemetry</span>
               </div>
             </CardHeader>
             <CardContent className="p-6 flex-1 min-h-[350px]">
               <ChartContainer config={chartConfig} className="h-full w-full">
                 <AreaChart
                   data={chartData}
                   margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                 >
                   <defs>
                     <linearGradient id="fillLatency" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="rgb(6, 182, 212)" stopOpacity={0.3} />
                       <stop offset="95%" stopColor="rgb(6, 182, 212)" stopOpacity={0} />
                     </linearGradient>
                   </defs>
                   <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#1e293b" />
                   <XAxis 
                     dataKey="time" 
                     axisLine={false} 
                     tickLine={false} 
                     tick={{ fill: '#64748b', fontSize: 10 }}
                     dy={10}
                   />
                   <YAxis 
                     axisLine={false} 
                     tickLine={false} 
                     tick={{ fill: '#64748b', fontSize: 10 }}
                   />
                   <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                   <Area
                     type="monotone"
                     dataKey="latency"
                     stroke="#06b6d4"
                     strokeWidth={2}
                     fill="url(#fillLatency)"
                     animationDuration={1500}
                   />
                 </AreaChart>
               </ChartContainer>
             </CardContent>
           </Card>

           {/* Sidebar Stats */}
           <div className="lg:col-span-4 space-y-6">
              <Card className="bg-transparent border-slate-800 shadow-none rounded-sm">
                <CardHeader className="border-b border-slate-800 px-6 py-4">
                  <CardTitle className="text-[10px] text-emerald-500 font-black uppercase tracking-widest">Active mitigations</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-slate-800/50">
                    {[
                      { source: "AWS-BOT-FILTER", status: "Active", events: "4.2k" },
                      { source: "IP-REPUTATION-L7", status: "Active", events: "1.8k" },
                      { source: "GEO-FENCING-CN", status: "Monitor", events: "0.4k" },
                    ].map((m, i) => (
                      <div key={i} className="px-6 py-4 flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-white font-mono">{m.source}</span>
                          <span className="text-[9px] text-slate-500 uppercase tracking-widest mt-1">{m.status}</span>
                        </div>
                        <Badge className="bg-slate-800 text-slate-400 font-mono text-[10px] rounded-sm">{m.events}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-transparent border-slate-800 shadow-none rounded-sm">
                 <CardHeader className="border-b border-slate-800 px-6 py-4 flex justify-between items-center">
                    <CardTitle className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Traffic distribution</CardTitle>
                    <MousePointer2 size={14} className="text-slate-600" />
                 </CardHeader>
                 <CardContent className="p-6 space-y-4">
                    {[
                      { region: "North America", value: 45, color: "bg-cyan-500" },
                      { region: "Western Europe", value: 32, color: "bg-blue-500" },
                      { region: "Asia Pacific", value: 18, color: "bg-slate-700" },
                      { region: "Other", value: 5, color: "bg-slate-800" },
                    ].map((r, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-[10px] uppercase font-bold tracking-tight">
                          <span className="text-slate-400">{r.region}</span>
                          <span className="text-white">{r.value}%</span>
                        </div>
                        <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div className={`h-full ${r.color}`} style={{ width: `${r.value}%` }} />
                        </div>
                      </div>
                    ))}
                 </CardContent>
              </Card>

              <Card className="bg-cyan-500/5 border border-cyan-500/20 rounded-sm p-5 flex gap-4">
                 <Terminal size={18} className="text-cyan-500 shrink-0" />
                 <p className="text-[10px] text-slate-400 leading-relaxed uppercase font-black">
                    All security clusters are operational. Last propagation 42s ago.
                 </p>
              </Card>
           </div>
        </div>

        {/* Endpoints Table */}
        <Card className="bg-transparent border-slate-800 shadow-none rounded-sm overflow-hidden">
          <CardHeader className="border-b border-slate-800 px-6 py-6 bg-slate-900/10">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-bold text-white uppercase tracking-widest">Top Active Endpoints</CardTitle>
                <p className="text-[10px] text-slate-500 uppercase mt-1">Highest request volume in the last 60 minutes</p>
              </div>
              <Button variant="ghost" size="sm" className="text-slate-500 hover:text-white text-[10px] uppercase font-black tracking-widest">
                Analytics Report
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
             <Table>
               <TableHeader className="bg-slate-900/50 border-b border-slate-800">
                 <TableRow className="border-none hover:bg-transparent">
                   <TableHead className="text-slate-500 font-bold text-[10px] uppercase tracking-widest px-8 h-12">Target Path</TableHead>
                   <TableHead className="text-slate-500 font-bold text-[10px] uppercase tracking-widest h-12">Methods</TableHead>
                   <TableHead className="text-slate-500 font-bold text-[10px] uppercase tracking-widest h-12">Performance</TableHead>
                   <TableHead className="text-slate-500 font-bold text-[10px] uppercase tracking-widest text-right px-8 h-12">Volume</TableHead>
                 </TableRow>
               </TableHeader>
               <TableBody>
                 {topEndpoints.map((item, idx) => (
                   <TableRow key={idx} className="border-slate-800/40 hover:bg-slate-800/20 transition-colors group">
                     <TableCell className="px-8 py-4">
                       <span className="text-xs font-bold text-white font-mono group-hover:text-cyan-400 transition-colors">{item.path}</span>
                     </TableCell>
                     <TableCell>
                       <Badge className="bg-slate-800 text-slate-400 text-[8px] font-bold uppercase rounded-sm border-none">GET</Badge>
                     </TableCell>
                     <TableCell>
                       <div className="flex items-baseline gap-2">
                         <span className="text-xs font-mono font-bold text-white">{item.latency}</span>
                         <span className={`text-[8px] font-black uppercase ${item.status === 'Healthy' ? 'text-emerald-500' : 'text-amber-500'}`}>{item.status}</span>
                       </div>
                     </TableCell>
                     <TableCell className="text-right px-8 font-mono text-xs font-bold text-slate-500">
                       {item.requests}
                     </TableCell>
                   </TableRow>
                 ))}
               </TableBody>
             </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
