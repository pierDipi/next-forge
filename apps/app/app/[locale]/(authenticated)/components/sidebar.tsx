'use client'

import {
    GlobalSidebar,
    GlobalSidebarProps
} from "@repo/design-system/components/ui/sidebar/global-sidebar";
import {
    BadgeCheck,
    Bell,
    BookOpen,
    Bot,
    CreditCard,
    Frame,
    GalleryVerticalEnd,
    LogOut,
    Map,
    PieChart,
    Settings2,
    Sparkles,
    SquareTerminal
} from "lucide-react";
import {LocaleCode} from "@repo/i18n/middleware";
import {NavUser} from "@repo/design-system/components/ui/sidebar/nav-user";
import Link from "next/link";
import {ModeToggle} from "@repo/design-system/components/ui/mode-toggle";

type AppSidebarProps = {
    readonly locale: LocaleCode
    readonly user: NavUser
};

export const AppSidebar = ({user, locale}: AppSidebarProps) => {

    const sidebarProps: GlobalSidebarProps = {
        switcher: {
            label: "Teams",
            items:
                [
                    {
                        name: "Acme Inc",
                        icon: GalleryVerticalEnd,
                        description: "Enterprise",
                    },
                ],
        },
        main: {
            label: "Platforms",
            items: [
                {
                    title: "Playground",
                    url: "#",
                    icon: SquareTerminal,
                    isActive: true,
                    items: [
                        {
                            title: "History",
                            url: "#",
                        },
                        {
                            title: "Starred",
                            url: "#",
                        },
                        {
                            title: "Settings",
                            url: "#",
                        },
                    ],
                },
                {
                    title: "Models",
                    url: "#",
                    icon: Bot,
                    items: [
                        {
                            title: "Genesis",
                            url: "#",
                        },
                        {
                            title: "Explorer",
                            url: "#",
                        },
                        {
                            title: "Quantum",
                            url: "#",
                        },
                    ],
                },
                {
                    title: "Documentation",
                    url: "#",
                    icon: BookOpen,
                    items: [
                        {
                            title: "Introduction",
                            url: "#",
                        },
                        {
                            title: "Get Started",
                            url: "#",
                        },
                        {
                            title: "Tutorials",
                            url: "#",
                        },
                        {
                            title: "Changelog",
                            url: "#",
                        },
                    ],
                },
                {
                    title: "Settings",
                    url: "#",
                    icon: Settings2,
                    items: [
                        {
                            title: "General",
                            url: "#",
                        },
                        {
                            title: "Team",
                            url: "#",
                        },
                        {
                            title: "Billing",
                            url: "#",
                        },
                        {
                            title: "Limits",
                            url: "#",
                        },
                    ],
                },
            ],
        },
        user: {
            user: user,
            groups: [
                {
                    items: [
                        (
                            <Link href={'#'} className={'w-full flex items-center gap-2'}>
                                <Sparkles/>
                                Upgrade to Pro
                            </Link>
                        ),
                    ]
                },
                {
                    items: [
                        (
                            <Link href={'#'} className={'w-full flex items-center gap-2'}>
                                <BadgeCheck/>
                                Account
                            </Link>
                        ),
                        (
                            <Link href={'#'} className={'w-full flex items-center gap-2'}>
                                <CreditCard/>
                                Billing
                            </Link>
                        ),
                        (
                            <Link href={'#'} className={'w-full flex items-center gap-2'}>
                                <Bell/>
                                Notifications
                            </Link>
                        ),
                    ]
                },
                {
                    items: [
                        (
                            <ModeToggle/>
                        ),
                    ]
                },
                {
                    items: [
                        (
                            <Link href={'#'} className={'w-full flex items-center gap-2'}>
                                <LogOut/>
                                Log out
                            </Link>
                        ),
                    ]
                },
            ],
        },
        secondary: {
            label: "Project",
            items: [
                {
                    name: "Design Engineering",
                    url: "#",
                    icon: Frame,
                },
                {
                    name: "Sales & Marketing",
                    url: "#",
                    icon: PieChart,
                },
                {
                    name: "Travel",
                    url: "#",
                    icon: Map,
                },
            ],
        }
    }
    return (
        <GlobalSidebar {...sidebarProps} />
    )
};