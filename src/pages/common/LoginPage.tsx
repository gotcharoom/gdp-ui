import { Button, Checkbox, FormControlLabel, Paper } from '@mui/material';
import '@styles/pages/common/login.scss';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { loginSchema } from '@/validations/login/loginSchema.ts';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ValidTextField from '@/common/components/ValidTextField.tsx';
import LoginRequestForm from '@/types/pages/login/LoginRequestForm.type.ts';
import { postLoginRequest, requestSocialLoginUri } from '@apis/login/login.ts';
import { useCallback, useEffect } from 'react';
import { ResponseCode } from '@/common/utils/ReponseCodeUtil.ts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@stores/store.ts';
import { setAuth } from '@stores/slices/authSlice.ts';
import Provider from '@/common/constants/Provider.ts';

const LoginPage = () => {
    /* Hooks */
    const { title } = useOutletContext<{ title: string }>();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginRequestForm>({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            id: '',
            password: '',
        },
    });

    /* Privates */
    const routeToRoot = useCallback(() => {
        navigate('/');
    }, [navigate]);

    /* Event */
    const onSubmit = useCallback(
        async (request: LoginRequestForm) => {
            try {
                const response = await postLoginRequest(request);
                dispatch(setAuth());

                if (response.code === ResponseCode.SUCCESS.code) {
                    navigate('/'); //
                }
            } catch (e) {
                console.error('Login Error:', e);
                throw e;
            }
        },
        [dispatch, navigate],
    );

    const onClickSocialLogin = useCallback((provider: Provider) => {
        window.location.href = requestSocialLoginUri(provider);
    }, []);

    /* Lifecycle */
    useEffect(() => {
        if (isAuthenticated) {
            routeToRoot();
        }
    }, [isAuthenticated, routeToRoot]);

    return (
        <div className={'login'}>
            <Paper className={'login__paper'} elevation={3}>
                <div className={'login__paper__title'}>{title}</div>
                <div className={'login__paper__input-container'}>
                    <ValidTextField
                        className={'input-container__input'}
                        control={control}
                        field='id'
                        errors={errors}
                        variant='outlined'
                        label={'아이디'}
                    />
                    <ValidTextField
                        className={'input-container__input'}
                        control={control}
                        field='password'
                        errors={errors}
                        variant='outlined'
                        label={'비밀번호'}
                        type={'password'}
                    />
                </div>
                <div className={'login__paper__login'}>
                    <FormControlLabel control={<Checkbox />} label='Remember Me' />
                    <Button className={'login__button'} variant='contained' onClick={handleSubmit(onSubmit)}>
                        로그인
                    </Button>
                </div>
                <div className={'login__paper__support'}>
                    <Button className={'support__button'}>ID 찾기</Button>
                    <Button className={'support__button'}>Password 찾기</Button>
                    <Button className={'support__button'}>회원 가입</Button>
                </div>
                <div className={'login__paper__social'}>
                    <Button className={'social__container--google'} variant='contained'>
                        <div className={'google__icon__container'} onClick={() => onClickSocialLogin(Provider.GOOGLE)}>
                            <img className={'google__icon'} alt={'google__icon'} src={'/logo/GDP_SOCIAL_LOGIN_GOOGLE.png'} />
                        </div>

                        <div className={'google__text__container'}>구글 로그인</div>
                    </Button>
                    <Button className={'social__container--kakao'} variant='contained'>
                        <div className={'kakao__icon__container'} onClick={() => onClickSocialLogin(Provider.KAKAO)}>
                            <img className={'kakao__icon'} alt={'kakao__icon'} src={'/logo/GDP_SOCIAL_LOGIN_KAKAO.png'} />
                        </div>

                        <div className={'kakao__text__container'}>카카오 로그인</div>
                    </Button>
                    <Button className={'social__container--naver'} variant='contained'>
                        <div className={'naver__icon__container'}>
                            <img className={'naver__icon'} alt={'naver__icon'} src={'/logo/GDP_SOCIAL_LOGIN_NAVER.png'} />
                        </div>

                        <div className={'naver__text__container'} onClick={() => onClickSocialLogin(Provider.NAVER)}>
                            네이버 로그인
                        </div>
                    </Button>
                </div>
            </Paper>
        </div>
    );
};

export default LoginPage;
