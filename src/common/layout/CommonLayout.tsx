import { Outlet, useMatches } from 'react-router-dom';

// Components
import Header from '@/common/layout/components/Header.tsx';
import Snb from '@/common/layout/components/Snb.tsx';
import Footer from '@/common/layout/components/Footer.tsx';

import '@styles/layout/CommonLayout.scss';
import { useState } from 'react';
import { ExtendedMatch } from '@/types/common/ExtendMatch.type.ts';

const CommonLayout = () => {
    /* Hooks */
    const matches = useMatches() as ExtendedMatch[];

    const title = matches.reverse().find((match) => match.handle?.title)?.handle?.title;

    const [open, setOpen] = useState(false);

    /* Privates */

    /* Events */

    const onClickMenu = (isOpen: boolean) => {
        setOpen(isOpen);
    };
    const toggleDrawer = (isOpen: boolean) => () => {
        setOpen(isOpen);
    };

    /* Lifecycles */

    return (
        <div className={'common-layout'}>
            <Header onClickMenu={onClickMenu} />
            <Snb isOpen={open} toggleDrawer={toggleDrawer} />
            <main className={'common-layout__main'}>
                <Outlet context={{ title }} />
            </main>
            <Footer />
        </div>
    );
};

export default CommonLayout;
