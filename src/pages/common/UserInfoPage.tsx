import CommonPage from '@/common/components/CommonPage.tsx';
import { useOutletContext } from 'react-router-dom';
import { useCallback, useEffect } from 'react';

const UserInfoPage = () => {
    /* Hooks */
    const { title } = useOutletContext<{ title: string }>();

    /* Privates */
    const getUserInfo = useCallback(async () => {}, []);

    /* Events */

    /* Lifecycles */
    useEffect(() => {
        void getUserInfo();
    }, [getUserInfo]);

    return (
        <CommonPage width={'100%'} height={'100%'} title={title}>
            <div>test</div>
        </CommonPage>
    );
};

export default UserInfoPage;
