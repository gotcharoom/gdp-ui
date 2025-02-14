import CommonLayout from "@layout/test/CommonLayout.tsx";
import {Route} from "react-router-dom";
import {JSX} from "react";

// Routes
import Challenge from "@routes/user/Challenge.tsx";

const UserRoutes: JSX.Element[] = [
    <Route path="/" element={<CommonLayout />}>
        {Challenge}
    </Route>
];

export default UserRoutes;