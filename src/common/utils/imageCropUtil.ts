import { Area } from 'react-easy-crop';

export const createImageFromImageUrl = async (imageUrl: string): Promise<string | null> => {
    try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error('Error converting image to Base64:', error);
        return null;
    }
};

export const createImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', (error) => reject(error));
        image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
        image.src = url;

        return image;
    });
};

export const getRadianAngle = (degreeValue: number): number => {
    return (degreeValue * Math.PI) / 180;
};

/**
 * Returns the new bounding area of a rotated rectangle.
 */
export const rotateSize = (width: number, height: number, rotation: number) => {
    const rotRad = getRadianAngle(rotation);

    return {
        width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
        height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
    };
};

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 */
const imageCropUtil = async (imageSrc: string, pixelCrop: Area): Promise<string | undefined> => {
    try {
        const image = await createImage(imageSrc);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) return undefined;

        const cropStartWidth = pixelCrop.x;
        const cropStartHeight = pixelCrop.y;

        // 필수
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;

        ctx.drawImage(
            image, // 원본 이미지 (crop할 대상)
            cropStartWidth, // crop 시작점 X (원본 이미지에서 자를 시작 X 좌표)
            cropStartHeight, // crop 시작점 Y (원본 이미지에서 자를 시작 Y 좌표)
            pixelCrop.width, // crop할 너비
            pixelCrop.height, // crop할 높이
            0, // 캔버스에서 그릴 시작점 X (좌측 상단에서 시작)
            0, // 캔버스에서 그릴 시작점 Y (좌측 상단에서 시작)
            pixelCrop.width, // 캔버스에서 출력할 너비 (crop한 크기 그대로 유지)
            pixelCrop.height, // 캔버스에서 출력할 높이 (crop한 크기 그대로 유지)
        );
        return canvas.toDataURL('image/png');

        // return new Promise((resolve, reject) => {
        //     canvas.toBlob((file) => {
        //         resolve(URL.createObjectURL(file))
        //     }, 'image/jpeg')
        // })
    } catch (error) {
        console.error('Error cropping image:', error);
        return undefined;
    }
};

export default imageCropUtil;
