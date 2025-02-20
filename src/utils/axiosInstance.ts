import ApiResponse from '@/types/utils/ApiResponse.type';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults } from 'axios';

const config: CreateAxiosDefaults = {
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
};

export const instance: AxiosInstance = axios.create(config);

const handleAxiosError = (error: unknown): never => {
    if (axios.isAxiosError(error)) {
        throw new Error(`Axios error: ${error.response?.status} - ${error.response?.data?.message || error.message}`);
    } else if (error instanceof Error) {
        throw new Error(`General error: ${error.message}`);
    } else {
        throw new Error('An unknown error occurred');
    }
};

export const getData = async <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
        const response = await instance.get<T, AxiosResponse<ApiResponse<T>>>(url, config);
        return response.data;
    } catch (error: unknown) {
        return Promise.reject(handleAxiosError(error));
    }
};

//TODO: POST 메서드
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postData = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
        const response = await instance.post<T, AxiosResponse<ApiResponse<T>>>(url, data, config);
        return response.data;
    } catch (error) {
        return Promise.reject(handleAxiosError(error));
    }
};

//TODO: PUT 메서드
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const putData = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
        const response = await instance.put<T, AxiosResponse<ApiResponse<T>>>(url, data, config);
        return response.data;
    } catch (error) {
        return Promise.reject(handleAxiosError(error));
    }
};

//TODO: Delete 메서드
export const deleteData = async <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
        const response = await instance.delete<T, AxiosResponse<ApiResponse<T>>>(url, config);
        return response.data;
    } catch (error) {
        return Promise.reject(handleAxiosError(error));
    }
};
