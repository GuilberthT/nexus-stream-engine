import { useCallback, useEffect, useState } from 'react'
import type { ConnectionStatus, FeedEvent, FeedSeverity } from '../types/feed'

const MOCK_MESSAGES: ReadonlyArray<{
  message: string
  severity: FeedSeverity
}> = [
  { message: 'Fluxo de dados sincronizado', severity: 'info' },
  { message: 'Transação liquidada com sucesso', severity: 'success' },
  { message: 'Novo bloco de dados processado', severity: 'info' },
  { message: 'Latência acima do limite', severity: 'warning' },
  { message: 'Falha na validação do pacote', severity: 'error' },
]

const RECONNECT_SUCCESS_CHANCE = 0.6
const MAX_BACKOFF_MS = 8000

function createMockEvent(): FeedEvent {
  const sample = MOCK_MESSAGES[Math.floor(Math.random() * MOCK_MESSAGES.length)]
  return {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    ...sample,
  }
}

export interface UseLiveFeedOptions {
  intervalMs?: number
  maxEvents?: number
  dropChance?: number
}

export interface UseLiveFeedResult {
  events: FeedEvent[]
  status: ConnectionStatus
  isPaused: boolean
  pause: () => void
  resume: () => void
}

export function useLiveFeed({
  intervalMs = 2000,
  maxEvents = 50,
  dropChance = 0.05,
}: UseLiveFeedOptions = {}): UseLiveFeedResult {
  const [events, setEvents] = useState<FeedEvent[]>([])
  const [isPaused, setIsPaused] = useState(false)
  const [isOnline, setIsOnline] = useState(() => navigator.onLine)
  const [connection, setConnection] = useState<'connecting' | 'connected'>(
    'connecting',
  )

  // Detecta a internet real do navegador
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => {
      setIsOnline(false)
      setConnection('connecting')
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Conexão simulada: conecta, recebe eventos, cai e reconecta
  useEffect(() => {
    if (isPaused || !isOnline) return

    let intervalId: ReturnType<typeof setInterval> | undefined
    let timeoutId: ReturnType<typeof setTimeout> | undefined
    let attempt = 0

    const startStream = () => {
      intervalId = setInterval(() => {
        if (Math.random() < dropChance) {
          clearInterval(intervalId)
          setConnection('connecting')
          scheduleConnect()
          return
        }
        setEvents((prev) => [createMockEvent(), ...prev].slice(0, maxEvents))
      }, intervalMs)
    }

    const scheduleConnect = () => {
      const delay = Math.min(1000 * 2 ** attempt, MAX_BACKOFF_MS)
      attempt++

      timeoutId = setTimeout(() => {
        if (Math.random() < RECONNECT_SUCCESS_CHANCE) {
          attempt = 0
          setConnection('connected')
          startStream()
        } else {
          scheduleConnect()
        }
      }, delay)
    }

    scheduleConnect()

    return () => {
      clearInterval(intervalId)
      clearTimeout(timeoutId)
    }
  }, [isPaused, isOnline, intervalMs, maxEvents, dropChance])

  const pause = useCallback(() => {
    setIsPaused(true)
    setConnection('connecting')
  }, [])

  const resume = useCallback(() => setIsPaused(false), [])

  const status: ConnectionStatus = isPaused
    ? 'paused'
    : !isOnline
      ? 'offline'
      : connection

  return { events, status, isPaused, pause, resume }
}
