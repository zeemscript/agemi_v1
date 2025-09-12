"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// 🔹 Example Data (API Requests & Threats Blocked)
const chartData = [
    { date: "2024-06-01", requests: 12000, threats: 3200 },
    { date: "2024-06-02", requests: 15400, threats: 4100 },
    { date: "2024-06-03", requests: 9800, threats: 2900 },
    { date: "2024-06-04", requests: 17500, threats: 5300 },
    { date: "2024-06-05", requests: 14300, threats: 4200 },
    { date: "2024-06-06", requests: 16200, threats: 4800 },
    { date: "2024-06-07", requests: 19000, threats: 5600 },
    { date: "2024-06-08", requests: 17800, threats: 4900 },
    { date: "2024-06-09", requests: 21000, threats: 6000 },
    { date: "2024-06-10", requests: 15200, threats: 4300 },
    { date: "2024-06-11", requests: 16300, threats: 4500 },
    { date: "2024-06-12", requests: 19800, threats: 5900 },
    { date: "2024-06-13", requests: 22400, threats: 6700 },
    { date: "2024-06-14", requests: 18900, threats: 5200 },
    { date: "2024-06-15", requests: 24000, threats: 7200 },
];

// 🔹 Chart Configuration
const chartConfig ={
    requests: { label: "API Requests", color: "#06b6d4" },  
    threats: { label: "Threats Blocked", color: "#3b82f6" }, 
};

export default function SecurityAreaChart() {
    const [timeRange, setTimeRange] = React.useState("14d");

    return (
        <Card className="mt-6 border rounded-2xl border-blue-500/20 bg-gradient-to-br from-[#0D1526] via-[#0A0F1C] to-[#0D1526]">
            <CardHeader className="flex items-center gap-2 space-y-0 border-b border-slate-800 sm:flex-row">
                <div className="grid flex-1 gap-1">
                    <CardTitle className="text-white text-lg sm:text-3xl">Security Traffic Overview</CardTitle>
                    <CardDescription className="text-slate-400 text-sm sm:text-lg">
                        API activity vs threats blocked in the last {timeRange}
                    </CardDescription>
                </div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger
                        className="hidden w-[160px] sm:ml-auto sm:flex rounded-2xl bg-slate-900 text-white border-slate-700"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Last 14 days" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 text-white border border-slate-700 rounded-2xl">
                        <SelectItem value="14d" className="rounded-2xl">
                            Last 14 days
                        </SelectItem>
                        <SelectItem value="7d" className="rounded-2xl">
                            Last 7 days
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer config={chartConfig} className="aspect-auto h-[280px] w-full">
                    <AreaChart data={chartData}>
                        {/* Gradients */}
                        <defs>
                            <linearGradient id="fillRequests" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={chartConfig.requests.color} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={chartConfig.requests.color} stopOpacity={0.05} />
                            </linearGradient>
                            <linearGradient id="fillThreats" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={chartConfig.threats.color} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={chartConfig.threats.color} stopOpacity={0.05} />
                            </linearGradient>
                        </defs>

                        {/* Grid + Axis */}
                        <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
                            }}
                            stroke="#94a3b8"
                        />

                        {/* Tooltip */}
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) =>
                                        new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                        })
                                    }
                                    indicator="dot"
                                />
                            }
                        />

                        {/* Areas */}
                        <Area
                            dataKey="requests"
                            type="monotone"
                            fill="url(#fillRequests)"
                            stroke={chartConfig.requests.color}
                            strokeWidth={2}
                        />
                        <Area
                            dataKey="threats"
                            type="monotone"
                            fill="url(#fillThreats)"
                            stroke={chartConfig.threats.color}
                            strokeWidth={2}
                        />

                        {/* Legend */}
                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
