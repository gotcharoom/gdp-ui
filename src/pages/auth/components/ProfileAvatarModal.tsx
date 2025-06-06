import { Area } from 'react-easy-crop';
import { useCallback, useEffect, useState } from 'react';
import CommonCropper from '@/common/components/CommonCropper.tsx';
import CommonDropzone from '@/common/components/CommonDropzone.tsx';
import { Button } from '@mui/material';

import '@styles/pages/auth/components/ProfileAvatarModal.scss';

interface ProfileAvatarModalProps {
    image: string | undefined;
    area: Area | undefined;
    close: () => void;
    save: (image: string | undefined, area: Area | undefined) => void;
}

const ProfileAvatarModal = (props: ProfileAvatarModalProps) => {
    /* Hooks */
    const [image, setImage] = useState<string | undefined>(undefined);
    const [area, setArea] = useState<Area | undefined>(undefined);

    /* Privates */
    const clearImage = useCallback(() => {
        setImage(undefined);
        setArea(undefined);
    }, []);

    /* Events */

    const onCropComplete = useCallback((_area: Area, pixelArea: Area) => {
        setArea(pixelArea);
    }, []);

    const onChangeImage = (uploadedImage: File) => {
        setImage(URL.createObjectURL(uploadedImage));
    };

    const onClickSave = useCallback(() => {
        props.save(image, area);
    }, [area, image, props]);

    const onClickCancel = useCallback(() => {
        props.close();
    }, [props]);

    /* Lifecycles */
    useEffect(() => {
        setImage(props.image);
        setArea(props.area);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={'profile-avatar-modal'}>
            <div className={'profile-avatar-modal__image-section'}>
                {image ? (
                    <CommonCropper
                        width={150}
                        height={150}
                        initialArea={area}
                        image={image}
                        cropShape={'round'}
                        onCropComplete={onCropComplete}
                        clear={clearImage}
                    />
                ) : (
                    <CommonDropzone onChangeImage={onChangeImage} accept={{ 'image/*': ['.jpeg', '.jpg', '.png'] }} />
                )}
            </div>
            <div className={'profile-avatar-modal__button-section'}>
                <Button className={'button-section__button'} variant='contained' onClick={onClickSave}>
                    저장
                </Button>

                <Button className={'button-section__button'} variant='outlined' onClick={onClickCancel}>
                    취소
                </Button>
            </div>
        </div>
    );
};

export default ProfileAvatarModal;
