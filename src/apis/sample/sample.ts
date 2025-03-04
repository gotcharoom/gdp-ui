import { getData, postData } from '@/common/utils/axiosUtils.ts';
import { SampleDataType } from '@/mocks/datas/sampleData';

const urls = {
    test: '/sample/response/success',
};

const postSample = () => postData(urls.test);

const getSample = async (test): Promise<SampleDataType> => {
    return await getData<SampleDataType>(urls.test, { params: test }).then((res) => res.data);
};
export { postSample, getSample };
