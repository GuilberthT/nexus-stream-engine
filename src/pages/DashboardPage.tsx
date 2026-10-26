import { EngineMetrics } from '../components/EngineMetrics'
import { LiveFeedPanel } from '../components/LiveFeedPanel'
import { getRouteApi } from '@tanstack/react-router'

const route = getRouteApi('/')

export function DashboardPage() {
  const { severity } = route.useSearch()

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-slate-100">
          Dashboard
        </h1>
        <p className="text-sm text-slate-400">
          Telemetria em tempo real da engine
        </p>
      </header>

      <EngineMetrics />
      <LiveFeedPanel severity={severity} />
    </section>
  )
}
