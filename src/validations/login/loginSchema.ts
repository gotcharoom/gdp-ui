import * as yup from 'yup';
import { ObjectSchema } from 'yup';

export const loginSchema: ObjectSchema<yup> = yup.object().shape({
    id: yup.string().min(5).required(),
    password: yup.string(),
});
