"use client";

import {Button, ButtonProps} from "@repo/design-system/components/ui/button";
import {ReactNode, useRef} from "react";

interface UploadButtonProps {
    readonly children: ReactNode
    readonly upload: (files: FileList | null) => Promise<any> | void
    readonly buttonProps?: ButtonProps

}

function onChange(files: FileList | null) {
    console.log(files)
}

export const UploadButton = ({children, buttonProps, upload}: UploadButtonProps) => {

    const inputRef = useRef<HTMLInputElement | null>(null);

    return (
        <>
            <Button
                {...buttonProps}
                type={"submit"}
                onClick={() => inputRef.current?.click()}>
                    {children}
            </Button>
            <input className={"hidden"}
                   type={"file"}
                   ref={inputRef}
                   multiple={true}
                   onChange={(event) => upload(event.currentTarget.files)}
            />
        </>
    )
}


