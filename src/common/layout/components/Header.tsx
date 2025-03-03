import '@styles/layout/components/Header.scss';
import { Avatar, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCallback, useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@stores/store.ts';

interface HeaderProps {
    onClickMenu: (isOpen: boolean) => void;
}

const Header = (props: HeaderProps) => {
    /* Hooks */
    // const user: UserState = useSelector((state: RootState) => state.user);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const [isLogined, setIsLogined] = useState(isAuthenticated);
    const navigate = useNavigate();

    /* Privates */

    /* Event */
    const onClickMenu = () => {
        props.onClickMenu(true);
    };

    const onClickLogin = useCallback(() => {
        navigate('/login');
    }, [navigate]);

    /* Lifecycle */
    useLayoutEffect(() => {
        setIsLogined(isAuthenticated);
    }, [isAuthenticated]);

    return (
        <div className={'header'}>
            <div className={'header__nav'}>
                <div className={'header__nav__logo'}>
                    <img className={'logo'} alt={'header__logo'} src={'/logo/GDP_LOGO.png'} />
                </div>
                <div className={'header__nav__menu'}>
                    <IconButton className={'menu'} onClick={onClickMenu}>
                        <span className='material-icons'>menu</span>
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
                    {isLogined ? (
                        <IconButton className={'account'}>
                            <Avatar className={'logo'} alt='Remy Sharp' src='/logo/GDP_LOGO.png' />
                        </IconButton>
                    ) : (
                        <Button onClick={onClickLogin}>로그인</Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
