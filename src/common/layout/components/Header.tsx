import '@styles/layout/components/Header.scss';
import { Avatar, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MouseEvent, useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@stores/store.ts';
import { postLogoutRequest } from '@apis/auth/login.ts';
import { AlertConfigProps } from '@/common/contexts/AlertContext.ts';
import { useAlert } from '@/common/hooks/useAlert.ts';
import SessionStorageKey from '@/common/constants/SessionStorageKey.ts';
import { resetAvatar } from '@/common/utils/avatarUtil.ts';
import UserState from '@/types/pages/auth/UserState.type.ts';
import SocialType from '@/common/constants/SocialType.ts';

interface HeaderProps {
    onClickMenu: (isOpen: boolean) => void;
}

const Header = (props: HeaderProps) => {
    /* Hooks */
    // const user: UserState = useSelector((state: RootState) => state.user);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const user: UserState = useSelector((state: RootState) => state.user);
    const [isLogin, setIsLogin] = useState(isAuthenticated);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [croppedImage, setCroppedImage] = useState<string | undefined>(undefined);
    const [isLogout, setIsLogout] = useState<boolean>(false);
    const open = Boolean(anchorEl);
    const { openAlert } = useAlert();

    /* Privates */
    const isGdpUser = useMemo(() => {
        return user.socialType == SocialType.GDP;
    }, [user.socialType]);

    const closeUserMenu = useCallback(() => {
        setAnchorEl(null);
    }, []);

    /* Event */
    const onClickLogo = useCallback(() => {
        navigate('/');
    }, [navigate]);

    const onClickMenu = useCallback(() => {
        props.onClickMenu(true);
    }, [props]);

    const onClickUserMenu = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const onClickLogin = useCallback(() => {
        navigate('/login');
    }, [navigate]);

    const onClickLogout = useCallback(async () => {
        closeUserMenu();
        await postLogoutRequest();
    }, [closeUserMenu]);

    const onClickUserInfo = useCallback(async () => {
        closeUserMenu();
        navigate('/user/info');
    }, [closeUserMenu, navigate]);

    const onClickChangePassword = useCallback(async () => {
        closeUserMenu();
        navigate('/user/change-password');
    }, [closeUserMenu, navigate]);

    /* Lifecycle */
    useLayoutEffect(() => {
        setIsLogin(isAuthenticated);
    }, [isAuthenticated]);

    // Logout 메세지 처리
    useEffect(() => {
        const logoutState = sessionStorage.getItem(SessionStorageKey.IS_LOGOUT);

        if (logoutState === 'true') {
            setIsLogout(true);
            sessionStorage.removeItem(SessionStorageKey.IS_LOGOUT);
        }
    }, []);

    useEffect(() => {
        if (isLogout) {
            const logoutAlert: AlertConfigProps = {
                severity: 'success',
                contents: '로그아웃했습니다',
            };
            openAlert(logoutAlert);
            setIsLogout(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogout]);

    useEffect(() => {
        void resetAvatar(user?.imageUrl, user?.imageCropArea, setCroppedImage);
    }, [user]);

    return (
        <div className={'header'}>
            <div className={'header__nav'}>
                <div className={'header__nav__logo'}>
                    <img className={'logo'} onClick={onClickLogo} alt={'header__logo'} src={'/logo/GDP_LOGO.png'} />
                </div>
                <div className={'header__nav__menu'}>
                    <IconButton className={'menu'} onClick={onClickMenu}>
                        <span className='material-symbols-outlined'>menu</span>
                    </IconButton>
                </div>
            </div>
            <div className={'header__search-bar'}></div>
            <div className={'header__social'}>
                <div className={'header__social__discord'}>
                    <IconButton className={'discord'}>
                        <img className={'logo'} alt={'header__logo'} src={'/logo/Discord_Logo.png'} />
                    </IconButton>
                </div>
                <div className={'header__social__account'}>
                    {isLogin ? (
                        <>
                            <IconButton className={'account'} onClick={onClickUserMenu}>
                                <Avatar
                                    className={'logo'}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                    }}
                                    src={croppedImage}
                                />
                            </IconButton>
                            <Menu
                                id='basic-menu'
                                anchorEl={anchorEl}
                                open={open}
                                onClose={closeUserMenu}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={onClickUserInfo}>내 정보</MenuItem>
                                {isGdpUser && <MenuItem onClick={onClickChangePassword}>비밀번호 변경</MenuItem>}
                                <MenuItem onClick={onClickLogout}>로그아웃</MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <Button onClick={onClickLogin}>로그인</Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
