import * as axios from '@/common/utils/axiosInstance.ts';
import ApiUrl from '@gdp-types/apis/apiUrl.type.ts';
import LoginRequestForm from '@/types/pages/login/LoginRequestForm.type.ts';

const urls: ApiUrl = {
    login: '/api/v1/auth/login',
};

const postLoginRequest = (data: LoginRequestForm) => axios.postData(urls.login, data);

export { postLoginRequest };
