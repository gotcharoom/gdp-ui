import { ReactNode, useEffect, useState } from 'react';
import { Notification, SseContext, SseContextType } from '@/common/contexts/SseContext.ts';
import { useSelector } from 'react-redux';
import { RootState } from '@stores/store.ts';

interface SseProviderProps {
    children: ReactNode;
}

export const SseProvider = ({ children }: SseProviderProps) => {
    const [events, setEvents] = useState<Notification[]>([]);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    const url: string = import.meta.env.VITE_API_URL + '/api/v1/notification/connect';

    useEffect(() => {
        if (!isAuthenticated) {
            return;
        }

        const eventSource = new EventSource(url, {
            withCredentials: true,
        });

        eventSource.onmessage = (event) => {
            try {
                const parsed: Notification = JSON.parse(event.data);
                setEvents((prev) => [...prev, parsed]);
            } catch (err) {
                console.error('Failed to parse SSE event:', err);
            }
        };

        eventSource.onerror = (err) => {
            console.error('SSE connection error:', err);
        };

        return () => {
            eventSource.close();
            setEvents([]);
        };
    }, [isAuthenticated, url]);

    const removeEvent = (id: number) => {
        setEvents((prev) => prev.filter((event) => event.id !== id));
    };

    return <SseContext.Provider value={{ events, removeEvent } as SseContextType}>{children}</SseContext.Provider>;
};
