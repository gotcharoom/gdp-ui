import { GlobalFormContext } from '@/common/contexts/GlobalFormContext.ts';
import { ReactNode, useState } from 'react';
import PageMode from '@/common/constants/PageMode.ts';

export const GlobalFormProvider = ({ children }: { children: ReactNode }) => {
    const [dirtyForms, setDirtyForms] = useState<Record<string, boolean>>({});
    const [pageMode, setPageMode] = useState<PageMode>(PageMode.READ);
    const [isActiveNavigationGuard, setIsActiveNavigationGuard] = useState(false);

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

    return (
        <GlobalFormContext.Provider
            value={{
                dirtyForms,
                isDirty,
                setDirty,
                deleteDirty,
                pageMode,
                setPageMode,
                isActiveNavigationGuard,
                setIsActiveNavigationGuard,
            }}
        >
            {children}
        </GlobalFormContext.Provider>
    );
};
