import { ReactNode, useCallback, useState } from 'react';
import { AlertConfigProps, AlertContext } from '@/common/contexts/AlertContext.ts';
import { Alert, Stack } from '@mui/material';

import '@styles/common/Alert.scss';

export const AlertProvider = ({ children }: { children: ReactNode }) => {
    /* Hooks */
    const [alerts, setAlerts] = useState<AlertConfigProps[]>([]);

    /* Privates */

    // 자동 삭제
    const removeAlert = useCallback(() => {
        // 3초 후 자동으로 삭제
        setTimeout(() => {
            setAlerts((prevAlerts) => prevAlerts.slice(1)); // 첫 번째 Alert 삭제
        }, 3000);
    }, []);

    // 새로운 Alert 추가
    const openAlert = useCallback(
        (config: AlertConfigProps) => {
            setAlerts((prevAlerts) => [...prevAlerts, config]);

            removeAlert();
        },
        [removeAlert],
    );

    // 특정 Alert 닫기
    const closeAlert = useCallback((index: number) => {
        setAlerts((prevAlerts) => prevAlerts.filter((_, i) => i !== index));
    }, []);

    return (
        <AlertContext.Provider value={{ openAlert }}>
            {children}

            {/* Stack을 사용하여 Alert을 쌓아 정렬 */}
            <Stack direction='column-reverse' spacing={1} className={'alert'}>
                {alerts.map((alert, index) => (
                    <Alert key={index} severity={alert.severity} icon={alert?.icon} onClose={() => closeAlert(index)}>
                        {alert.contents}
                    </Alert>
                ))}
            </Stack>
        </AlertContext.Provider>
    );
};
