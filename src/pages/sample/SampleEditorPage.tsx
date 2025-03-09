import CommonPage from '@/common/components/CommonPage.tsx';
import { useState } from 'react';
import CommonEditor from '@/common/components/tiptap/CommonEditor.tsx';

import '@styles/common/components/tiptap/CommonEditor.scss';

const SampleEditorPage = () => {
    const [text, setText] = useState('Hello World!');

    return (
        <CommonPage width={'100%'} height={'100%'} title={'Sample Editor'}>
            <CommonEditor text={text} setText={setText} />

            {/* Detail Page에서 보여줄 때 => className tiptap 추가 필수*/}
            <div className='tiptap' dangerouslySetInnerHTML={{ __html: text }} />
        </CommonPage>
    );
};

export default SampleEditorPage;
