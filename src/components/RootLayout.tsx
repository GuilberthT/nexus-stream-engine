import { Outlet } from "@tanstack/react-router";
import { Navbar } from "./Navbar";

export function RootLayout() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}