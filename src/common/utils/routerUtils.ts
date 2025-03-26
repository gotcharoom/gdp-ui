import { RouteObject } from 'react-router-dom';
import { MenuItem } from '@/types/layout/components/menuItem.type.ts';

/**
 * 주어진 라우트 목록에서 메뉴 항목을 추출하고 `showMenu` 규칙을 적용합니다.
 *
 * @param {RouteObject[]} routes - 처리할 라우트 목록
 * @param {string} basePath - 현재 라우트의 기본 경로
 * @param {boolean} parentShowMenu - 부모 라우트가 메뉴에 표시되는지 여부
 * @returns {MenuItem[]} 처리된 메뉴 항목 목록
 */
const extractMenuItems = (routes: RouteObject[], basePath = '', parentShowMenu = true): MenuItem[] => {
    return routes
        .filter((route) => route.path !== undefined || route.index) // 유효한 경로나 index가 있는 경우만 포함
        .flatMap((route) => {
            const fullPath = getFullPath(route, basePath);
            const { title, icon, showMenu } = getRouteMetadata(route);

            // 부모가 메뉴에 보이지 않으면 이 경로도 제외
            if (!parentShowMenu) return [];

            // 자식 메뉴 처리
            const children = route.children ? extractMenuItems(route.children, fullPath, showMenu) : [];
            return createMenuItem(route, fullPath, title, icon, showMenu, children);
        });
};

/**
 * 라우트의 전체 경로를 생성합니다.
 *
 * @param {RouteObject} route - 라우트 객체
 * @param {string} basePath - 부모 경로
 * @returns {string} 생성된 전체 경로
 */
const getFullPath = (route: RouteObject, basePath: string): string => {
    return route.index
        ? basePath // index 라우트는 부모 경로를 그대로 사용
        : `${basePath}/${route.path ?? ''}`.replace('//', '/').replace(/\/+$/g, '');
};

/**
 * 라우트에서 타이틀, 아이콘 및 showMenu 값을 추출합니다.
 *
 * @param {RouteObject} route - 라우트 객체
 * @returns {{ title: string; icon: string; showMenu: boolean }} 라우트 메타데이터
 */
const getRouteMetadata = (route: RouteObject) => {
    return {
        title: route.handle?.title || 'Untitled',
        icon: route.handle?.icon || 'apps',
        showMenu: route.handle?.showMenu ?? false,
    };
};

/**
 * 메뉴 항목을 생성하고, index만 존재하는 경우 부모 클릭 시 index로 이동하게 설정합니다.
 *
 * @param {RouteObject} route - 라우트 객체
 * @param {string} fullPath - 전체 경로
 * @param {string} title - 메뉴 제목
 * @param {string} icon - 아이콘
 * @param {boolean} showMenu - 메뉴 표시 여부
 * @param {MenuItem[]} children - 자식 메뉴 항목
 * @returns {MenuItem[]} 생성된 메뉴 항목
 */
const createMenuItem = (
    route: RouteObject,
    fullPath: string,
    title: string,
    icon: string,
    showMenu: boolean,
    children: MenuItem[],
):
    | {
          path: string;
          children: MenuItem[];
          icon: string;
          index: boolean;
          redirectPath: string;
          handle: { showMenu: boolean; title: string };
          title: string;
      }[]
    | MenuItem[] => {
    const visibleChildren = children.filter((child) => child.handle?.showMenu);
    const indexChild = visibleChildren.find((child) => child.index);

    let redirectPath = '';
    if (visibleChildren.length === 1 && indexChild) {
        redirectPath = indexChild.path || fullPath;
        children = []; // index만 있으면 하위 메뉴 제거
    }

    return showMenu
        ? [
              {
                  path: fullPath,
                  title,
                  icon,
                  children,
                  redirectPath,
                  handle: { title, showMenu },
                  index: !!route.index,
              },
          ]
        : children;
};

export default {
    extractMenuItems,
};
