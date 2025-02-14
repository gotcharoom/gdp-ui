import CommonLayout from "@layout/test/CommonLayout.tsx";
import {Route} from "react-router-dom";
import {JSX, lazy} from "react";

// Routes
const SampleUserMain = lazy(() => import("@pages/sample/SampleUserMain.tsx"))

const UserRoutes: JSX.Element[] = [
    <Route path="/" element={<CommonLayout />}>
        <Route path="/" element={<SampleUserMain />} state/>
    </Route>
];

export default UserRoutes;