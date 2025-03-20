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
        platforms: yup.object().nullable(), // TODO. [TR-YOO] 기본값 수정하기
        socials: yup.object().nullable(), // TODO. [TR-YOO] 기본값 수정하기
        imageUrl: yup.string().optional(),
        imageCropArea: yup
            .object({
                width: yup.number().when('$hasCropArea', {
                    is: true,
                    then: (schema) => schema.required('width가 필요합니다.'),
                }),
                height: yup.number().when('$hasCropArea', {
                    is: true,
                    then: (schema) => schema.required('height가 필요합니다.'),
                }),
                x: yup.number().when('$hasCropArea', {
                    is: true,
                    then: (schema) => schema.required('x 좌표가 필요합니다.'),
                }),
                y: yup.number().when('$hasCropArea', {
                    is: true,
                    then: (schema) => schema.required('y 좌표가 필요합니다.'),
                }),
            })
            .optional(),
    })
    .required();
