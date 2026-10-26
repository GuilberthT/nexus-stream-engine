export type FeedSeverity = 'info'|'success' | 'warning' | 'error';

export interface FeedEvent {
    id: string,
    timestamp: number,   
    message: string,
    severity: FeedSeverity,  
}
