"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Lock, Globe, BarChart3, Fingerprint } from "lucide-react";

const features = [
  {
    title: "Real-time WAF",
    description: "Next-gen Web Application Firewall that adapts to threats in milliseconds, not minutes.",
    icon: Shield,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
  },
  {
    title: "API Security",
    description: "Deep packet inspection and schema validation for every API endpoint in your infrastructure.",
    icon: Lock,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "DDoS Mitigation",
    description: "Global protection against L3/L4 and L7 attacks with near-zero latency impact.",
    icon: Zap,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    title: "Global Edge Network",
    description: "Deploy security policies across 100+ edge locations worldwide for instant performance.",
    icon: Globe,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Threat Intelligence",
    description: "Leverage AI-driven insights to predict and block emerging attack patterns before they hit.",
    icon: BarChart3,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    title: "Identity Protection",
    description: "Multi-factor authentication and bot detection to secure user accounts and data.",
    icon: Fingerprint,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    },
  },
};

export default function Features() {
  return (
    <section className="relative py-32 px-6 overflow-hidden bg-[#0B1120]" id="services">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-8 font-stretch-125% leading-tight"
          >
            Unmatched <span className="text-cyan-500">Security</span> Capabilities
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto font-light font-stretch-125% leading-relaxed"
          >
            Agemi provides a comprehensive suite of security tools designed to protect your 
            digital assets from the most sophisticated threats.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="relative p-10 rounded-3xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-md hover:bg-white/[0.04] hover:border-cyan-500/30 transition-all group overflow-hidden"
            >
              {/* Subtle inner glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-8 border border-white/5 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 font-stretch-125% tracking-tight group-hover:text-cyan-400 transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-slate-400 font-light font-stretch-125% leading-relaxed group-hover:text-slate-300 transition-colors">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
