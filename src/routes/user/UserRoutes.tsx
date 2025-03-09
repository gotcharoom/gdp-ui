import CommonLayout from '@/common/layout/CommonLayout.tsx';
import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import withSuspense from '@/common/utils/withSuspense.tsx';

// Components
const SampleUserMain = lazy(() => import('@pages/sample/SampleUserMain.tsx'));
const SampleUserMainComponent = withSuspense(SampleUserMain);
const SampleNotice = lazy(() => import('@/pages/board/notice/NoticeBoard'));
const SampleNoticeComponent = withSuspense(SampleNotice);

const LoginPage = lazy(() => import('@pages/common/LoginPage.tsx'));
const LoginComponent = withSuspense(LoginPage);
const ErrorPage = lazy(() => import('@pages/common/ErrorPage.tsx'));
const ErrorPageComponent = withSuspense(ErrorPage);

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
                path: 'login',
                element: <LoginComponent />,
                handle: { title: 'Login' },
            },
            {
                path: 'error',
                element: <ErrorPageComponent />,
                handle: { title: 'Error' },
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
