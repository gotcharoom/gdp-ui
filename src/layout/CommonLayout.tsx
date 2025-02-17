import { Outlet, useMatches } from 'react-router-dom';

// Components
import Header from '@layout/components/Header.tsx';
import Snb from '@layout/components/Snb.tsx';
import Footer from '@layout/components/Footer.tsx';

import '@styles/layout/CommonLayout.scss';
import { useState } from 'react';

const CommonLayout = () => {
    /* Hooks */
    const matches = useMatches();

    const title = matches.reverse().find((match) => match.handle?.title)?.handle?.title;

    const [open, setOpen] = useState(false);

    /* Privates */

    /* Event */

    const onClickMenu = (isOpen: boolean) => {
        setOpen(isOpen);
    };
    const toggleDrawer = (isOpen: boolean) => () => {
        setOpen(isOpen);
    };

    /* Lifecycle */

    return (
        <div className={'common-layout'}>
            <Header toggleMenu={onClickMenu} />
            <Snb isOpen={open} toggleDrawer={toggleDrawer} />
            <main className={'common-layout__main'}>
                <Outlet context={{ title }} />
            </main>
            <Footer />
        </div>
    );
};

export default CommonLayout;
