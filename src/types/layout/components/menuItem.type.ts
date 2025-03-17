export interface MenuHandle {
    title: string;
    showMenu: boolean;
}

export interface MenuItem {
    index: boolean;
    title: string;
    path: string;
    icon: string;
    handle: MenuHandle;
    children: MenuItem[];
    redirectPath: string;
}
