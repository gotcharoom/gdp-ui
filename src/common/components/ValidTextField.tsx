import { TextField } from '@mui/material';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { FieldErrors } from 'react-hook-form';
import { TextFieldVariants } from '@mui/material/TextField/TextField';
import { ReactNode } from 'react';
import * as React from 'react';

interface ValidTextFieldProps<T extends FieldValues, V extends TextFieldVariants> {
    // Yup Props
    control: Control<T>;
    field: Path<T>;
    errors: FieldErrors<T>;

    // TextField Props;
    className?: string;
    label?: string;
    variant?: V;
    type?: React.InputHTMLAttributes<unknown>['type'];
}
const ValidTextField = <T extends FieldValues = FieldValues, V extends TextFieldVariants>(props: ValidTextFieldProps<T, V>) => {
    return (
        <Controller
            name={props.field}
            control={props.control}
            render={({ field: { onChange, value } }) => (
                <TextField
                    className={props?.className}
                    label={props?.label}
                    variant={props?.variant}
                    value={value}
                    type={props.type}
                    onChange={onChange}
                    error={!!props.errors[props.field]}
                    helperText={props.errors[props.field]?.message as ReactNode}
                />
            )}
        />
    );
};

export default ValidTextField;
