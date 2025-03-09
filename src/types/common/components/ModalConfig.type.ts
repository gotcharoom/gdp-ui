import { CSSProperties, ReactNode } from 'react';
import FormName from '@/common/constants/FormName.ts';

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
    formName?: FormName;
}
