import { TextField } from '@mui/material';
import { Controller, FieldValues, Path, UseFormReturn, useWatch } from 'react-hook-form';
import { TextFieldVariants } from '@mui/material/TextField/TextField';
import * as React from 'react';
import { ChangeEvent, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import '@styles/common/components/ControlTextField.scss';
import PageMode from '@/common/constants/PageMode.ts';
import { GlobalFormContext } from '@/common/contexts/GlobalFormContext.ts';

interface ControlTextFieldProps<T extends FieldValues, V extends TextFieldVariants> {
    className?: string;
    handleChange?: () => void;
    checkImmediately?: boolean;

    // React Hook Form Props
    method: UseFormReturn<T>;
    field: Path<T>;

    // TextField Props
    size?: 'small' | 'medium';
    label?: string;
    variant?: V;
    type?: React.InputHTMLAttributes<unknown>['type'];
    defaultHelpText?: string;
    successHelpText?: string;
    alwaysLabelOnTop?: boolean;
    required?: boolean;
    readOnly?: boolean;
}

const ControlTextField = <T extends FieldValues = FieldValues, V extends TextFieldVariants = 'outlined'>(
    props: ControlTextFieldProps<T, V>,
) => {
    /* Hooks */
    const {
        control,
        formState: { errors },
        trigger,
    } = props.method;

    const { pageMode } = useContext(GlobalFormContext);

    const fieldValue = useWatch({ control, name: props.field });

    /* State */
    const [debounceTimeout, setDebounceTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

    const [isFirstRender, setIsFirstRender] = useState(true);
    const [helpText, setHelpText] = useState<string | ReactNode>(props.defaultHelpText || ' ');

    /* Privates */
    const isReadOnly = useMemo(() => {
        return !!props.readOnly;
    }, [props.readOnly]);

    const readOnlyClass = useMemo(() => {
        return isReadOnly ? 'control-text-field--read-only' : '';
    }, [isReadOnly]);

    const hasShowSuccessMessage = useMemo(() => {
        return !errors[props.field]?.message && fieldValue?.trim() && props.successHelpText;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errors[props.field]?.message, fieldValue, props.successHelpText]);

    const successClass = useMemo(() => {
        return hasShowSuccessMessage ? 'control-text-field__helpText--success' : '';
    }, [hasShowSuccessMessage]);

    const getHelpText = useCallback(() => {
        if (errors[props.field]?.message) {
            return errors[props.field]?.message as ReactNode;
        }
        if (fieldValue?.trim() && props.successHelpText) {
            return props.successHelpText;
        }

        return props.defaultHelpText || ' ';
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errors[props.field], props.successHelpText, props.defaultHelpText, hasShowSuccessMessage]);

    /* Events */
    const handleChange = useCallback(
        (
            e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
            onChange: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
        ) => {
            onChange(e);
            props.handleChange?.();
        },
        [props],
    );

    /* Lifecycles */
    useEffect(() => {
        if (!props?.checkImmediately) {
            return;
        }

        if (pageMode == PageMode.READ) {
            return;
        }

        if (isFirstRender) {
            setIsFirstRender(false); // 첫 렌더링 이후에만 유효성 검사 실행
            return;
        }

        if (debounceTimeout) {
            clearTimeout(debounceTimeout); // 기존 타이머 제거 (디바운스)
        }

        const timeout = setTimeout(() => {
            trigger(props.field, { shouldFocus: false }).then(() => {
                setHelpText(getHelpText()); // 특정 필드만 검증 후 `helpText` 업데이트
            });
        }, 1000); // 1초 후 실행

        setDebounceTimeout(timeout);

        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fieldValue]);

    // reset 시 기본 helpText로 초기화
    useEffect(() => {
        if (!props.method.formState.isDirty) {
            setHelpText(props.defaultHelpText || ' ');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.method.formState.isDirty]);

    return (
        <Controller
            name={props.field}
            control={control}
            render={({ field: { onChange, value } }) => (
                <TextField
                    className={clsx('control-text-field', readOnlyClass, successClass, props.className || '')}
                    slotProps={{
                        inputLabel: {
                            shrink: !!props.alwaysLabelOnTop,
                        },
                        input: {
                            readOnly: !!props.readOnly,
                        },
                    }}
                    size={props.size ?? 'medium'}
                    label={props.label}
                    variant={props.variant}
                    value={value}
                    type={props.type}
                    onChange={(e) => handleChange(e, onChange)}
                    error={!!errors[props.field]}
                    helperText={helpText}
                    required={!!props.required}
                    autoComplete={props.field}
                />
            )}
        />
    );
};

export default ControlTextField;
