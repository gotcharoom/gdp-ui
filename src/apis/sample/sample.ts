import axios from '@utils/axiosInstance.ts';
import ApiUrl from '@types/apis/apiUrl.type.ts';

const urls: ApiUrl = {
    test: '',
};

const postTest = (id: string, name: string) => axios.post(urls.test, { id, name });

export default {
    postTest,
};
