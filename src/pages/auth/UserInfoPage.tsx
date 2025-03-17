import CommonPage from '@/common/components/CommonPage.tsx';
import { useOutletContext } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, InputLabel } from '@mui/material';
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

const initData: UserInfoForm = {
    id: '',
    email: '',
    nickname: '',
    name: '',
    platforms: {},
    socials: {},
};

const UserInfoPage = () => {
    /* Hooks */
    const { title } = useOutletContext<{ title: string }>();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const { pageMode, setPageMode, resetPageMode } = usePageMode();
    const [userData, setUserData] = useState<UserInfoForm>(initData);
    const { openAlert } = useAlert();

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

    const getUserInfo = useCallback(async () => {
        try {
            const data = await getUserDetails();

            const userInfo: UserInfoForm = {
                ...initData,
                ...data,
            };

            setUserData(userInfo);
            method.reset(userInfo);
        } catch (e) {
            console.log(e);
            setUserData(initData);
        }
    }, [method]);

    /* Events */
    const onChangeMode = useCallback(
        (mode: PageMode) => {
            return setPageMode(mode);
        },
        [setPageMode],
    );

    const onClickCancel = useCallback(async () => {
        const isChanged = await onChangeMode(PageMode.READ);
        if (isChanged) method.reset(userData);
    }, [userData, method, onChangeMode]);

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
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={'user-info-page'}>
            <CommonPage width={'100%'} height={'100%'} title={title}>
                <form onSubmit={method.handleSubmit(onSubmit)}>
                    <div className={'user-info-page__input-section'}>
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
                            />
                        </div>
                        <div className={'input-section__input-container'}>
                            <InputLabel className={'input-container__label'}>닉네임</InputLabel>
                            <ControlTextField
                                className={'input-container__text-field'}
                                method={method}
                                field={'nickname'}
                                readOnly={isReadOnly}
                            />
                        </div>
                        {pageMode == PageMode.READ && (
                            <>
                                <div className={'input-section__input-container'}>
                                    <InputLabel className={'input-container__label'}>플랫폼 연동</InputLabel>
                                    <ControlTextField
                                        className={'input-container__text-field'}
                                        method={method}
                                        field={'newPasswordConfirm'}
                                        readOnly={isReadOnly}
                                    />
                                </div>
                                <div className={'input-section__input-container'}>
                                    <InputLabel className={'input-container__label'}>소셜 연동</InputLabel>
                                    <ControlTextField
                                        className={'input-container__text-field'}
                                        method={method}
                                        field={'newPasswordConfirm'}
                                        readOnly={isReadOnly}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                    <div className={'user-info-page__button-section'}>
                        {pageMode == PageMode.READ && (
                            <Button className={'button-section__button'} variant='contained' onClick={() => onChangeMode(PageMode.MODIFY)}>
                                수정
                            </Button>
                        )}
                        {pageMode == PageMode.MODIFY && (
                            <>
                                <Button className={'button-section__button'} variant='contained' type={'submit'}>
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
