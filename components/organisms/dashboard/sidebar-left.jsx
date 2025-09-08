"use client"

import * as React from "react"
import { NavMain } from "@/components/molecules/dashboard/nav-main"
import Navrouter from "@/components/molecules/dashboard/nav-routers"
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import AgemiLogo from "../../molecules/dashboard/agemi-logo"

export function SidebarLeft({
    ...props
}) {
    return (
        <Sidebar className="b" {...props}>
            <SidebarHeader>
                <AgemiLogo />
                {/* <NavMain items={data.navMain} /> */}
            </SidebarHeader>
            {/* dashboard pages route */}
            <SidebarContent>
                <Navrouter />
            </SidebarContent>          
            <SidebarRail />
        </Sidebar>
    );
}
