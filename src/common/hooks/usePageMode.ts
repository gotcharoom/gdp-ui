import { useCallback, useContext } from 'react';
import { GlobalFormContext } from '@/common/contexts/GlobalFormContext.ts';
import PageMode from '@/common/constants/PageMode.ts';
import { useModal } from '@/common/hooks/useModal.ts';

const confirmModalSize = {
    width: '400px',
    height: '200px',
};

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
                    width: confirmModalSize.width,
                    height: confirmModalSize.height,
                    title: '변경 사항이 저장되지 않았습니다.',
                    contents: '정말 떠나시겠습니까?',
                });
                if (!confirmLeave) return;
            }

            setPageMode(mode);
            return true;
        },
        [hasDirtyForms, isActiveNavigationGuard, isNavigationAllowed, openConfirmModal, pageMode, setPageMode],
    );

    const resetPageMode = useCallback(() => {
        setPageMode(PageMode.READ);
    }, [setPageMode]);

    return { pageMode, setPageMode: setPageModeWithGuard, resetPageMode };
};

export default usePageMode;
