import { RouteObject } from 'react-router-dom';
import { MenuItem } from '@/types/layout/components/menuItem.type.ts';

const extractMenuItems = (routes: RouteObject[], basePath = '', parentShowMenu = true): MenuItem[] => {
    return routes
        .filter((route) => route.path !== undefined || route.index)
        .flatMap((route) => {
            const fullPath = route.index
                ? basePath // index 라우트는 부모의 경로 사용
                : `${basePath}/${route.path ?? ''}`.replace('//', '/').replace(/\/+$/g, '');

            const title = route.handle?.title || 'Untitled';
            const icon = route.handle?.icon || 'apps';
            const showMenu = route.handle?.showMenu ?? false; // 기본값 false

            // 부모가 showMenu가 false라면 이 경로는 메뉴에서 제거
            if (!parentShowMenu) {
                return [];
            }

            // 자식 메뉴 처리
            let children = route.children ? extractMenuItems(route.children, fullPath, showMenu) : [];
            const visibleChildren = children.filter((child) => child.handle?.showMenu);
            const indexChild = visibleChildren.find((child) => child.index);

            // 만약 children 중 showMenu가 true인 것이 index 하나뿐이라면, 부모 클릭 시 index로 이동하고 하위 메뉴 제거
            let redirectPath = '';
            if (visibleChildren.length === 1 && indexChild) {
                redirectPath = indexChild.path || fullPath;
                children = []; // index만 있으므로 하위 메뉴 제거
            }

            return showMenu
                ? [{ path: fullPath, title, icon, children, redirectPath, handle: { title, showMenu }, index: !!route.index }]
                : children;
        });
};

export default {
    extractMenuItems,
};
