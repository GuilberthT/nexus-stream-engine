import { getRouteApi } from "@tanstack/react-router";

const route = getRouteApi('/analytics/$streamId')

export function AnalyticsPage() {
    const { streamId } = route.useParams()
    return <h1>Stream: {streamId}</h1>
}