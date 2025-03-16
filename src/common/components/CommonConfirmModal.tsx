import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { CSSProperties } from 'react';
import '@styles/common/components/CommonConfirmModal.scss';

interface CommonConfirmModalProps {
    width: CSSProperties['width'];
    height: CSSProperties['height'];
    maxWidth?: CSSProperties['maxWidth'];
    minWidth?: CSSProperties['minWidth'];
    maxHeight?: CSSProperties['maxHeight'];
    minHeight?: CSSProperties['minHeight'];

    title: string;
    contents: string;
    open: boolean;
    handleClose: (confirmed: boolean) => void;
}

const CommonConfirmModal = (props: CommonConfirmModalProps) => {
    return (
        <Dialog
            open={props.open}
            onClose={() => props.handleClose(false)}
            slotProps={{
                paper: {
                    sx: {
                        width: props.width,
                        height: props.height,
                        maxWidth: props.maxWidth,
                        minWidth: props.minWidth,
                        maxHeight: props.maxHeight,
                        minHeight: props.minHeight,
                    },
                },
            }}
        >
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText id='alert-dialog-description'>{props.contents}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.handleClose(true)} autoFocus>
                    확인
                </Button>
                <Button onClick={() => props.handleClose(false)}>취소</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CommonConfirmModal;
