import { Drawer } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { RoutesContext } from '@/common/contexts/RoutesContext.ts';
import pathUtils from '@/common/utils/routerUtils.ts';
import { MenuItem } from '@/types/layout/components/menuItem.type.ts';
import SnbListItem from '@/common/layout/components/SnbListItem.tsx';
import { useLocation } from 'react-router-dom';

import '@styles/layout/components/Snb.scss';

export interface SnbProps {
    isOpen: boolean;
    toggleDrawer: (isOpen: boolean) => () => void;
}

const Snb = (props: SnbProps) => {
    /* Hooks */
    const [open, setOpen] = useState(false);
    const routes = useContext(RoutesContext);
    const location = useLocation();

    const allMenuItems: MenuItem[] = pathUtils.extractMenuItems(routes);
    const targetMenu: MenuItem | undefined = allMenuItems
        .sort((a, b) => b.path.length - a.path.length)
        .find((item) => location.pathname === item.path || location.pathname.startsWith(item.path));

    const targetMenuItems: MenuItem[] = targetMenu?.children || [];
    const targetMenuTitle: string = targetMenu?.title || 'Default Title';

    /* Privates */

    /* Event */

    /* Lifecycle */
    useEffect(() => {
        setOpen(props.isOpen);
    }, [props.isOpen]);

    return (
        <Drawer className={'snb'} open={open} onClose={props.toggleDrawer(false)} PaperProps={{ className: 'snb__custom-drawer' }}>
            <SnbListItem key={'root-sub-list-item'} items={targetMenuItems} parentTitle={targetMenuTitle} />
        </Drawer>
    );
};

export default Snb;
