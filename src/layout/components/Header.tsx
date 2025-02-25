import '@styles/layout/components/Header.scss';
import { Avatar, Button, IconButton } from '@mui/material';

interface HeaderProps {
    onClickMenu: (isOpen: boolean) => void;
}

const Header = (props: HeaderProps) => {
    /* Hooks */

    /* Privates */

    /* Event */
    const onClickMenu = () => {
        props.onClickMenu(true);
    };

    /* Lifecycle */

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
                    <IconButton className={'account'}>
                        <Avatar className={'logo'} alt='Remy Sharp' src='/logo/GDP_LOGO.png' />
                    </IconButton>
                </div>
            </div>
        </div>
    );
};

export default Header;
