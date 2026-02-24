import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import SecurityAreaChart from "@/components/organisms/dashboard/Chart";
import AlertsMetric from "@/components/molecules/metrics/Alerts";
import BlockedReq from "@/components/molecules/metrics/Blocked_Req";
import TotalReq from "@/components/molecules/metrics/Total_Req";

const Reports = () => {
    return (
        <div className="p-2 sm:p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Reports</h1>
                    <p className="text-slate-400 mt-1">Overview of recent traffic, blocked requests and alert trends.</p>
                </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="bg-slate-900/40 border border-slate-700/30 rounded-2xl">
                    <CardContent>
                        <TotalReq />
                    </CardContent>
                </Card>
                <Card className="bg-slate-900/40 border border-slate-700/30 rounded-2xl">
                    <CardContent>
                        <BlockedReq />
                    </CardContent>
                </Card>
                <Card className="bg-slate-900/40 border border-slate-700/30 rounded-2xl">
                    <CardContent>
                        <AlertsMetric />
                    </CardContent>
                </Card>
            </div>

       

            {/* Simple table placeholder for reports */}
            <Card className="bg-slate-900/40 border border-slate-700/30 rounded-2xl">
                <CardContent>
                    <h3 className="text-white font-semibold mb-3">Recent Events</h3>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Time</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Service</TableHead>
                                <TableHead className="text-right">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>Just now</TableCell>
                                <TableCell>Traffic</TableCell>
                                <TableCell>CDN Cache</TableCell>
                                <TableCell className="text-right">Active</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>10m ago</TableCell>
                                <TableCell>Security</TableCell>
                                <TableCell>WAF</TableCell>
                                <TableCell className="text-right">Resolved</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default Reports;