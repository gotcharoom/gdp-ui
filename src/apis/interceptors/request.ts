import { instance } from '@utils/axiosInstance.ts';

instance.interceptors.request.use(
    function (config) {
        // const accessToken = getCookie("accessToken");
        const accessToken = '';
        const refreshToken = '';

        if (accessToken && refreshToken) {
            config.headers.common['Authorization'] = `${accessToken}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);
