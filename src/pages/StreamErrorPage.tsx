import { Link, type ErrorComponentProps } from "@tanstack/react-router";

export function StreamErrorPage({ error }: ErrorComponentProps) {
    return (
        <section>
            <h1>Stream inválido</h1>
            <p>{error instanceof Error ? error.message : 'Erro desconhecido'}</p>
            <Link to="/">Voltar ao Dashboard</Link>
        </section>
    )
}