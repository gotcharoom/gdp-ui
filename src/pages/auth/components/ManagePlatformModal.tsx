import { Accordion, AccordionDetails, AccordionSummary, Button } from '@mui/material';
import Platform from '@/types/pages/auth/Platform.type.ts';
import { useCallback } from 'react';

import '@styles/pages/auth/components/ManagePlatforModal.scss';
import clsx from 'clsx';

interface ManagePlatformModalProps {
    platforms: Platform[];
}

const ManagePlatformModal = (props: ManagePlatformModalProps) => {
    /* Events */
    const onClickConnect = useCallback((url: string) => {
        window.location.href = url;
    }, []);

    return (
        <div className={'manage-platform-modal'}>
            {props.platforms.length > 0 ? (
                props.platforms.map((platform) => {
                    return (
                        <Accordion key={platform.platformId} className={'manage-platform-modal__accordion'}>
                            <AccordionSummary className={clsx('accordion__summary', platform.connected ? 'connected-title' : '')}>
                                <div className={'accordion__summary__title'}>{platform.platformName}</div>
                                {platform.connected && <div>(연동완료)</div>}
                            </AccordionSummary>
                            <AccordionDetails className={'accordion__details'}>
                                {platform.connected ? (
                                    <div className={'accordion__details__contents'}>
                                        <div className={'accordion__details__contents__title'}>ID :</div>
                                        <div style={{ flex: 1 }}>{platform.platformUserId}</div>
                                    </div>
                                ) : (
                                    <>
                                        <div className={'accordion__details__contents'}>연동된 계정 정보가 없습니다</div>
                                        <div>
                                            <Button variant='text' onClick={() => onClickConnect(platform.connectUrl)}>
                                                연결
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </AccordionDetails>
                        </Accordion>
                    );
                })
            ) : (
                <div>등록 가능한 플랫폼 유형이 없습니다</div>
            )}
        </div>
    );
};

export default ManagePlatformModal;
