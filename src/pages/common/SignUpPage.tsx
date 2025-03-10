import { useCallback, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import useNavigationGuard from '@/common/hooks/useNavigationGuard.ts';
import { useGlobalForm } from '@/common/hooks/useGlobalForm.ts';
import FormName from '@/common/constants/FormName.ts';
import { signUpSchema } from '@/validations/login/signUpSchema.ts';
import SignUpRequestForm from '@/types/pages/login/SignUpRequestForm.ts';
import CommonPage from '@/common/components/CommonPage.tsx';
import ControlTextField from '@/common/components/ControlTextField.tsx';

import '@styles/pages/common/SignUpPage.scss';
import { Button } from '@mui/material';

const SignUpPage = () => {
    /* Hooks */
    const location = useLocation();
    const navigate = useNavigate();
    const { method } = useGlobalForm<SignUpRequestForm>({
        name: FormName.SIGN_UP,
        resolver: yupResolver(signUpSchema),
        defaultValues: {
            id: '',
            password: '',
            passwordConfirm: '',
            email: '',
            nickname: '',
        },
    });

    useNavigationGuard();

    /* Privates */
    const successMessage = useMemo(() => {
        return '사용 가능합니다';
    }, []);

    /* Events */
    const onSubmit = useCallback(() => {}, []);

    /* Lifecycle */

    useEffect(() => {
        // ✅ `Agreement`를 거치지 않았다면 다시 `Agreement`로 이동
        if (!location.state?.agreed) {
            navigate('/login/agreement', { replace: true });
        }
    }, [location, navigate]);

    return (
        <div className={'sign-up-page'}>
            <CommonPage width={'100%'} height={'100%'} title={'회원 가입'}>
                <form onSubmit={method.handleSubmit(onSubmit)}>
                    <div className={'sign-up-page__input-container'}>
                        <ControlTextField
                            method={method}
                            field='id'
                            successHelpText={successMessage}
                            variant='outlined'
                            label={'아이디'}
                            alwaysLabelOnTop
                            required
                            checkImmediately
                        />
                    </div>
                    <div className={'sign-up-page__input-container'}>
                        <ControlTextField
                            method={method}
                            field='password'
                            variant='outlined'
                            label={'비밀번호'}
                            type={'password'}
                            alwaysLabelOnTop
                            required
                            checkImmediately
                        />
                        <ControlTextField
                            method={method}
                            field='passwordConfirm'
                            variant='outlined'
                            label={'비밀번호 확인'}
                            type={'password'}
                            alwaysLabelOnTop
                            required
                            checkImmediately
                        />
                    </div>
                    <div className={'sign-up-page__input-container'}>
                        <ControlTextField
                            method={method}
                            field='nickname'
                            variant='outlined'
                            label={'닉네임'}
                            alwaysLabelOnTop
                            required
                            checkImmediately
                        />
                    </div>
                    <div className={'sign-up-page__input-container'}>
                        <ControlTextField
                            method={method}
                            field='email'
                            variant='outlined'
                            label={'Email'}
                            alwaysLabelOnTop
                            defaultHelpText={'Email은 계정 정보를 찾을 때 사용됩니다'}
                            required
                            checkImmediately
                        />
                    </div>
                    <Button className={'login__button'} variant='contained' type='submit'>
                        로그인
                    </Button>
                </form>
            </CommonPage>
        </div>
    );
};

export default SignUpPage;
