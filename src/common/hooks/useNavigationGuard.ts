import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useBlocker, useNavigate } from 'react-router-dom';
import { GlobalFormContext } from '@/common/contexts/GlobalFormContext.ts';
import { useModal } from '@/common/hooks/useModal.ts';

// 강제 로그아웃 플래그 (전역 변수)
let forceLogout = false;

const confirmModalSize = {
    width: '400px',
    height: '200px',
};

const useNavigationGuard = () => {
    /* Hooks */
    const { setIsActiveNavigationGuard, dirtyForms, isNavigationAllowed, setIsNavigationAllowed } = useContext(GlobalFormContext);
    const navigate = useNavigate();
    const { openConfirmModal } = useModal();
    const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);
    const isModalOpen = useRef(false); // 모달 중복 실행 방지

    const hasDirtyForms = Object.values(dirtyForms).some(Boolean);

    /* Privates */
    // 직접 이동을 처리하는 함수
    const guardedNavigate = useCallback(
        async (to: string) => {
            if (isNavigationAllowed || !hasDirtyForms || forceLogout) {
                setIsNavigationAllowed(true);
                navigate(to);
                return;
            }

            setIsNavigationAllowed(true);
            navigate(to);
        },
        [isNavigationAllowed, hasDirtyForms, setIsNavigationAllowed, navigate],
    );

    /* Lifecycles */
    // 네비게이션 가드 활성화
    useEffect(() => {
        setIsActiveNavigationGuard(true);
        return () => {
            setIsActiveNavigationGuard(false);
        };
    }, [setIsActiveNavigationGuard]);

    // 뒤로가기 감지 및 모달 실행
    useEffect(() => {
        const handlePopState = async () => {
            if (hasDirtyForms && !isNavigationAllowed && !forceLogout && !isModalOpen.current) {
                isModalOpen.current = true;
                window.history.pushState(null, '', window.location.pathname);

                console.log('뒤로 가기 감지됨, 모달 실행');

                const confirmLeave = await openConfirmModal({
                    width: confirmModalSize.width,
                    height: confirmModalSize.height,
                    title: '변경 사항이 저장되지 않았습니다.',
                    contents: '정말 떠나시겠습니까?',
                });

                console.log('모달 응답:', confirmLeave);

                if (confirmLeave) {
                    setIsNavigationAllowed(true);
                    setTimeout(() => {
                        window.history.back();
                    }, 100);
                }

                isModalOpen.current = false;
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [hasDirtyForms, isNavigationAllowed, openConfirmModal, setIsNavigationAllowed]);

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (hasDirtyForms && !isNavigationAllowed && !forceLogout) {
                console.log('새로고침 감지됨, 기본 confirm 실행');
                event.preventDefault();
                event.returnValue = ''; // 브라우저 기본 confirm 실행
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [hasDirtyForms, isNavigationAllowed]);

    useEffect(() => {
        if (pendingNavigation && !isModalOpen.current) {
            (async () => {
                isModalOpen.current = true;
                console.log('페이지 이동 모달 실행', pendingNavigation);

                const confirmLeave = await openConfirmModal({
                    width: confirmModalSize.width,
                    height: confirmModalSize.height,
                    title: '변경 사항이 저장되지 않았습니다.',
                    contents: '정말 떠나시겠습니까?',
                });

                console.log('이동 응답:', confirmLeave);

                if (confirmLeave) {
                    setIsNavigationAllowed(true);
                    setTimeout(() => {
                        navigate(pendingNavigation);
                    }, 100);
                }

                setPendingNavigation(null);
                isModalOpen.current = false;
            })();
        }
    }, [pendingNavigation, navigate, openConfirmModal, setIsNavigationAllowed]);

    useBlocker(({ currentLocation, nextLocation }) => {
        if (isNavigationAllowed || forceLogout) {
            console.log('네비게이션 허용됨:', nextLocation.pathname);
            return false;
        }

        if (hasDirtyForms && currentLocation.pathname !== nextLocation.pathname) {
            console.log('이동 차단 후 모달 실행:', nextLocation.pathname);
            setPendingNavigation(nextLocation.pathname);
            return true;
        }

        return false;
    });

    return { sudoNavigate: guardedNavigate };
};

export default useNavigationGuard;

export const allowForceLogout = () => {
    forceLogout = true;
};

export const preventForceLogout = () => {
    forceLogout = false;
};
