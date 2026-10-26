import { Outlet } from "@tanstack/react-router";
import { Navbar } from "./Navbar";

export function RootLayout() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <Navbar />
            <Outlet />
        </div>
    )
}