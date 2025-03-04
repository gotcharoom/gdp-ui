import { instance } from '@/common/utils/axiosInstance.ts';
import ApiResponse from '@/types/utils/ApiResponse.type.ts';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

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
        return {
            ...response.data,
            status: response.status,
        };
    } catch (error: unknown) {
        return Promise.reject(handleAxiosError(error));
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postData = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
        const response = await instance.post<T, AxiosResponse<ApiResponse<T>>>(url, data, config);
        return {
            ...response.data,
            status: response.status,
        };
    } catch (error) {
        return Promise.reject(handleAxiosError(error));
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const putData = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
        const response = await instance.put<T, AxiosResponse<ApiResponse<T>>>(url, data, config);
        return {
            ...response.data,
            status: response.status,
        };
    } catch (error) {
        return Promise.reject(handleAxiosError(error));
    }
};

export const deleteData = async <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
        const response = await instance.delete<T, AxiosResponse<ApiResponse<T>>>(url, config);
        return {
            ...response.data,
            status: response.status, // 응답 객체에 statusCode 추가
        };
    } catch (error) {
        return Promise.reject(handleAxiosError(error));
    }
};
