import ControlTextField from '@/common/components/ControlTextField.tsx';
import { yupResolver } from '@hookform/resolvers/yup';
import FindIdForm from '@/types/pages/login/components/FindIdForm.type.ts';
import { findIdSchema } from '@/validations/login/components/findIdSchema.ts';
import '@styles/pages/common/components/FindIdModal.scss';
import { Button } from '@mui/material';
import { useCallback, useState } from 'react';
import { useGlobalForm } from '@/common/hooks/useGlobalForm.ts';
import FormName from '@/common/constants/FormName.ts';
import useNavigationGuard from '@/common/hooks/useNavigationGuard.ts';
import { postFindId } from '@apis/auth/findMail.ts';

const FindIdModal = () => {
    /* Hooks */
    const [message, setMessage] = useState<string>('가입하신 아이디 정보는 이메일로 발신됩니다');
    const method = useGlobalForm<FindIdForm>({
        name: FormName.FIND_ID,
        resolver: yupResolver(findIdSchema),
        defaultValues: {
            email: '',
        },
    });

    useNavigationGuard();

    /* Events */
    const onSubmit = useCallback(async (form: FindIdForm) => {
        const { data } = await postFindId(form);
        if (!data) {
            setMessage('해당 이메일로 등록된 계정 정보를 찾을 수 없습니다');
        } else {
            setMessage('해당 이메일로 ID 정보가 발송되었습니다');
        }
    }, []);

    return (
        <div className={'find-id-modal'}>
            <div className={'find-id-modal__info'}>{message}</div>
            <ControlTextField
                className={'find-id-modal__email'}
                method={method}
                field='email'
                variant='outlined'
                label={'Email'}
                alwaysLabelOnTop
                required
            />
            <Button className={'find-id-modal__button__submit'} variant='contained' onClick={method.handleSubmit(onSubmit)}>
                발송
            </Button>
        </div>
    );
};

export default FindIdModal;
