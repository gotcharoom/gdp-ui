import { Button, Checkbox, darken, FormControlLabel, Paper, TextField } from '@mui/material';
import '@styles/pages/common/login.scss';
import { useOutletContext } from 'react-router-dom';

const Login = () => {
    /* Hooks */
    const { title } = useOutletContext<{ title: string }>();

    /* Privates */
    /* Event */
    /* Lifecycle */

    return (
        <div className={'login'}>
            <Paper className={'login__paper'} elevation={3}>
                <div className={'login__paper__title'}>{title}</div>
                <div className={'login__paper__input-container'}>
                    <TextField className={'input-container__input'} id='outlined-basic' label='아이디' variant='outlined' />
                    <TextField className={'input-container__input'} id='outlined-basic' label='비밀번호' variant='outlined' />
                </div>
                <div className={'login__paper__login'}>
                    <FormControlLabel control={<Checkbox />} label='Remember Me' />
                    <Button className={'login__button'} variant='contained'>
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
                        <div className={'google__icon__container'}>
                            <img className={'google__icon'} alt={'google__icon'} src={'/logo/GDP_SOCIAL_LOGIN_GOOGLE.png'} />
                        </div>

                        <div className={'google__text__container'}>구글 로그인</div>
                    </Button>
                    <Button className={'social__container--kakao'} variant='contained'>
                        <div className={'kakao__icon__container'}>
                            <img className={'kakao__icon'} alt={'kakao__icon'} src={'/logo/GDP_SOCIAL_LOGIN_KAKAO.png'} />
                        </div>

                        <div className={'kakao__text__container'}>카카오 로그인</div>
                    </Button>
                    <Button className={'social__container--naver'} variant='contained'>
                        <div className={'naver__icon__container'}>
                            <img className={'naver__icon'} alt={'naver__icon'} src={'/logo/GDP_SOCIAL_LOGIN_NAVER.png'} />
                        </div>

                        <div className={'naver__text__container'}>네이버 로그인</div>
                    </Button>
                </div>
            </Paper>
        </div>
    );
};

export default Login;
