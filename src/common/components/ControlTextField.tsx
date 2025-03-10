import { TextField } from '@mui/material';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { FieldErrors } from 'react-hook-form';
import { TextFieldVariants } from '@mui/material/TextField/TextField';
import { ReactNode, useEffect, useMemo } from 'react';
import * as React from 'react';
import clsx from 'clsx';
import '@styles/common/components/ControlTextField.scss';

interface ControlTextFieldProps<T extends FieldValues, V extends TextFieldVariants> {
    // Yup Props
    control: Control<T>;
    field: Path<T>;
    errors: FieldErrors<T>;

    // TextField Props;
    additionalClassnames?: string[];
    size?: 'small' | 'medium';
    label?: string;
    variant?: V;
    type?: React.InputHTMLAttributes<unknown>['type'];
    defaultHelpText?: string;
    hasAdditionalHelpText?: boolean;
    additionalHelpText?: string;
    alwaysLabelOnTop?: boolean; // Label을 항상 위에 둘지 여부
    required?: boolean;
}
const ControlTextField = <T extends FieldValues = FieldValues, V extends TextFieldVariants = 'outlined'>(
    props: ControlTextFieldProps<T, V>,
) => {
    const helpText = useMemo(() => {
        if (props.errors[props.field]?.message) {
            return props.errors[props.field]?.message as ReactNode;
        }
        if (props.hasAdditionalHelpText && props.additionalClassnames) {
            return props.additionalHelpText;
        }

        if (props?.defaultHelpText != undefined) {
            return props.defaultHelpText;
        }

        return ' ';
    }, [
        props.additionalClassnames,
        props.additionalHelpText,
        props.defaultHelpText,
        props.errors,
        props.field,
        props.hasAdditionalHelpText,
    ]);

    return (
        <Controller
            name={props.field}
            control={props.control}
            render={({ field: { onChange, value } }) => (
                <TextField
                    className={clsx('control-text-field', props?.additionalClassnames ?? [])}
                    slotProps={{
                        inputLabel: {
                            shrink: !!props?.alwaysLabelOnTop,
                        },
                    }}
                    size={props.size ?? 'medium'}
                    label={props?.label}
                    variant={props?.variant}
                    value={value}
                    type={props.type}
                    onChange={onChange}
                    error={!!props.errors[props.field]}
                    helperText={helpText}
                    required={!!props?.required}
                />
            )}
        />
    );
};

export default ControlTextField;
