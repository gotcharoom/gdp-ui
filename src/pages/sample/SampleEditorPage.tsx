import CommonPage from '@/common/components/CommonPage.tsx';
import { useState } from 'react';
import CommonEditor from '@/common/components/CommonEditor.tsx';

import '@styles/common/components/CommonEditor.scss';
import useNavigationGuard from '@/common/hooks/useNavigationGuard.ts';
import { useOutletContext } from 'react-router-dom';

const SampleEditorPage = () => {
    /* Hooks */
    const { title } = useOutletContext<{ title: string }>();
    const [text, setText] = useState('Hello World!');

    useNavigationGuard();

    return (
        <CommonPage width={'100%'} height={'100%'} title={title}>
            {/* Editor 사용 시 사용법 */}
            <CommonEditor text={text} setText={setText} />

            {/* Detail Page에서 보여줄 때 사용법 => className tiptap 추가 필수 */}
            <div className='tiptap' dangerouslySetInnerHTML={{ __html: text }} />
        </CommonPage>
    );
};

export default SampleEditorPage;
