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
import UserInfoForm from '@/types/pages/auth/UserInfoForm.ts';
import useNavigationGuard from '@/common/hooks/useNavigationGuard.ts';
import usePageMode from '@/common/hooks/usePageMode.ts';
import { getUserDetails, putUserDetails } from '@apis/auth/userInfo.ts';
import { AlertConfigProps } from '@/common/contexts/AlertContext.ts';
import { useAlert } from '@/common/hooks/useAlert.ts';
import { useSelector } from 'react-redux';
import { RootState } from '@stores/store.ts';

import '@styles/pages/auth/UserInfoPage.scss';
import { useModal } from '@/common/hooks/useModal.ts';
import { CommonModalProps } from '@/common/contexts/ModalContext.ts';
import ProfileAvatarModal from '@pages/auth/components/ProfileAvatarModal.tsx';
import imageCropUtil, { createImageFromImageUrl } from '@/common/utils/imageCropUtil.ts';
import { Area } from 'react-easy-crop';
import { ResponseCode } from '@/common/utils/ReponseCodeUtil.ts';
import { resetAvatar } from '@/common/utils/avatarUtil.ts';

const initData: UserInfoForm = {
    id: '',
    email: '',
    nickname: '',
    name: '',
    platforms: {},
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

    const getUserInfo = useCallback(async () => {
        try {
            const data = await getUserDetails();

            const userInfo: UserInfoForm = {
                ...initData,
                ...data,
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
                const response = await putUserDetails(forms);

                if (response.code !== ResponseCode.SUCCESS.code) {
                    throw new Error();
                }

                const successAlert: AlertConfigProps = {
                    severity: 'success',
                    contents: '변경 사항이 저장됐습니다',
                };
                openAlert(successAlert);

                resetPageMode();
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
        [getUserInfo, openAlert, resetPageMode],
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
                                    <ControlTextField
                                        className={'input-container__text-field'}
                                        method={method}
                                        field={'id'}
                                        readOnly={isReadOnly}
                                    />
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
                            <Button className={'button-section__button'} variant='contained' onClick={() => onChangeMode(PageMode.MODIFY)}>
                                수정
                            </Button>
                        )}
                        {pageMode == PageMode.MODIFY && (
                            <>
                                <Button className={'button-section__button'} variant='contained' type='submit'>
                                    저장
                                </Button>
                                <Button className={'button-section__button'} variant='outlined' onClick={onClickCancel}>
                                    취소
                                </Button>
                            </>
                        )}
                    </div>
                </form>
            </CommonPage>
        </div>
    );
};

export default UserInfoPage;
