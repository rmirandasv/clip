import { cn } from "@/lib/utils";

export function Container({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={cn("flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto", className)}>{children}</div>
    );
}