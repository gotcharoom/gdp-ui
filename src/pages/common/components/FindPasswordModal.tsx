import ControlTextField from '@/common/components/ControlTextField.tsx';
import { Button } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import FindPasswordForm from '@/types/pages/login/components/FindPasswordForm.type.ts';
import { findPasswordSchema } from '@/validations/login/components/findPasswordSchema.ts';

import '@styles/pages/common/components/FindPasswordModal.scss';
import { useCallback, useState } from 'react';
import { useGlobalForm } from '@/common/hooks/useGlobalForm.ts';
import FormName from '@/common/constants/FormName.ts';
import { postGenerateTempPassword } from '@apis/auth/findMail.ts';

const FindPasswordModal = () => {
    /* Hooks */
    const [message, setMessage] = useState<string>('임시 패스워드는 이메일로 발신됩니다');
    const method = useGlobalForm<FindPasswordForm>({
        name: FormName.FIND_PASSWORD,
        resolver: yupResolver(findPasswordSchema),
        defaultValues: {
            id: '',
            email: '',
        },
    });

    /* Event */
    const onSubmit = useCallback(async (form: FindPasswordForm) => {
        setMessage('메일 발송중입니다...');

        const { data } = await postGenerateTempPassword(form);
        if (!data) {
            setMessage('해당 이메일로 등록된 계정 정보를 찾을 수 없습니다');
        } else {
            setMessage('해당 이메일로 임시 비밀번호가 발송되었습니다');
        }
    }, []);

    return (
        <div className={'find-password-modal'}>
            <div className={'find-password-modal__info'}>{message}</div>
            <ControlTextField
                className={'find-password-modal__email'}
                method={method}
                field='id'
                variant='outlined'
                label={'ID'}
                alwaysLabelOnTop
                required
            />
            <ControlTextField
                className={'find-password-modal__email'}
                method={method}
                field='email'
                variant='outlined'
                label={'Email'}
                alwaysLabelOnTop
                required
            />
            <Button className={'find-password-modal__button__submit'} variant='contained' onClick={method.handleSubmit(onSubmit)}>
                발송
            </Button>
        </div>
    );
};

export default FindPasswordModal;
