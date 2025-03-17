import { createContext } from 'react';
import PageMode from '@/common/constants/PageMode.ts';

interface GlobalFormContextType {
    dirtyForms: Record<string, boolean>; // 🔥 key-value 형태로 `isDirty` 저장
    setDirty: (id: string, isDirty: boolean) => void;
    isDirty: (id: string) => boolean;
    deleteDirty: (id: string) => void;

    pageMode: PageMode | null;
    setPageMode: (mode: PageMode | null) => void;

    isActiveNavigationGuard: boolean;
    setIsActiveNavigationGuard: (isActive: boolean) => void;

    isNavigationAllowed: boolean;
    setIsNavigationAllowed: (isAllowed: boolean) => void;
}

export const GlobalFormContext = createContext<GlobalFormContextType>({
    dirtyForms: {},
    setDirty: () => {},
    isDirty: () => false,
    deleteDirty: () => {},
    pageMode: null,
    setPageMode: () => {},
    isActiveNavigationGuard: false,
    setIsActiveNavigationGuard: () => {},
    isNavigationAllowed: false,
    setIsNavigationAllowed: () => {},
});
