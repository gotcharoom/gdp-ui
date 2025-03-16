import { useCallback, useContext } from 'react';
import { GlobalFormContext } from '@/common/contexts/GlobalFormContext.ts';
import PageMode from '@/common/constants/PageMode.ts';
import { useModal } from '@/common/hooks/useModal.ts';

const usePageMode = () => {
    const { pageMode, setPageMode, dirtyForms, isActiveNavigationGuard, isNavigationAllowed } = useContext(GlobalFormContext);
    const { openConfirmModal } = useModal();

    const hasDirtyForms = Object.values(dirtyForms).some(Boolean);

    const setPageModeWithGuard = useCallback(
        async (mode: PageMode) => {
            if (!isActiveNavigationGuard || isNavigationAllowed || pageMode === mode) {
                setPageMode(mode);
                return true;
            }

            if (pageMode !== PageMode.READ && mode === PageMode.READ && hasDirtyForms) {
                const confirmLeave = await openConfirmModal({
                    width: '400px',
                    height: '200px',
                    title: '변경 사항이 저장되지 않았습니다.',
                    contents: '정말 떠나시겠습니까?',
                });
                if (!confirmLeave) return;
            }

            setPageMode(mode);
            return true;
        },
        [hasDirtyForms, isActiveNavigationGuard, openConfirmModal, pageMode, setPageMode],
    );

    return { pageMode, setPageMode: setPageModeWithGuard };
};

export default usePageMode;
