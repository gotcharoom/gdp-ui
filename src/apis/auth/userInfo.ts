import { getData, putData } from '@/common/utils/axiosUtils.ts';
import { UserInfoResponse } from '@/types/apis/auth/UserInfoResponse.type.ts';
import UserInfoForm from '@/types/pages/auth/UserInfoForm.ts';
import { UserInfoUpdateRequest } from '@/types/apis/auth/UserInfoUpdateRequest.type.ts';
import { urlToFile } from '@/common/utils/imageConvertUtil.ts';
import { objectToFormData } from '@/common/utils/fileConvertUtil.ts';

const urls = {
    getUserDetails: '/api/v1/login-user/details',
    putUserDetails: '/api/v1/login-user/details',
};

const getUserDetails = async (): Promise<UserInfoResponse> => {
    const { data } = await getData<UserInfoResponse>(urls.getUserDetails);

    return data;
};

const putUserDetails = async (data: UserInfoForm) => {
    let file: File | null = null;

    if (data.imageUrl) {
        file = await urlToFile(data.imageUrl, 'profile-image.jpg');
    }

    const request: UserInfoUpdateRequest = {
        name: data.name,
        nickname: data.nickname,
        email: data.email,
        imageFile: file,
        imageCropArea: data.imageCropArea ?? null,
    };

    const formData = objectToFormData<UserInfoUpdateRequest>(request);

    console.log(Array.from(formData.entries()));

    return await putData<void>(urls.putUserDetails, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

export { getUserDetails, putUserDetails };
