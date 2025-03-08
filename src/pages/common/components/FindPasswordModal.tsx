import ControlTextField from '@/common/components/ControlTextField.tsx';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FindPasswordForm from '@/types/pages/login/components/FindPasswordForm.type.ts';
import { findPasswordSchema } from '@/validations/login/components/findPasswordSchema.ts';

import '@styles/pages/common/components/FindPasswordModal.scss';
import { useCallback, useState } from 'react';

const FindPasswordModal = () => {
    /* Hooks */
    const [message, setMessage] = useState<string>('임시 패스워드는 이메일로 발신됩니다');
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FindPasswordForm>({
        resolver: yupResolver(findPasswordSchema),
        defaultValues: {
            id: '',
            email: '',
        },
    });

    /* Event */
    const onSubmit = useCallback((form: FindPasswordForm) => {
        const test = false;
        if (!test) {
            setMessage('해당 계정 정보를 찾을 수 없습니다');
        }
    }, []);

    return (
        <div className={'find-password-modal'}>
            <div className={'find-password-modal__info'}>{message}</div>
            <ControlTextField
                className={'find-password-modal__email'}
                control={control}
                field='id'
                errors={errors}
                variant='outlined'
                label={'ID'}
            />
            <ControlTextField
                className={'find-password-modal__email'}
                control={control}
                field='email'
                errors={errors}
                variant='outlined'
                label={'Email'}
            />
            <Button className={'find-password-modal__button__submit'} variant='contained' onClick={handleSubmit(onSubmit)}>
                발송
            </Button>
        </div>
    );
};

export default FindPasswordModal;
