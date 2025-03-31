import { Badge, Button, Divider, IconButton, List, ListItem, ListItemText, Paper, Popper, Typography } from '@mui/material';
import { MouseEvent, useCallback, useMemo, useState } from 'react';
import { Notification, NotificationType } from '@/common/contexts/SseContext.ts';

import '@styles/layout/components/NotificationBadge.scss';
import { putReadNotification } from '@apis/notification/notification.ts';
import { useSse } from '@/common/hooks/useSse.ts';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

const NotificationBadge = () => {
    /* Hooks */
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { events, removeEvent } = useSse();
    const navigate = useNavigate();

    /* Privates */
    const filteredEvents = useMemo(() => {
        return events.filter((event) => event.notificationType !== NotificationType.SYSTEM).filter((event) => !event.isRead);
    }, [events]);

    const badgeCount = useMemo(() => {
        return filteredEvents.length;
    }, [filteredEvents]);

    /* Events */
    const onClickBadge = useCallback((event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    }, []);

    const onClickNavigate = useCallback(
        (url: string | undefined) => {
            if (url == undefined) {
                return;
            }

            navigate(url);
        },
        [navigate],
    );

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
                            {filteredEvents.map((notification, idx) => (
                                <div key={idx}>
                                    <ListItem className={'badge__popper__paper__list__item'}>
                                        <ListItemText
                                            className={clsx(
                                                'badge__popper__paper__list__item__text',
                                                notification.url ? 'badge__popper__paper__list__item__text--hover' : '',
                                            )}
                                            primary={<Typography className={'list__item__text__sender'}>{notification.toName}</Typography>}
                                            secondary={
                                                <Typography className={'list__item__text__content'}>{notification.content}</Typography>
                                            }
                                            onClick={notification.url ? () => onClickNavigate(notification.url) : undefined}
                                        />
                                        <Button
                                            className={'badge__popper__paper__list__item__button'}
                                            variant='text'
                                            onClick={() => onClickRead(notification)}
                                        >
                                            읽음
                                        </Button>
                                    </ListItem>
                                    {idx < filteredEvents.length - 1 && <Divider />}
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
