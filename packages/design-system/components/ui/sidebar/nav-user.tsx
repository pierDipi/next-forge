"use client"

import {ChevronsUpDown, User} from "lucide-react"

import {Avatar, AvatarFallback, AvatarImage} from "../avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "../dropdown-menu"
import {SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar} from "../sidebar"
import {Fragment, ReactNode} from "react";

export interface NavUser {
    name?: string | null
    email?: string | null
}

export interface NavUserProps {
    user: NavUser
    groups?: {
        items: ReactNode[]
    }[]
}

export function NavUser({user, groups}: NavUserProps) {
    const {isMobile} = useSidebar()
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={undefined}/>
                                <AvatarFallback className="rounded-lg"><User/></AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">
                                    {user.name ?? user.email}
                                </span>
                                <span className="truncate text-xs">{user.email}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4"/>
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={undefined}/>
                                    <AvatarFallback className="rounded-lg"><User/></AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        {user.name ?? user.email}
                                    </span>
                                    <span className="truncate text-xs">{user.email}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        {groups && groups.length > 0 && groups.map((dg, i) => (
                                <Fragment key={i}>
                                    <DropdownMenuGroup>
                                        {
                                            dg.items.map((d, j) => (
                                                    <DropdownMenuItem key={j} asChild>
                                                        {d}
                                                    </DropdownMenuItem>
                                                )
                                            )
                                        }
                                    </DropdownMenuGroup>
                                    {i !== groups.length - 1 && <DropdownMenuSeparator/>}
                                </Fragment>
                            )
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
