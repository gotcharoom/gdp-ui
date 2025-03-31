import { SseContext, SseContextType } from '@/common/contexts/SseContext.ts';
import { useContext } from 'react';

export const useSse = (): SseContextType => {
    const context = useContext(SseContext);
    if (!context) {
        throw new Error('useSse must be used within a SseProvider');
    }
    return context;
};
