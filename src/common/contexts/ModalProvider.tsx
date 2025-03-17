import { ReactNode, useState } from 'react';
import { CommonConfirmModalProps, CommonModalProps, ModalContext } from '@/common/contexts/ModalContext.ts';
import CommonModal from '@/common/components/CommonModal.tsx';
import CommonConfirmModal from '@/common/components/CommonConfirmModal.tsx';

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [modal, setModal] = useState<CommonModalProps | null>(null);
    const [confirmModal, setConfirmModal] = useState<CommonConfirmModalProps | null>(null);
    const [confirmResolve, setConfirmResolve] = useState<((value: boolean) => void) | null>(null);

    // ✅ 일반 모달 열기
    const openModal = (modalProps: Omit<CommonModalProps, 'open'>) => {
        setModal({ open: true, ...modalProps });
    };

    // ✅ 일반 모달 닫기
    const closeModal = () => {
        modal?.handleClose?.(); // ✅ handleClose() 실행 후 상태 초기화
        setModal(null);
    };

    // ✅ 확인 모달 열기 (Promise 기반)
    const openConfirmModal = (modalProps: Omit<CommonConfirmModalProps, 'open'>) => {
        return new Promise<boolean>((resolve) => {
            setConfirmResolve(() => resolve);
            setConfirmModal({ open: true, ...modalProps });
        });
    };

    // ✅ 확인 모달 닫기 (사용자 응답 처리)
    const closeConfirmModal = (confirmed: boolean) => {
        confirmResolve?.(confirmed);
        setConfirmModal(null);

        if (confirmed) {
            confirmModal?.handleClose?.();
        }
    };

    return (
        <ModalContext.Provider value={{ openModal, closeModal, openConfirmModal }}>
            {children}

            {/* ✅ 일반 모달 렌더링 */}
            {modal && <CommonModal {...modal} handleClose={closeModal} />}

            {/* ✅ 확인 모달 렌더링 */}
            {confirmModal && <CommonConfirmModal {...confirmModal} handleClose={closeConfirmModal} />}
        </ModalContext.Provider>
    );
};
