"use client";

import React, { useState, useMemo } from "react";
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
import { 
  AlertCircle, 
  AlertTriangle, 
  Info, 
  CheckCircle2, 
  Search, 
  ChevronRight, 
  Bell, 
  ShieldAlert, 
  Clock, 
  Activity, 
  X,
  ExternalLink,
  Shield,
  Zap,
  ZapOff,
  MoreVertical
} from "lucide-react";

import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  XAxis, 
  YAxis,
  Area,
  AreaChart,
  ResponsiveContainer
} from "recharts";

const volumeData = [
  { day: "Mon", total: 240, critical: 40 },
  { day: "Tue", total: 300, critical: 80 },
  { day: "Wed", total: 200, critical: 30 },
  { day: "Thu", total: 278, critical: 90 },
  { day: "Fri", total: 189, critical: 20 },
  { day: "Sat", total: 239, critical: 50 },
  { day: "Sun", total: 349, critical: 70 },
];

const activityData = [
  { time: "00:00", active: 40 },
  { time: "04:00", active: 65 },
  { time: "08:00", active: 50 },
  { time: "12:00", active: 85 },
  { time: "16:00", active: 70 },
  { time: "20:00", active: 90 },
  { time: "23:59", active: 60 },
];

const chartConfig = {
  total: {
    label: "Total Alerts",
    color: "hsl(var(--cyan-500))",
  },
  critical: {
    label: "Critical",
    color: "hsl(var(--rose-500))",
  },
  active: {
    label: "Activity",
    color: "hsl(var(--cyan-500))",
  }
};

const mockAlerts = [
  { id: 1, title: "Critical: SQL Injection Attempt", description: "Blocked 45 maliciously crafted requests from 45.122.1.10", severity: "critical", type: "Security", status: "active", time: "2m ago", service: "WAF Layer 7", impact: "High" },
  { id: 2, title: "Warning: High Latency at Edge", description: "Edge node 'LGA-01' reporting 450ms avg latency", severity: "warning", type: "Performance", status: "active", time: "12m ago", service: "CDN Edge", impact: "Medium" },
  { id: 3, title: "DDoS mitigation active", description: "Rate limiting applied to /search endpoint (12k req/min)", severity: "critical", type: "Traffic", status: "active", time: "15m ago", service: "Rate Limiter", impact: "High" },
  { id: 4, title: "Cache Purge Completed", description: "Global invalidation for /* successful", severity: "info", type: "System", status: "resolved", time: "1h ago", service: "Cache Manager", impact: "Low" },
  { id: 5, title: "SSL Cert Expiry (7 Days)", description: "Certificate for agemi.io expires soon", severity: "warning", type: "Security", status: "active", time: "2h ago", service: "SSL Manager", impact: "Medium" },
];

export default function AlertsPage() {
  const [selectedAlert, setSelectedAlert] = useState(mockAlerts[0]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAlerts = useMemo(() => {
    return mockAlerts.filter(alert => {
      const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           alert.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-transparent pb-12">
      <DashboardHeader 
        title="Incident Command" 
        subtitle="Global edge security incidents and firewall enforcement telemetry."
        showButton 
        buttonText="Check Integrity"
      />

      <div className="px-6 py-8 space-y-8 max-w-[1600px] mx-auto">
        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-transparent border-slate-800 shadow-none rounded-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-slate-800 rounded-sm">
                  <AlertCircle className="text-slate-400" size={18} />
                </div>
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Active Alerts</p>
              </div>
              <div className="flex items-baseline gap-3">
                <h3 className="text-4xl font-bold text-white tracking-tighter">4,372</h3>
                <Badge className="bg-emerald-500/10 text-emerald-500 font-bold text-[10px] rounded-full px-2 border-none">+3.2%</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-transparent border-slate-800 shadow-none rounded-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-slate-800 rounded-sm">
                  <ShieldAlert className="text-slate-400" size={18} />
                </div>
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Critical Gaps</p>
              </div>
              <div className="flex items-baseline gap-3">
                <h3 className="text-4xl font-bold text-white tracking-tighter">12</h3>
                <Badge className="bg-rose-500/10 text-rose-500 font-bold text-[10px] rounded-full px-2 border-none">High Risk</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-transparent border-slate-800 shadow-none rounded-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-slate-800 rounded-sm">
                  <Activity className="text-slate-400" size={18} />
                </div>
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Global Mean TTL</p>
              </div>
              <div className="flex items-baseline gap-3">
                <h3 className="text-4xl font-bold text-white tracking-tighter">842ms</h3>
                <Badge className="bg-slate-800 text-slate-400 font-bold text-[10px] rounded-full px-2 border-none">Stable</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-transparent border-slate-800 shadow-none rounded-sm overflow-hidden flex flex-col">
            <CardHeader className="border-b border-slate-800 px-6 py-6 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-bold text-white uppercase tracking-widest">Alert Volume (7D)</CardTitle>
                <p className="text-[10px] text-slate-500 uppercase mt-1">Aggregated incident count by severity</p>
              </div>
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-500" />
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Total</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-rose-500" />
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Critical</span>
                 </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 h-[350px]">
              <ChartContainer config={chartConfig} className="h-full w-full">
                <BarChart data={volumeData}>
                  <CartesianGrid vertical={false} stroke="#1e293b" strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 10 }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 10 }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="total" fill="#06b6d4" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="critical" fill="#f43f5e" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="bg-transparent border-slate-800 shadow-none rounded-sm overflow-hidden flex flex-col">
            <CardHeader className="border-b border-slate-800 px-6 py-6 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-bold text-white uppercase tracking-widest">Firewall Enforcement</CardTitle>
                <p className="text-[10px] text-slate-500 uppercase mt-1">Active request mitigation activity</p>
              </div>
              <Activity size={16} className="text-cyan-500 animate-pulse" />
            </CardHeader>
            <CardContent className="p-6 h-[350px]">
              <ChartContainer config={chartConfig} className="h-full w-full">
                <AreaChart data={activityData}>
                   <defs>
                     <linearGradient id="fillActive" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                       <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                     </linearGradient>
                   </defs>
                  <CartesianGrid vertical={false} stroke="#1e293b" strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="time" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 10 }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 10 }}
                  />
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <Area
                    type="monotone"
                    dataKey="active"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#fillActive)"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Alert Queue Table */}
        <Card className="bg-transparent border-slate-800 shadow-none rounded-sm overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-800 px-6 py-6 bg-slate-900/10">
            <div className="flex items-baseline gap-3">
              <CardTitle className="text-xl font-bold text-white tracking-tight">Active Queue</CardTitle>
              <span className="text-xs text-slate-500 font-medium uppercase tracking-widest">Monitoring 42 edge nodes</span>
            </div>
            <div className="flex gap-4">
              <div className="relative w-64">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                 <Input 
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   placeholder="Search incidents..." 
                   className="pl-10 bg-transparent border-slate-800 text-[10px] font-black uppercase h-9 rounded-sm"
                 />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-900/50 border-b border-slate-800">
                <TableRow className="border-none hover:bg-transparent">
                  <TableHead className="text-slate-500 font-bold text-[10px] uppercase tracking-widest px-8 h-12">Event Time</TableHead>
                  <TableHead className="text-slate-500 font-bold text-[10px] uppercase tracking-widest h-12">Incident Identity</TableHead>
                  <TableHead className="text-slate-500 font-bold text-[10px] uppercase tracking-widest h-12">Security Domain</TableHead>
                  <TableHead className="text-slate-500 font-bold text-[10px] uppercase tracking-widest text-center h-12">Severity</TableHead>
                  <TableHead className="text-slate-500 font-bold text-[10px] uppercase tracking-widest text-right px-8 h-12">Resolution</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAlerts.length > 0 ? filteredAlerts.map((alert) => (
                  <TableRow key={alert.id} className="border-slate-800/40 hover:bg-slate-800/20 transition-colors group">
                    <TableCell className="text-slate-500 font-mono text-[10px] px-8 py-5">
                      {alert.time}
                    </TableCell>
                    <TableCell>
                       <div className="flex flex-col">
                          <span className="text-xs font-bold text-white uppercase tracking-tight">{alert.title}</span>
                          <span className="text-[10px] text-slate-600 font-mono mt-0.5">ID: {alert.id}042-X</span>
                       </div>
                    </TableCell>
                    <TableCell>
                       <Badge className="bg-slate-800/50 text-slate-400 text-[8px] font-black uppercase rounded-sm border-none px-1.5">{alert.service}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                       <span className={`text-[10px] font-black uppercase tracking-widest ${
                         alert.severity === 'critical' ? 'text-rose-500' : 'text-emerald-500'
                       }`}>
                         {alert.severity}
                       </span>
                    </TableCell>
                    <TableCell className="text-right px-8">
                       <Button variant="ghost" size="sm" className="text-slate-500 hover:text-white text-[10px] font-black uppercase tracking-widest">
                         Investigate
                       </Button>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-48 text-center text-slate-600 font-mono text-xs uppercase tracking-widest">
                       Silent state: No active incidents
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}