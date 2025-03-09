import { createContext } from 'react';

interface GlobalFormContextType {
    dirtyForms: Record<string, boolean>; // 🔥 key-value 형태로 `isDirty` 저장
    setDirty: (id: string, isDirty: boolean) => void;
    isDirty: (id: string) => boolean;
    deleteDirty: (id: string) => void;
}

export const GlobalFormContext = createContext<GlobalFormContextType | null>(null);
