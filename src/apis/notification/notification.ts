import { putData } from '@/common/utils/axiosUtils.ts';

const urls = {
    readNotification: '/api/v1/notification/read',
};

const putReadNotification = async (notificationId: number) => {
    return await putData<void>(urls.readNotification, { notificationId });
};

export { putReadNotification };
