import { Outlet, useMatches } from 'react-router-dom';

// Components
import Header from '@/common/layout/components/Header.tsx';
import Snb from '@/common/layout/components/Snb.tsx';
import Footer from '@/common/layout/components/Footer.tsx';

import '@styles/layout/CommonLayout.scss';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { ExtendedMatch } from '@/types/common/ExtendMatch.type.ts';

interface CommonLayoutProps {
    children?: ReactNode;
}
const CommonLayout = (props: CommonLayoutProps) => {
    /* Hooks */
    const matches = useMatches() as ExtendedMatch[];

    const [title, setTitle] = useState<string>('');

    const [open, setOpen] = useState(false);

    /* Privates */
    const computedTitle = useMemo(() => {
        return matches.reverse().find((match) => match.handle?.title)?.handle?.title ?? '';
    }, [matches]);

    /* Events */

    const onClickMenu = (isOpen: boolean) => {
        setOpen(isOpen);
    };
    const toggleDrawer = (isOpen: boolean) => () => {
        setOpen(isOpen);
    };

    /* Lifecycles */
    useEffect(() => {
        setTitle(computedTitle);
    }, [computedTitle]);

    return (
        <div className={'common-layout'}>
            <Header onClickMenu={onClickMenu} />
            <Snb isOpen={open} toggleDrawer={toggleDrawer} />
            <main className={'common-layout__main'}>
                <div className='common-layout__main__content'>{props.children ? props.children : <Outlet context={{ title }} />}</div>
            </main>
            <Footer />
        </div>
    );
};

export default CommonLayout;
