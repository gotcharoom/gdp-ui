import { Area } from 'react-easy-crop';
import { useCallback, useEffect, useState } from 'react';
import CommonCropper from '@/common/components/CommonCropper.tsx';
import CommonDropzone from '@/common/components/CommonDropzone.tsx';
import { Button } from '@mui/material';

import '@styles/pages/auth/components/ProfileAvatarModal.scss';

interface ProfileAvatarModalProps {
    image: string | null;
    area: Area | null;
    close: () => void;
    save: (image: string | null, area: Area | null) => void;
}

const ProfileAvatarModal = (props: ProfileAvatarModalProps) => {
    /* Hooks */
    const [image, setImage] = useState<string | null>(null);
    const [area, setArea] = useState<Area | null>(null);

    /* Privates */
    const clearImage = useCallback(() => {
        setImage(null);
    }, []);

    /* Events */

    const onCropComplete = useCallback((area: Area, pixelArea: Area) => {
        console.log('percentage Area : ', area);
        console.log('pixel Area : ', pixelArea);
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
                    <CommonDropzone onChangeImage={onChangeImage} />
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
