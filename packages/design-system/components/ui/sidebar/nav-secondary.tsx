"use client"

import {type LucideIcon, MoreHorizontal} from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "../dropdown-menu"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar
} from "../sidebar"
import {ReactNode} from "react";

export interface NavSecondaryProps {
    label: ReactNode
    items: {
        name: string
        url: string
        icon: LucideIcon
        dropdowns?: {
            children: ReactNode,
            separator: boolean
        }[]
    }[]
}

export function NavSecondary({label, items}: NavSecondaryProps) {
    const {isMobile} = useSidebar()
    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>{label}</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton asChild>
                            <a href={item.url}>
                                <item.icon/>
                                <span>{item.name}</span>
                            </a>
                        </SidebarMenuButton>
                        {item.dropdowns && item.dropdowns.length > 0 && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuAction showOnHover>
                                        <MoreHorizontal/>
                                        <span className="sr-only">More</span>
                                    </SidebarMenuAction>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-48 rounded-lg"
                                    side={isMobile ? "bottom" : "right"}
                                    align={isMobile ? "end" : "start"}
                                >
                                    {item.dropdowns.map(d => {
                                        return (
                                            <>
                                                <DropdownMenuItem className="text-muted-foreground">
                                                    {d.children}
                                                </DropdownMenuItem>
                                                d.separator && <DropdownMenuSeparator/>
                                            </>
                                        )
                                    })}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
