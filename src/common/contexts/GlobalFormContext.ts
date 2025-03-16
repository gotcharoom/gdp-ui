import { createContext } from 'react';
import PageMode from '@/common/constants/PageMode.ts';

interface GlobalFormContextType {
    dirtyForms: Record<string, boolean>; // 🔥 key-value 형태로 `isDirty` 저장
    setDirty: (id: string, isDirty: boolean) => void;
    isDirty: (id: string) => boolean;
    deleteDirty: (id: string) => void;

    pageMode: PageMode;
    setPageMode: (mode: PageMode) => void;

    isActiveNavigationGuard: boolean;
    setIsActiveNavigationGuard: (isAcrive: boolean) => void;
}

export const GlobalFormContext = createContext<GlobalFormContextType>({
    dirtyForms: {},
    setDirty: () => {},
    isDirty: () => false,
    deleteDirty: () => {},
    pageMode: PageMode.READ,
    setPageMode: () => {},
    isActiveNavigationGuard: false,
    setIsActiveNavigationGuard: () => {},
});
