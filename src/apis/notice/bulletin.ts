import { getData } from '@/common/utils/axiosUtils';
import { SampleBulletinDataType } from '@/mocks/datas/sampleBulletinData';
import NewBulletin from '@/types/pages/notice/NewBulletin.type';

const urls = {
    bulletin: '/bulletin',
};

const getBulleinList = async (bulletin: NewBulletin) => {
    return await getData<SampleBulletinDataType[]>(urls.bulletin, { params: bulletin }).then((res) => res.data);
};

export { getBulleinList };
