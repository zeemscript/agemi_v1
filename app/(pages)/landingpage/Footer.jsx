"use client";

import Link from "next/link";
import Image from "next/image";
import { Twitter, Github, Linkedin, Mail } from "lucide-react";

const footerLinks = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "#services" },
      { name: "Security", href: "#" },
      { name: "Global Edge", href: "#" },
      { name: "Enterprise", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Documentation", href: "#" },
      { name: "API Reference", href: "#" },
      { name: "Community", href: "#" },
      { name: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "#mission" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "#contact" },
      { name: "Legal", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#0B1120] border-t border-white/5 pt-32 pb-16 px-6 relative z-10 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-24">
          <div className="lg:col-span-2 space-y-8">
            <Link href="/" className="inline-block">
              <Image
                src="/images/dnb-nobg.png"
                width={140}
                height={30}
                alt="Agemi Logo"
                className="opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-slate-400 max-w-sm text-lg font-light font-stretch-125% leading-relaxed">
              Empowering developers and enterprises with next-gen security visibility 
              and edge protection. Secure your digital future today.
            </p>
            <div className="flex gap-5">
              {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
                <Link 
                  key={i} 
                  href="#" 
                  className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-white/[0.05] transition-all group"
                >
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </Link>
              ))}
            </div>
          </div>

          {footerLinks.map((section, index) => (
            <div key={index} className="space-y-8">
              <h4 className="text-white font-extrabold tracking-widest uppercase text-xs font-stretch-125% opacity-90">
                {section.title}
              </h4>
              <ul className="space-y-5">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <Link 
                      href={link.href} 
                      className="text-slate-400 hover:text-cyan-400 transition-colors font-light font-stretch-125% text-[15px] group flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/0 group-hover:bg-cyan-500/50 transition-all scale-0 group-hover:scale-100" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-sm font-light font-stretch-125% tracking-wide">
          <p>© {new Date().getFullYear()} Agemi Security Inc. All rights reserved.</p>
          <div className="flex gap-10">
            <Link href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-slate-300 transition-colors">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
