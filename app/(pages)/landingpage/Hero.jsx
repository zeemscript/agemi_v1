"use client";

import { motion } from "framer-motion";
import { ReactTyped } from "react-typed";
import Button from "@/components/atoms/form/Button"; // or your custom Button
import Header from "@/components/molecules/Navbar";

export default function Hero() {
    return (
        <section className="relative h-screen  bg-gradient-to-b from-[#0B1120] via-[#0F172A] to-[#0B1120] overflow-hidden">

            <Header />


            <div className="px-6 overflow-hidden mt-10 sm:mt-40 flex items-center justify-center text-center">
                {/* Background Glow Effects */}
                <div className="absolute inset-0">
                    <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl top-[-150px] left-[-150px]" />
                    <div className="absolute w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-3xl bottom-[-120px] right-[-120px]" />
                </div>

                {/* Content */}
                <motion.div
                    className="relative z-10  mx-auto "
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    {/* Hero Title */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight font-stretch-125%">
                        Secure Your{" "}
                        <span className="text-cyan-500">
                            <ReactTyped
                                strings={[
                                    "APIs",
                                    "Applications",
                                    "Infrastructure",
                                    "Digital Future",
                                ]}
                                typeSpeed={70}
                                backSpeed={50}
                                backDelay={1500}
                                loop
                            />
                        </span>
                        <br />
                        With <span className="text-blue-400">Next-Gen Protection</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="mt-6 text-lg md:text-xl lg:text-2xl text-slate-300 max-w-2xl sm:max-w-3xl mx-auto font-light font-stretch-125%">
                        Real-time visibility, API protection, and WAF intelligence in a
                        single dashboard. Stay ahead of threats with unmatched security
                        insights.
                    </p>

                    {/* Buttons */}
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5">
                        <Button
                            to="/dashboard"
                            round
                            className="bg-cyan-500 hover:bg-cyan-400 text-white px-8 py-3 text-lg shadow-lg shadow-cyan-500/30"
                        >
                            Start Free Trial
                        </Button>
                        <Button
                            round
                            className="bg-transparent border border-cyan-500 hover:bg-cyan-500/10 text-cyan-300 px-8 py-3 text-lg"
                        >
                            Watch Demo
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
