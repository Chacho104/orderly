"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import { useEffect } from "react";

interface TiptapEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const TiptapEditor = ({ value, onChange }: TiptapEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Paragraph,
      Heading.configure({ levels: [1, 2, 3] }),
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          "prose focus:outline-none border border dark:border-blue-950 dark:text-white focus:border-black dark:focus:border-blue-950/70 px-3 py-2 rounded-md",
      },
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && editor.getHTML() !== value) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="flex flex-col items-start">
      {/* Toolbar */}
      <div className="mb-2 flex gap-2 pb-2">
        {/* H1 */}
        <button
          type="button"
          className={`px-3 py-1 text-sm rounded ${
            editor.isActive("heading", { level: 1 })
              ? "bg-blue-500 text-white"
              : "bg-transparent border-[1px] border-blue-950"
          }`}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          H1
        </button>

        {/* H2 */}
        <button
          type="button"
          className={`px-3 py-1 text-sm rounded ${
            editor.isActive("heading", { level: 2 })
              ? "bg-blue-500 text-white"
              : "bg-transparent border-[1px] border-blue-950"
          }`}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          H2
        </button>

        {/* H3 */}
        <button
          type="button"
          className={`px-3 py-1 text-sm rounded ${
            editor.isActive("heading", { level: 3 })
              ? "bg-blue-500 text-white"
              : "bg-transparent border-[1px] border-blue-950"
          }`}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          H3
        </button>

        {/* Bold */}
        <button
          type="button"
          className={`px-3 py-1 text-sm rounded ${
            editor.isActive("bold")
              ? "bg-blue-500 text-white"
              : "bg-transparent border-[1px] border-blue-950"
          }`}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          Bold
        </button>

        {/* Italic */}
        <button
          type="button"
          className={`px-3 py-1 text-sm rounded ${
            editor.isActive("italic")
              ? "bg-blue-500 text-white"
              : "bg-transparent border-[1px] border-blue-950"
          }`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          Italic
        </button>

        {/* Bullet List */}
        <button
          type="button"
          className={`px-3 py-1 text-sm rounded ${
            editor.isActive("bulletList")
              ? "bg-blue-500 text-white"
              : "bg-transparent border-[1px] border-blue-950"
          }`}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          • List
        </button>

        {/* Numbered List */}
        <button
          type="button"
          className={`px-3 py-1 text-sm rounded ${
            editor.isActive("orderedList")
              ? "bg-blue-500 text-white"
              : "bg-transparent border-[1px] border-blue-950"
          }`}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          1. List
        </button>
      </div>

      {/* Editor Content */}
      <EditorContent className="w-full" editor={editor} />
    </div>
  );
};

export default TiptapEditor;
