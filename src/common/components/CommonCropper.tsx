import Cropper, { Area } from 'react-easy-crop';
import { useCallback, useEffect, useState } from 'react';

import '@styles/common/components/CommonCopper.scss';
import { IconButton, Tooltip } from '@mui/material';

interface CommonCropperProps {
    width: number; // 가로 비율
    height: number; // 세로 비율
    image: string; // 이미지
    initialArea: Area | null; // area 비율;
    cropShape: 'rect' | 'round';
    onCropComplete: (area: Area, pixelArea: Area) => void;
    clear: () => void;
}

interface Point {
    x: number;
    y: number;
}

const CommonCropper = (props: CommonCropperProps) => {
    /* Hooks */
    const [initialCroppedArea, setInitialCroppedArea] = useState<Area | undefined>(undefined);
    const [cropSize] = useState({
        width: props.width,
        height: props.height,
    });
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
    useEffect(() => {
        if (props.initialArea) {
            setInitialCroppedArea(props.initialArea);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                cropSize={cropSize}
                initialCroppedAreaPixels={initialCroppedArea as Area}
            />
        </div>
    );
};

export default CommonCropper;
