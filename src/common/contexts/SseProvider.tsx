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

    useEffect(() => {
        const url: string = import.meta.env.VITE_API_URL + '/api/v1/notification/connect';

        if (!isAuthenticated) {
            return;
        }

        const eventSource = new EventSource(url, {
            withCredentials: true,
        });

        eventSource.onmessage = (event) => {
            try {
                const parsed: Notification = JSON.parse(event.data);
                setEvents((prev) => {
                    const newEvents = [parsed];
                    const existingIds = new Set(prev.map((e) => e.id));

                    const filtered = newEvents.filter((e) => !existingIds.has(e.id));
                    const merged = [...prev, ...filtered];

                    return merged.sort((a, b) => {
                        const dateA = new Date(a.createdAt).getTime();
                        const dateB = new Date(b.createdAt).getTime();

                        if (dateA === dateB) {
                            return b.id - a.id; // id가 큰 게 위로
                        }

                        return dateB - dateA; // 최신 createdAt이 위로
                    });
                });
            } catch (err) {
                console.error('Failed to parse SSE event:', err);
            }
        };

        eventSource.onerror = (err) => {
            console.error('SSE connection error:', err);
        };

        const handleBeforeUnload = () => {
            console.log('closing SSE before reload');
            eventSource.close();
            setEvents([]);
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            eventSource.close();
            setEvents([]);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isAuthenticated]);

    const removeEvent = (id: number) => {
        setEvents((prev) => prev.filter((event) => event.id !== id));
    };

    return <SseContext.Provider value={{ events, removeEvent } as SseContextType}>{children}</SseContext.Provider>;
};
