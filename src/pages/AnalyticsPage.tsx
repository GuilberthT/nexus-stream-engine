import { getRouteApi } from '@tanstack/react-router'

const route = getRouteApi('/analytics/$streamId')

export function AnalyticsPage() {
  const { streamId } = route.useParams()

  return (
    <section className="space-y-6">
      <header>
        <p className="text-xs uppercase tracking-wider text-slate-500">
          Analytics
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-slate-100">
          Stream <span className="font-mono text-cyan-400">{streamId}</span>
        </h1>
        <p className="text-sm text-slate-400">
          Histórico de métricas e eventos deste stream
        </p>
      </header>

      <div className="rounded-2xl border border-dashed border-slate-800 p-8 text-center text-sm text-slate-500">
        O histórico será carregado via{' '}
        <code className="font-mono text-violet-400">fetchFeedHistory</code>{' '}
        quando o back-end estiver disponível.
      </div>
    </section>
  )
}
