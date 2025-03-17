import * as yup from 'yup';

export const findIdSchema = yup
    .object({
        email: yup.string().required(),
    })
    .required();
