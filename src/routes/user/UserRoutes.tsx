import CommonLayout from '@/common/layout/CommonLayout.tsx';
import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import withSuspense from '@/common/utils/withSuspense.tsx';

// Components
const SampleUserMain = lazy(() => import('@pages/sample/SampleUserMain.tsx'));
const SampleUserMainComponent = withSuspense(SampleUserMain);
const SampleEditorPage = lazy(() => import('@pages/sample/SampleEditorPage.tsx'));
const SampleEditorPageComponent = withSuspense(SampleEditorPage);
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
        errorElement: <ErrorPageComponent />,
        children: [
            {
                index: true,
                element: <SampleUserMainComponent />,
                handle: { title: 'HomeTest' },
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
                            icon: 'more',
                        },
                    },
                    {
                        path: 'test',
                        element: <SampleUserMainComponent />,
                        handle: { title: 'Home3' },
                    },
                    {
                        path: 'editor',
                        element: <SampleEditorPageComponent />,
                        handle: { title: 'Editor' },
                    },
                ],
            },
        ],
    },
];
export default UserRoutes;
