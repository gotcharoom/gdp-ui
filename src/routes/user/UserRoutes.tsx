import CommonLayout from '@/common/layout/CommonLayout.tsx';
import { Outlet, RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import withSuspense from '@/common/utils/withSuspense.tsx';
import { RoutesContext } from '@/common/contexts/RoutesContext.ts';
import CommonChildrenLayout from '@/common/layout/CommonChildrenLayout.tsx';

// Sample Components
const SampleUserMain = lazy(() => import('@pages/sample/SampleUserMain.tsx'));
const SampleUserMainComponent = withSuspense(SampleUserMain);
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
const Notice = lazy(() => import('@/pages/board/notice/NoticeBoard'));
const NoticeComponent = withSuspense(Notice);
const NoticeDetail = lazy(() => import('@/pages/board/notice/NoticeDetailPage'));
const NoticeDetailComponent = withSuspense(NoticeDetail);
const Bulletin = lazy(() => import('@pages/board/bulletin/BulletinBoard'));
const BulletinComponent = withSuspense(Bulletin);
const BulletinDetail = lazy(() => import('@/pages/board/bulletin/BulletinDetailPage'));
const BulletinDetailComponent = withSuspense(BulletinDetail);
const BulletinWrtie = lazy(() => import('@pages/board/bulletin/BulletinBoardWrite'));
const BulletinWriteComponent = withSuspense(BulletinWrtie);

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
                        path: 'test',
                        element: <CommonChildrenLayout />,
                        handle: { title: 'Sample Detail Test' },
                        children: [
                            {
                                index: true,
                                element: <SampleEditorPageComponent />,
                                handle: { title: 'List' },
                            },
                            {
                                path: ':id',
                                element: <SampleEditorPageComponent />,
                                handle: { title: 'Detail' },
                            },
                        ],
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
                path: 'board',
                handle: { title: '게시판' },
                children: [
                    {
                        path: 'notice',
                        element: <CommonChildrenLayout />,
                        handle: {
                            title: '공지사항',
                            icon: 'more',
                        },
                        children: [
                            { index: true, element: <NoticeComponent /> },

                            {
                                path: ':id',
                                element: <NoticeDetailComponent />,
                                handle: {
                                    title: '공지사항',
                                    icon: 'more',
                                },
                            },
                        ],
                    },

                    {
                        path: 'bulletin',
                        element: <CommonChildrenLayout />,
                        handle: {
                            title: '자유게시판',
                            icon: 'more',
                        },
                        children: [
                            { index: true, element: <BulletinComponent /> },

                            {
                                path: ':id',
                                element: <BulletinDetailComponent />,
                                handle: {
                                    title: '자유게시판',
                                    icon: 'more',
                                },
                            },
                            {
                                path: 'write',
                                element: <BulletinWriteComponent />,
                                handle: {
                                    title: '작성페이지',
                                    icon: 'more',
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    },
];
export default UserRoutes;
