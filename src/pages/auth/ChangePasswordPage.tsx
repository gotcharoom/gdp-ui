import CommonPage from '@/common/components/CommonPage.tsx';
import { Button, InputLabel } from '@mui/material';
import ControlTextField from '@/common/components/ControlTextField.tsx';
import { useOutletContext } from 'react-router-dom';
import { useGlobalForm } from '@/common/hooks/useGlobalForm.ts';
import FormName from '@/common/constants/FormName.ts';
import { yupResolver } from '@hookform/resolvers/yup';
import ChangePasswordForm from '@/types/pages/auth/ChangePasswordForm.ts';
import { changePasswordSchema } from '@/validations/auth/changePasswordSchema.ts';
import { useCallback, useEffect } from 'react';
import { AlertConfigProps } from '@/common/contexts/AlertContext.ts';
import { useAlert } from '@/common/hooks/useAlert.ts';
import useNavigationGuard from '@/common/hooks/useNavigationGuard.ts';
import { useSelector } from 'react-redux';
import { RootState } from '@stores/store.ts';

import '@styles/pages/auth/ChangePasswordPage.scss';
import { putUserPassword } from '@apis/auth/userInfo.ts';
import ApiError from '@/common/utils/ApiError.ts';

const ChangePasswordPage = () => {
    /* Hooks */
    const { title } = useOutletContext<{ title: string }>();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const { openAlert } = useAlert();

    const method = useGlobalForm<ChangePasswordForm>({
        name: FormName.SIGN_UP,
        resolver: yupResolver(changePasswordSchema),
        defaultValues: {
            prevPassword: '',
            newPassword: '',
            newPasswordConfirm: '',
        },
    });

    const { sudoNavigate } = useNavigationGuard();

    /* Privates */

    /* Events */
    const onSubmit = useCallback(
        async (form: ChangePasswordForm) => {
            try {
                await putUserPassword(form);

                const successAlert: AlertConfigProps = {
                    severity: 'success',
                    contents: '비밀번호를 변경했습니다',
                };
                openAlert(successAlert);
                method.reset();
            } catch (e) {
                console.log(e);
                if (e instanceof ApiError) {
                    const failAlert: AlertConfigProps = {
                        severity: 'error',
                        contents: e.message,
                    };
                    openAlert(failAlert);
                } else {
                    const errorAlert: AlertConfigProps = {
                        severity: 'error',
                        contents: '오류 발생으로 변경 사항을 저장하지 못했습니다',
                    };
                    openAlert(errorAlert);
                }
            }
        },
        [method, openAlert],
    );

    const onClickCancel = useCallback(() => {
        method.reset();
        void sudoNavigate('/');
    }, [method, sudoNavigate]);

    /* Lifecycles */
    useEffect(() => {
        if (!isAuthenticated) {
            void sudoNavigate('/');
            return;
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={'change-password-page'}>
            <CommonPage width={'100%'} height={'100%'} title={title}>
                <form onSubmit={method.handleSubmit(onSubmit)}>
                    <div className={'change-password-page__input-section'}>
                        <div className={'input-section__input-container'}>
                            <InputLabel className={'input-container__label'}>비밀번호</InputLabel>
                            <ControlTextField
                                className={'input-container__text-field'}
                                type='password'
                                method={method}
                                field={'prevPassword'}
                            />
                        </div>
                        <div className={'input-section__input-container'}>
                            <InputLabel className={'input-container__label'}>변경 비밀번호</InputLabel>
                            <ControlTextField
                                className={'input-container__text-field'}
                                type='password'
                                method={method}
                                field={'newPassword'}
                            />
                        </div>
                        <div className={'input-section__input-container'}>
                            <InputLabel className={'input-container__label'}>변경 비밀번호 확인</InputLabel>
                            <ControlTextField
                                className={'input-container__text-field'}
                                type='password'
                                method={method}
                                field={'newPasswordConfirm'}
                            />
                        </div>
                    </div>
                    <div className={'change-password-page__button-section'}>
                        <Button className={'button-section__button'} variant='contained' type={'submit'}>
                            저장
                        </Button>
                        <Button className={'button-section__button'} variant='outlined' onClick={onClickCancel}>
                            취소
                        </Button>
                    </div>
                </form>
            </CommonPage>
        </div>
    );
};

export default ChangePasswordPage;
