import { Link } from "@tanstack/react-router";

export function NotFoundPage() {
    return (
        <>
            <h1>Página não encontrada</h1>
            <Link to="/">Voltar ao Dashboard</Link>
        </>
    )
}