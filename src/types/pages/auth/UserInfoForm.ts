import { Area } from 'react-easy-crop';

export default interface UserInfoForm {
    id: string;
    email: string;
    nickname: string;
    name: string;
    platforms: Record<string, string>;
    socials: Record<string, string>;
    imageUrl?: string;
    imageCropArea?: Area;
}
