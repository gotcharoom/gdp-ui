import { instance } from '@/common/utils/axiosInstance.ts';
import ApiResponse from '@/types/utils/ApiResponse.type.ts';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import ApiError from '@/common/utils/ApiError.ts';
import { ResponseCode } from '@/common/utils/ReponseCodeUtil.ts';

const handleAxiosError = (error: unknown): never => {
    if (axios.isAxiosError(error)) {
        throw new Error(`Axios error: ${error.response?.status} - ${error.response?.data?.message || error.message}`);
    } else if (error instanceof Error) {
        throw new Error(`General error: ${error.message}`);
    } else {
        throw new Error('An unknown error occurred');
    }
};

const handleApiResponse = <T>(response: AxiosResponse<ApiResponse<T>>): ApiResponse<T> => {
    const { data } = response;

    if (data.code !== ResponseCode.SUCCESS.code) {
        throw new ApiError(data.code, data.message || 'API 실패');
    }

    return {
        ...data,
        status: response.status,
    };
};

const requestWrapper = async <T>(
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    dataOrConfig?: unknown,
    config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> => {
    try {
        let response: AxiosResponse<ApiResponse<T>>;

        if (method === 'get' || method === 'delete') {
            response = await instance[method]<T, AxiosResponse<ApiResponse<T>>>(url, dataOrConfig as AxiosRequestConfig);
        } else {
            response = await instance[method]<T, AxiosResponse<ApiResponse<T>>>(url, dataOrConfig, config);
        }

        return handleApiResponse(response);
    } catch (error) {
        if (error instanceof ApiError) {
            return Promise.reject(error);
        } else {
            return Promise.reject(handleAxiosError(error));
        }
    }
};

// Exported API methods
export const getData = <T>(url: string, config?: AxiosRequestConfig) => requestWrapper<T>('get', url, config);
export const postData = <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => requestWrapper<T>('post', url, data, config);
export const putData = <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => requestWrapper<T>('put', url, data, config);
export const deleteData = <T>(url: string, config?: AxiosRequestConfig) => requestWrapper<T>('delete', url, config);
