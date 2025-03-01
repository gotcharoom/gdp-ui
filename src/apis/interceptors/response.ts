import { instance } from '@/common/utils/axiosInstance.ts';

instance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    },
);
