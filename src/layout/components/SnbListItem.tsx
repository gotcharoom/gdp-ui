import { MenuItem } from '@types/layout/components/menuItem.type.ts';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
export interface SnbListItemProps {
    items: MenuItem[];
    depth?: number;
}

const SnbListItem = (props: SnbListItemProps) => {
    /* Hooks */
    const [depth] = useState(props?.depth != undefined ? props.depth + 1 : 1);
    const [openState, setOpenState] = useState<{ [key: number]: boolean }>({});

    const navigate = useNavigate();

    /* Privates */
    const toggleCollapse = (index: number) => {
        setOpenState((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const routeToPath = (item: MenuItem) => {
        navigate(item.path);
    };

    const hasChildren = (item: MenuItem): boolean => {
        return item?.children != undefined && item?.children.length > 0;
    };

    const calPadding = (): SxProps<Theme> => {
        return { pl: (depth - 1) * 4 };
    };

    const drawExpand = (item: MenuItem, index) => {
        if (!hasChildren(item)) {
            return null;
        }

        return <>{openState[index] ? <ExpandLess /> : <ExpandMore />}</>;
    };

    const drawCollapseItems = (item: MenuItem, index) => {
        if (!hasChildren(item)) {
            return null;
        }

        return (
            <Collapse in={openState[index]}>
                <SnbListItem items={item.children} depth={depth} />
            </Collapse>
        );
    };

    /* Event */
    const onClickMenuItem = (item: MenuItem, index: number) => () => {
        if (hasChildren(item)) {
            return toggleCollapse(index);
        }

        return routeToPath(item);
    };

    /* Lifecycle */

    return (
        <>
            <List disablePadding={props?.depth != undefined && props.depth > 1}>
                {props.items.map((item, index) => {
                    return (
                        <>
                            <ListItemButton key={item.title} sx={calPadding()} onClick={onClickMenuItem(item, index)}>
                                <ListItemIcon>
                                    <SendIcon />
                                </ListItemIcon>
                                <ListItemText primary={item.title} />
                                {drawExpand(item, index)}
                            </ListItemButton>
                            {drawCollapseItems(item, index)}
                        </>
                    );
                })}
            </List>
        </>
    );
};

export default SnbListItem;
