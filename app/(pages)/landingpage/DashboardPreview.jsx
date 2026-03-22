"use client";

import { motion } from "framer-motion";
import { Activity, ShieldCheck, Lock, MoreVertical } from "lucide-react";

export default function DashboardPreview() {
  return (
    <section className="relative py-32 px-6 bg-[#0B1120] overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto text-center mb-24 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-extrabold text-white mb-8 font-stretch-125% leading-tight"
        >
          Powerful <span className="text-blue-400">Control</span> at Your Fingertips
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto font-light font-stretch-125% leading-relaxed"
        >
          Manage your entire security posture from a single, intuitive interface. 
          Real-time logs, threat forensics, and policy management in one place.
        </motion.p>
      </div>

      <div className="max-w-6xl mx-auto relative group z-10">
        {/* Mockup Container with Perspective/Glow */}
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity rounded-3xl" />
        
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[2rem] border border-white/10 bg-[#0B1120]/40 backdrop-blur-2xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden aspect-[16/10] md:aspect-[16/9]"
        >
          {/* Mockup Header - Premium Glass Look */}
          <div className="h-16 border-b border-white/5 bg-white/5 flex items-center justify-between px-8">
            <div className="flex gap-2.5">
              <div className="w-3.5 h-3.5 rounded-full bg-red-500/40 border border-red-500/20" />
              <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/40 border border-yellow-500/20" />
              <div className="w-3.5 h-3.5 rounded-full bg-green-500/40 border border-green-500/20" />
            </div>
            
            <div className="flex items-center gap-6 text-slate-400 text-sm font-medium font-stretch-125% tracking-wide">
              <span className="cursor-pointer hover:text-white transition-colors">Overview</span>
              <span className="px-4 py-1.5 bg-cyan-500/10 rounded-full text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_-3px_rgba(6,182,212,0.3)]">
                Live Monitoring
              </span>
              <span className="hidden sm:inline cursor-pointer hover:text-white transition-colors">Policies</span>
              <span className="hidden md:inline cursor-pointer hover:text-white transition-colors">Analytics</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10" />
              <MoreVertical className="w-5 h-5 text-slate-500" />
            </div>
          </div>

          {/* Mockup Sidebar & Content */}
          <div className="p-10 grid grid-cols-12 gap-8 h-full">
            {/* Sidebar Mockup */}
            <div className="hidden lg:block col-span-3 space-y-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className={`h-10 rounded-xl ${i === 2 ? 'bg-cyan-500/10 border border-cyan-500/20' : 'bg-white/[0.03] border border-white/[0.05]'} flex items-center px-4 group/item cursor-pointer`}>
                  <div className={`w-2.5 h-2.5 rounded-full ${i === 2 ? 'bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]' : 'bg-slate-700'}`} />
                  <div className="ml-4 h-2 w-24 bg-slate-700/50 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-600/50 w-full transform -translate-x-full group-hover/item:translate-x-0 transition-transform duration-500" />
                  </div>
                </div>
              ))}
            </div>

            {/* Main Content Area */}
            <div className="col-span-12 lg:col-span-9 flex flex-col gap-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { label: "Active Threats", color: "text-blue-500", icon: Activity },
                  { label: "Shield Status", color: "text-cyan-500", icon: ShieldCheck },
                  { label: "Encrypted Traffic", color: "text-purple-500", icon: Lock }
                ].map((stat, i) => (
                  <div key={i} className="rounded-2xl bg-white/[0.03] border border-white/[0.05] p-6 space-y-4 hover:bg-white/[0.05] transition-colors group/card">
                    <div className="flex justify-between items-start">
                      <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover/card:scale-110 transition-transform`}>
                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                      <div className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                    </div>
                    <div>
                      <div className="h-4 w-24 bg-slate-400/20 rounded-full mb-2" />
                      <div className="h-2 w-16 bg-slate-400/10 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex-1 rounded-2xl bg-white/[0.02] border border-white/[0.05] p-8 space-y-6 overflow-hidden relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-5 w-32 bg-slate-400/20 rounded-full" />
                  <div className="flex gap-2">
                    <div className="h-2 w-8 bg-slate-400/10 rounded-full" />
                    <div className="h-2 w-8 bg-slate-400/10 rounded-full" />
                  </div>
                </div>
                
                <div className="space-y-4 overflow-hidden">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="h-12 rounded-xl bg-white/[0.03] flex items-center px-5 justify-between border border-white/[0.02] hover:bg-white/[0.05] transition-all"
                    >
                      <div className="flex gap-6 items-center">
                        <div className={`w-2.5 h-2.5 rounded-full ${i % 3 === 0 ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : i % 2 === 0 ? 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]' : 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]'}`} />
                        <div className="h-2 w-48 bg-slate-700/50 rounded-full" />
                      </div>
                      <div className="h-2 w-16 bg-slate-700/30 rounded-full" />
                    </motion.div>
                  ))}
                </div>
                
                {/* Subtle bottom gradient to fade out content */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0B1120] to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
