import { getData } from '@/common/utils/axiosUtils';
import AlbumType from '@/types/pages/achievement/album/Album.type';
import PageObjectType from '@/types/pages/achievement/PageObject.type';

const urls = {
    test: '/api/v1/displayStand/album',
};

interface ListParams {
    display_stand_id: number;
    page_no: number;
}

interface ListData {
    content: AlbumType[];
    page: PageObjectType;
}

const getAlbumList = async (params: ListParams): Promise<ListData> => {
    return await getData<ListData>(urls.test, { params: params }).then((res) => res.data);
};

export { getAlbumList };
