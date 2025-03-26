import { createContext, ReactNode } from 'react';
import { OverridableStringUnion } from '@mui/types';
import { AlertColor, AlertPropsColorOverrides } from '@mui/material/Alert/Alert';
export interface AlertConfigProps {
    severity: OverridableStringUnion<AlertColor, AlertPropsColorOverrides>;
    contents: string;
    icon?: ReactNode;
}

export interface AlertProps {
    openAlert: (config: AlertConfigProps) => void;
}

export const AlertContext = createContext<AlertProps | undefined>(undefined);
