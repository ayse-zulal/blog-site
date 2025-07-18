import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';
import Heading from '@tiptap/extension-heading';
import Blockquote from '@tiptap/extension-blockquote';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';

import './TipTapEditor.css'; // Stil için dış CSS (isteğe bağlı)

export default function TiptapEditor({ content, setContent }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      Strike,
      Heading.configure({ levels: [1, 2, 3] }),
      Image,
      Blockquote,
      BulletList,
      OrderedList,
      ListItem,
    ],
    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setContent(html);
    },
  });

  const addImage = () => {
    const url = window.prompt('Görsel URL’si girin');
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="editor-container">
      <div className="toolbar">
        <button onClick={() => editor?.chain().focus().toggleBold().run()}>B</button>
        <button onClick={() => editor?.chain().focus().toggleItalic().run()}><i>I</i></button>
        <button onClick={() => editor?.chain().focus().toggleUnderline().run()}><u>U</u></button>
        <button onClick={() => editor?.chain().focus().toggleStrike().run()}><s>S</s></button>
        <button onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}>H1</button>
        <button onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
        <button onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}>H3</button>
        <button onClick={() => editor?.chain().focus().toggleBulletList().run()}>• List</button>
        <button onClick={() => editor?.chain().focus().toggleOrderedList().run()}>1. List</button>
        <button onClick={() => editor?.chain().focus().toggleBlockquote().run()}>“ Quote</button>
        <button onClick={addImage}>🖼 Resim</button>
      </div>

      <EditorContent editor={editor} className="editor-content" />
    </div>
  );
}
