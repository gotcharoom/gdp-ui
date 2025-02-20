import * as axios from '@utils/axiosInstance.ts';
import ApiUrl from '@/types/apis/apiUrl.type';
import NewNotice from '@/types/pages/notice/NewNotice.type';
import { SampleNoticeDataType } from '@/mocks/datas/sampleNoticeData';

const urls: ApiUrl = {
    notice: '/notice',
};

const getNoticeList = async (notice: NewNotice) => {
    return await axios.getData<SampleNoticeDataType>(urls.notice, { params: notice }).then((res) => res.data);
};

export { getNoticeList };
