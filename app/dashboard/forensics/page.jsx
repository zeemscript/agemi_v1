"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
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
import DashboardHeader from "@/components/molecules/dashboard/DashboardHeader";
import { Shield, ShieldAlert, Globe, MapPin, Search, Filter, AlertTriangle, Fingerprint, MousePointer2, Clock, MoreVertical } from "lucide-react";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
} from "@/components/ui/chart";
import { 
  Pie, 
  PieChart, 
  Cell,
} from "recharts";

const threatData = [
  { region: "North America", count: 4200, fill: "hsl(var(--cyan-500))" },
  { region: "Western Europe", count: 3100, fill: "hsl(var(--blue-500))" },
  { region: "Asia Pacific", count: 2400, fill: "hsl(var(--slate-600))" },
  { region: "Eastern Europe", count: 1800, fill: "hsl(var(--rose-600))" },
  { region: "Other", count: 900, fill: "hsl(var(--slate-800))" },
];

const chartConfig = {
  count: {
    label: "Threats",
  },
  "North America": {
    label: "North America",
    color: "hsl(var(--cyan-500))",
  },
  "Western Europe": {
    label: "Western Europe",
    color: "hsl(var(--blue-500))",
  },
  "Asia Pacific": {
    label: "Asia Pacific",
    color: "hsl(var(--slate-600))",
  },
  "Eastern Europe": {
    label: "Eastern Europe",
    color: "hsl(var(--rose-600))",
  },
  "Other": {
    label: "Other",
    color: "hsl(var(--slate-800))",
  },
};

const blockedRequests = [
  { id: 1, time: "2m ago", ip: "45.122.1.10", region: "Russia", rule: "WAF: SQL Injection", severity: "High", risk: 98 },
  { id: 2, time: "5m ago", ip: "102.44.12.1", region: "Unknown", rule: "DDoS: Rate Limit Exceeded", severity: "Medium", risk: 65 },
  { id: 3, time: "12m ago", ip: "12.5.112.55", region: "USA", rule: "Threat Intel: Malicious IP", severity: "Critical", risk: 100 },
  { id: 4, time: "15m ago", ip: "10.0.0.1", region: "Local", rule: "Security: Unauthorized Path Access", severity: "Medium", risk: 45 },
  { id: 5, time: "18m ago", ip: "192.168.1.45", region: "Local", rule: "WAF: XSS Attempt", severity: "High", risk: 82 },
];

const topAttackers = [
  { ip: "45.122.1.10", attempts: "12,452", region: "RU", status: "Active Block" },
  { ip: "102.44.12.1", attempts: "8,921", region: "CN", status: "Rate Limited" },
  { ip: "12.5.112.55", attempts: "5,102", region: "US", status: "Active Block" },
  { ip: "88.11.22.33", attempts: "3,441", region: "FR", status: "Suspicious" },
];

export default function ForensicsPage() {
  const [selectedRequest, setSelectedRequest] = useState(blockedRequests[0]);

  return (
    <div className="min-h-screen bg-transparent pb-12">
      <DashboardHeader 
        title="Threat Forensics" 
        subtitle="Deep forensic analysis of intercepted threat vectors and global edge blocks."
        showButton 
        buttonText="Export Security Audit"
      />

      <div className="px-6 py-8 space-y-8 max-w-[1600px] mx-auto">
        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-transparent border-slate-800 shadow-none rounded-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-slate-800 rounded-sm">
                  <ShieldAlert className="text-slate-400" size={18} />
                </div>
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Global Intercepts</p>
              </div>
              <div className="flex items-baseline gap-3">
                <h3 className="text-4xl font-bold text-white tracking-tighter">12.4k</h3>
                <Badge className="bg-rose-500/10 text-rose-500 font-bold text-[10px] rounded-full px-2 border-none">+12%</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-transparent border-slate-800 shadow-none rounded-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-slate-800 rounded-sm">
                  <Fingerprint className="text-slate-400" size={18} />
                </div>
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Unique Handshakes</p>
              </div>
              <div className="flex items-baseline gap-3">
                <h3 className="text-4xl font-bold text-white tracking-tighter">842</h3>
                <Badge className="bg-emerald-500/10 text-emerald-500 font-bold text-[10px] rounded-full px-2 border-none">Verified</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-transparent border-slate-800 shadow-none rounded-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-slate-800 rounded-sm">
                  <Globe className="text-slate-400" size={18} />
                </div>
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Adversary Origins</p>
              </div>
              <div className="flex items-baseline gap-3">
                <h3 className="text-4xl font-bold text-white tracking-tighter">12</h3>
                <Badge className="bg-slate-800 text-slate-400 font-bold text-[10px] rounded-full px-2 border-none">Static</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Investigation View */}
          <div className="lg:col-span-8 space-y-6">
            <Card className="bg-transparent border-slate-800 shadow-none rounded-sm overflow-hidden flex flex-col">
              <CardHeader className="border-b border-slate-800 px-6 py-6 flex flex-row items-center justify-between">
                 <div className="flex items-baseline gap-3">
                   <CardTitle className="text-sm font-bold text-white uppercase tracking-widest">Threat distribution</CardTitle>
                   <span className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">Global Source Attribution</span>
                 </div>
              </CardHeader>
              <CardContent className="p-0 flex-1 flex flex-col lg:flex-row items-center">
                 <div className="w-full lg:w-1/2 h-[350px] p-6">
                   <ChartContainer config={chartConfig} className="h-full w-full">
                     <PieChart>
                       <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                       <Pie
                        data={threatData}
                        dataKey="count"
                        nameKey="region"
                        innerRadius={80}
                        outerRadius={120}
                        strokeWidth={5}
                        stroke="#020617"
                       >
                         {threatData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.fill} />
                         ))}
                       </Pie>
                     </PieChart>
                   </ChartContainer>
                 </div>
                 <div className="w-full lg:w-1/2 p-10 space-y-4">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Regional Breakdown</h4>
                    {threatData.map((d, i) => (
                      <div key={i} className="flex items-center justify-between group">
                         <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.fill }} />
                            <span className="text-xs font-bold text-slate-400 group-hover:text-white transition-colors">{d.region}</span>
                         </div>
                         <span className="text-xs font-mono font-bold text-white">{(d.count/124).toFixed(1)}%</span>
                      </div>
                    ))}
                 </div>
              </CardContent>
            </Card>

            <Card className="bg-transparent border-slate-800 shadow-none rounded-sm overflow-hidden">
               <CardHeader className="border-b border-slate-800 px-6 py-6 bg-slate-900/10">
                 <div className="flex items-baseline gap-3">
                   <CardTitle className="text-sm font-bold text-white uppercase tracking-widest">Intercept Queue</CardTitle>
                   <span className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">Real-time edge enforcement log</span>
                 </div>
               </CardHeader>
               <CardContent className="p-0">
                 <Table>
                   <TableHeader className="bg-slate-900/50 border-b border-slate-800">
                     <TableRow className="border-none hover:bg-transparent">
                       <TableHead className="text-slate-500 font-bold text-[10px] uppercase tracking-widest px-8 h-12">Intercepted</TableHead>
                       <TableHead className="text-slate-500 font-bold text-[10px] uppercase tracking-widest h-12">Identification</TableHead>
                       <TableHead className="text-slate-500 font-bold text-[10px] uppercase tracking-widest h-12">Decision Rule</TableHead>
                       <TableHead className="text-slate-500 font-bold text-[10px] uppercase tracking-widest text-right px-8 h-12">Risk Factor</TableHead>
                     </TableRow>
                   </TableHeader>
                   <TableBody>
                     {blockedRequests.map((req) => (
                       <TableRow 
                        key={req.id} 
                        onClick={() => setSelectedRequest(req)}
                        className={`border-slate-800/40 cursor-pointer transition-colors ${
                          selectedRequest.id === req.id ? "bg-cyan-500/10" : "hover:bg-slate-800/20"
                        }`}
                       >
                         <TableCell className="px-8 py-5 text-slate-500 font-mono text-[10px]">
                           {req.time}
                         </TableCell>
                         <TableCell>
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-white font-mono">{req.ip}</span>
                              <span className="text-[10px] text-slate-600 font-mono uppercase font-black tracking-widest">{req.region}</span>
                            </div>
                         </TableCell>
                         <TableCell>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight">{req.rule}</span>
                         </TableCell>
                         <TableCell className="text-right px-8">
                            <span className={`text-[10px] font-black font-mono ${
                              req.risk > 90 ? "text-rose-500" : "text-amber-500"
                            }`}>
                              {req.risk}%
                            </span>
                         </TableCell>
                       </TableRow>
                     ))}
                   </TableBody>
                 </Table>
               </CardContent>
            </Card>
          </div>

          {/* Sidebar Detail & Insights */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div
              key={selectedRequest.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="bg-transparent border-slate-800 shadow-none rounded-sm overflow-hidden border-l-2 border-l-cyan-500/50">
                <CardHeader className="bg-slate-900/50 border-b border-slate-800 px-6 py-6 flex flex-row items-center justify-between">
                   <CardTitle className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Packet Analysis</CardTitle>
                   <Fingerprint size={14} className="text-cyan-500" />
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                   <div className="space-y-4">
                      <div className="flex justify-between items-center pb-2 border-b border-slate-800/50">
                         <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Handshake ID</span>
                         <span className="text-[10px] text-white font-mono font-bold">SHA-256: 4e21...8b9c</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-slate-800/50">
                         <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Provider Label</span>
                         <span className="text-[10px] text-white font-mono font-bold">Cloudflare, Inc (AS13335)</span>
                      </div>
                      <div className="flex justify-between items-center">
                         <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Final Action</span>
                         <Badge className="bg-rose-500/20 text-rose-500 text-[10px] rounded-sm font-black uppercase tracking-widest border-none">Global Ban</Badge>
                      </div>
                   </div>

                   <div className="space-y-2">
                      <p className="text-[10px] text-slate-600 uppercase font-black tracking-widest mb-2">Request Header Digest</p>
                      <pre className="p-4 bg-slate-900/80 rounded-sm border border-slate-800 text-[10px] text-cyan-400/80 font-mono overflow-x-auto leading-relaxed">
                        {`User-Agent: Moz/5.0...
Accept: application/json
X-Real-IP: ${selectedRequest.ip}
Origin: https://agemi.io
Cookie: _sid=4e21...8b9c`}
                      </pre>
                   </div>

                   <Button className="w-full bg-cyan-600 hover:bg-cyan-500 text-black font-black uppercase tracking-widest text-[10px] h-10 rounded-sm border-none">
                      Permanent Edge Block
                   </Button>
                </CardContent>
              </Card>
            </motion.div>

            <Card className="bg-transparent border-slate-800 shadow-none rounded-sm overflow-hidden">
               <CardHeader className="border-b border-slate-800 px-6 py-6">
                 <CardTitle className="text-[10px] font-black text-slate-500 uppercase tracking-widest">High-Affinity Attackers</CardTitle>
               </CardHeader>
               <CardContent className="p-0">
                  <div className="divide-y divide-slate-800/50">
                    {topAttackers.map((attacker, idx) => (
                      <div key={idx} className="flex items-center justify-between px-6 py-4 hover:bg-slate-800/10 transition-colors group">
                         <div className="flex items-center gap-3">
                            <div className="text-[9px] font-black text-slate-500 bg-slate-900 w-6 h-6 flex items-center justify-center rounded-sm uppercase">
                               {attacker.region}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[10px] font-bold text-white font-mono">{attacker.ip}</span>
                              <span className="text-[8px] text-slate-600 uppercase font-black tracking-tighter">{attacker.attempts} attempts logged</span>
                            </div>
                         </div>
                         <div className={`w-1.5 h-1.5 rounded-full ${attacker.status === 'Active Block' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]' : 'bg-amber-500'}`} />
                      </div>
                    ))}
                  </div>
               </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}