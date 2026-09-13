import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { FiBold, FiItalic, FiUnderline, FiList, FiLink, FiImage, FiCode, FiType } from 'react-icons/fi';

interface RichEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: number;
  theme?: 'light' | 'dark';
}

export default function RichEditor({ value, onChange, placeholder = 'Write something...', minHeight = 200, theme = 'light' }: RichEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Image,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: `focus:outline-none text-sm leading-relaxed ${theme === 'dark' ? 'text-white/80' : 'text-neutral-800'}`,
        style: `min-height: ${minHeight}px; padding: 1rem;`,
      },
    },
  });

  if (!editor) return null;

  const addLink = () => {
    const url = window.prompt('Enter URL:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const addImage = () => {
    const url = window.prompt('Enter image URL:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const isDark = theme === 'dark';
  const btnClass = (active?: boolean) =>
    `p-2 rounded-lg transition-colors ${active ? 'bg-brand-blue text-white' : isDark ? 'text-white/50 hover:bg-white/[0.08]' : 'text-neutral-600 hover:bg-neutral-100'}`;

  return (
    <div className={`border rounded-xl overflow-hidden ${isDark ? 'border-white/[0.1]' : 'border-neutral-200'}`}>
      <div className={`flex flex-wrap gap-1 px-3 py-2 border-b ${isDark ? 'border-white/[0.06] bg-white/[0.03]' : 'border-neutral-200 bg-neutral-50'}`}>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btnClass(editor.isActive('heading', { level: 2 }))} title="Heading">
          <FiType className="w-4 h-4" />
        </button>
        <div className={`w-px h-6 mx-1 self-center ${isDark ? 'bg-white/[0.06]' : 'bg-neutral-200'}`} />
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btnClass(editor.isActive('bold'))} title="Bold">
          <FiBold className="w-4 h-4" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btnClass(editor.isActive('italic'))} title="Italic">
          <FiItalic className="w-4 h-4" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={btnClass(editor.isActive('underline'))} title="Underline">
          <FiUnderline className="w-4 h-4" />
        </button>
        <div className={`w-px h-6 mx-1 self-center ${isDark ? 'bg-white/[0.06]' : 'bg-neutral-200'}`} />
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btnClass(editor.isActive('bulletList'))} title="Bullet List">
          <FiList className="w-4 h-4" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btnClass(editor.isActive('orderedList'))} title="Ordered List">
          <FiList className="w-4 h-4" />
        </button>
        <div className={`w-px h-6 mx-1 self-center ${isDark ? 'bg-white/[0.06]' : 'bg-neutral-200'}`} />
        <button type="button" onClick={addLink} className={btnClass(editor.isActive('link'))} title="Link">
          <FiLink className="w-4 h-4" />
        </button>
        <button type="button" onClick={addImage} className={btnClass()} title="Image">
          <FiImage className="w-4 h-4" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleCode().run()} className={btnClass(editor.isActive('code'))} title="Code">
          <FiCode className="w-4 h-4" />
        </button>
      </div>
      <div className={isDark ? '[&_.ProseMirror_p.is-editor-empty:first-child::before]:!text-white/20' : ''}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
