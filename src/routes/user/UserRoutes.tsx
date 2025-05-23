import CommonLayout from '@/common/layout/CommonLayout.tsx';
import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import withSuspense from '@/common/utils/withSuspense.tsx';
import CommonChildrenLayout from '@/common/layout/CommonChildrenLayout.tsx';
import withProtect from '@/common/utils/withProtect.tsx';
import SocialType from '@/common/constants/SocialType.ts';

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
const ProtectedChangePasswordPageComponent = withProtect(ChangePasswordPageComponent, { allowSocialType: SocialType.GDP });

// Components

// Achievement
const DisplayStand = lazy(() => import('@/pages/achievement/displayStand/DisplayStandBoard'));
const DisplayStandComponent = withSuspense(DisplayStand);
const Album = lazy(() => import('@/pages/achievement/album/AlbumBoard'));
const AlbumComponent = withSuspense(Album);
const AchievementTest = withSuspense(lazy(() => import('@/pages/achievement/AchievementTest')));

//Notices
const Notice = lazy(() => import('@/pages/board/notice/NoticeBoard'));
const NoticeComponent = withSuspense(Notice);
const NoticeDetail = lazy(() => import('@/pages/board/notice/NoticeDetailPage'));
const NoticeDetailComponent = withSuspense(NoticeDetail);
const Bulletin = lazy(() => import('@pages/board/bulletin/BulletinBoard'));
const BulletinComponent = withSuspense(Bulletin);
const BulletinDetail = lazy(() => import('@/pages/board/bulletin/BulletinDetailPage'));
const BulletinDetailComponent = withSuspense(BulletinDetail);
const BulletinWrite = lazy(() => import('@pages/board/bulletin/BulletinBoardWrite'));
const BulletinWriteComponent = withSuspense(BulletinWrite);
const BulletinModify = lazy(() => import('@pages/board/bulletin/BulletinBoardModify'));
const BulletinModifyComponent = withSuspense(BulletinModify);
//CSR(고객센터)
const Representative = lazy(() => import('@/pages/csr/Representative'));
const RepresentativeComponent = withSuspense(Representative);
const CsrFaqPage = lazy(() => import('@/pages/csr/CsrFaqPage'));
const CsrFaqPageComponent = withSuspense(CsrFaqPage);
const CsrFaqDetailPage = lazy(() => import('@/pages/csr/CsrFaqDetailPage'));
const CsrFaqDetailPageComponent = withSuspense(CsrFaqDetailPage);

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
                path: 'achievement',
                handle: { title: '도전과제 전시대', showMenu: true },
                children: [
                    {
                        path: 'displayStand',
                        element: <DisplayStandComponent />,
                        handle: { title: '전시대 목록', showMenu: true },
                        children: [
                            {
                                index: true,
                                path: ':id',
                                element: <DisplayStandComponent />,
                                handle: {
                                    title: 'adfasdf',
                                    icon: 'more',
                                    showManu: true,
                                },
                            },
                        ],
                    },
                    {
                        path: 'album',
                        element: <AlbumComponent />,
                        handle: { title: '앨범 목록(임시)', showMenu: true },
                        children: [
                            {
                                index: true,
                                path: ':id',
                                element: <AlbumComponent />,
                                handle: {
                                    title: 'adfasdf',
                                    icon: 'more',
                                    showManu: true,
                                },
                            },
                        ],
                    },
                    {
                        path: 'test',
                        element: <AchievementTest />,
                        handle: { title: '테스트 페이지', showMenu: true },
                    },
                ],
            },

            {
                path: 'board',
                handle: { title: '게시판', showMenu: true },
                children: [
                    {
                        path: 'notice',
                        element: <CommonChildrenLayout />,
                        handle: {
                            title: '공지사항',
                            icon: 'more',
                            showMenu: true,
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
                            showMenu: true,
                        },
                        children: [
                            { index: true, element: <BulletinComponent />, handle: { showMenu: true } },

                            {
                                path: ':id',
                                element: <CommonChildrenLayout />,
                                handle: {
                                    title: '자유게시판',
                                    icon: 'more',
                                },

                                children: [
                                    { index: true, element: <BulletinDetailComponent /> },
                                    {
                                        path: 'modify',
                                        element: <BulletinModifyComponent />,
                                        handle: {
                                            title: '수정페이지',
                                            icon: 'more',
                                        },
                                    },
                                ],
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
                        element: <ProtectedChangePasswordPageComponent />,
                        handle: { title: '비밀번호 변경' },
                    },
                ],
            },
            {
                path: 'Csr',
                handle: {
                    title: '고객센터',
                    showMenu: true,
                },

                children: [
                    { index: true, element: <RepresentativeComponent />, handle: { showMenu: true } },
                    {
                        path: 'faq',

                        handle: { title: '고객센터' },
                        children: [
                            { index: true, element: <CsrFaqPageComponent />, handle: { showMenu: true } },
                            {
                                path: ':id',
                                element: <CsrFaqDetailPageComponent />,
                                handle: { title: '고객센터 상세페이지' },
                            },
                        ],
                    },
                ],
            },
        ],
    },
];
export default UserRoutes;
