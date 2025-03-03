import { getData, postData } from '@/common/utils/axiosUtils.ts';
import ApiUrl from '@gdp-types/apis/apiUrl.type.ts';
import { SampleDataType } from '@/mocks/datas/sampleData';

const urls: ApiUrl = {
    test: '/sample/response/success',
};

const postSample = () => postData(urls.test);

const getSample = async (test: ApiUrl): Promise<SampleDataType> => {
    return await getData<SampleDataType>(urls.test, { params: test }).then((res) => res.data);
};
export { postSample, getSample };
