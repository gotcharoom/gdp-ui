import { useEffect, useContext, useState, useCallback } from 'react';
import { useBlocker, useNavigate } from 'react-router-dom';
import { GlobalFormContext } from '@/common/contexts/GlobalFormContext.ts';

// 강제 로그아웃 플래그 (전역 변수로 설정)
let forceLogout = false;

const useNavigationGuard = () => {
    /* Hooks */
    const { dirtyForms } = useContext(GlobalFormContext);
    const navigate = useNavigate();
    const [isNavigationAllowed, setIsNavigationAllowed] = useState(false);

    const hasDirtyForms = Object.values(dirtyForms).some(Boolean);

    /* Events */
    const guardedNavigate = useCallback(
        (to: string) => {
            if (isNavigationAllowed || !hasDirtyForms || forceLogout) {
                setIsNavigationAllowed(true);
                navigate(to);
                setIsNavigationAllowed(false);
                return;
            }

            const confirmLeave = window.confirm('변경 사항이 저장되지 않았습니다. 정말 떠나시겠습니까?');
            if (confirmLeave) {
                setIsNavigationAllowed(true);
                navigate(to);
                setIsNavigationAllowed(false);
            }
        },
        [navigate, hasDirtyForms, isNavigationAllowed],
    );

    // ✅ 뒤로가기, 새로고침 감지
    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (hasDirtyForms && !isNavigationAllowed && !forceLogout) {
                event.preventDefault();
                event.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [hasDirtyForms, isNavigationAllowed]);

    // ✅ 라우트 이동 감지
    useBlocker(({ currentLocation, nextLocation }) => {
        if (isNavigationAllowed || forceLogout) return false;
        if (hasDirtyForms && currentLocation.pathname !== nextLocation.pathname) {
            return !window.confirm('변경 사항이 저장되지 않았습니다. 정말 떠나시겠습니까?');
        }
        return false;
    });

    return { navigate: guardedNavigate };
};

export default useNavigationGuard;

export const allowForceLogout = () => {
    forceLogout = true; // 네비게이션 가드가 차단하지 않도록 허용
};

export const preventForceLogout = () => {
    forceLogout = false;
};
