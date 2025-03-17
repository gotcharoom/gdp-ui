import CommonLayout from '@/common/layout/CommonLayout.tsx';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import CommonPage from '@/common/components/CommonPage.tsx';

import '@styles/pages/common/ErrorPage.scss';
import { Button } from '@mui/material';

const ErrorPage = () => {
    /* Hooks */
    const [errorMessage, setErrorMessage] = useState<string>();
    const error = useRouteError() as { status?: number };
    const navigate = useNavigate();

    /* Privates */

    const routeToHome = useCallback(() => {
        navigate('/', { replace: true });
    }, [navigate]);

    /* Events */

    const onClickGoHome = useCallback(() => {
        routeToHome();
    }, [routeToHome]);

    /* Lifecycles */

    useEffect(() => {
        const status: number = error?.status ?? 500;
        let message: string = '에러가 발생했습니다';
        switch (status) {
            case 400:
                message = '잘못된 요청입니다 (Bad Request)';
                break;
            case 401:
                message = '인증되지 않은 요청입니다. (Unauthorized)';
                break;
            case 403:
                message = '접근 권한이 없습니다 (Forbidden)';
                break;
            case 404:
                message = '페이지를 찾을 수 없습니다 (Not Found)';
                break;
            case 500:
                message = '서버 내부 오류입니다 (Internal Server Error)';
                break;
            case 503:
                message = '현재 서비스를 이용할 수 없습니다 (Service Unavailable)';
                break;
        }

        setErrorMessage(message);
    }, [error?.status]);

    return (
        <CommonLayout>
            <CommonPage width={'100%'} height={'100%'} title={'Error'}>
                <div className={'error-page'}>
                    <div className={'error-page__message'}> {errorMessage}</div>
                    <div className={'error-page__route'}>
                        <Button variant='contained' onClick={onClickGoHome}>
                            홈으로 이동하기
                        </Button>
                    </div>
                </div>
            </CommonPage>
        </CommonLayout>
    );
};

export default ErrorPage;
