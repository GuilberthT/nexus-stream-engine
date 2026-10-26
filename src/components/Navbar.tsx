import { Link } from "@tanstack/react-router";

export function Navbar() {
    return (
        <nav>
            <Link to="/">Nexus Stream Engine</Link>
            <Link to="/analytics/$streamId" params={{ streamId: 'abc123' }}>
                Analytics
            </Link>
        </nav>
    )
}