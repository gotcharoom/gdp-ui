import ApiUrl from '@/types/apis/apiUrl.type';
import NewNotice from '@/types/pages/notice/NewNotice.type';
import axios from '@utils/axiosInstance.ts';

const urls: ApiUrl = {
    notice: '/notice',
};

const getNoticeList = (notice: NewNotice) => {
    axios.get(urls.notice, { params: notice });
};

export default {
    getNoticeList,
};
