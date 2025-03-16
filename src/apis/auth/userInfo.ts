import { getData } from '@/common/utils/axiosUtils.ts';
import UserInfoForm from '@/types/pages/login/UserInfoForm.ts';

const urls = {
    userDetails: '/api/v1/....',
};

const getUserDetails = async (): Promise<UserInfoForm> => {
    const { data } = await getData<UserInfoForm>(urls.userDetails);

    return data;
};

export { getUserDetails };
