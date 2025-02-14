import {JSX} from "react";
import {Route} from "react-router-dom";
import CommonLayout from "@layout/test/CommonLayout.tsx";
import Challenge from "@routes/user/Challenge.tsx";

// 추후 변경
const AdminRoutes: JSX.Element[] = [
    <Route path="/admin" element={<CommonLayout />}>
        {Challenge}
    </Route>
];

export default AdminRoutes;