import * as yup from 'yup';
import { checkLoginUserDuplicate } from '@/common/utils/userUtils.ts';

export const userInfoSchema = yup
    .object({
        id: yup.string(),
        email: yup
            .string()
            .test('check-duplicate', '중복된 Email 입니다', (value) => checkLoginUserDuplicate(value, 'email'))
            .required(),
        nickname: yup
            .string()
            .test('check-duplicate', '중복된 닉네임 입니다', (value) => checkLoginUserDuplicate(value, 'nickname'))
            .required(),
    })
    .required();
