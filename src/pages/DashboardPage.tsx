import { useLiveFeed } from "../hooks/useLiveFeed"

export function DashboardPage() {
    const {events, isPaused, pause, resume } = useLiveFeed()

    return (
        <section>
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
        </section>
    )
}