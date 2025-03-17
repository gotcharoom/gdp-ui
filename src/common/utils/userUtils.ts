import {
    getDuplicateCheckEmail,
    getDuplicateCheckId,
    getDuplicateCheckNickname,
    getLoginUserDuplicateCheckId,
    getLoginUserDuplicateCheckNickname,
    getLoginUserDuplicateCheckEmail,
} from '@apis/auth/signUp.ts';

/* 로그인이 불필요한 페이지에서 사용 */
const apis = {
    id: (value: string) => getDuplicateCheckId(value),
    email: (value: string) => getDuplicateCheckEmail(value),
    nickname: (value: string) => getDuplicateCheckNickname(value),
};

const checkDuplicate = async (value: string | undefined, fieldName: keyof typeof apis) => {
    const data = await apis[fieldName](value);
    return !data;
};

/* 로그인이 필요한 페이지에서 사용 */
const loginUserApis = {
    id: (value: string) => getLoginUserDuplicateCheckId(value),
    email: (value: string) => getLoginUserDuplicateCheckEmail(value),
    nickname: (value: string) => getLoginUserDuplicateCheckNickname(value),
};

const checkLoginUserDuplicate = async (value: string | undefined, fieldName: keyof typeof apis) => {
    const data = await loginUserApis[fieldName](value);
    return !data;
};

export { checkDuplicate, checkLoginUserDuplicate };
