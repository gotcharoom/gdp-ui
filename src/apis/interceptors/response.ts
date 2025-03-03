import { AxiosInstance, AxiosResponse } from 'axios';
import { postLogoutRequest, postRefreshToken } from '@apis/login/login.ts';
import ApiResponse from '@/types/utils/ApiResponse.type.ts';
import { ResponseCode } from '@/common/utils/ReponseCodeUtil.ts';
import { resetUser } from '@stores/slices/userSlice.ts';
import { store } from '@/stores/store.ts';
import { removeAuth } from '@stores/slices/authSlice.ts';

export const setResponseInterceptor = (instance: AxiosInstance) => {
    instance.interceptors.response.use(
        (response: AxiosResponse) => {
            return response;
        },
        async (error) => {
            const prevRequest = error?.config;
            if (error.response.status == 401 && !prevRequest.sent) {
                prevRequest.sent = true;

                try {
                    const response: ApiResponse<unknown> = await postRefreshToken();

                    if (response.status == 200 && response.code == ResponseCode.SUCCESS.code) {
                        return instance(prevRequest);
                    } else {
                        await handleLogout();
                        return Promise.reject(error);
                    }
                } catch (e) {
                    await handleLogout();
                    return Promise.reject(e);
                }
            }
            return Promise.reject(error);
        },
    );
};

const handleLogout = async () => {
    await postLogoutRequest();
    store.dispatch(resetUser());
    store.dispatch(removeAuth());

    window.location.href = '/login';
};
