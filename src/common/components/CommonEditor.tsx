import { useEditor, EditorContent } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { Link } from '@tiptap/extension-link';
import { Markdown } from 'tiptap-markdown';
import Toolbar from '@/common/components/tiptap/Toolbar.tsx';

import '@styles/common/components/CommonEditor.scss';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { GlobalFormContext } from '@/common/contexts/GlobalFormContext.ts';
import FormName from '@/common/constants/FormName.ts';

interface CommonEditorProps {
    text: string;
    setText: (value: string) => void;
    width?: string;
    height?: string;
}

const CommonEditor = (props: CommonEditorProps) => {
    /* Hooks */
    const [initText, setInitText] = useState('');
    const { setDirty } = useContext(GlobalFormContext);

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

    /* Privates */
    const isDirty = useMemo(() => {
        return initText !== props.text;
    }, [initText, props.text]);

    const setFormDirty = useCallback(() => {
        setDirty(FormName.COMMON_EDITOR, isDirty);
    }, [isDirty, setDirty]);

    /* Lifecycles */
    useEffect(() => {
        setFormDirty();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.text]);

    useEffect(() => {
        setInitText(props.text);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={'common-editor'}>
            {editor && <Toolbar editor={editor} />}
            <EditorContent editor={editor} />
        </div>
    );
};

export default CommonEditor;
