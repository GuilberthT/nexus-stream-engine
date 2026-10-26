import { useLiveFeed } from "../hooks/useLiveFeed"
import { EngineMetrics } from "../components/EngineMetrics"


export function DashboardPage() {
    const {events, isPaused, pause, resume } = useLiveFeed()

    return (
        <section className="mx-auto max-w-6xl space-y-6 p-6">
            <h1>Dashboard</h1>
            <button onClick={isPaused ? resume : pause}>
                {isPaused ? 'Retomar feed' : 'Pausar feed'}
            </button>

            <ul>
                {events.map((event) => (
                    <li key={event.id}>
                        [{event.severity}] {new Date(event.timestamp).toLocaleDateString()} - {event.message}
                    </li>
                ))}
            </ul>
            <EngineMetrics />
        </section>
    )
}