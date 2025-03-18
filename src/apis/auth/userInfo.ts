import { getData, putData } from '@/common/utils/axiosUtils.ts';
import { UserInfoResponse } from '@/types/apis/auth/UserInfoResponse.type.ts';
import UserInfoForm from '@/types/pages/auth/UserInfoForm.ts';

const urls = {
    getUserDetails: '/api/v1/user/details',
    putUserDetails: '/api/v1/user/details',
};

const getUserDetails = async (): Promise<UserInfoResponse> => {
    const { data } = await getData<UserInfoResponse>(urls.getUserDetails);

    return data;
};

const putUserDetails = async (data: UserInfoForm) => {
    return await putData<void>(urls.getUserDetails, data);
};

export { getUserDetails, putUserDetails };
