"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const stats = [
  {
    label: "Threats Blocked",
    value: 50.2,
    suffix: "M+",
    color: "text-cyan-500",
  },
  {
    label: "Global PoPs",
    value: 120,
    suffix: "",
    color: "text-blue-500",
  },
  {
    label: "Requests Analyzed",
    value: 12.5,
    suffix: "B+",
    color: "text-purple-500",
  },
  {
    label: "Average Protection Speed",
    value: 0.8,
    suffix: "ms",
    color: "text-emerald-500",
    decimals: 1,
  },
];

export default function SecurityStats() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="relative py-24 px-6 bg -[#0B1120] overflow-hidden" ref={ref}>
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="relative inline-block mb-6">
                {/* Individual stat glow */}
                <div className={`absolute -inset-4 blur-2xl opacity-10 group-hover:opacity-30 transition-opacity bg-current ${stat.color}`} />
                
                <h3 className={`text-5xl md:text-6xl font-extrabold flex items-baseline justify-center gap-1 font-stretch-125% tracking-tighter ${stat.color}`}>
                  {inView ? (
                    <CountUp
                      end={stat.value}
                      duration={3}
                      decimals={stat.decimals || 0}
                      useEasing={true}
                    />
                  ) : (
                    <span>0</span>
                  )}
                  <span className="text-3xl md:text-4xl font-bold opacity-80">{stat.suffix}</span>
                </h3>
              </div>
              
              <p className="text-slate-400 text-sm md:text-base font-light font-stretch-125% tracking-widest uppercase leading-relaxed max-w-[200px] mx-auto group-hover:text-slate-300 transition-colors">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
