import { Area } from 'react-easy-crop';
import Platform from '@/types/pages/auth/Platform.type.ts';

export interface UserInfoResponse {
    id: string;
    email: string;
    nickname: string;
    name: string;
    imageUrl: string | null;
    imageCropArea: Area | null;
    platforms: Platform[];
    socials: Record<string, string>;
}
