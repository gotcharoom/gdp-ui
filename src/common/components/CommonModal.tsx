import { IconButton, Modal, Paper } from '@mui/material';
import { CSSProperties, ReactNode } from 'react';
import '@styles/common/components/CommonModal.scss';
import CloseIcon from '@mui/icons-material/Close';

interface CommonModalProp {
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
}

const CommonModal = (props: CommonModalProp) => {
    return (
        <Modal className={'common-modal'} open={props.open} onClose={props.handleClose}>
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
                        <IconButton size='small' className={'common-modal__page__title__close'} onClick={props.handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <div className={'common-modal__page__contents'}>{props.children}</div>
                    {props?.buttons ?? <div className={'common-modal__page__buttons'}>{props.buttons}</div>}
                </>
            </Paper>
        </Modal>
    );
};

export default CommonModal;
