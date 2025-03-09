import '@styles/layout/components/Header.scss';
import { Avatar, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MouseEvent, useCallback, useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@stores/store.ts';
import { postLogoutRequest } from '@apis/login/login.ts';

interface HeaderProps {
    onClickMenu: (isOpen: boolean) => void;
}

const Header = (props: HeaderProps) => {
    /* Hooks */
    // const user: UserState = useSelector((state: RootState) => state.user);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const [isLogin, setIsLogin] = useState(isAuthenticated);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    /* Privates */
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

    /* Lifecycle */
    useLayoutEffect(() => {
        setIsLogin(isAuthenticated);
    }, [isAuthenticated]);

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
                                <Avatar className={'logo'} alt='Remy Sharp' src='/logo/GDP_LOGO.png' />
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
