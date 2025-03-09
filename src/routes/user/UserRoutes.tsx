import CommonLayout from '@/common/layout/CommonLayout.tsx';
import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import withSuspense from '@/common/utils/withSuspense.tsx';

// Components
const SampleUserMain = lazy(() => import('@pages/sample/SampleUserMain.tsx'));
const SampleUserMainComponent = withSuspense(SampleUserMain);
<<<<<<< HEAD
const SampleNotice = lazy(() => import('@/pages/board/notice/NoticeBoard'));
const SampleNoticeComponent = withSuspense(SampleNotice);

const LoginPage = lazy(() => import('@pages/common/LoginPage.tsx'));
const LoginComponent = withSuspense(LoginPage);
=======
>>>>>>> e323892e8112665171b1cb9f49d7327b178c8db1
const ErrorPage = lazy(() => import('@pages/common/ErrorPage.tsx'));
const ErrorPageComponent = withSuspense(ErrorPage);
const LoginPage = lazy(() => import('@pages/common/LoginPage.tsx'));
const LoginComponent = withSuspense(LoginPage);
const AgreementPage = lazy(() => import('@pages/common/AgreementPage.tsx'));
const AgreementComponent = withSuspense(AgreementPage);
const SignUpPage = lazy(() => import('@pages/common/SignUpPage.tsx'));
const SignUpComponent = withSuspense(SignUpPage);

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
                path: 'error',
                element: <ErrorPageComponent />,
                handle: { title: 'Error' },
            },
            {
                path: 'login',
                children: [
                    {
                        index: true,
                        element: <LoginComponent />,
                        handle: { title: 'Login' },
                    },
                    {
                        path: 'agreement',
                        element: <AgreementComponent />,
                        handle: { title: 'Agreement' },
                    },
                    {
                        path: 'sign-up',
                        element: <SignUpComponent />,
                        handle: { title: 'Sign Up' },
                    },
                ],
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
