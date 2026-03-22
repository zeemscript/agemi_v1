import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import SecurityAreaChart from "@/components/organisms/dashboard/Chart";
import AlertsMetric from "@/components/molecules/metrics/Alerts";
import BlockedReq from "@/components/molecules/metrics/Blocked_Req";
import TotalReq from "@/components/molecules/metrics/Total_Req";
import DashboardHeader from "@/components/molecules/dashboard/DashboardHeader";
import { Badge } from "@/components/ui/badge";
const Reports = () => {
    return (
        <div className="min-h-screen bg-transparent pb-12">
            <DashboardHeader 
                title="Security Reports" 
                subtitle="Overview of recent traffic, blocked requests and alert trends across the edge."
                showButton
                buttonText="Generate PDF"
            />

            <div className="px-6 py-8 space-y-8 max-w-[1600px] mx-auto">
                {/* Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-transparent border-slate-800 shadow-none rounded-sm">
                        <CardContent className="p-6">
                            <TotalReq />
                        </CardContent>
                    </Card>
                    <Card className="bg-transparent border-slate-800 shadow-none rounded-sm">
                        <CardContent className="p-6">
                            <BlockedReq />
                        </CardContent>
                    </Card>
                    <Card className="bg-transparent border-slate-800 shadow-none rounded-sm">
                        <CardContent className="p-6">
                            <AlertsMetric />
                        </CardContent>
                    </Card>
                </div>

                {/* Analytics */}
                <div className="grid grid-cols-1 gap-6">
                    <SecurityAreaChart />
                </div>

                {/* Events Table */}
                <Card className="bg-transparent border-slate-800 shadow-none rounded-sm overflow-hidden">
                    <div className="px-6 py-6 border-b border-slate-800">
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest">Recent Security Events</h3>
                    </div>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader className="bg-slate-900/40 border-b border-slate-800">
                                <TableRow className="border-none hover:bg-transparent">
                                    <TableHead className="text-slate-500 font-bold text-[10px] uppercase tracking-widest px-8">Timestamp</TableHead>
                                    <TableHead className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">Type</TableHead>
                                    <TableHead className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">Service</TableHead>
                                    <TableHead className="text-slate-500 font-bold text-[10px] uppercase tracking-widest text-right px-8">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow className="border-slate-800/40 hover:bg-slate-800/20 transition-colors">
                                    <TableCell className="px-8 py-5 text-slate-500 font-mono text-[10px]">Just now</TableCell>
                                    <TableCell>
                                        <Badge className="bg-cyan-500/10 text-cyan-500 text-[10px] border-none">Traffic</Badge>
                                    </TableCell>
                                    <TableCell className="text-xs font-bold text-white uppercase">CDN Cache</TableCell>
                                    <TableCell className="text-right px-8">
                                        <Badge className="bg-emerald-500/10 text-emerald-500 text-[10px] border-none font-bold">ACTIVE</Badge>
                                    </TableCell>
                                </TableRow>
                                <TableRow className="border-slate-800/40 hover:bg-slate-800/20 transition-colors">
                                    <TableCell className="px-8 py-5 text-slate-500 font-mono text-[10px]">10m ago</TableCell>
                                    <TableCell>
                                        <Badge className="bg-rose-500/10 text-rose-500 text-[10px] border-none">Security</Badge>
                                    </TableCell>
                                    <TableCell className="text-xs font-bold text-white uppercase">WAF</TableCell>
                                    <TableCell className="text-right px-8">
                                        <Badge className="bg-slate-800 text-slate-400 text-[10px] border-none font-bold">RESOLVED</Badge>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Reports;