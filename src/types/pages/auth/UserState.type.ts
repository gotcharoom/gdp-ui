import { Area } from 'react-easy-crop';
import SocialType from '@/common/constants/SocialType.ts';

interface UserState {
    id: string;
    socialType?: SocialType;
    email: string;
    nickname: string;
    name: string;
    imageUrl: string | undefined;
    imageCropArea: Area | undefined;
}

export default UserState;
