import { RouteObject } from 'react-router-dom';
import { MenuItem } from '@types/layout/components/menuItem.type.ts';

/*
 * TODO. [TR-YOO] Untitled 부분 다른 이름으로 변경하기
 * */
const extractMenuItems = (routes: RouteObject[], basePath = ''): MenuItem[] => {
    return (
        routes
            // .filter((route) => route.path !== undefined)
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
