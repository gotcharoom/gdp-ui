import { getData, postData } from '@/common/utils/axiosUtils.ts';
import { SampleDataType } from '@/mocks/datas/sampleData';

const urls = {
    test: '/sample/response/success',
    // test: '/test',
};

interface Test {
    name: string;
}

const postSample = () => postData(urls.test);

const getSample = async (test: Test): Promise<SampleDataType> => {
    return await getData<SampleDataType>(urls.test, { params: test }).then((res) => res.data);
};
export { postSample, getSample };
