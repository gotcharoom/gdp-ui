import FindIdForm from '@/types/pages/login/components/FindIdForm.type.ts';
import FindPasswordForm from '@/types/pages/login/components/FindPasswordForm.type.ts';
import { postData } from '@/common/utils/axiosUtils.ts';
import ApiResponse from '@/types/utils/ApiResponse.type.ts';

const urls = {
    findId: '/api/v1/mail/find/id',
    generateTempPassword: '/api/v1/mail/generate/temp-password',
};

const postFindId = async (data: FindIdForm) => {
    return await postData<ApiResponse<boolean>>(urls.findId, data);
};

const postGenerateTempPassword = async (data: FindPasswordForm) => {
    return await postData<ApiResponse<boolean>>(urls.generateTempPassword, data);
};

export { postFindId, postGenerateTempPassword };
