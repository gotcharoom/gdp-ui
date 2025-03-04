import { MenuItem } from '@/types/layout/components/menuItem.type.ts';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Fragment, useState } from 'react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
export interface SnbListItemProps {
    items: MenuItem[];
    parentTitle: string;
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

    const routeToPath = (item: MenuItem, index: number) => {
        navigate(item.path);
        toggleCollapse(index);
    };

    const hasChildren = (item: MenuItem): boolean => {
        return item?.children != undefined && item?.children.length > 0;
    };

    const calPadding = (): SxProps<Theme> => {
        const defaultPadding = 2;
        return { pl: (depth - 1) * 4 + defaultPadding };
    };

    const drawExpand = (item: MenuItem, index: number) => {
        if (!hasChildren(item)) {
            return null;
        }

        return <>{openState[index] ? <ExpandLess /> : <ExpandMore />}</>;
    };

    const drawCollapseItems = (item: MenuItem, index: number) => {
        if (!hasChildren(item)) {
            return null;
        }

        return (
            <Collapse in={openState[index]}>
                <SnbListItem key={'sub-list-item' + item.title + depth} items={item.children} parentTitle={item.title} depth={depth} />
            </Collapse>
        );
    };

    /* Event */
    const onClickMenuItem = (item: MenuItem, index: number) => () => {
        if (hasChildren(item)) {
            return toggleCollapse(index);
        }

        return routeToPath(item, index);
    };

    /* Lifecycle */

    return (
        <Fragment key={'fragment' + props.parentTitle + depth}>
            <List key={'list' + props.parentTitle + depth} disablePadding={props?.depth != undefined && props.depth > 1}>
                {props.items.map((item, index) => {
                    return (
                        <Fragment key={'inner-fragment' + item.title + depth + index}>
                            <ListItemButton
                                className={'snb_list__item-button'}
                                key={'list-item-button' + item.title + depth + index}
                                sx={calPadding()}
                                onClick={onClickMenuItem(item, index)}
                            >
                                <ListItemIcon
                                    className={'snb__list__item-button__icon'}
                                    key={'list-item-icon' + item.title + depth + index}
                                >
                                    <span className='material-icons icon'>{item.icon}</span>
                                </ListItemIcon>
                                <ListItemText primary={item.title} />
                                {drawExpand(item, index)}
                            </ListItemButton>
                            {drawCollapseItems(item, index)}
                        </Fragment>
                    );
                })}
            </List>
        </Fragment>
    );
};

export default SnbListItem;
