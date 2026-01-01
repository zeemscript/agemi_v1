"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Activity,
  Bell,
  Network,
  Search,
  Shield,
  FileSearch,
  Settings,
  Users,
  CreditCard,
  BarChart3,
} from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const links = [
  {
    name: "Overview",
    link: "/dashboard/overview",
    icon: LayoutDashboard,
  },
  {
    name: "Live Logs",
    link: "/dashboard/live-logs",
    icon: Activity,
  },
  {
    name: "Alerts",
    link: "/dashboard/alerts",
    icon: Bell,
  },
  {
    name: "API Discovery",
    link: "/dashboard/api-discovery",
    icon: Network,
  },
  {
    name: "Forensics",
    link: "/dashboard/forensics",
    icon: FileSearch,
  },
  {
    name: "Policies",
    link: "/dashboard/policies",
    icon: Shield,
  },
  {
    name: "Reports",
    link: "/dashboard/reports",
    icon: BarChart3,
  },
  {
    name: "Team",
    link: "/dashboard/team",
    icon: Users,
  },
  {
    name: "Billing",
    link: "/dashboard/billing",
    icon: CreditCard,
  },
  {
    name: "Settings",
    link: "/dashboard/settings",
    icon: Settings,
  },
];

const Navrouter = () => {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();

  const handleNavClick = () => {
    if (isMobile) setOpenMobile(false);
  };

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu className="space-y-2 pt-10">
          {links.map((item) => {
            const isActive =
              item.link === "/dashboard"
                ? pathname === item.link
                : pathname.startsWith(item.link);

            return (
              <SidebarMenuItem key={item.name} className="space-y-10"> 
                <Link
                  href={item.link}
                  onClick={handleNavClick}
                  className={`flex items-center gap-4 px-6 py-3 rounded-4xl transition-all duration-300 group w-fit
                    ${isActive
                    ? "bg-cyan-500/20 text-cyan-400"
                      : "text-white hover:bg-slate-800/50 hover:text-cyan-400 "
                    }`}
                >
                  <item.icon
                    size={20}
                    className="transition-colors duration-300  text-cyan-400"
                  />
                  <span
                    className={`font-medium text-sm sm:text-base transition-colors duration-300`}
                  >
                    {item.name}
                  </span>
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default Navrouter;
