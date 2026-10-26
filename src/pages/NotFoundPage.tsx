import { StatePanel } from "../components/StatePanel"

export function NotFoundPage() {
    return (
        <StatePanel
            code='404'
            title='Página não encontrada'
            description='O endereço acesssao não existe na engine.'
        />
    )
}