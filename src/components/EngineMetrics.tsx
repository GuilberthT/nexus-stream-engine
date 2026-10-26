import { useQuery } from "@tanstack/react-query";
import { fetchEngineMetrics } from "../api/metricsApi";
import type { ServerMetrics } from '../types/metrics'

function ServerCard({ server }: { server: ServerMetrics }) {
  return (
    <article className="rounded-xl border border-slate-800 bg-slate-900 p-5">
      <header className="mb-4 flex items-center justify-between">
        <h3 className="font-mono text-sm text-slate-300">{server.serverId}</h3>
        <span className="text-xs text-slate-500">{server.region}</span>
      </header>

      <dl className="grid grid-cols-2 gap-4">
        <div>
          <dt className="text-xs uppercase tracking-wider text-slate-500">Latência</dt>
          <dd className="text-2xl font-semibold tabular-nums text-cyan-400">
            {server.latencyMs}
            <span className="ml-1 text-sm text-slate-500">ms</span>
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wider text-slate-500">Throughput</dt>
          <dd className="text-2xl font-semibold tabular-nums text-violet-400">
            {server.throughputMBps}
            <span className="ml-1 text-sm text-slate-500">MB/s</span>
          </dd>
        </div>
      </dl>

      <div className="mt-4">
        <div className="mb-1 flex justify-between text-xs">
          <span className="uppercase tracking-wider text-slate-500">CPU</span>
          <span className="tabular-nums text-slate-300">{server.cpuUsage}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-400 transition-all duration-500"
            style={{ width: `${server.cpuUsage}%` }}
          />
        </div>
      </div>
    </article>
  )
}
export function EngineMetrics() {
  const { data, isPending, isError, error, isFetching, refetch } = useQuery({
    queryKey: ['engine-metrics'],
    queryFn: fetchEngineMetrics,
    staleTime: 5000,
    refetchOnWindowFocus: true,
  })

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-100">Métricas da Engine</h2>
          <p className="text-xs text-slate-500">
            {data
              ? `Coletado às ${new Date(data.collectedAt).toLocaleTimeString()}`
              : 'Aguardando primeira coleta'}
          </p>
        </div>

        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-sm text-violet-400 transition hover:border-violet-400/50 disabled:opacity-50"
        >
          {isFetching ? 'Atualizando…' : 'Atualizar'}
        </button>
      </header>

      {isPending && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-40 animate-pulse rounded-xl border border-slate-800 bg-slate-900" />
          ))}
        </div>
      )}

      {isError && (
        <p className="rounded-xl border border-red-900/50 bg-red-950/30 p-4 text-sm text-red-400">
          {error instanceof Error ? error.message : 'Erro desconhecido'}
        </p>
      )}

      {data && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.servers.map((server) => (
            <ServerCard key={server.serverId} server={server} />
          ))}
        </div>
      )}
    </section>
  )
}