import axios, {AxiosInstance, CreateAxiosDefaults} from 'axios';

const config:CreateAxiosDefaults = {
    baseURL:import.meta.env.VITE_API_URL,
    params : {
        api_key: import.meta.env.VITE_API_KEY,
        language : "ko-KR",
    },
    headers: {
        "Authorization": ``
    }
}

const instance:AxiosInstance = axios.create(config);

export default instance;