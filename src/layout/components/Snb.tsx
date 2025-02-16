import { Drawer } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { RoutesContext } from '@/contexts/RoutesContext.ts';
import pathUtils from '@utils/pathUtils.ts';
import { MenuItem } from '@types/layout/components/menuItem.type.ts';
import SnbListItem from '@layout/components/SnbListItem.tsx';
import { useLocation } from 'react-router-dom';

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
    const targetMenuItems: MenuItem[] =
        allMenuItems
            .sort((a, b) => b.path.length - a.path.length)
            .find((item) => location.pathname === item.path || location.pathname.startsWith(item.path))?.children || [];

    /* Privates */

    /* Event */

    /* Lifecycle */
    useEffect(() => {
        setOpen(props.isOpen);
    }, [props.isOpen]);

    return (
        <Drawer open={open} onClose={props.toggleDrawer(false)}>
            <SnbListItem items={targetMenuItems} />
        </Drawer>
    );
};

export default Snb;
