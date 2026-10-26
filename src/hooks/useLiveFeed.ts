import { useCallback ,useEffect, useState} from "react";
import type { FeedEvent, FeedSeverity } from "../types/feed";

const MOCK_MESSAGES: ReadonlyArray<{ message: string; severity: FeedSeverity}> = [
    {message: 'Fluxo de dados sincronizado', severity: 'info'},
    {message: 'Transação liquidada com sucesso', severity: 'success'},
    {message: 'Novo bloco de dados processado', severity: 'info'},
    {message: 'Latência acima do limite', severity: 'warning'},
    {message: 'Falha na validação do pacote', severity: 'error'},
]

export interface UseLiveFeedOptions {
    intervalMs?: number
    maxEvents?: number
}

function createMockEvent(): FeedEvent {
    const sample = MOCK_MESSAGES[Math.floor(Math.random() * MOCK_MESSAGES.length)]
    return {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        ...sample,
    }
}

export interface UseLiveFeedResult {
    events: FeedEvent[]
    isPaused: boolean
    pause: () => void
    resume: () => void
}

export function useLiveFeed({
    intervalMs = 2000,
    maxEvents = 50,
}: UseLiveFeedOptions = {}): UseLiveFeedResult {
    const [events, setEvents] = useState<FeedEvent[]>([])
    const [isPaused, setIsPaused] = useState(false)

    useEffect(() => {
        if (isPaused) return
        
        const intervalId = setInterval(() => {
            setEvents((prev) => [createMockEvent(), ...prev].slice(0, maxEvents))
        }, intervalMs)

        return () => clearInterval(intervalId)
    }, [isPaused, intervalMs, maxEvents])

    const pause = useCallback(() => setIsPaused(true), [])
    const resume = useCallback(() => setIsPaused(false), [])

    return { events, isPaused, pause, resume }
}