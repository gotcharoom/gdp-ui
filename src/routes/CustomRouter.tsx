import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { ReactNode } from 'react';

// Routes
import UserRoutes from '@routes/user/UserRoutes.tsx';
import AdminRoutes from '@routes/admin/AdminRoutes.tsx';
import { RoutesContext } from '@/contexts/RoutesContext.ts';

// Custom Router 설정
const routes: RouteObject[] = [...UserRoutes, ...AdminRoutes];

const CustomRouter = createBrowserRouter(routes);

export const RoutesProvider = ({ children }: { children: ReactNode }) => {
    return <RoutesContext.Provider value={routes}>{children}</RoutesContext.Provider>;
};

export default CustomRouter;
