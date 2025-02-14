// import Header from './Header';

import {Outlet} from "react-router-dom";

const CommonLayout = () => {
    return (
        <>
        {/*<Header/>*/}
        {/*<main>*/}
        {/*    <Outlet/>*/}
        {/*</main>*/}
        <main>
            1234
            <Outlet />
        </main>
    </>
    );
};

export default CommonLayout;