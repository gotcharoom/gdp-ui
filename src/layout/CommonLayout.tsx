import { Outlet, RouteObject, useMatches } from 'react-router-dom';

// Components
import Header from '@layout/components/Header.tsx';
import Snb from '@layout/components/Snb.tsx';
import Footer from '@layout/components/Footer.tsx';

import '@styles/layout/CommonLayout.scss';
import { useState } from 'react';

const CommonLayout = () => {
    /* Hooks */
    const matches = useMatches();

    /*
     * TODO. [TR-YOO] Default title 다른 용어로 변경하기
     * */
    const title = matches.reverse().find((match) => match.handle?.title)?.handle?.title || 'Default Title';

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
            <main>
                <Outlet context={{ title }} />
            </main>
            <Footer />
        </div>
    );
};

export default CommonLayout;
