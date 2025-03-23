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
        platforms: yup
            .array()
            .of(
                yup.object({
                    id: yup.string().required(),
                    name: yup.string().required(),
                }),
            )
            .default([])
            .required('platforms는 필수입니다.'),
        socials: yup
            .object()
            .shape({})
            .default({})
            .test('is-valid-object', 'socials 필드는 키-값 쌍이어야 합니다.', (value) => typeof value === 'object' && value !== null),
        imageUrl: yup.string().optional(),
        imageCropArea: yup
            .object({
                width: yup.number().required('width 값이 필요합니다.'),
                height: yup.number().required('height 값이 필요합니다.'),
                x: yup.number().required('x 값이 필요합니다.'),
                y: yup.number().required('y 값이 필요합니다.'),
            })
            .default(undefined)
            .optional(),
    })
    .required();
