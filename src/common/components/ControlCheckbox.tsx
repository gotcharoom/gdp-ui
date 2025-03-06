import { Control, Controller, FieldErrors, FieldValues, Path } from 'react-hook-form';
import { Checkbox, FormControlLabel } from '@mui/material';
import { TextFieldVariants } from '@mui/material/TextField/TextField';
import * as React from 'react';
import { useCallback } from 'react';

interface ControlCheckboxProps<T extends FieldValues> {
    // Yup Props
    control: Control<T>;
    field: Path<T>;
}

const ControlCheckbox = <T extends FieldValues = FieldValues>(props: ControlCheckboxProps<T>) => {
    const onChangeRememberMe = useCallback((event: React.ChangeEvent<HTMLInputElement>, onChange: (value: boolean) => void) => {
        onChange(event.target.checked);
    }, []);

    return (
        <Controller
            name={props.field}
            control={props.control}
            render={({ field: { value, onChange } }) => (
                <FormControlLabel
                    control={<Checkbox field='rememberMe' checked={value} onChange={(e) => onChangeRememberMe(e, onChange)} />}
                    label='Remember Me'
                />
            )}
        />
    );
};

export default ControlCheckbox;
