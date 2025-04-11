import { deleteData, getData } from '@/common/utils/axiosUtils';
import AlbumType from '@/types/pages/achievement/album/Album.type';
import PageObjectType from '@/types/pages/achievement/PageObject.type';

const urls = {
    list: '/api/v1/displayStand/album',
    delete: '/api/v1/displayStand/album',
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
    return await getData<ListData>(urls.list, { params: params }).then((res) => res.data);
};

const deleteAlbum = async (id: number) => {
    return await deleteData(`${urls.delete}/${id}`).then((res) => res.data);
};

export { getAlbumList, deleteAlbum };
