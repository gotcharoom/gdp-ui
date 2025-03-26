import { Accept, useDropzone } from 'react-dropzone';
import { useCallback } from 'react';

import '@styles/common/components/CommonDropzone.scss';

interface CommonDropzoneProps {
    onChangeImage: (file: File) => void;
    accept: Accept;
}

const CommonDropzone = (props: CommonDropzoneProps) => {
    /* Hooks */
    const onDrop = useCallback(
        (files: File[]) => {
            props.onChangeImage(files[0]);
        },
        [props],
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: props.accept });
    /* Privates */

    /* Events */

    /* Lifecycles */

    return (
        <div className={'common-dropzone'} {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? <p>드래그중</p> : <p>이미지를 드래그하거나 클릭하여 첨부해주세요.</p>}
        </div>
    );
};

export default CommonDropzone;
