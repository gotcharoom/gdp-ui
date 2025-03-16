import { useCallback, useContext } from 'react';
import { GlobalFormContext } from '@/common/contexts/GlobalFormContext.ts';
import PageMode from '@/common/constants/PageMode.ts';

const usePageMode = () => {
    const { pageMode, setPageMode, isActiveNavigationGuard } = useContext(GlobalFormContext);

    const setPageModeWithGuard = useCallback(
        (mode: PageMode) => {
            if (!isActiveNavigationGuard || pageMode === mode) {
                setPageMode(mode);
                return true;
            }

            if (pageMode !== PageMode.READ && mode === PageMode.READ) {
                if (!window.confirm('변경 사항이 저장되지 않았습니다. 정말 떠나시겠습니까?')) return;
            }

            setPageMode(mode);
            return true;
        },
        [isActiveNavigationGuard, pageMode, setPageMode],
    );

    return { pageMode, setPageMode: setPageModeWithGuard };
};

export default usePageMode;
