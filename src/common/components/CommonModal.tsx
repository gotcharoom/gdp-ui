import { Box, Modal } from '@mui/material';
import clsx from 'clsx';
import { ReactNode } from 'react';
import '@styles/common/components/CommonModal.scss';

interface CommonModalProp {
    width: string | number;
    height: string | number;
    maxWidth?: string | number;
    minWidth?: string | number;
    maxHeight?: string | number;
    minHeight?: string | number;
    open: boolean;
    handleClose: () => void;
    modalClassNames?: string[];
    boxClassNames?: string[];
    children: ReactNode;
}

const CommonModal = (props: CommonModalProp) => {
    return (
        <Modal
            className={clsx('common-modal', props.modalClassNames ?? [])}
            sx={{
                width: props.width,
                height: props.height,
                maxWidth: props.maxWidth,
                minWidth: props.minWidth,
                maxHeight: props.maxHeight,
                minHeight: props.minHeight,
            }}
            open={props.open}
            onClose={props.handleClose}
        >
            <Box className={clsx('box', props.boxClassNames ?? [])}>{props.children}</Box>
        </Modal>
    );
};

export default CommonModal;
