import { Editor } from '@tiptap/react';
import '@styles/common/components/tiptap/Toolbar.scss';
import { useCallback } from 'react';

type ToolbarProps = {
    editor: Editor;
};

const Toolbar = (props: ToolbarProps) => {
    /* Privates */
    const activeButtonClass = useCallback(
        (target: string, attributes?: Record<string, unknown>) => {
            let clazz = 'toolbar__container__button'; // 기본 클래스

            const isActive = attributes ? props.editor.isActive(target, attributes) : props.editor.isActive(target);

            if (isActive) {
                clazz += ' active';
            }
            return clazz;
        },
        [props.editor],
    );

    return (
        <div className={'toolbar'}>
            <div className={'toolbar__heading-container'}>
                <button
                    type='button'
                    className={activeButtonClass('heading', { level: 2 })}
                    onClick={() => props.editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    disabled={!props.editor.can().chain().focus().toggleHeading({ level: 2 }).run()}
                >
                    <span className='material-symbols-outlined'>format_h2</span>
                </button>
                <button
                    type='button'
                    className={activeButtonClass('heading', { level: 3 })}
                    onClick={() => props.editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    disabled={!props.editor.can().chain().focus().toggleHeading({ level: 3 }).run()}
                >
                    <span className='material-symbols-outlined'>format_h3</span>
                </button>
            </div>
            <div className={'toolbar__divider'} />
            <div className={'toolbar__format-container'}>
                <button
                    type='button'
                    className={activeButtonClass('bold')}
                    onClick={() => props.editor.chain().focus().toggleBold().run()}
                    disabled={!props.editor.can().chain().focus().toggleBold().run()}
                >
                    <span className='material-symbols-outlined'>format_bold</span>
                </button>
                <button
                    type='button'
                    className={activeButtonClass('italic')}
                    onClick={() => props.editor.chain().focus().toggleItalic().run()}
                    disabled={!props.editor.can().chain().focus().toggleItalic().run()}
                >
                    <span className='material-symbols-outlined'>format_italic</span>
                </button>
                <button
                    type='button'
                    className={activeButtonClass('strike')}
                    onClick={() => props.editor.chain().focus().toggleStrike().run()}
                    disabled={!props.editor.can().chain().focus().toggleStrike().run()}
                >
                    <span className='material-symbols-outlined'>format_strikethrough</span>
                </button>
            </div>
            <div className={'toolbar__divider'} />
            <div className={'toolbar__list-container'}>
                <button
                    type='button'
                    className={activeButtonClass('bulletList')}
                    onClick={() => props.editor.chain().focus().toggleBulletList().run()}
                >
                    <span className='material-symbols-outlined'>format_list_bulleted</span>
                </button>
                <button
                    type='button'
                    className={activeButtonClass('orderedList')}
                    onClick={() => props.editor.chain().focus().toggleOrderedList().run()}
                >
                    <span className='material-symbols-outlined'>format_list_numbered</span>
                </button>
            </div>
        </div>
    );
};

export default Toolbar;
