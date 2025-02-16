import '@styles/layout/components/Header.scss';

interface HeaderProps {
    toggleMenu: (isOpen: boolean) => void;
}

const Header = (props: HeaderProps) => {
    /* Hooks */

    /* Privates */

    /* Event */
    const onClickMenu = () => {
        props.toggleMenu(true);
    };

    /* Lifecycle */

    return (
        <div className={'header'}>
            <div className={'header__nav'}>
                <div className={'header__nav__logo'}>
                    <img className={'logo'} alt={'header__logo'} src={'logo/GDP_LOGO.png'} />
                </div>
                <div className={'header__nav__menu'} onClick={onClickMenu}>
                    Menu
                </div>
            </div>
            <div className={'header__search-bar'}></div>
            <div className={'header__social'}>
                <div className={'header__social__discord'}>Discord</div>
                <div className={'header__social__account'}>account</div>
            </div>
        </div>
    );
};

export default Header;
