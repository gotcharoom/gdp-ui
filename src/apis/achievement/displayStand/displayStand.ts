import { getData } from '@/common/utils/axiosUtils';
import DisplayStandType from '@/types/pages/achievement/displayStand/DisplayStand.type';
import PageObjectType from '@/types/pages/achievement/PageObject.type';

const urls = {
    test: '/api/v1/displayStand',
};

interface ListParams {
    page_no: number;
}

interface ListData {
    content: DisplayStandType[];
    page: PageObjectType;
}

const getDisplayStandList = async (params: ListParams): Promise<ListData> => {
    return await getData<ListData>(urls.test, { params: params }).then((res) => res.data);
};

export { getDisplayStandList };
