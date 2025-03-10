// import LoginRequestForm from '@/types/pages/login/LoginRequestForm.type.ts';
// import UserState from '@/types/pages/login/UserState.type.ts';
// import { getData } from '@/common/utils/axiosUtils.ts';
// import ApiResponse from '@/types/utils/ApiResponse.type.ts';
// const urls = {
//     duplicateCheckId: 'test',
//     duplicateCheckEmail: 'test',
//     duplicateCheckNickName: 'test',
// };

const getDuplicateCheckId = async (value: string) => {
    // return await getData<ApiResponse<unknown>>(urls.duplicateCheckId, { params: data });
    return value == 'aaaaaaa';
};

const getDuplicateCheckEmail = async (value: string) => {
    // return await getData<ApiResponse<unknown>>(urls.duplicateCheckId, { params: data });
    return value == 'aaaaaaa';
};

const getDuplicateCheckNickname = async (value: string) => {
    // return await getData<ApiResponse<unknown>>(urls.duplicateCheckId, { params: data });
    return value == 'aaaaaaa';
};

export { getDuplicateCheckId, getDuplicateCheckEmail, getDuplicateCheckNickname };
