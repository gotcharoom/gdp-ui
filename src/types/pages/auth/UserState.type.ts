import { Area } from 'react-easy-crop';

interface UserState {
    id: string;
    email: string;
    nickname: string;
    name: string;
    imageUrl: string | undefined;
    imageCropArea: Area | undefined;
}

export default UserState;
