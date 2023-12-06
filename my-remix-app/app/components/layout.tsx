// app/components/layout.tsx
export function Layout({ children }: { children: React.ReactNode }) {
    return <div className="h-screen w-full">{children}</div>
}