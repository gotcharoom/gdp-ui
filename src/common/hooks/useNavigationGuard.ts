import { useEffect, useContext, useState, useCallback, useMemo } from 'react';
import { useBlocker, useNavigate } from 'react-router-dom';
import { GlobalFormContext } from '@/common/contexts/GlobalFormContext.ts';

const useNavigationGuard = () => {
    /* Hooks */
    const { dirtyForms } = useContext(GlobalFormContext);
    const navigate = useNavigate();
    const [isNavigationAllowed, setIsNavigationAllowed] = useState(false);

    const hasDirtyForms = Object.values(dirtyForms).some(Boolean);

    /* Privates */
    const confirmMessage = useMemo(() => {
        return '변경 사항이 저장되지 않았습니다. 정말 떠나시겠습니까?';
    }, []);

    /* Events */
    // 이동을 허용하는 `navigate` 함수
    const guardedNavigate = useCallback(
        (to: string) => {
            if (isNavigationAllowed || !hasDirtyForms) {
                setIsNavigationAllowed(true);
                navigate(to);
                setIsNavigationAllowed(false);
                return;
            }

            const confirmLeave = window.confirm(confirmMessage);
            if (confirmLeave) {
                setIsNavigationAllowed(true);
                navigate(to);
                setIsNavigationAllowed(false);
            }
        },

        [isNavigationAllowed, hasDirtyForms, confirmMessage, navigate],
    );

    /* Lifecycle */
    // 뒤로가기, 새로고침 감지
    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (hasDirtyForms && !isNavigationAllowed) {
                event.preventDefault();
                event.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [hasDirtyForms, isNavigationAllowed]);

    // 라우트 이동 감지
    useBlocker(({ currentLocation, nextLocation }) => {
        if (isNavigationAllowed) return false;
        if (hasDirtyForms && currentLocation.pathname !== nextLocation.pathname) {
            return !window.confirm(confirmMessage);
        }
        return false;
    });

    return { navigate: guardedNavigate };
};

export default useNavigationGuard;
