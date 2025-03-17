import * as yup from 'yup';
import { checkDuplicate } from '@/common/utils/userUtils.ts';

export const userInfoSchema = yup
    .object({
        id: yup
            .string()
            .min(6)
            .test('check-duplicate', '중복된 ID 입니다', (value) => checkDuplicate(value, 'id'))
            .required(),
        email: yup
            .string()
            .test('check-duplicate', '중복된 Email 입니다', (value) => checkDuplicate(value, 'email'))
            .required(),
        nickname: yup
            .string()
            .test('check-duplicate', '중복된 닉네임 입니다', (value) => checkDuplicate(value, 'nickname'))
            .required(),
    })
    .required();
