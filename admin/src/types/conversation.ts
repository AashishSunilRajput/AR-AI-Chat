export interface Visitor {
    id: number;
    name: string | null;
    email: string | null;
    phone?: string | null;
}

export interface Chatbot {
    id: number;
    name: string;
}

export interface Conversation {
    id: number;

    status: "ACTIVE" | "CLOSED";

    startedAt: string;

    endedAt: string | null;

    visitor: Visitor;

    chatbot: Chatbot;

    _count: {
        messages: number;
    };
}

export interface ConversationStats {

    total: number;

    active: number;

    closed: number;

    today: number;
}