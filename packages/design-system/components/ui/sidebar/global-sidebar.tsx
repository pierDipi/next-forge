"use client"

import * as React from "react"

import {NavSwitcher, NavSwitcherProps} from "./nav-switcher";
import {NavMain, NavMainProps} from "./nav-main"
import {NavSecondary, NavSecondaryProps} from "./nav-secondary";
import {NavUser, NavUserProps} from "./nav-user"
import {Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail,} from "../sidebar"

export interface GlobalSidebarProps {

    switcher: NavSwitcherProps
    main: NavMainProps
    secondary?: NavSecondaryProps

    user: NavUserProps

    sidebarProps?: React.ComponentProps<typeof Sidebar>
}

export function GlobalSidebar(p: GlobalSidebarProps) {

    return (
        <Sidebar collapsible="icon" {...p.sidebarProps}>
            <SidebarHeader>
                <NavSwitcher {...p.switcher}/>
            </SidebarHeader>
            <SidebarContent>
                <NavMain {...p.main}/>
                {p.secondary && p.secondary.items.length > 0 && <NavSecondary {...p.secondary} />}
            </SidebarContent>
            <SidebarFooter>
                <NavUser {...p.user} />
            </SidebarFooter>
            <SidebarRail/>
        </Sidebar>
    )
}
