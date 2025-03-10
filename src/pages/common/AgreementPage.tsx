import CommonPage from '@/common/components/CommonPage.tsx';
import { useNavigate, useOutletContext } from 'react-router-dom';

import '@styles/pages/common/AgreementPage.scss';
import { Box, Button, Checkbox, FormControlLabel } from '@mui/material';
import ControlCheckbox from '@/common/components/ControlCheckbox.tsx';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { agreementSchema } from '@/validations/login/agreementSchema.ts';
import AgreementForm from '@/types/pages/login/AgreementForm.type.ts';
import * as React from 'react';
import { useCallback, useEffect, useMemo } from 'react';
import GdpTerms from '@pages/common/components/GdpTerms.tsx';

const AgreementPage = () => {
    /* Hooks */
    const { title } = useOutletContext<{ title: string }>();
    const navigate = useNavigate();
    const method = useForm<AgreementForm>({
        resolver: yupResolver(agreementSchema),
        defaultValues: {
            hasAcceptedGdpTerms: false,
            hasAcceptedPrivateTerms: false,
        },
    });

    const { hasAcceptedGdpTerms, hasAcceptedPrivateTerms } = method.watch() as AgreementForm;

    /* Privates */
    const hasAllChecked = hasAcceptedGdpTerms && hasAcceptedPrivateTerms;

    const routeToSingUp = useCallback(() => {
        navigate('/login/sign-up', { state: { agreed: true } });
    }, [navigate]);

    /* Events */
    const onClickAllCheck = useCallback(() => {
        let checked = true;
        if (hasAllChecked) {
            checked = false;
        }
        method.setValue('hasAcceptedGdpTerms' as keyof AgreementForm, checked);
        method.setValue('hasAcceptedPrivateTerms' as keyof AgreementForm, checked);
    }, [hasAllChecked, method]);

    const onSubmit = useCallback(() => {
        routeToSingUp();
    }, [routeToSingUp]);

    /* Lifecycles */

    return (
        <div className={'agreement-page'}>
            <CommonPage width={'100%'} height={'100%'} title={title}>
                <form onSubmit={method.handleSubmit(onSubmit)}>
                    <div className={'agreement-page__terms-container'}>
                        <ControlCheckbox control={method.control} field='hasAcceptedGdpTerms' label={'GDP 이용약관'} />
                        <Box className={'agreement-page__container__box'}>
                            <GdpTerms />
                        </Box>
                    </div>
                    <div className={'agreement-page__terms-container'}>
                        <ControlCheckbox control={method.control} field='hasAcceptedPrivateTerms' label={'개인정보 이용 및 수집 동의'} />
                        <Box className={'agreement-page__container__box'}>
                            <GdpTerms />
                        </Box>
                    </div>
                    <div className={'agreement-page__option-container'}>
                        <FormControlLabel control={<Checkbox checked={hasAllChecked} onChange={onClickAllCheck} />} label={'전체 동의'} />
                        <Button className={'agreement-page__submit'} variant='contained' type='submit'>
                            다음
                        </Button>
                    </div>
                </form>
            </CommonPage>
        </div>
    );
};

export default AgreementPage;
