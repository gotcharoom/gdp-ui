import CommonPage from '@/common/components/CommonPage.tsx';
import { useState } from 'react';
import CommonEditor from '@/common/components/tiptap/CommonEditor.tsx';

import '@styles/common/components/tiptap/CommonEditor.scss';

const SampleEditorPage = () => {
    const [text, setText] = useState('Hello World!');

    return (
        <CommonPage width={'100%'} height={'100%'} title={'Sample Editor'}>
            <CommonEditor text={text} setText={setText} />
        </CommonPage>
    );
};

export default SampleEditorPage;
