import { Area } from 'react-easy-crop';

export interface UserInfoResponse {
    id: string;
    email: string;
    nickname: string;
    name: string;
    imageUrl: string | null;
    imageCropArea: Area | null;
    platforms: Record<string, string>;
    socials: Record<string, string>;
}
