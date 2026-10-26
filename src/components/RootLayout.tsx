import { Outlet } from "@tanstack/react-router";
import { Navbar } from "./Navbar";

export function RootLayout() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <Navbar />
            <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
                <Outlet />
            </main>
        </div>
    )
}