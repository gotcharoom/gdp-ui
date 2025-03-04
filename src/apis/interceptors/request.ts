import { AxiosInstance } from 'axios';

export const setRequestInterceptor = (instance: AxiosInstance) => {
    instance.interceptors.request.use(
        (config) => {
            return config;
        },
        async (error) => {
            return Promise.reject(error);
        },
    );
};
