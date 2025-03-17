import * as yup from 'yup';

export const findPasswordSchema = yup
    .object({
        id: yup.string().required(),
        email: yup.string().required(),
    })
    .required();
