import CommonPage from '@/common/components/CommonPage.tsx';
import { useOutletContext } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Avatar, Button, InputLabel, Tooltip } from '@mui/material';
import ControlTextField from '@/common/components/ControlTextField.tsx';
import { useGlobalForm } from '@/common/hooks/useGlobalForm.ts';
import FormName from '@/common/constants/FormName.ts';
import { yupResolver } from '@hookform/resolvers/yup';
import PageMode from '@/common/constants/PageMode.ts';
import { userInfoSchema } from '@/validations/auth/userInfoSchema.ts';
import UserInfoForm from '@/types/pages/auth/UserInfoForm.type.ts';
import useNavigationGuard from '@/common/hooks/useNavigationGuard.ts';
import usePageMode from '@/common/hooks/usePageMode.ts';
import { getUserDetails, putClearCookie, putUserDetails } from '@apis/auth/userInfo.ts';
import { AlertConfigProps } from '@/common/contexts/AlertContext.ts';
import { useAlert } from '@/common/hooks/useAlert.ts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@stores/store.ts';
import { useModal } from '@/common/hooks/useModal.ts';
import { CommonModalProps } from '@/common/contexts/ModalContext.ts';
import ProfileAvatarModal from '@pages/auth/components/ProfileAvatarModal.tsx';
import imageCropUtil from '@/common/utils/imageCropUtil.ts';
import { Area } from 'react-easy-crop';
import { resetAvatar } from '@/common/utils/avatarUtil.ts';

import '@styles/pages/auth/UserInfoPage.scss';
import { setUser } from '@stores/slices/userSlice.ts';
import { getLoginUserInfo } from '@apis/auth/login.ts';
import ManagePlatformModal from '@pages/auth/components/ManagePlatformModal.tsx';

const initData: UserInfoForm = {
    id: '',
    email: '',
    nickname: '',
    name: '',
    platforms: [],
    socials: {},
    imageUrl: undefined,
    imageCropArea: undefined,
};

const UserInfoPage = () => {
    /* Hooks */
    const { title } = useOutletContext<{ title: string }>();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const { pageMode, setPageMode, resetPageMode } = usePageMode();
    const [userData, setUserData] = useState<UserInfoForm>(initData);
    const { openAlert } = useAlert();
    const { openModal, closeModal } = useModal();
    const [croppedImage, setCroppedImage] = useState<string | undefined>(undefined);
    const method = useGlobalForm<UserInfoForm>({
        name: FormName.SIGN_UP,
        resolver: yupResolver(userInfoSchema),
        defaultValues: userData,
    });
    const dispatch = useDispatch();

    const { sudoNavigate } = useNavigationGuard();

    /* Privates */
    const isReadOnly = useMemo(() => {
        return pageMode == PageMode.READ;
    }, [pageMode]);

    const successMessage = useMemo(() => {
        return '사용 가능합니다';
    }, []);

    const profileClass = useMemo(() => {
        if (pageMode == PageMode.MODIFY) {
            return 'avatar_section__avatar--modify';
        }

        return 'avatar_section__avatar--read';
    }, [pageMode]);

    const updateUserState = useCallback(async () => {
        const updatedUserInfo = await getLoginUserInfo();
        dispatch(setUser(updatedUserInfo)); // Redux 상태 업데이트
    }, [dispatch]);

    const getUserInfo = useCallback(async () => {
        try {
            const data = await getUserDetails();

            const userInfo: UserInfoForm = {
                ...initData,
                ...data,
                platforms: data.platforms ?? [],
                socials: data.socials ?? {},
                imageUrl: data.imageUrl ?? undefined,
                imageCropArea: data.imageCropArea ?? undefined,
            };

            setUserData(userInfo);
            method.reset(userInfo);
            await resetAvatar(userInfo?.imageUrl, userInfo?.imageCropArea, setCroppedImage);
        } catch (e) {
            console.log(e);
            setUserData(initData);
        }
    }, [method]);

    const saveImages = useCallback(
        async (targetImage: string | undefined, targetArea: Area | undefined) => {
            method.setValue('imageUrl' as keyof UserInfoForm, targetImage, { shouldDirty: true });
            method.setValue('imageCropArea' as keyof UserInfoForm, targetArea, { shouldDirty: true });

            if (!targetImage) {
                setCroppedImage(undefined);
                closeModal();
                return;
            }

            if (!targetArea) {
                setCroppedImage(targetImage);
                closeModal();
                return;
            }
            try {
                const croppedImg = await imageCropUtil(targetImage, targetArea);
                setCroppedImage(croppedImg);
            } catch (error) {
                console.error('Error cropping image:', error);
                setCroppedImage(targetImage);
            }

            closeModal();
        },
        [closeModal, method],
    );

    const connectionCookie = useMemo(() => {
        const match = document.cookie.match(new RegExp('(^| )platform_connection=([^;]+)'));
        return match ? match[2] : null;
    }, []);

    const putClearConnectionCookie = useCallback(async () => {
        await putClearCookie();
    }, []);

    /* Events */
    const onChangeMode = useCallback(
        async (mode: PageMode) => {
            const isChanged = await setPageMode(mode);
            if (isChanged && mode === PageMode.READ) method.reset(userData);
            return isChanged;
        },
        [method, setPageMode, userData],
    );

    const onClickCancel = useCallback(async () => {
        const isChanged = await onChangeMode(PageMode.READ);
        if (isChanged) {
            method.reset(userData);
            await resetAvatar(userData?.imageUrl, userData?.imageCropArea, setCroppedImage);
        }
    }, [onChangeMode, method, userData]);

    const onSubmit = useCallback(
        async (forms: UserInfoForm) => {
            try {
                await putUserDetails(forms);

                const successAlert: AlertConfigProps = {
                    severity: 'success',
                    contents: '변경 사항이 저장됐습니다',
                };
                openAlert(successAlert);

                resetPageMode();
                void updateUserState();
                void getUserInfo();
            } catch (e) {
                console.log(e);
                const errorAlert: AlertConfigProps = {
                    severity: 'error',
                    contents: '오류 발생으로 변경 사항을 저장하지 못했습니다',
                };
                openAlert(errorAlert);
            }
        },
        [getUserInfo, openAlert, resetPageMode, updateUserState],
    );

    const onCloseModal = useCallback(() => {
        closeModal();
    }, [closeModal]);

    const onClickChangeAvatar = useCallback(() => {
        if (pageMode !== PageMode.MODIFY) {
            return;
        }

        const image = method.getValues().imageUrl;
        const area = method.getValues().imageCropArea;

        const config: CommonModalProps = {
            title: 'Avatar 변경',
            open: true,
            width: '700px',
            height: '500px',
            contents: <ProfileAvatarModal close={onCloseModal} save={saveImages} image={image} area={area} />,
            formName: FormName.FIND_ID,
        };

        openModal(config);
    }, [method, onCloseModal, openModal, pageMode, saveImages]);

    const onClickManagePlatform = useCallback(() => {
        const platforms = method.getValues().platforms;

        const config: CommonModalProps = {
            title: '플랫폼 관리',
            open: true,
            width: '700px',
            height: '500px',
            contents: <ManagePlatformModal platforms={platforms} />,
        };

        openModal(config);
    }, [method, openModal]);

    /* Lifecycles */
    useEffect(() => {
        if (!isAuthenticated) {
            void sudoNavigate('/');
            return;
        }

        void getUserInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        return () => {
            resetPageMode();
            method.reset(initData);
            void resetAvatar(undefined, undefined, setCroppedImage);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        console.log('폼 유효성 검사 결과:', method.formState.errors);
    }, [method.formState]);

    useEffect(() => {
        if (connectionCookie !== null && connectionCookie == 'true') {
            const successAlert: AlertConfigProps = {
                severity: 'success',
                contents: '연동되었습니다',
            };
            openAlert(successAlert);
            void putClearConnectionCookie();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={'user-info-page'}>
            <CommonPage width={'100%'} height={'100%'} title={title}>
                <form onSubmit={method.handleSubmit(onSubmit)}>
                    <div className={'user-info-page__section-title'}>프로필</div>
                    <div className={'user-info-page__profile-section'}>
                        <div className={'profile-section__input-section'}>
                            <div className={'input-section__input-container'}>
                                <InputLabel className={'input-container__label'}>ID</InputLabel>
                                <ControlTextField className={'input-container__text-field'} method={method} field={'id'} readOnly />
                            </div>
                            <div className={'input-section__input-container'}>
                                <InputLabel className={'input-container__label'}>Email</InputLabel>
                                <ControlTextField
                                    className={'input-container__text-field'}
                                    method={method}
                                    field={'email'}
                                    readOnly={isReadOnly}
                                    successHelpText={successMessage}
                                    checkImmediately
                                />
                            </div>
                            <div className={'input-section__input-container'}>
                                <InputLabel className={'input-container__label'}>이름</InputLabel>
                                <ControlTextField
                                    className={'input-container__text-field'}
                                    method={method}
                                    field={'name'}
                                    readOnly={isReadOnly}
                                    successHelpText={successMessage}
                                    checkImmediately
                                />
                            </div>
                            <div className={'input-section__input-container'}>
                                <InputLabel className={'input-container__label'}>닉네임</InputLabel>
                                <ControlTextField
                                    className={'input-container__text-field'}
                                    method={method}
                                    field={'nickname'}
                                    readOnly={isReadOnly}
                                    successHelpText={successMessage}
                                    checkImmediately
                                />
                            </div>
                        </div>
                        <div className={'profile-section__avatar-section'}>
                            <Tooltip
                                title='Change Your Avatar'
                                disableHoverListener={pageMode === PageMode.READ}
                                disableFocusListener={pageMode === PageMode.READ}
                            >
                                <Avatar
                                    src={croppedImage}
                                    className={profileClass}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                    }}
                                    onClick={onClickChangeAvatar}
                                />
                            </Tooltip>
                        </div>
                    </div>
                    {pageMode == PageMode.READ && (
                        <>
                            <div className={'user-info-page__section-title'}>연동 정보</div>
                            <div className={'user-info-page__sync-section'}>
                                <div className={'input-section__input-container'}>
                                    <InputLabel className={'input-container__label'}>플랫폼 연동</InputLabel>
                                    <div className={'input-container__contents'}>
                                        {method
                                            .getValues()
                                            .platforms.filter((platform) => platform.connected)
                                            .map((platform) => {
                                                return (
                                                    <div
                                                        className={'contents__platform-container'}
                                                        key={'platform-container' + platform.platformId}
                                                    >
                                                        <div
                                                            className={'platform-container__platform-name'}
                                                            key={'platform-name' + platform.platformId}
                                                        >
                                                            {platform.platformName}
                                                        </div>
                                                        <div
                                                            className={'platform-container__platform-user-id'}
                                                            key={'platform-user-id' + platform.platformId}
                                                        >
                                                            {platform.platformUserId}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                </div>
                                <div className={'input-section__input-container'}>
                                    <InputLabel className={'input-container__label'}>소셜 연동</InputLabel>
                                    <ControlTextField
                                        className={'input-container__text-field'}
                                        method={method}
                                        field={'id'}
                                        readOnly={isReadOnly}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                    <div className={'user-info-page__button-section'}>
                        {pageMode == PageMode.READ && (
                            <>
                                <div className={'button-section__connection-container'}>
                                    <Button
                                        className={'connection-container__platform-button'}
                                        variant='contained'
                                        onClick={onClickManagePlatform}
                                    >
                                        플랫폼 관리
                                    </Button>
                                    <Button className={'connection-container__social-button'} variant='contained'>
                                        소셜 관리
                                    </Button>
                                </div>
                                <div className={'button-section__modify-container'}>
                                    <Button
                                        className={'.modify_container__modify-button'}
                                        variant='contained'
                                        onClick={() => onChangeMode(PageMode.MODIFY)}
                                    >
                                        수정
                                    </Button>
                                </div>
                            </>
                        )}
                        {pageMode == PageMode.MODIFY && (
                            <div className={'button-section__modify-container'}>
                                <Button className={'button-section__button'} variant='contained' type='submit'>
                                    저장
                                </Button>
                                <Button className={'button-section__button'} variant='outlined' onClick={onClickCancel}>
                                    취소
                                </Button>
                            </div>
                        )}
                    </div>
                </form>
            </CommonPage>
        </div>
    );
};

export default UserInfoPage;
