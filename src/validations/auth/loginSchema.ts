import * as yup from 'yup';
import messages from '@/validations/validationMessages.ts';

// Yup 스키마 정의
export const loginSchema = yup
    .object({
        id: yup.string().min(1, messages.min('id', 1)).required(),
        password: yup.string().required(),
        rememberMe: yup.boolean().default(false).required(),
    })
    .required();
