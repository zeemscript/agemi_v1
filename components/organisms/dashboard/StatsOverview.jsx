"use client";

import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import {
    ShieldCheck,
    Activity,
    AlertTriangle,
    Globe,
    Cpu,
} from "lucide-react";

// 🔹 Formatter for numbers
function formatNumber(num) {
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B";
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return num.toString();
}

const stats = [
    {
        label: "API Requests",
        icon: <Activity className="h-5 w-5 text-cyan-400" />,
        value: 1247000,
    },
    {
        label: "Threats Blocked",
        icon: <ShieldCheck className="h-5 w-5 text-green-400" />,
        value: 87300,
    },
    {
        label: "Active Policies",
        icon: <Cpu className="h-5 w-5 text-blue-400" />,
        value: 143,
    },
    {
        label: "Alerts Triggered",
        icon: <AlertTriangle className="h-5 w-5 text-rose-400" />,
        value: 275,
    },
    {
        label: "Global Coverage",
        icon: <Globe className="h-5 w-5 text-yellow-400" />,
        value: 824,
        unit: "Regions",
    },
];

// 🔹 Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15, // delay between each card
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function StatsOverview() {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

    return (
        <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
        >
            {stats.map((stat, i) => (
                <motion.div
                    key={i}
                    variants={cardVariants}
                    className="rounded-2xl p-6 space-y-4 
                        bg-gradient-to-br from-[#0F172A] via-[#0B1120] to-[#0F172A] 
                        shadow-md shadow-cyan-500/10 hover:shadow-cyan-400/20
                        border border-slate-800 hover:border-cyan-500/30
                        transition duration-300 hover:scale-[1.02]"
                >
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-slate-300">{stat.label}</p>
                        <span>{stat.icon}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                        {inView && typeof stat.value === "number" ? (
                            <CountUp
                                end={stat.value}
                                duration={2}
                                formattingFn={formatNumber}
                            />
                        ) : (
                            <span>
                                {stat.value}{" "}
                                {stat.unit && (
                                    <span className="text-sm text-white">
                                        {stat.unit}
                                    </span>
                                )}
                            </span>
                        )}
                    </h3>
                </motion.div>
            ))}
        </motion.div>
    );
}
