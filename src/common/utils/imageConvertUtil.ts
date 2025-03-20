export const urlToFile = async (imageUrl: string, fileName = 'image.jpg') => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return new File([blob], fileName, { type: blob.type });
};
