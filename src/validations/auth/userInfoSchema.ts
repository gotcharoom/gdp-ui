import * as yup from 'yup';
import { checkLoginUserDuplicate } from '@/common/utils/userUtils.ts';

export const userInfoSchema = yup
    .object({
        id: yup.string().required(),
        email: yup
            .string()
            .test('check-duplicate', '중복된 Email 입니다', (value) => checkLoginUserDuplicate(value, 'email'))
            .required(),
        nickname: yup
            .string()
            .test('check-duplicate', '중복된 닉네임 입니다', (value) => checkLoginUserDuplicate(value, 'nickname'))
            .required(),
        name: yup.string().required(),
        platforms: yup.object().default({}), // TODO. [TR-YOO] 기본값 수정하기
        socials: yup.object().default({}), // TODO. [TR-YOO] 기본값 수정하기
        imageUrl: yup.string().required(),
        imageCropArea: yup
            .object({
                width: yup.number().required(),
                height: yup.number().required(),
                x: yup.number().required(),
                y: yup.number().required(),
            })
            .required(),
    })
    .required();
