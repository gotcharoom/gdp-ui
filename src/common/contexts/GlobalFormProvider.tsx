import { GlobalFormContext } from '@/common/contexts/GlobalFormContext.ts';
import { ReactNode, useState } from 'react';
import PageMode from '@/common/constants/PageMode.ts';

export const GlobalFormProvider = ({ children }: { children: ReactNode }) => {
    // Form에서 변경사항이 있는지 여부
    const [dirtyForms, setDirtyForms] = useState<Record<string, boolean>>({});

    // 현재 PageMode
    const [pageMode, setPageMode] = useState<PageMode | null>(null);

    // 현재 NavigationGuard 사용중인지 여부
    const [isActiveNavigationGuard, setIsActiveNavigationGuard] = useState(false);

    // NavigationGuard 상태에서 이동이 허용되는지 상태
    const [isNavigationAllowed, setIsNavigationAllowed] = useState(false);

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
                isNavigationAllowed,
                setIsNavigationAllowed,
            }}
        >
            {children}
        </GlobalFormContext.Provider>
    );
};
