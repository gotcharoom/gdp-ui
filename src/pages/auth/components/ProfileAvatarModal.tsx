import { Area } from 'react-easy-crop';
import { useCallback, useState } from 'react';
import CommonCropper from '@/common/components/CommonCropper.tsx';
import CommonDropzone from '@/common/components/CommonDropzone.tsx';
import { Button } from '@mui/material';

import '@styles/pages/auth/components/ProfileAvatarModal.scss';

interface ProfileAvatarModalProps {
    close: () => void;
}

const ProfileAvatarModal = (props: ProfileAvatarModalProps) => {
    /* Hooks */
    const [image, setImage] = useState<string>(null);
    const [area, setArea] = useState<Area>(null);

    /* Privates */
    const clearImage = useCallback(() => {
        setImage(null);
    }, []);

    /* Events */

    const onCropComplete = useCallback((area: Area) => {
        setArea(area);
    }, []);

    const onChangeImage = (uploadedImage: File) => {
        setImage(URL.createObjectURL(uploadedImage));
    };

    const onClickCancel = useCallback(() => {
        props.close();
    }, [props]);

    /* Lifecycles */

    return (
        <div className={'profile-avatar-modal'}>
            <div className={'profile-avatar-modal__image-section'}>
                {image ? (
                    <CommonCropper
                        width={250}
                        height={250}
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
                <Button className={'button-section__button'} variant='contained' type={'submit'}>
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
