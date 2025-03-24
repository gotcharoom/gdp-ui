import { Area } from 'react-easy-crop';
import Platform from '@/types/pages/auth/Platform.type.ts';

export default interface UserInfoForm {
    id: string;
    email: string;
    nickname: string;
    name: string;
    platforms: Platform[];
    socials: Record<string, string>;
    imageUrl?: string;
    imageCropArea?: Area;
}
