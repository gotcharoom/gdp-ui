import CommonLayout from '@/common/layout/CommonLayout.tsx';
import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import withSuspense from '@/common/utils/withSuspense.tsx';
import CommonChildrenLayout from '@/common/layout/CommonChildrenLayout.tsx';

// Sample Components
const SampleUserMain = lazy(() => import('@pages/sample/SampleUserMain.tsx'));
const SampleUserMainComponent = withSuspense(SampleUserMain);
const SampleEditorPage = lazy(() => import('@pages/sample/SampleEditorPage.tsx'));
const SampleEditorPageComponent = withSuspense(SampleEditorPage);

// Common Components
const ErrorPage = lazy(() => import('@pages/common/ErrorPage.tsx'));
const ErrorPageComponent = withSuspense(ErrorPage);
const LoginPage = lazy(() => import('@pages/auth/LoginPage.tsx'));
const LoginComponent = withSuspense(LoginPage);
const AgreementPage = lazy(() => import('@pages/auth/AgreementPage.tsx'));
const AgreementComponent = withSuspense(AgreementPage);
const SignUpPage = lazy(() => import('@pages/auth/SignUpPage.tsx'));
const SignUpComponent = withSuspense(SignUpPage);
const UserInfoPage = lazy(() => import('@pages/auth/UserInfoPage.tsx'));
const UserInfoPageComponent = withSuspense(UserInfoPage);
const ChangePasswordPage = lazy(() => import('@pages/auth/ChangePasswordPage.tsx'));
const ChangePasswordPageComponent = withSuspense(ChangePasswordPage);

// Components

const UserRoutes: RouteObject[] = [
    {
        path: '/',
        element: <CommonLayout />,
        handle: { title: 'User Root', showMenu: true },
        errorElement: <ErrorPageComponent />,
        children: [
            {
                index: true,
                element: <SampleUserMainComponent />,
                handle: { title: 'Sample Main', showMenu: true },
            },
            {
                path: 'sample',
                handle: { title: 'Sample', showMenu: true },
                children: [
                    {
                        index: true,
                        element: <SampleUserMainComponent />,
                        handle: { title: 'Sample Page', showMenu: true },
                    },
                    {
                        path: 'test',
                        element: <CommonChildrenLayout />,
                        handle: { title: 'Sample Detail Test', showMenu: true },
                        children: [
                            {
                                index: true,
                                element: <SampleEditorPageComponent />,
                                handle: { title: 'List' },
                            },
                            {
                                path: ':id',
                                element: <SampleEditorPageComponent />,
                                handle: { title: 'Detail', showMenu: false },
                            },
                        ],
                    },
                    {
                        path: 'editor',
                        element: <SampleEditorPageComponent />,
                        handle: { title: 'Sample Editor', showMenu: false },
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
                path: 'user',
                children: [
                    {
                        path: 'info',
                        element: <UserInfoPageComponent />,
                        handle: { title: '내 정보' },
                    },
                    {
                        path: 'change-password',
                        element: <ChangePasswordPageComponent />,
                        handle: { title: '비밀번호 변경' },
                    },
                ],
            },
        ],
    },
];
export default UserRoutes;
