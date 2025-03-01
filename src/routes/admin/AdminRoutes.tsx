import { RouteObject } from 'react-router-dom';
import CommonLayout from '@/common/layout/CommonLayout.tsx';
import { lazy } from 'react';
import withSuspense from '@/common/utils/withSuspense.tsx';

const SampleUserMain = lazy(() => import('@pages/sample/SampleUserMain.tsx'));
const SampleUserMainComponent = withSuspense(SampleUserMain);

// 추후 변경
const AdminRoutes: RouteObject[] = [
    {
        path: '/admin',
        element: <CommonLayout />,
        handle: { title: 'Admin Root' },
        children: [
            {
                index: true,
                element: <SampleUserMainComponent />,
                handle: { title: 'Home1' },
            },
        ],
    },
];

export default AdminRoutes;
