import CommonLayout from '@layout/CommonLayout.tsx';
import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import withSuspense from '@utils/withSuspense.tsx';

// Components
const SampleUserMain = lazy(() => import('@pages/sample/SampleUserMain.tsx'));
const SampleUserMainComponent = withSuspense(SampleUserMain);

const UserRoutes: RouteObject[] = [
    {
        path: '/',
        element: <CommonLayout />,
        handle: { title: 'Home' },
        children: [
            {
                path: 'test',
                element: <SampleUserMainComponent />,
                handle: { title: 'Home2' },
            },
        ],
    },
];
export default UserRoutes;
