import { RouteObject } from 'react-router-dom';
import { MenuItem } from '@/types/layout/components/menuItem.type.ts';

const extractMenuItems = (routes: RouteObject[], basePath = ''): MenuItem[] => {
    const exceptionList: string[] = ['login', 'error'];

    return routes
        .filter((route) => route.path !== undefined || route.index) // ✅ index도 포함
        .filter((route) => !route.path?.includes(':'))
        .filter((route) => !exceptionList.includes(route.path as string))
        .flatMap((route) => {
            const fullPath = route.index
                ? basePath // ✅ index 라우트는 부모의 경로 사용
                : `${basePath}/${route.path ?? ''}`.replace('//', '/').replace(/\/+$/g, '');

            const title = route.handle?.title || 'Untitled';
            const icon = route.handle?.icon || 'apps';

            const children = route.children ? extractMenuItems(route.children, fullPath) : [];

            return { path: fullPath, title, icon, children } as MenuItem;
        });
};

export default {
    extractMenuItems,
};
