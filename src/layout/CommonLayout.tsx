// import Header from './Header';

import {Outlet, useMatches} from "react-router-dom";

const CommonLayout = () => {
    const matches = useMatches();
    const title = matches.reverse().find((match) => match.handle?.title)?.handle?.title || "Default Title";

    return (
        <>
        {/*<Header/>*/}
        {/*<main>*/}
        {/*    <Outlet/>*/}
        {/*</main>*/}
        <main>
            {title}
            1234
            <Outlet />
        </main>
    </>
    );
};

export default CommonLayout;