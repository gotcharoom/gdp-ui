import * as yup from 'yup';
import { InferType } from 'yup';
import messages from '@/validations/validationMessages.ts';

export interface Login {
    id: string;
    password: string;
}

// Yup 스키마 정의
export const loginSchema = yup
    .object({
        id: yup.string().min(1, messages.min('id', 1)).required(),
        password: yup.string().required(),
    })
    .required();

// 타입을 자동으로 추론
export type LoginSchema = InferType<typeof loginSchema>;
