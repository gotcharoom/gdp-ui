import * as yup from 'yup';
import { ObjectSchema } from 'yup';
import messages from '@/validations/validationMessages.ts';

export const loginSchema: ObjectSchema<yup> = yup.object().shape({
    id: yup.string().min(1, messages.min('id', 1)).required(),
    password: yup.string(),
});
