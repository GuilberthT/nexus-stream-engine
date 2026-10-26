export interface ServerMetrics {
  serverId: string
  region: string
  latencyMs: number
  cpuUsage: number
  throughputMBps: number
}

export interface EngineMetricsSnapshot {
  servers: ServerMetrics[]
  collectedAt: number
}
