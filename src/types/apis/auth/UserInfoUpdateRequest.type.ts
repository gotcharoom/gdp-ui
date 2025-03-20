import { Area } from 'react-easy-crop';

export interface UserInfoUpdateRequest {
    email: string;
    nickname: string;
    name: string;
    imageFile: File | null;
    imageCropArea: Area | null;
}
