import * as yup from 'yup';
import { ObjectSchema } from 'yup';
import message from '@/validations/validationMessages.ts';

export const loginSchema: ObjectSchema<yup> = yup.object().shape({
    id: yup.string().min(5, message.min('id', 5)).required(),
    password: yup.string(),
});
