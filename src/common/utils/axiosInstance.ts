import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';
import { setRequestInterceptor } from '@apis/interceptors/request.ts';
import { setResponseInterceptor } from '@apis/interceptors/response.ts';

const config: CreateAxiosDefaults = {
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
};

export const instance: AxiosInstance = axios.create(config);

/* Interceptors */
setRequestInterceptor(instance);
setResponseInterceptor(instance);
