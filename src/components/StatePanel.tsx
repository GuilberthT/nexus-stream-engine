import { Link } from '@tanstack/react-router'

interface StatePanelProps {
    code: string
    title: string
    description: string
}

export function StatePanel({code, title, description}: StatePanelProps) {
    return (
    <section className="mx-auto mt-12 max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
      <p className="font-mono text-sm text-violet-400">{code}</p>
      <h1 className="mt-2 text-xl font-semibold text-slate-100">{title}</h1>
      <p className="mt-2 text-sm text-slate-400">{description}</p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-lg border border-slate-800 bg-slate-950 px-4 py-2 text-sm text-cyan-400 transition hover:border-cyan-400/50"
      >
        Voltar ao Dashboard
      </Link>
    </section>
  )
}