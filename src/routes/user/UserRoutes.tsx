import CommonLayout from '@layout/CommonLayout.tsx';
import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import withSuspense from '@utils/withSuspense.tsx';

// Components
const SampleUserMain = lazy(() => import('@pages/sample/SampleUserMain.tsx'));
const SampleUserMainComponent = withSuspense(SampleUserMain);
const SampleNotice = lazy(() => import('@pages/notice/NoticeBoard'));
const SampleNoticeComponent = withSuspense(SampleNotice);

const UserRoutes: RouteObject[] = [
    {
        path: '/',
        element: <CommonLayout />,
        handle: { title: 'User Root' },
        errorElement: <div>Need Change this</div>,
        children: [
            {
                index: true,
                element: <SampleUserMainComponent />,
                handle: { title: 'Home1' },
            },
            {
                path: 'test',
                handle: { title: 'Home2' },
                children: [
                    {
                        index: true,
                        element: <SampleUserMainComponent />,
                        handle: {
                            title: 'Home1',
                            icon: 'more-horizon',
                        },
                    },
                    {
                        path: 'test',
                        element: <SampleUserMainComponent />,
                        handle: { title: 'Home3' },
                    },
                ],
            },
            {
                path: 'notice',
                handle: { title: '게시판' },
                children: [
                    {
                        index: true,
                        element: <SampleNoticeComponent />,
                        handle: {
                            title: '공지사항',
                            icon: 'more-horizon',
                        },
                    },
                    {
                        path: ':id',
                        element: <SampleNoticeComponent />,
                        handle: {
                            title: '공지사항',
                            icon: 'more-horizon',
                        },
                    },
                ],
            },
        ],
    },
];
export default UserRoutes;
