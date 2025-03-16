import { IconButton, Modal, Paper } from '@mui/material';
import { useCallback, useContext } from 'react';
import '@styles/common/components/CommonModal.scss';
import CloseIcon from '@mui/icons-material/Close';
import { GlobalFormContext } from '@/common/contexts/GlobalFormContext.ts';
import { CommonModalProps } from '@/common/contexts/ModalContext.ts';
import { useModal } from '@/common/hooks/useModal.ts';

const CommonModal = (props: CommonModalProps) => {
    const { isDirty } = useContext(GlobalFormContext); // 글로벌 dirty 상태 확인
    const { openConfirmModal, closeModal } = useModal();

    const handleBeforeClose = useCallback(async () => {
        if (props.formName && isDirty(props.formName)) {
            const confirmClose = await openConfirmModal({
                width: props.width,
                height: props.height,
                title: '변경 사항이 저장되지 않았습니다.',
                contents: '정말 닫으시겠습니까?',
            });

            if (!confirmClose) return;
        }

        closeModal();
    }, [props.formName, props.width, props.height, isDirty, closeModal, openConfirmModal]);

    return (
        <Modal className={'common-modal'} open={props.open} onClose={handleBeforeClose}>
            <Paper
                className={'common-modal__page'}
                elevation={3}
                sx={{
                    width: props.width,
                    height: props.height,
                    maxWidth: props.maxWidth,
                    minWidth: props.minWidth,
                    maxHeight: props.maxHeight,
                    minHeight: props.minHeight,
                }}
            >
                <>
                    <div className={'common-modal__page__title'}>
                        {props.title}
                        <IconButton size='small' className={'common-modal__page__title__close'} onClick={handleBeforeClose}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <div className={'common-modal__page__contents'}>{props.contents}</div>
                    {props?.buttons && <div className={'common-modal__page__buttons'}>{props.buttons}</div>}
                </>
            </Paper>
        </Modal>
    );
};

export default CommonModal;
