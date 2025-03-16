import CommonPage from '@/common/components/CommonPage.tsx';
import { useOutletContext } from 'react-router-dom';
import { useCallback, useEffect, useMemo } from 'react';
import { Button, InputLabel } from '@mui/material';
import ControlTextField from '@/common/components/ControlTextField.tsx';
import { useGlobalForm } from '@/common/hooks/useGlobalForm.ts';
import FormName from '@/common/constants/FormName.ts';
import { yupResolver } from '@hookform/resolvers/yup';

import '@styles/pages/common/UserInfoPage.scss';
import PageMode from '@/common/constants/PageMode.ts';
import { userInfoSchema } from '@/validations/userInfo/userInfoSchema.ts';
import UserInfoForm from '@/types/pages/login/UserInfoForm.ts';
import useNavigationGuard from '@/common/hooks/useNavigationGuard.ts';
import usePageMode from '@/common/hooks/usePageMode.ts';

const UserInfoPage = () => {
    /* Hooks */
    const { title } = useOutletContext<{ title: string }>();
    const { pageMode, setPageMode } = usePageMode();

    const method = useGlobalForm<UserInfoForm>({
        name: FormName.SIGN_UP,
        resolver: yupResolver(userInfoSchema),
        defaultValues: {
            id: '',
            prevPassword: '',
            newPassword: '',
            newPasswordConfirm: '',
            email: '',
            nickname: '',
        },
    });

    useNavigationGuard();

    /* Privates */
    const isReadOnly = useMemo(() => {
        return pageMode == PageMode.READ;
    }, [pageMode]);

    const getUserInfo = useCallback(async () => {}, []);

    /* Events */
    const onChangeMode = useCallback(
        (mode: PageMode) => {
            return setPageMode(mode);
        },
        [setPageMode],
    );

    const onClickCancel = useCallback(async () => {
        const isChanged = await onChangeMode(PageMode.READ);
        if (isChanged) method.reset();
    }, [method, onChangeMode]);

    const onSubmit = useCallback(() => {}, []);

    /* Lifecycles */
    useEffect(() => {
        void getUserInfo();
    }, [getUserInfo]);

    return (
        <div className={'user-info-page'}>
            <CommonPage width={'100%'} height={'100%'} title={title}>
                <form onSubmit={method.handleSubmit(onSubmit)}>
                    <div className={'user-info-page__input-section'}>
                        <div className={'input-section__input-container'}>
                            <InputLabel className={'input-container__label'}>ID</InputLabel>
                            <ControlTextField
                                className={'input-container__text-field'}
                                method={method}
                                field={'id'}
                                readOnly={isReadOnly}
                            />
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
                        {pageMode == PageMode.MODIFY && (
                            <>
                                <div className={'input-section__input-container'}>
                                    <InputLabel className={'input-container__label'}>비밀번호</InputLabel>
                                    <ControlTextField
                                        className={'input-container__text-field'}
                                        method={method}
                                        field={'prevPassword'}
                                        readOnly={isReadOnly}
                                    />
                                </div>
                                <div className={'input-section__input-container'}>
                                    <InputLabel className={'input-container__label'}>변경 비밀번호</InputLabel>
                                    <ControlTextField
                                        className={'input-container__text-field'}
                                        method={method}
                                        field={'newPassword'}
                                        readOnly={isReadOnly}
                                    />
                                </div>
                                <div className={'input-section__input-container'}>
                                    <InputLabel className={'input-container__label'}>변경 비밀번호 확인</InputLabel>
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
