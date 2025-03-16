import { createContext, CSSProperties, ReactNode } from 'react';

interface ModalBaseProps {
    // CSS
    width: CSSProperties['width'];
    height: CSSProperties['height'];
    maxWidth?: CSSProperties['maxWidth'];
    minWidth?: CSSProperties['minWidth'];
    maxHeight?: CSSProperties['maxHeight'];
    minHeight?: CSSProperties['minHeight'];

    open: boolean;
    handleClose?: () => void;
    title: string;
}

export interface CommonModalProps extends ModalBaseProps {
    contents: ReactNode;
    buttons?: ReactNode;
    formName?: string;
}

export interface CommonConfirmModalProps extends ModalBaseProps {
    contents: string;
}

interface ModalContextType {
    openModal: (modalProps: Omit<CommonModalProps, 'open'>) => void;
    closeModal: () => void;
    openConfirmModal: (modalProps: Omit<CommonConfirmModalProps, 'open'>) => Promise<boolean>;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);
