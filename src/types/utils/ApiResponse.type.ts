interface ApiResponse<T> {
    code: string;
    data: T;
    message: string;
}

export default ApiResponse;
