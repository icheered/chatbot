export interface ChatMessage {
    id: string;
    thread_id: string;
    role: string;
    content?: string;
}

export interface Thread {
    thread_id: string;
    thread_name: string;
    tokens: number;
}

export interface Setting {
    key: string;
    value: string;
}