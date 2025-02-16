import { Outlet, useMatches } from 'react-router-dom';

// Components
import Header from '@layout/components/Header.tsx';
import Snb from '@layout/components/Snb.tsx';
import Footer from '@layout/components/Footer.tsx';

import '@styles/layout/CommonLayout.scss';

const CommonLayout = () => {
    /* Hooks */
    const matches = useMatches();
    const title = matches.reverse().find((match) => match.handle?.title)?.handle?.title || 'Default Title';

    /* Privates */

    /* Event */

    /* Lifecycle */

    return (
        <div className={'common-layout'}>
            <Header />
            <Snb />
            <main>
                <Outlet context={{ title }} />
            </main>
            <Footer />
        </div>
    );
};

export default CommonLayout;
