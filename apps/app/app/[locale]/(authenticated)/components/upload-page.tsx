"use client";

import {SidebarTrigger} from "@repo/design-system/components/ui/sidebar";
import {Separator} from "@repo/design-system/components/ui/separator";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList
} from "@repo/design-system/components/ui/breadcrumb";
import {UploadArea} from "@/app/[locale]/(authenticated)/components/upload";
import React, {useRef} from "react";
import {Button} from "@repo/design-system/components/ui/button";
import {FileUp, FolderUp, Plus} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@repo/design-system/components/ui/dropdown-menu";

export const UploadPage = () => {

    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const dirInputRef = useRef<HTMLInputElement | null>(null)

    return (
        <div>
            <header className="flex h-16 shrink-0 items-center justify-between gap-2">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1"/>
                    <Separator orientation="vertical" className="mr-2 h-4"/>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="block">
                                <BreadcrumbLink href="#link">
                                    Uploads
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <Separator orientation="vertical" className="mr-2 h-4"/>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary"><Plus />New</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuGroup>
                                <DropdownMenuItem onClick={() => fileInputRef.current?.click()}>
                                    <FileUp /> Upload file
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => dirInputRef.current?.click()}>
                                    <FolderUp /> Upload directory
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-1 pt-0">
                <UploadArea
                    fileInputRef={fileInputRef}
                    dirInputRef={dirInputRef}
                />
            </div>
        </div>
    )
}