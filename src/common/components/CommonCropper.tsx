import Cropper, { Area } from 'react-easy-crop';
import { useCallback, useState } from 'react';
import { Point } from 'react-easy-crop/types';

import '@styles/common/components/CommonCopper.scss';
import { IconButton, Tooltip } from '@mui/material';
import PageMode from '@/common/constants/PageMode.ts';

interface CommonCropperProps {
    width: number; // 가로 비율
    height: number; // 세로 비율
    image: string; // 이미지
    cropShape: 'rect' | 'round';
    onCropComplete: (area: Area) => void;
    clear: () => void;
}

const CommonCropper = (props: CommonCropperProps) => {
    /* Hooks */
    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    /* Privates */

    /* Events */
    const onCropChange = useCallback((data: Point) => {
        setCrop(data);
    }, []);

    const onZoomChange = useCallback((data: number) => {
        setZoom(data);
    }, []);

    const onClearIcon = useCallback(() => {
        props.clear();
    }, [props]);

    /* Lifecycles */

    return (
        <div className={'common-cropper'}>
            <div className={'common-cropper__clear-icon'}>
                <Tooltip title='Clear Image'>
                    <IconButton
                        className={'clear-icon'}
                        onClick={onClearIcon}
                        sx={{
                            borderRadius: 0,
                        }}
                    >
                        <span className='material-symbols-outlined'>delete_forever</span>
                    </IconButton>
                </Tooltip>
            </div>
            <Cropper
                image={props.image}
                cropShape={props.cropShape}
                onCropChange={onCropChange}
                onZoomChange={onZoomChange}
                aspect={props.width / props.height}
                crop={crop}
                zoom={zoom}
                onCropComplete={props.onCropComplete}
                cropSize={{ width: props.width, height: props.height }}
            />
        </div>
    );
};

export default CommonCropper;
