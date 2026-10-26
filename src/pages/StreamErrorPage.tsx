import type { ErrorComponentProps } from '@tanstack/react-router'
import { StatePanel } from '../components/StatePanel'

export function StreamErrorPage({ error }: ErrorComponentProps) {
  return (
    <StatePanel
      code="ERRO"
      title="Stream inválido"
      description={error instanceof Error ? error.message : 'Erro desconhecido'}
    />
  )
}
