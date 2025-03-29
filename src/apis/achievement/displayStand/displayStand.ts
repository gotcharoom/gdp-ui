import { getData } from '@/common/utils/axiosUtils';
import DisplayStandType from '@/types/pages/achievement/displayStand/DisplayStand.type';
import PageObjectType from '@/types/pages/achievement/PageObject.type';

const urls = {
    test: '/api/v1/displayStand',
};

interface Params {
    page_no: number;
}

interface Data {
    content: DisplayStandType[];
    page: PageObjectType;
}

const getDisplayStandList = async (params: Params): Promise<Data> => {
    return await getData<Data>(urls.test, { params: params }).then((res) => res.data);
};

export { getDisplayStandList };
