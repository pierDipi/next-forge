"use client"

import * as React from "react"
import {ChevronsUpDown, Plus} from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "../dropdown-menu"
import {SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar} from "../sidebar"
import {Avatar, AvatarFallback, AvatarImage} from "@repo/design-system/components/ui/avatar";

export interface NavSwitcherProps {
    label: string
    items: {
        name: string
        icon: React.ElementType
        description?: string
    }[]
}

export function NavSwitcher({items, label}: NavSwitcherProps) {
    const {isMobile, state, toggleSidebar} = useSidebar()
    const [activeItem, setActiveItem] = React.useState(items[0])

    if (items < 0) {
        throw new Error("No items for switcher")
    }

    if (items.length === 1) {
        const item = items[0]
        return (
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton
                        size="lg"
                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        onClick={toggleSidebar}
                    >
                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={undefined}/>
                                <AvatarFallback className="rounded-lg">
                                    <item.icon/>
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        {item.name}
                                    </span>
                                {item.description &&
                                    <span className="truncate text-xs">{item.description}</span>}
                            </div>
                        </div>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        )
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <div
                                className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                <activeItem.icon className="size-4"/>
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">
                                  {activeItem.name}
                                </span>
                                {activeItem.description &&
                                    <span
                                        className="truncate text-xs">{activeItem.description}</span>}
                            </div>
                            <ChevronsUpDown className="ml-auto"/>
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        align="start"
                        side={isMobile ? "bottom" : "right"}
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="text-xs text-muted-foreground">
                            {label}
                        </DropdownMenuLabel>
                        {items.map(item => (
                            <DropdownMenuItem
                                key={item.name}
                                onClick={() => setActiveItem(item)}
                                className="gap-2 p-2"
                            >
                                <div
                                    className="flex size-6 items-center justify-center rounded-sm border">
                                    <item.icon className="size-4 shrink-0"/>
                                </div>
                                {item.name}
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem className="gap-2 p-2">
                            <div
                                className="flex size-6 items-center justify-center rounded-md border bg-background">
                                <Plus className="size-4"/>
                            </div>
                            <div className="font-medium text-muted-foreground">Add team</div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
