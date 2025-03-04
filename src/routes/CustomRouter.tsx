import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { ReactNode } from 'react';

// Routes
import UserRoutes from '@routes/user/UserRoutes.tsx';
import AdminRoutes from '@routes/admin/AdminRoutes.tsx';
import { RoutesContext } from '@/common/contexts/RoutesContext.ts';

// Custom Router 설정
const routes: RouteObject[] = [...UserRoutes, ...AdminRoutes];

const option = {
    future: {
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_relativeSplatPath: true,
        v7_skipActionErrorRevalidation: true,
    },
};

const CustomRouter = createBrowserRouter(routes, option);

export const RoutesProvider = ({ children }: { children: ReactNode }) => {
    return <RoutesContext.Provider value={routes}>{children}</RoutesContext.Provider>;
};

export default CustomRouter;
