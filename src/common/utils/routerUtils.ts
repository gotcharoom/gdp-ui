import { RouteObject } from 'react-router-dom';
import { MenuItem } from '@/types/layout/components/menuItem.type.ts';

const extractMenuItems = (routes: RouteObject[], basePath = ''): MenuItem[] => {
    const exceptionList: string[] = ['login'];

    return (
        routes
            // .filter((route) => route.path !== undefined)
            .filter((route) => route.path !== undefined && !route.path.includes(':'))
            .filter((route) => !exceptionList.includes(route.path as string))
            .flatMap((route) => {
                const fullPath = `${basePath}/${route.path ?? ''}`.replace('//', '/').replace(/\/+$/g, '');
                const title = route.handle?.title || 'Untitled';
                const icon = route.handle?.icon || 'apps';

                const children = route.children ? extractMenuItems(route.children, fullPath) : [];

                return { path: fullPath, title, icon, children } as MenuItem;
            })
    );
};

export default {
    extractMenuItems,
};
