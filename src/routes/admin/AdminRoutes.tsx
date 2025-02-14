import {JSX} from "react";
import {Route} from "react-router-dom";
import CommonLayout from "@layout/test/CommonLayout.tsx";

// 추후 변경
const AdminRoutes: JSX.Element[] = [
    <Route path="/admin" element={<CommonLayout />} key={'admin-root'}/>
];

export default AdminRoutes;