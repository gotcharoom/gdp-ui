import * as axios from '@utils/axiosInstance.ts';
import ApiUrl from '@gdp-types/apis/apiUrl.type.ts';
import { SampleDataType } from '@/mocks/datas/sampleData';

const urls: ApiUrl = {
    test: '',
};

const samplePost = (id: string, name: string) => axios.postData(urls.test, { id, name });

const sampleGet = async (test: ApiUrl): Promise<SampleDataType> => {
    return await axios.getData<SampleDataType>(urls.test, { params: test }).then((res) => res.data);
};
export { samplePost, sampleGet };
