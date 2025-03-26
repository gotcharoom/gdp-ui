import { Area } from 'react-easy-crop';
import imageCropUtil, { createImageFromImageUrl } from '@/common/utils/imageCropUtil.ts';

export const resetAvatar = async (
    imageUrl: string | undefined,
    area: Area | undefined,
    setCroppedImage: (image: string | undefined) => void,
) => {
    if (!imageUrl) {
        setCroppedImage(undefined);
        return;
    }

    try {
        const base64Image = await createImageFromImageUrl(imageUrl);
        if (!base64Image) return;

        // area가 없으면 크롭하지 않고 기본 이미지 설정
        if (!area) {
            setCroppedImage(base64Image);
            return;
        }

        const croppedImg = await imageCropUtil(base64Image, area);
        setCroppedImage(croppedImg);
    } catch (error) {
        console.error('Error processing avatar:', error);
        setCroppedImage(undefined); // 실패 시 안전한 초기화
    }
};
