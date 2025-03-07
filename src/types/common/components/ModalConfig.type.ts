import { CSSProperties, ReactNode } from 'react';

export default interface ModalConfig {
    width: CSSProperties['weight'];
    height: CSSProperties['height'];
    maxWidth?: CSSProperties['maxWidth'];
    minWidth?: CSSProperties['minWidth'];
    maxHeight?: CSSProperties['maxHeight'];
    minHeight?: CSSProperties['minHeight'];

    title: string;
    open: boolean;
    children: ReactNode;
    buttons?: ReactNode;
}
