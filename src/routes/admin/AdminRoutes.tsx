import {RouteObject} from "react-router-dom";
import CommonLayout from "@layout/test/CommonLayout.tsx";

// 추후 변경
const AdminRoutes: RouteObject[] = [
    {
        path: "/admin",
        element: <CommonLayout />,
        handle: { title: "Home" },
    },
]

export default AdminRoutes;