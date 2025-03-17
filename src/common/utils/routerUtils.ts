import { RouteObject } from 'react-router-dom';
import { MenuItem } from '@/types/layout/components/menuItem.type.ts';

const extractMenuItems = (routes: RouteObject[], basePath = ''): MenuItem[] => {
    const exceptionList: string[] = ['login', 'error', 'user'];

    return routes
        .filter((route) => route.path !== undefined || route.index) // index도 포함
        .filter((route) => !route.path?.includes(':'))
        .filter((route) => !exceptionList.includes(route.path as string))
        .filter((route) => !(basePath === '' && route.index)) // 최상위 `/`의 children 내 index 제거
        .flatMap((route) => {
            const fullPath = route.index
                ? basePath // index 라우트는 부모의 경로 사용
                : `${basePath}/${route.path ?? ''}`.replace('//', '/').replace(/\/+$/g, '');

            const title = route.handle?.title || 'Untitled';
            const icon = route.handle?.icon || 'apps';

            // 자식 메뉴 처리
            let children = route.children ? extractMenuItems(route.children, fullPath) : [];

            // 하위 children에 index만 있는 경우, 상위 메뉴를 클릭하면 index로 이동
            if (children.length === 1 && children[0].path === fullPath) {
                children = [];
            }

            return { path: fullPath, title, icon, children } as MenuItem;
        });
};

export default {
    extractMenuItems,
};
