// import LoginRequestForm from '@/types/pages/login/LoginRequestForm.type.ts';
// import UserState from '@/types/pages/login/UserState.type.ts';
// import { getData } from '@/common/utils/axiosUtils.ts';
// import ApiResponse from '@/types/utils/ApiResponse.type.ts';
// const urls = {
//     duplicateCheckId: 'test',
//     duplicateCheckEmail: 'test',
//     duplicateCheckNickName: 'test',
// };

import SignUpRequestForm from '@/types/pages/auth/SignUpRequestForm.type.ts';
import { getData, postData } from '@/common/utils/axiosUtils.ts';

const urls = {
    duplicateCheckId: '/api/v1/user/check/duplicate/id',
    duplicateCheckNickname: '/api/v1/user/check/duplicate/nickname',
    duplicateCheckEmail: '/api/v1/user/check/duplicate/email',
    duplicateLoginUserCheckId: '/api/v1/login-user/check/duplicate/id',
    duplicateLoginUserCheckNickname: '/api/v1/login-user/check/duplicate/nickname',
    duplicateLoginUserCheckEmail: '/api/v1/login-user/check/duplicate/email',
    signUp: '/api/v1/user/sign-up',
};

/* 로그인이 불필요한 페이지에서 사용 */
const getDuplicateCheckId = async (value: string): Promise<boolean> => {
    const params = {
        id: value,
    };

    const { data } = await getData<boolean>(urls.duplicateCheckId, { params });
    return data;
};

const getDuplicateCheckNickname = async (value: string): Promise<boolean> => {
    const params = {
        nickname: value,
    };
    const { data } = await getData<boolean>(urls.duplicateCheckNickname, { params });
    return data;
};

const getDuplicateCheckEmail = async (value: string): Promise<boolean> => {
    const params = {
        email: value,
    };

    const { data } = await getData<boolean>(urls.duplicateCheckEmail, { params });
    return data;
};

/* 로그인이 필요한 페이지에서 사용 */
const getLoginUserDuplicateCheckId = async (value: string): Promise<boolean> => {
    const params = {
        id: value,
    };

    const { data } = await getData<boolean>(urls.duplicateLoginUserCheckId, { params });
    return data;
};

const getLoginUserDuplicateCheckNickname = async (value: string): Promise<boolean> => {
    const params = {
        nickname: value,
    };
    const { data } = await getData<boolean>(urls.duplicateLoginUserCheckNickname, { params });
    return data;
};

const getLoginUserDuplicateCheckEmail = async (value: string): Promise<boolean> => {
    const params = {
        email: value,
    };

    const { data } = await getData<boolean>(urls.duplicateLoginUserCheckEmail, { params });
    return data;
};

const postSignUp = async (form: SignUpRequestForm): Promise<boolean> => {
    const { data } = await postData<boolean>(urls.signUp, form);
    return data;
};

export {
    getDuplicateCheckId,
    getDuplicateCheckNickname,
    getDuplicateCheckEmail,
    getLoginUserDuplicateCheckId,
    getLoginUserDuplicateCheckNickname,
    getLoginUserDuplicateCheckEmail,
    postSignUp,
};
