"use client";
import NextTopLoader from "nextjs-toploader";
import { SidebarLeft } from "@/components/organisms/dashboard/sidebar-left"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import NavHeader from "@/components/molecules/dashboard/nav-header";


export default function Layout({ children }) {
    return (
        <>
            <NextTopLoader
                color="#38bdf8"
                initialPosition={0.09}
                crawlSpeed={80}
                height={4}
                crawl={false}
                showSpinner={false}
                easing="ease"
                speed={100}
                shadow="0 0 15px #38bdf8, 0 0 10px #0ea5e9, 0 0 5px #06b6d4"
            />


            <SidebarProvider>
                <SidebarLeft />
                <SidebarInset>
                    <NavHeader />
                    <main className="bg-gradient-to-b from-[#3d579b] via-[#293f74] to-[#0B1120] h-full text-white">{children}</main>
                </SidebarInset>
            </SidebarProvider>


        </>
    );
}