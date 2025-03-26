import { Button } from '@mui/material';
import '@styles/pages/auth/LoginPage.scss';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { loginSchema } from '@/validations/auth/loginSchema.ts';
import { yupResolver } from '@hookform/resolvers/yup';
import ControlTextField from '@/common/components/ControlTextField.tsx';
import LoginRequestForm from '@/types/pages/auth/LoginRequestForm.type.ts';
import { postLoginRequest, postRequestRememberMe, requestSocialLoginUri } from '@apis/auth/login.ts';
import { useCallback, useEffect } from 'react';
import { ResponseCode } from '@/common/utils/ReponseCodeUtil.ts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@stores/store.ts';
import { setAuth } from '@stores/slices/authSlice.ts';
import SocialType from '@/common/constants/SocialType.ts';
import ControlCheckbox from '@/common/components/ControlCheckbox.tsx';
import CommonPage from '@/common/components/CommonPage.tsx';
import FindIdModal from '@pages/auth/components/FindIdModal.tsx';
import FindPasswordModal from '@pages/auth/components/FindPasswordModal.tsx';
import FormName from '@/common/constants/FormName.ts';
import { useForm } from 'react-hook-form';
import { useModal } from '@/common/hooks/useModal.ts';
import { CommonModalProps } from '@/common/contexts/ModalContext.ts';
import { useAlert } from '@/common/hooks/useAlert.ts';
import { AlertConfigProps } from '@/common/contexts/AlertContext.ts';

const LoginPage = () => {
    /* Hooks */
    const { title } = useOutletContext<{ title: string }>();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const navigate = useNavigate();
    const { openModal } = useModal();
    const { openAlert } = useAlert();
    const method = useForm<LoginRequestForm>({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            id: '',
            password: '',
            rememberMe: false,
        },
    });

    /* Privates */
    const routeToRoot = useCallback(() => {
        navigate('/', { replace: true });
    }, [navigate]);

    /* Event */
    const onClickOpenFindIdModal = useCallback(() => {
        const config: CommonModalProps = {
            title: 'ID 찾기',
            open: true,
            width: '50%',
            height: '50%',
            contents: <FindIdModal />,
            formName: FormName.FIND_ID,
        };
        openModal(config);
    }, [openModal]);

    const onClickOpenFindPasswordModal = useCallback(() => {
        const config: CommonModalProps = {
            title: 'Password 찾기',
            open: true,
            width: '50%',
            height: '60%',
            contents: <FindPasswordModal />,
            formName: FormName.FIND_PASSWORD,
        };
        openModal(config);
    }, [openModal]);

    const onClickSignUp = useCallback(() => {
        navigate('agreement');
    }, [navigate]);

    const onSubmit = useCallback(
        async (request: LoginRequestForm) => {
            try {
                const isRememberMe = request.rememberMe;
                await postRequestRememberMe(isRememberMe);
                const response = await postLoginRequest(request);

                if (response.code === ResponseCode.SUCCESS.code) {
                    dispatch(setAuth());

                    const successAlert: AlertConfigProps = {
                        severity: 'success',
                        contents: '로그인하였습니다',
                    };
                    openAlert(successAlert);
                    routeToRoot();
                } else {
                    const failAlert: AlertConfigProps = {
                        severity: 'error',
                        contents: '로그인 정보가 잘못됐습니다',
                    };
                    openAlert(failAlert);
                }
            } catch (e) {
                await postRequestRememberMe(false);
                console.error('Login Error:', e);

                const errorAlert: AlertConfigProps = {
                    severity: 'error',
                    contents: '로그인시 오류가 발생했습니다',
                };
                openAlert(errorAlert);
                throw e;
            }
        },
        [dispatch, openAlert, routeToRoot],
    );

    const onClickSocialLogin = useCallback(
        async (provider: SocialType) => {
            const isRememberMe = method.getValues().rememberMe;

            await postRequestRememberMe(isRememberMe);
            window.location.href = requestSocialLoginUri(provider);
        },
        [method],
    );

    /* Lifecycle */
    useEffect(() => {
        if (isAuthenticated) {
            routeToRoot();
        }
    }, [isAuthenticated, routeToRoot]);

    return (
        <>
            <div className={'login'}>
                <CommonPage title={title} width={'500px'} height={'500px'}>
                    <form onSubmit={method.handleSubmit(onSubmit)}>
                        <div className={'login__input-container'}>
                            <ControlTextField method={method} field='id' variant='outlined' label={'아이디'} alwaysLabelOnTop />
                            <ControlTextField
                                method={method}
                                field='password'
                                variant='outlined'
                                label={'비밀번호'}
                                type={'password'}
                                alwaysLabelOnTop
                            />
                        </div>
                        <div className={'login__option'}>
                            <ControlCheckbox control={method.control} field='rememberMe' label={'Remember Me'} />
                            <Button className={'login__button'} variant='contained' type='submit'>
                                로그인
                            </Button>
                        </div>
                    </form>
                    <div className={'login__support'}>
                        <Button className={'support__button'} onClick={() => onClickOpenFindIdModal()}>
                            ID 찾기
                        </Button>
                        <Button className={'support__button'} onClick={() => onClickOpenFindPasswordModal()}>
                            Password 찾기
                        </Button>
                        <Button className={'support__button'} onClick={() => onClickSignUp()}>
                            회원 가입
                        </Button>
                    </div>
                    <div className={'login__social'}>
                        <Button
                            className={'social__container--google'}
                            variant='contained'
                            onClick={() => onClickSocialLogin(SocialType.GOOGLE)}
                        >
                            <div className={'google__icon__container'}>
                                <img className={'google__icon'} alt={'google__icon'} src={'/logo/GDP_SOCIAL_LOGIN_GOOGLE.png'} />
                            </div>

                            <div className={'google__text__container'}>구글 로그인</div>
                        </Button>
                        <Button
                            className={'social__container--kakao'}
                            variant='contained'
                            onClick={() => onClickSocialLogin(SocialType.KAKAO)}
                        >
                            <div className={'kakao__icon__container'}>
                                <img className={'kakao__icon'} alt={'kakao__icon'} src={'/logo/GDP_SOCIAL_LOGIN_KAKAO.png'} />
                            </div>

                            <div className={'kakao__text__container'}>카카오 로그인</div>
                        </Button>
                        <Button
                            className={'social__container--naver'}
                            variant='contained'
                            onClick={() => onClickSocialLogin(SocialType.NAVER)}
                        >
                            <div className={'naver__icon__container'}>
                                <img className={'naver__icon'} alt={'naver__icon'} src={'/logo/GDP_SOCIAL_LOGIN_NAVER.png'} />
                            </div>

                            <div className={'naver__text__container'}>네이버 로그인</div>
                        </Button>
                    </div>
                </CommonPage>
            </div>
        </>
    );
};

export default LoginPage;
