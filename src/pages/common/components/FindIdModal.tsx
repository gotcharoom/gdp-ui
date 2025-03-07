import ControlTextField from '@/common/components/ControlTextField.tsx';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FindIdForm from '@/types/pages/login/components/FindIdForm.type.ts';
import { findIdSchema } from '@/validations/login/components/findIdSchema.ts';
import '@styles/pages/common/components/FindIdModal.scss';
import { Button } from '@mui/material';
import { useCallback } from 'react';

const FindIdModal = () => {
    /* Hooks */
    const {
        control,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<FindIdForm>({
        resolver: yupResolver(findIdSchema),
        defaultValues: {
            email: '',
        },
    });

    /* Event */
    const onSubmit = useCallback(() => {}, []);

    return (
        <div className={'find-id-modal'}>
            <ControlTextField
                className={'find-id-modal__text-field'}
                control={control}
                field='email'
                errors={errors}
                variant='outlined'
                label={'Email'}
            />
            <Button className={'find-id-modal__button__submit'} variant='contained' onClick={handleSubmit(onSubmit)}>
                로그인
            </Button>
        </div>
    );
};

export default FindIdModal;
