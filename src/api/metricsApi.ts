import type { EngineMetricsSnapshot } from '../types/metrics'

const SERVERS = [
  { serverId: 'node-sa-01', region: 'São Paulo' },
  { serverId: 'node-us-01', region: 'Virgínia' },
  { serverId: 'node-eu-01', region: 'Frankfurt' },
] as const

function randomBetween(min: number, max: number): number {
  return Math.floor((Math.random() * (max - min) + min) * 10) / 10
}

export async function fetchEngineMetrics(): Promise<EngineMetricsSnapshot> {
  await new Promise((resolve) => setTimeout(resolve, 600))

  if (Math.random() < 0.1) {
    throw new Error('Timeout ao coletar métricas dos servidores.')
  }

  return {
    collectedAt: Date.now(),
    servers: SERVERS.map((server) => ({
      ...server,
      latencyMs: randomBetween(8, 120),
      cpuUsage: randomBetween(15, 95),
      throughputMBps: randomBetween(50, 900),
    })),
  }
}
