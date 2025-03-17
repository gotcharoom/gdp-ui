import * as yup from 'yup';

export const changePasswordSchema = yup
    .object({
        prevPassword: yup.string().required(),
        newPassword: yup.string().required(),
        newPasswordConfirm: yup.string().required(),
    })
    .required();
