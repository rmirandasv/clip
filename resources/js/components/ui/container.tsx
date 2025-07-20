export function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">{children}</div>
    );
}