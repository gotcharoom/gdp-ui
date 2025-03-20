import { getData } from '@/common/utils/axiosUtils.ts';
import NewNotice from '@/types/pages/notice/NewNotice.type';
import { SampleNoticeDataType } from '@/mocks/datas/sampleNoticeData';

const urls = {
    notice: '/notice',
};

const getNoticeList = async (notice: NewNotice) => {
    return await getData<SampleNoticeDataType[]>(urls.notice, { params: notice }).then((res) => res.data);
};

export { getNoticeList };
