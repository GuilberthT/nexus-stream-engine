import { httpClient } from "./httpClient";
import type { FeedEvent } from "../types/feed";

export async function fetchFeedHistory(limit = 50): Promise<FeedEvent[]>{
    const { data } = await httpClient.get<FeedEvent[]>('/events',{
        params: { limit },
    })
    return data
}
