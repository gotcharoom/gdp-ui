import CommonLayout from "@layout/test/CommonLayout.tsx";
import {Route} from "react-router-dom";
import {JSX, lazy} from "react";

// Routes
const SampleUserMain = lazy(() => import("@pages/sample/SampleUserMain.tsx"))

const UserRoutes: JSX.Element[] = [
    <Route path="/" element={<CommonLayout />} key={'user-root'}  handle={{title: 'test'}}>
        <Route path="/" element={<SampleUserMain />} key={'user-sample-main'}  handle={{title: 'test2'}}/>
    </Route>
];

export default UserRoutes;