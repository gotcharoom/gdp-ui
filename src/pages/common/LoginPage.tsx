import { Button } from '@mui/material';
import '@styles/pages/common/LoginPage.scss';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { loginSchema } from '@/validations/login/loginSchema.ts';
import { yupResolver } from '@hookform/resolvers/yup';
import ControlTextField from '@/common/components/ControlTextField.tsx';
import LoginRequestForm from '@/types/pages/login/LoginRequestForm.type.ts';
import { postLoginRequest, postRequestRememberMe, requestSocialLoginUri } from '@apis/login/login.ts';
import { useCallback, useEffect, useState } from 'react';
import { ResponseCode } from '@/common/utils/ReponseCodeUtil.ts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@stores/store.ts';
import { setAuth } from '@stores/slices/authSlice.ts';
import Provider from '@/common/constants/Provider.ts';
import ControlCheckbox from '@/common/components/ControlCheckbox.tsx';
import CommonPage from '@/common/components/CommonPage.tsx';
import CommonModal from '@/common/components/CommonModal.tsx';
import ModalConfig from '@/types/common/components/ModalConfig.type.ts';
import FindIdModal from '@pages/common/components/FindIdModal.tsx';
import FindPasswordModal from '@pages/common/components/FindPasswordModal.tsx';
import FormName from '@/common/constants/FormName.ts';
import { useForm } from 'react-hook-form';

const initModalConfig: ModalConfig = {
    title: '',
    open: false,
    width: 100,
    height: 100,
    children: <></>,
};

const LoginPage = () => {
    /* Hooks */
    const { title } = useOutletContext<{ title: string }>();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const navigate = useNavigate();
    const [modalConfig, setModalConfig] = useState<ModalConfig>(initModalConfig);
    const method = useForm<LoginRequestForm>({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            id: '',
            password: '',
            rememberMe: false,
        },
    });

    // NavigationGuard 사용 시
    // const { method } = useGlobalForm<LoginRequestForm>({
    //     name: FormName.LOGIN,
    //     resolver: yupResolver(loginSchema),
    //     defaultValues: {
    //         id: '',
    //         password: '',
    //         rememberMe: false,
    //     },
    // });

    /* Privates */
    const routeToRoot = useCallback(() => {
        navigate('/', { replace: true });
    }, [navigate]);

    const handleClose = useCallback(() => {
        setModalConfig(initModalConfig);
    }, []);

    /* Event */
    const onClickOpenFindIdModal = useCallback(() => {
        const config: ModalConfig = {
            title: 'ID 찾기',
            open: true,
            width: '50%',
            height: '50%',
            children: <FindIdModal />,
            formName: FormName.FIND_ID,
        };
        setModalConfig(config);
    }, []);

    const onClickOpenFindPasswordModal = useCallback(() => {
        const config: ModalConfig = {
            title: 'Password 찾기',
            open: true,
            width: '50%',
            height: '60%',
            children: <FindPasswordModal />,
            formName: FormName.FIND_PASSWORD,
        };
        setModalConfig(config);
    }, []);

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
                    routeToRoot();
                }
            } catch (e) {
                await postRequestRememberMe(false);
                console.error('Login Error:', e);
                throw e;
            }
        },
        [dispatch, routeToRoot],
    );

    const onClickSocialLogin = useCallback(
        async (provider: Provider) => {
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
                            <ControlTextField
                                control={method.control}
                                field='id'
                                errors={method.formState.errors}
                                variant='outlined'
                                label={'아이디'}
                                alwaysLabelOnTop
                            />
                            <ControlTextField
                                control={method.control}
                                field='password'
                                errors={method.formState.errors}
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
                            onClick={() => onClickSocialLogin(Provider.GOOGLE)}
                        >
                            <div className={'google__icon__container'}>
                                <img className={'google__icon'} alt={'google__icon'} src={'/logo/GDP_SOCIAL_LOGIN_GOOGLE.png'} />
                            </div>

                            <div className={'google__text__container'}>구글 로그인</div>
                        </Button>
                        <Button
                            className={'social__container--kakao'}
                            variant='contained'
                            onClick={() => onClickSocialLogin(Provider.KAKAO)}
                        >
                            <div className={'kakao__icon__container'}>
                                <img className={'kakao__icon'} alt={'kakao__icon'} src={'/logo/GDP_SOCIAL_LOGIN_KAKAO.png'} />
                            </div>

                            <div className={'kakao__text__container'}>카카오 로그인</div>
                        </Button>
                        <Button
                            className={'social__container--naver'}
                            variant='contained'
                            onClick={() => onClickSocialLogin(Provider.NAVER)}
                        >
                            <div className={'naver__icon__container'}>
                                <img className={'naver__icon'} alt={'naver__icon'} src={'/logo/GDP_SOCIAL_LOGIN_NAVER.png'} />
                            </div>

                            <div className={'naver__text__container'}>네이버 로그인</div>
                        </Button>
                    </div>
                </CommonPage>
            </div>
            <CommonModal
                title={modalConfig.title}
                width={modalConfig.width}
                height={modalConfig.height}
                open={modalConfig.open}
                formName={modalConfig?.formName}
                handleClose={handleClose}
            >
                {modalConfig.children}
            </CommonModal>
        </>
    );
};

export default LoginPage;
