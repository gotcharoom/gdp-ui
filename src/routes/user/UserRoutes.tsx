import CommonLayout from '@/common/layout/CommonLayout.tsx';
import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import withSuspense from '@/common/utils/withSuspense.tsx';

// Sample Components
const SampleUserMain = lazy(() => import('@pages/sample/SampleUserMain.tsx'));
const SampleUserMainComponent = withSuspense(SampleUserMain);
const SampleNotice = lazy(() => import('@/pages/board/notice/NoticeBoard'));
const SampleNoticeComponent = withSuspense(SampleNotice);
const SampleNoticeDetail = lazy(() => import('@/pages/board/notice/NoticeDetailPage'));
const SampleNoticeDetailComponent = withSuspense(SampleNoticeDetail);
const SampleEditorPage = lazy(() => import('@pages/sample/SampleEditorPage.tsx'));
const SampleEditorPageComponent = withSuspense(SampleEditorPage);

// Common Components
const ErrorPage = lazy(() => import('@pages/common/ErrorPage.tsx'));
const ErrorPageComponent = withSuspense(ErrorPage);
const LoginPage = lazy(() => import('@pages/common/LoginPage.tsx'));
const LoginComponent = withSuspense(LoginPage);
const AgreementPage = lazy(() => import('@pages/common/AgreementPage.tsx'));
const AgreementComponent = withSuspense(AgreementPage);
const SignUpPage = lazy(() => import('@pages/common/SignUpPage.tsx'));
const SignUpComponent = withSuspense(SignUpPage);

// Components

const UserRoutes: RouteObject[] = [
    {
        path: '/',
        element: <CommonLayout />,
        handle: { title: 'User Root' },
        errorElement: <ErrorPageComponent />,
        children: [
            {
                index: true,
                element: <SampleUserMainComponent />,
                handle: { title: 'Sample Main' },
            },
            {
                path: 'sample',
                handle: { title: 'Sample' },
                children: [
                    {
                        index: true,
                        element: <SampleUserMainComponent />,
                        handle: { title: 'Sample Page' },
                    },
                    {
                        path: 'editor',
                        element: <SampleEditorPageComponent />,
                        handle: { title: 'Sample Editor' },
                    },
                ],
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
                        handle: { title: '약관 동의' },
                    },
                    {
                        path: 'sign-up',
                        element: <SignUpComponent />,
                        handle: { title: '회원 가입' },
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
                            icon: 'more',
                        },
                    },
                    {
                        path: ':id',
                        element: <SampleNoticeDetailComponent />,
                        handle: {
                            title: '공지사항',
                            icon: 'more',
                        },
                    },
                ],
            },
        ],
    },
];
export default UserRoutes;
