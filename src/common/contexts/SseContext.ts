import { createContext } from 'react';

export enum NotificationType {
    SYSTEM = 'SYSTEM',
    COMMENT = 'COMMENT',
    QUESTION = 'QUESTION',
}
export interface Notification {
    id: number;
    content: string;
    url: string;
    toName: string;
    isRead: boolean;
    notificationType: NotificationType;
    createdAt: string;
}

export interface SseContextType {
    events: Notification[];
    removeEvent: (id: number) => void;
}

export const SseContext = createContext<SseContextType>({ events: [], removeEvent: () => {} });
