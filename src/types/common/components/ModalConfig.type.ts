import { CSSProperties, ReactNode } from 'react';
import FormName from '@/common/constants/FormName.ts';

export default interface ModalConfig {
    width: CSSProperties['width'];
    height: CSSProperties['height'];
    maxWidth?: CSSProperties['maxWidth'];
    maxHeight?: CSSProperties['maxHeight'];

    title: string;
    open: boolean;
    children: ReactNode;
    buttons?: ReactNode;
    formName?: FormName;
}
