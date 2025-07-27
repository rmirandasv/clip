import { cn } from "@/lib/utils";

export function Container({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={cn("bg-secondary flex h-full flex-1 flex-col gap-4 p-4 overflow-x-auto", className)}>{children}</div>
    );
}