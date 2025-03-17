import * as yup from 'yup';

// Yup 스키마 정의
export const agreementSchema = yup
    .object({
        hasAcceptedGdpTerms: yup.boolean().required(),
        hasAcceptedPrivateTerms: yup.boolean().required(),
    })
    .required();
