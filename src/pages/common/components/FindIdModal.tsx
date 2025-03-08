import ControlTextField from '@/common/components/ControlTextField.tsx';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FindIdForm from '@/types/pages/login/components/FindIdForm.type.ts';
import { findIdSchema } from '@/validations/login/components/findIdSchema.ts';
import '@styles/pages/common/components/FindIdModal.scss';
import { Button } from '@mui/material';
import { useCallback, useState } from 'react';

const FindIdModal = () => {
    /* Hooks */
    const [message, setMessage] = useState<string>('가입하신 아이디 정보는 이메일로 발신됩니다');
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FindIdForm>({
        resolver: yupResolver(findIdSchema),
        defaultValues: {
            email: '',
        },
    });

    /* Event */
    const onSubmit = useCallback((form: FindIdForm) => {
        const test = false;
        if (!test) {
            setMessage('해당 이메일로 등록된 계정 정보를 찾을 수 없습니다');
        }
    }, []);

    return (
        <div className={'find-id-modal'}>
            <div className={'find-id-modal__info'}>{message}</div>
            <ControlTextField
                className={'find-id-modal__email'}
                control={control}
                field='email'
                errors={errors}
                variant='outlined'
                label={'Email'}
            />
            <Button className={'find-id-modal__button__submit'} variant='contained' onClick={handleSubmit(onSubmit)}>
                발송
            </Button>
        </div>
    );
};

export default FindIdModal;
