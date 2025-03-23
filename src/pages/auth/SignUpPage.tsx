import { useCallback, useEffect, useMemo } from 'react';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import useNavigationGuard from '@/common/hooks/useNavigationGuard.ts';
import { useGlobalForm } from '@/common/hooks/useGlobalForm.ts';
import FormName from '@/common/constants/FormName.ts';
import { signUpSchema } from '@/validations/auth/signUpSchema.ts';
import SignUpRequestForm from '@/types/pages/auth/SignUpRequestForm.type.ts';
import CommonPage from '@/common/components/CommonPage.tsx';
import ControlTextField from '@/common/components/ControlTextField.tsx';

import '@styles/pages/auth/SignUpPage.scss';
import { Button } from '@mui/material';
import { postSignUp } from '@apis/auth/signUp.ts';

const SignUpPage = () => {
    /* Hooks */
    const { title } = useOutletContext<{ title: string }>();
    const location = useLocation();
    const navigate = useNavigate();
    const method = useGlobalForm<SignUpRequestForm>({
        name: FormName.SIGN_UP,
        resolver: yupResolver(signUpSchema),
        defaultValues: {
            id: '',
            password: '',
            passwordConfirm: '',
            email: '',
            nickname: '',
            name: '',
        },
    });

    const { sudoNavigate } = useNavigationGuard();

    /* Privates */
    const successMessage = useMemo(() => {
        return '사용 가능합니다';
    }, []);

    /* Events */
    const onSubmit = useCallback(
        async (form: SignUpRequestForm) => {
            try {
                const isRegistered = await postSignUp(form);

                if (!isRegistered) {
                    throw new Error();
                }

                await sudoNavigate('/login');
            } catch (e) {
                console.log(e);
                // TODO. [TR-YOO] 실패 메세지 띄우기
            }
        },
        [sudoNavigate],
    );

    const onClickCancel = useCallback(() => {
        navigate('/login');
    }, [navigate]);

    /* Lifecycle */

    useEffect(() => {
        // ✅ `Agreement`를 거치지 않았다면 다시 `Agreement`로 이동
        if (!location.state?.agreed) {
            navigate('/login/agreement', { replace: true });
        }
    }, [location, navigate]);

    return (
        <div className={'sign-up-page'}>
            <CommonPage width={'100%'} height={'100%'} title={title}>
                <form onSubmit={method.handleSubmit(onSubmit)}>
                    <div className={'sign-up-page__input__section'}>
                        <div className={'input__section__input-container'}>
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
                        <div className={'input__section__input-container'}>
                            <ControlTextField
                                method={method}
                                field='password'
                                successHelpText={successMessage}
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
                                successHelpText={successMessage}
                                variant='outlined'
                                label={'비밀번호 확인'}
                                type={'password'}
                                alwaysLabelOnTop
                                required
                                checkImmediately
                            />
                        </div>
                        <div className={'input__section__input-container'}>
                            <ControlTextField
                                method={method}
                                field='name'
                                successHelpText={successMessage}
                                variant='outlined'
                                label={'이름'}
                                alwaysLabelOnTop
                                required
                                checkImmediately
                            />
                        </div>
                        <div className={'input__section__input-container'}>
                            <ControlTextField
                                method={method}
                                field='nickname'
                                successHelpText={successMessage}
                                variant='outlined'
                                label={'닉네임'}
                                alwaysLabelOnTop
                                required
                                checkImmediately
                            />
                        </div>
                        <div className={'input__section__input-container'}>
                            <ControlTextField
                                method={method}
                                field='email'
                                successHelpText={successMessage}
                                variant='outlined'
                                label={'Email'}
                                alwaysLabelOnTop
                                defaultHelpText={'Email은 계정 정보를 찾을 때 사용됩니다'}
                                required
                                checkImmediately
                            />
                        </div>
                    </div>
                    <div className={'sign-up-page__button-section'}>
                        <Button className={'button-section__button'} variant='contained' type='submit'>
                            가입
                        </Button>
                        <Button className={'button-section__button'} variant='outlined' onClick={onClickCancel}>
                            취소
                        </Button>
                    </div>
                </form>
            </CommonPage>
        </div>
    );
};

export default SignUpPage;
