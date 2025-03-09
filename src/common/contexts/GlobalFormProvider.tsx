import { GlobalFormContext } from '@/common/contexts/GlobalFormContext.ts';
import { ReactNode, useState } from 'react';

export const GlobalFormProvider = ({ children }: { children: ReactNode }) => {
    const [dirtyForms, setDirtyForms] = useState<Record<string, boolean>>({});

    const setDirty = (id: string, isDirty: boolean) => {
        setDirtyForms((prev) => ({ ...prev, [id]: isDirty }));
    };

    const isDirty = (id: string) => dirtyForms[id] ?? false;

    const deleteDirty = (id: string) => {
        setDirtyForms((prev) => {
            const updatedForms = { ...prev };
            delete updatedForms[id]; // ✅ 해당 key 삭제
            return updatedForms;
        });
    };

    return <GlobalFormContext.Provider value={{ dirtyForms, isDirty, setDirty, deleteDirty }}>{children}</GlobalFormContext.Provider>;
};
