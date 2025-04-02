import { getData } from '@/common/utils/axiosUtils';
import { SampleCsrDataType } from '@/mocks/datas/sampleCsrData';
import NewCsr from '@/types/pages/csr/NewCsrType';

const urls = {
    csr: '/csr',
};

const getCsrList = async (csr: NewCsr) => {
    return await getData<SampleCsrDataType[]>(urls.csr, { params: csr }).then((res) => res.data);
};

export { getCsrList };
