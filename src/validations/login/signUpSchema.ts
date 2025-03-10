import * as yup from 'yup';
import { getDuplicateCheckEmail, getDuplicateCheckId, getDuplicateCheckNickname } from '@apis/auth/signUp.ts';
import SignUpRequestForm from '@/types/pages/login/SignUpRequestForm.ts';

export const signUpSchema = yup
    .object({
        id: yup
            .string()
            .min(6)
            .test('check-duplicate', '중복된 ID 입니다', (value) => checkDuplicate(value, 'id'))
            .required(),
        password: yup.string().required(),
        passwordConfirm: yup.string().required(),
        email: yup
            .string()
            .test('check-duplicate', '중복된 ID 입니다', (value) => checkDuplicate(value, 'email'))
            .required(),
        nickname: yup
            .string()
            .test('check-duplicate', '중복된 ID 입니다', (value) => checkDuplicate(value, 'nickname'))
            .required(),
    })
    .required();

const apis = {
    id: (value: string) => getDuplicateCheckId(value),
    email: (value: string) => getDuplicateCheckEmail(value),
    nickname: (value: string) => getDuplicateCheckNickname(value),
};

const checkDuplicate = async (value: string | undefined, fieldName: keyof SignUpRequestForm) => {
    return await apis[fieldName](value);
};
