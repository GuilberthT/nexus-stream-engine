export const FEED_SEVERITIES = ['info', 'success', 'warning', 'error'] as const
export type FeedSeverity = (typeof FEED_SEVERITIES)[number]

export interface FeedEvent {
  id: string
  timestamp: number
  message: string
  severity: FeedSeverity
}

export type ConnectionStatus = 'connecting' | 'connected' | 'offline' | 'paused'
