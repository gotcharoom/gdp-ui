// import * as axios from '@/common/utils/axiosInstance.ts';
import LoginRequestForm from '@/types/pages/login/LoginRequestForm.type.ts';
import UserState from '@/types/pages/login/UserState.type.ts';
import { getData, postData } from '@/common/utils/axiosUtils.ts';
import ApiResponse from '@/types/utils/ApiResponse.type.ts';
import { store } from '@stores/store.ts';
import { resetUser } from '@stores/slices/userSlice.ts';
import { removeAuth } from '@stores/slices/authSlice.ts';
import Provider from '@/common/constants/Provider.ts';
import RememberMeRequestForm from '@/types/pages/login/RememberMeRequestForm.type.ts';
import { allowForceLogout, preventForceLogout } from '@/common/hooks/useNavigationGuard.ts';

const urls = {
    login: '/api/v1/auth/login',
    refresh: '/api/v1/auth/refresh',
    info: '/api/v1/auth/info',
    logout: '/api/v1/auth/logout',
    check: '/api/v1/auth/check',
    socialLogin: (provider: string) => `${import.meta.env.VITE_API_URL}/api/v1/oauth2/authorization/${provider}`,
    rememberMe: '/api/v1/auth/remember-me',
};

const postLoginRequest = async (data: LoginRequestForm) => {
    return await postData<ApiResponse<unknown>>(urls.login, data);
};

const postRefreshToken = async () => await postData(urls.refresh);

const postLogoutRequest = async () => {
    await postData(urls.logout);
    store.dispatch(resetUser());
    store.dispatch(removeAuth());
    allowForceLogout();
    window.location.href = '/login';
    preventForceLogout();
};

const getLoginUserInfo = async (): Promise<UserState> => {
    const { data } = await getData<UserState>(urls.info);

    return data;
};

const postTokenCheck = async () => {
    const response = await postData<boolean>(urls.check);
    return response.data;
};

const requestSocialLoginUri = (provider: Provider) => {
    return urls.socialLogin(provider);
};

const postRequestRememberMe = async (data: boolean) => {
    const form: RememberMeRequestForm = {
        rememberMe: data ?? false,
    };

    return await postData<ApiResponse<unknown>>(urls.rememberMe, form);
};

export {
    postLoginRequest,
    postRefreshToken,
    postLogoutRequest,
    getLoginUserInfo,
    postTokenCheck,
    requestSocialLoginUri,
    postRequestRememberMe,
};
