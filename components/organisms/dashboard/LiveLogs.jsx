"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { Shield, AlertCircle, CheckCircle2 } from "lucide-react";

// 🔹 Log icons
const getIcon = (type) => {
    switch (type) {
        case "success":
            return <CheckCircle2 className="text-emerald-400" size={18} />;
        case "error":
            return <AlertCircle className="text-red-400" size={18} />;
        case "warning":
            return <Shield className="text-yellow-400" size={18} />;
        default:
            return null;
    }
};

export default function LogsCard() {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        // Fake stream logs
        const fakeLogs = [
            {
                id: 1,
                type: "success",
                message: "Firewall check passed",
                time: "12:01:05",
                reqType: "GET",
                endpoint: "/api/v1/firewall",
                location: "New York, US",
                statusCode: 200,
            },
            {
                id: 2,
                type: "warning",
                message: "Suspicious login detected",
                time: "12:02:15",
                reqType: "POST",
                endpoint: "/api/v1/auth/login",
                location: "Lagos, NG",
                statusCode: 403,
            },
            {
                id: 3,
                type: "error",
                message: "Malware signature found",
                time: "12:03:27",
                reqType: "PUT",
                endpoint: "/api/v1/system/update",
                location: "Berlin, DE",
                statusCode: 500,
            },
            {
                id: 4,
                type: "success",
                message: "Patch deployed successfully",
                time: "12:05:10",
                reqType: "PATCH",
                endpoint: "/api/v1/patch/deploy",
                location: "London, UK",
                statusCode: 200,
            },
            {
                id: 5,
                type: "warning",
                message: "Unusual traffic spike",
                time: "12:06:22",
                reqType: "GET",
                endpoint: "/api/v1/analytics",
                location: "Tokyo, JP",
                statusCode: 429,
            },
        ];

        let i = 0;
        const interval = setInterval(() => {
            if (i < fakeLogs.length) {
                setLogs((prev) => [...prev, fakeLogs[i]]);
                i++;
            } else {
                clearInterval(interval);
            }
        }, 2000);
        console.log(fakeLogs);
        return () => clearInterval(interval);
    }, []);

    return (
        <Card className="bg-[#0A0F1C] border border-cyan-500/30 text-white relative overflow-hidden rounded-2xl mt-8 max-w-full">
            <CardHeader>
                <CardTitle className="text-white text-lg sm:text-3xl">
                    System Logs
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[350px] pr-2">
                    <div className="grid grid-cols-1 gap-4">
                        {logs.map((log, index) => (
                            <motion.div
                                key={log.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="relative border border-cyan-500/20 rounded-xl p-4 bg-[#0F172A]/40 backdrop-blur-md hover:border-cyan-400/40 transition"
                            >
                                {/* glowing corner accents */}
                                <div className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-cyan-400"></div>
                                <div className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-cyan-400"></div>
                                <div className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-cyan-400"></div>
                                <div className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-cyan-400"></div>

                                {/* Row 1: Icon + message + time */}
                                <div className="flex items-center gap-3 mb-2">
                                    {/* glowing status dot */}
                                    <span className="relative h-3 w-3 hidden sm:flex">
                                        <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75 animate-ping"></span>
                                        <span className="relative inline-flex h-3 w-3 rounded-full bg-cyan-500"></span>
                                    </span>

                                    {getIcon(log.type)}

                                    <p className="text-sm font-mono flex-1">{log.message}</p>
                                    <span className="text-xs text-gray-400 font-mono">{log.time}</span>
                                </div>

                                {/* Row 2: Request details */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 font-mono gap-2 pl-7 pt-1">
                                    <span className="text-cyan-300 text-xs">Type: {log.reqType}</span>
                                    <span className="text-emerald-300 break-all text-xs">Endpoint: {log.endpoint}</span>
                                    <span className="text-indigo-300 text-xs">Loc: {log.location}</span>
                                    <span className="text-yellow-300 text-xs">Status: {log.statusCode}</span>
                                </div>

                            </motion.div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
