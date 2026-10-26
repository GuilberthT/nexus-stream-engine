import { useLiveFeed } from "../hooks/useLiveFeed";
import type {ConnectionStatus, FeedSeverity } from "../types/feed";

const SEVERITY_STYLES: Record<FeedSeverity, string> = {
  info: 'border-cyan-400/20 bg-cyan-400/10 text-cyan-400',
  success: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-400',
  warning: 'border-amber-400/20 bg-amber-400/10 text-amber-400',
  error: 'border-red-400/20 bg-red-400/10 text-red-400',
}

const STATUS_CONFIG: Record<ConnectionStatus, { label: string; dotClass: string }> = {
  connected: { label: 'Conectado', dotClass: 'animate-pulse bg-emerald-400' },
  connecting: { label: 'Reconectando…', dotClass: 'animate-pulse bg-amber-400' },
  offline: { label: 'Sem conexão', dotClass: 'bg-red-400' },
  paused: { label: 'Pausado', dotClass: 'bg-slate-600' },
}

export function LiveFeedPanel() {
    const { events, status, isPaused, pause, resume  } = useLiveFeed()
    const statusConfig = STATUS_CONFIG[status]

    return (
        <section className="rounded-2xl border border-slate-800 bg-slate-950 p-4 sm:p-6">
            <header className="mb-4 flex items-center justify-between gap-4">
                <div>
                <h2 className= "text-lg font-semibold text-slate-100">Feed ao vivo</h2>
                <p className="flex items-center gap-2 text-xs text-slate-500">
  <span className={`h-2 w-2 rounded-full ${statusConfig.dotClass}`} />
  {statusConfig.label} · {events.length} eventos
</p>
                </div>
                <button onClick={isPaused ? resume : pause}
                    className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-violet-400 transition hover:border-violet-400/50"
                >
                    {isPaused ? 'Retomar' : 'Pausar'}
                </button>
            </header>
            {status === 'offline' && (
                <p className="mb-4 rounded-lg border border-red-900/50 bg-red-950/30 px-3 py-2 text-sm text-red-400">
                    Você está sem internet. O feed volta automaticamente quando a conexão retornar.
                </p>
            )}
            {events.length === 0 ? (
                <p className="py-8 text-center text-sm text-slate-500">Aguardando o primeiro evento</p>
            ) : (
                <ul className="max-h-96 space-y-2 overflow-y-auto pr-1">
                    {events.map((event) => (
                        <li
                            key={event.id}
                            className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm"
                        >
                            <span
                                className={`shrink-0 rounded-md border px-2 py-0.5 text-xs font-medium uppercase ${SEVERITY_STYLES[event.severity]}`}
                            >
                                 {event.severity}   
                            </span>
                            <span className="min-w-0 flex-1 truncate text-slate-300">{event.message}</span>
                            <time
                                dateTime={new Date(event.timestamp).toISOString()}
                                className="shrink-0 font-mono text-xs tabular-nums text-slate-500"
                            >
                                {new Date(event.timestamp).toLocaleTimeString()}
                            </time>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}