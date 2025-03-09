import { IconButton, Modal, Paper } from '@mui/material';
import { CSSProperties, ReactNode, useContext } from 'react';
import '@styles/common/components/CommonModal.scss';
import CloseIcon from '@mui/icons-material/Close';
import { GlobalFormContext } from '@/common/contexts/GlobalFormContext.ts';
import FormName from '@/common/constants/FormName.ts';

interface CommonModalProps {
    width: CSSProperties['width'];
    height: CSSProperties['height'];
    maxWidth?: CSSProperties['maxWidth'];
    minWidth?: CSSProperties['minWidth'];
    maxHeight?: CSSProperties['maxHeight'];
    minHeight?: CSSProperties['minHeight'];

    title: string;
    open: boolean;
    handleClose: () => void;
    children: ReactNode;
    buttons?: ReactNode;
    formName?: FormName;
}

const CommonModal = (props: CommonModalProps) => {
    const { isDirty } = useContext(GlobalFormContext); // ✅ 글로벌 dirty 상태 확인

    const handleBeforeClose = () => {
        console.log(props.formName);
        if (props.formName && isDirty(props.formName)) {
            const confirmClose = window.confirm('변경 사항이 저장되지 않았습니다. 정말 닫으시겠습니까?');
            if (!confirmClose) {
                return;
            }
        }
        props.handleClose();
    };

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
                    <div className={'common-modal__page__contents'}>{props.children}</div>
                    {props?.buttons && <div className={'common-modal__page__buttons'}>{props.buttons}</div>}
                </>
            </Paper>
        </Modal>
    );
};

export default CommonModal;
