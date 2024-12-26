"use client";

import React, {useState} from 'react';
import {AlertCircle, Check, ChevronDown, ChevronUp, Upload, X} from 'lucide-react';
import {Progress} from "@repo/design-system/components/ui/progress";
import {cn} from "@repo/design-system/lib/utils";
import {Toast, ToastProvider, ToastViewport} from "@repo/design-system/components/ui/toast";
import {Alert, AlertDescription, AlertTitle} from "@repo/design-system/components/ui/alert";

type UploadFile = {
    id: string;
    name: string;
    size: number;
    progress: number;
    status: 'uploading' | 'complete' | 'error';
    errorMessage?: string;
    remove?: boolean
};

type UploadAreaProps = {
    accept?: string[]

    fileInputRef: React.RefObject<HTMLInputElement | null>
    dirInputRef: React.RefObject<HTMLInputElement | null>
}

const UploadArea = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & UploadAreaProps
>(({fileInputRef, dirInputRef, className, ...props}, ref) => {

    const [isDragActive, setIsDragActive] = useState(false);
    const [files, setFiles] = useState<UploadFile[]>([
        {
            id: '1',
            name: 'document.pdf',
            size: 5.3 * 1024 * 1024,
            progress: 0,
            status: 'uploading'
        },
        {
            id: '2',
            name: 'image.jpg',
            size: 2.1 * 1024 * 1024,
            progress: 0,
            status: 'uploading'
        },
        {
            id: '3',
            name: 'large-file.zip',
            size: 15.7 * 1024 * 1024 * 1024,
            progress: 0,
            status: 'uploading'
        },
        {
            id: '4',
            name: 'very long name but really really long long long long.zip',
            size: 15.7 * 1024 * 1024,
            progress: 0,
            status: 'uploading'
        }
    ]);
    const [isProgressToastVisible, setIsProgressToastVisible] = useState(files.length > 0);


    React.useEffect(() => {
        const timers = files.map((file) => {
            return setInterval(() => {
                setFiles(prevFiles =>
                    prevFiles.map(f => {
                        if (f.id === file.id && f.status === 'uploading') {
                            const newProgress = f.progress + 10;

                            if (f.id === '3' && newProgress > 60) {
                                return {
                                    ...f,
                                    status: 'error',
                                    progress: 60,
                                    errorMessage: 'Network error occurred'
                                };
                            }

                            if (newProgress >= 100) {
                                return {...f, progress: 100, status: 'complete'};
                            }

                            return {...f, progress: newProgress};
                        }
                        return f;
                    })
                );
            }, 1000);
        });

        return () => timers.forEach(timer => clearInterval(timer));
    }, []);


    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();

        const droppedFiles: File[] = [];
        const {items, files: fileList} = event.dataTransfer;

        if (items) {
            for (let i = 0; i < items.length; i++) {
                console.log("kind", items[i].kind, "type", items[i].type)
                if (items[i].kind === "file") {
                    const file = items[i].getAsFile();
                    if (file) {
                        droppedFiles.push(file);
                    }
                }
            }
        } else if (fileList) {
            for (let i = 0; i < fileList.length; i++) {
                droppedFiles.push(fileList[i]);
            }
        }

        if (droppedFiles.length > 0) {
            const newFiles = toUploadFile(droppedFiles)
            setFiles((prevFiles) => [...newFiles, ...prevFiles]);
        }

        setIsDragActive(false);
        setIsProgressToastVisible(true)
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();

        const hasFiles = Array.from(event.dataTransfer.types).includes("Files");
        if (hasFiles) {
            if (!isDragActive) {
                setIsDragActive(true);
            }
        } else {
            // If the drag doesn't include files, you can optionally ignore or reset the state.
            setIsDragActive(false);
        }
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();

        const dropZone = event.currentTarget;
        const rect = dropZone.getBoundingClientRect();

        // Check if the mouse has left the drop zone boundaries
        if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
        ) {
            setIsDragActive(false);
        }
    };


    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = toUploadFile(event.target.files);
        setFiles((prevFiles) => [...selectedFiles, ...prevFiles]);
    };

    return (
        <>
            <div
                id="drop-area"
                ref={ref}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDragEnter={handleDragOver} // Ensures isDragActive is set when entering
                className={cn(
                    "bg-primary-foreground relative min-h-[100vh] w-full rounded-xl border-2 transition-colors",
                    "flex flex-col items-center justify-center gap-4 p-6",
                    isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25",
                    className,
                )}
                {...props}
            >
                <div className="flex flex-col items-center gap-2 text-center">
                    <p className="text-sm font-medium">
                        <span className="text-primary">Drag and drop</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                        Any file format (up to 50MB each)
                    </p>
                </div>

                {isDragActive &&
                    <div className="absolute top-12 px-8 motion-safe:animate-bounce">
                        <Alert>
                            <Upload className='h-5 w-5'/>
                            <AlertTitle>Drop files to upload them</AlertTitle>
                            <AlertDescription className='py-1 text-center font-bold'>
                                Folder
                            </AlertDescription>
                        </Alert>
                    </div>
                }

            </div>

            <input
                id="fileInput"
                type="file"
                multiple
                className="hidden"
                accept={'image/*, video/*'}
                ref={fileInputRef}
                onChange={handleFileSelect}
            />

            <input
                id="dirInput"
                type="file"
                multiple
                // @ts-ignore
                webkitdirectory="true"
                className="hidden"
                ref={dirInputRef}
                onChange={handleFileSelect}
            />

            {
                isProgressToastVisible && <UploadProgressToast files={files}
                                                               handleClose={() => setIsProgressToastVisible(false)}/>
            }
        </>
    )
})
UploadArea.displayName = "UploadArea"

function toUploadFile(files: FileList | File[] | null): UploadFile[] {
    return Array.from(files || []).map(f => {
        return {
            id: crypto.randomUUID().toString(),
            name: f.name,
            type: f.type,
            size: f.size,
            progress: 0,
            status: 'uploading'
        }
    })
}

interface UploadProgressToastProps {
    files: UploadFile[]
    handleClose: React.MouseEventHandler
}

const UploadProgressToast = ({files, handleClose}: UploadProgressToastProps) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'complete':
                return <Check className="h-4 w-4 text-green-500"/>;
            case 'error':
                return <AlertCircle className="h-4 w-4 text-destructive"/>;
            default:
                return <Upload className="h-4 w-4 text-primary animate-pulse"/>;
        }
    };

    const completedFiles = files.filter(f => f.status === 'complete').length;

    const prompt = `${files.length} files (${completedFiles} complete)`

    return (
        <ToastProvider duration={Infinity}>
            <Toast className="fixed bottom-4 right-4 max-w-full w-80 md:w-96 border-secondary">
                <div className="w-full pt-1 px-1 md:pt-2 md:px-2">
                    <div className="flex items-center justify-between pb-1 md:pb-2">
                        <div className="flex items-center space-x-2">
                            <Upload className="h-6 w-6 text-blue-500"/>
                            <span className="font-medium text-primary" title={prompt}>
                                {prompt}
                            </span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="text-secondary-foreground hover:text-primary transition-colors"
                            >
                                {isExpanded ? <ChevronDown className="h-7 w-7"/> :
                                    <ChevronUp className="h-7 w-7"/>}
                            </button>
                            <button
                                onClick={handleClose}
                                className="text-secondary-foreground hover:text-primary transition-colors"
                            >
                                <X className="h-6 w-6"/>
                            </button>
                        </div>
                    </div>

                    {isExpanded && (
                        <div className="space-y-3 py-6 pr-4 max-h-52 overflow-y-scroll">
                            {files.filter(f => f.remove ?? true).map((file) => (
                                <div key={file.id} className="space-y-2">
                                    <div
                                        className="flex items-center justify-between text-sm">
                                        <div
                                            className="flex items-center space-x-2 min-w-0 flex-1">
                                            <div className="flex-shrink-0">
                                                {getStatusIcon(file.status)}
                                            </div>
                                            <span
                                                className="truncate text-secondary-foreground"
                                                title={file.name}>
                                                    {file.name}
                                            </span>
                                        </div>
                                        <span
                                            className="text-muted-foreground flex-shrink-0"
                                            title={file.name}>
                                            {humanFileSize(file.size * (file.progress / 100))} / {humanFileSize(file.size)}
                                        </span>
                                    </div>

                                    <div className="space-y-1">
                                        <Progress
                                            value={file.progress}
                                            className={cn(
                                                "h-1",
                                                file.status === 'error' && "[&>[role=progressbar]]:bg-destructive bg-destructive/20",
                                                file.status === 'complete' && "[&>[role=progressbar]]:bg-primary bg-secondary",
                                                file.status === 'uploading' && "[&>[role=progressbar]]:bg-primary bg-secondary"
                                            )}
                                        />
                                        {file.status === 'error' && (
                                            <div className="text-sm text-destructive">
                                                {file.errorMessage}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Toast>
            <ToastViewport className='z-10' />
        </ToastProvider>
    );
};

/**
 * Format bytes as human-readable text.
 *
 * @param bytes Number of bytes.
 * @param si True to use metric (SI) units, aka powers of 1000. False to use
 *           binary (IEC), aka powers of 1024.
 * @param dp Number of decimal places to display.
 *
 * @return Formatted string.
 */
function humanFileSize(bytes: number, si = true, dp = 1) {
    const thresh = si ? 1000 : 1024;

    if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }

    const units = si
        ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    const r = 10 ** dp;

    do {
        bytes /= thresh;
        ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


    return bytes.toFixed(dp) + ' ' + units[u];
}


export {UploadArea, type UploadFile};
