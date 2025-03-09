import { useEditor, EditorContent } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { Link } from '@tiptap/extension-link';
import { Markdown } from 'tiptap-markdown';
import Toolbar from '@/common/components/tiptap/Toolbar.tsx';
import CommonPage from '@/common/components/CommonPage.tsx';

import '@styles/common/components/tiptap/CommonEditor.scss';

interface CommonEditorProps {
    text: string;
    setText: (value: string) => void;
    width?: string;
    height?: string;
}

const CommonEditor = (props: CommonEditorProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.extend({ inclusive: false }).configure({
                openOnClick: false,
            }),
            Markdown,
        ],
        content: props.text,
        onUpdate({ editor }) {
            props.setText(editor.getHTML());
        },
    });

    return (
        <div className={'common-editor'}>
            {editor && <Toolbar editor={editor} />}
            <EditorContent editor={editor} />
        </div>
    );
};

export default CommonEditor;
