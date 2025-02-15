import { Outlet, useMatches } from 'react-router-dom';

// Components
import Header from '@layout/components/Header.tsx';
import Snb from '@layout/components/Snb.tsx';
import Footer from '@layout/components/Footer.tsx';

const CommonLayout = () => {
    /* state */
    const matches = useMatches();
    const title = matches.reverse().find((match) => match.handle?.title)?.handle?.title || 'Default Title';

    return (
        <>
            <Header />
            <Snb />
            <main>
                <Outlet context={{ title }} />
            </main>
            <Footer />
        </>
    );
};

export default CommonLayout;
