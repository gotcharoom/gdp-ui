import { Badge, Button, Divider, IconButton, List, ListItem, ListItemText, Paper, Popper, Typography } from '@mui/material';
import { MouseEvent, useCallback, useMemo, useState } from 'react';
import { Notification, NotificationType } from '@/common/contexts/SseContext.ts';

import '@styles/layout/components/NotificationBadge.scss';
import { putReadNotification } from '@apis/notification/notification.ts';
import { useSse } from '@/common/hooks/useSse.ts';

const NotificationBadge = () => {
    /* Hooks */
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { events, removeEvent } = useSse();
    /* Privates */
    const badgeCount = useMemo(() => {
        return events.filter((event) => event.notificationType !== NotificationType.SYSTEM).filter((event) => !event.isRead).length;
    }, [events]);

    /* Events */
    const onClickBadge = useCallback((event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    }, []);

    const onClickRead = useCallback(
        async (notification: Notification) => {
            await putReadNotification(notification.id);
            removeEvent(notification.id);
        },
        [removeEvent],
    );

    /* Lifecycles */

    return (
        <div className={'notification-badge'}>
            <IconButton onClick={onClickBadge}>
                <Badge badgeContent={badgeCount} color='primary'>
                    <span className='material-symbols-outlined'>notifications</span>
                </Badge>
            </IconButton>
            <Popper className={'badge__popper'} open={open} anchorEl={anchorEl}>
                <Paper className={'badge__popper__paper'} sx={{ maxHeight: 400, overflowY: 'auto' }}>
                    {badgeCount == 0 ? (
                        <Typography className={'badge__popper__paper__empty-notification'}>알림이 없습니다.</Typography>
                    ) : (
                        <List className={'badge__popper__paper__list'}>
                            {events.map((notification, idx) => (
                                <div key={idx}>
                                    <ListItem className={'badge__popper__paper__list__item'}>
                                        <ListItemText primary={notification.content} secondary={notification.toName} />
                                        <Button variant='text' onClick={() => onClickRead(notification)}>
                                            읽음
                                        </Button>
                                    </ListItem>
                                    {idx < events.length - 1 && <Divider />}
                                </div>
                            ))}
                        </List>
                    )}
                </Paper>
            </Popper>
        </div>
    );
};

export default NotificationBadge;
