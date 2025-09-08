"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    BadgeCheck,
    Bell,
    CreditCard,
    ChevronsUpDown,
    LogOut,
    Sparkles,
    SettingsIcon
} from "lucide-react"
import Link from "next/link"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import Modal from "@/components/molecules/dashboard/Modal"
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react"
import Button from "@/components/atoms/form/Button"
export function NavUser({
    user }) {
    const { isMobile } = useSidebar();
    const { user: currentUser, logout } = useAuth();
    const [modalOpen, setModalOpen] = useState(false);
    const upgrade = () => {
        setModalOpen(true);
    }

    return (
        <>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton
                                size="lg"
                                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground "
                            >
                                <Avatar className="h-10 w-10 rounded-lg">
                                    <AvatarImage src={user?.avatar} alt={user?.name} />
                                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{user?.name}</span>
                                    <span className="truncate text-xs">{user?.email}</span>
                                </div>
                                <ChevronsUpDown className="ml-auto size-4" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                            side={isMobile ? "bottom" : "right"}
                            align="start"
                            sideOffset={4}
                        >
                            <DropdownMenuLabel className="p-0 font-normal">
                                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage src={user?.avatar} alt={user?.name} />
                                        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">{user?.name}</span>
                                        <span className="truncate text-xs">{user?.email}</span>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem onClick={upgrade} className="focus:text-white">
                                    <Sparkles className="text-black" />
                                    Upgrade to Pro
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <Link href={`/account/profile/${currentUser?._id}`}>
                                    <DropdownMenuItem className="focus:text-white">
                                        <BadgeCheck className="text-black" />
                                        Account
                                    </DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem className="focus:text-white">
                                    <CreditCard className="text-black" />
                                    Billing
                                </DropdownMenuItem>
                                <DropdownMenuItem className="focus:text-white">
                                    <Bell className="text-black" />
                                    Notifications
                                </DropdownMenuItem>
                                <Link href="/account/settings">
                                    <DropdownMenuItem className="focus:text-white">
                                        <SettingsIcon className="text-black" />
                                        Settings
                                    </DropdownMenuItem>
                                </Link>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={logout} className="focus:text-white">
                                <LogOut className="text-black" />
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Upgrade to Pro"
            >
                <Card className="w-full max-w-md shadow-xl">
                    <CardHeader className="flex justify-center items-center gap-2 text-center pt-3">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary shadow-md">
                            <Sparkles className="h-8 w-8" />
                        </div>
                        <CardTitle className="text-lg font-semibold mt-2">Unlock Pro Features</CardTitle>
                    </CardHeader>

                    <CardContent className="flex flex-col items-center gap-4">
                        <p className="text-sm text-muted-foreground text-center leading-relaxed">
                            Upgrade to Pro to access premium features and help support the ongoing development of this app.
                            <br />
                            Your contribution truly makes a difference!
                        </p>

                        <Button wide round outlined>
                            Upgrade to Pro
                        </Button>
                    </CardContent>
                </Card>
            </Modal>
        </>
    )
}
