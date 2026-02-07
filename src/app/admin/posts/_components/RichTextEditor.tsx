"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { 
  Bold, Italic, List, ListOrdered, 
  Heading1, Heading2, Quote, Undo, Redo 
} from "lucide-react";
import { useEffect, useState } from "react";

interface RichTextEditorProps {
  initialContent?: string;
}

export default function RichTextEditor({ initialContent = "" }: RichTextEditorProps) {
  // 1. 创建编辑器实例
  const editor = useEditor({
    extensions: [StarterKit],
    content: initialContent,
    immediatelyRender: false,
    // 当内容变化时，我们要实时记录下来
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    // 给编辑器加上 Tailwind 样式
    editorProps: {
      attributes: {
        class: "prose prose-stone dark:prose-invert max-w-none min-h-[400px] p-4 focus:outline-none",
      },
    },
  });

  // 2. 用一个 state 存储 HTML 内容，用于表单提交
  const [content, setContent] = useState(initialContent);

  // 确保编辑器初始化后内容同步
  useEffect(() => {
    if (editor && initialContent) {
      editor.commands.setContent(initialContent);
    }
  }, [initialContent, editor]);

  if (!editor) return null;

  return (
    <div className="border rounded-lg overflow-hidden bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
      {/* 工具栏 */}
      <div className="flex flex-wrap gap-1 p-2 border-b bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-800">
        <ToolbarButton 
          onClick={() => editor.chain().focus().toggleBold().run()} 
          active={editor.isActive("bold")}
        >
          <Bold className="w-4 h-4" />
        </ToolbarButton>
        
        <ToolbarButton 
          onClick={() => editor.chain().focus().toggleItalic().run()} 
          active={editor.isActive("italic")}
        >
          <Italic className="w-4 h-4" />
        </ToolbarButton>

        <div className="w-[1px] h-6 bg-zinc-300 dark:bg-zinc-700 mx-1 self-center" />

        <ToolbarButton 
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} 
          active={editor.isActive("heading", { level: 1 })}
        >
          <Heading1 className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarButton 
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} 
          active={editor.isActive("heading", { level: 2 })}
        >
          <Heading2 className="w-4 h-4" />
        </ToolbarButton>

        <div className="w-[1px] h-6 bg-zinc-300 dark:bg-zinc-700 mx-1 self-center" />

        <ToolbarButton 
          onClick={() => editor.chain().focus().toggleBulletList().run()} 
          active={editor.isActive("bulletList")}
        >
          <List className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarButton 
          onClick={() => editor.chain().focus().toggleBlockquote().run()} 
          active={editor.isActive("blockquote")}
        >
          <Quote className="w-4 h-4" />
        </ToolbarButton>

        <div className="flex-grow" />

        <ToolbarButton onClick={() => editor.chain().focus().undo().run()}>
          <Undo className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()}>
          <Redo className="w-4 h-4" />
        </ToolbarButton>
      </div>

      {/* 编辑区域 */}
      <EditorContent editor={editor} />

      {/* 💡 秘密武器：隐藏的 input */}
      {/* 这样你的 Form Action 就能通过 formData.get("content") 拿到编辑器的 HTML 了 */}
      <input type="hidden" name="content" value={content} />
    </div>
  );
}

// 内部小组件：工具栏按钮
function ToolbarButton({ 
  onClick, 
  active = false, 
  children 
}: { 
  onClick: () => void; 
  active?: boolean; 
  children: React.ReactNode 
}) {
  return (
    <button
      type="button" // 必须是 type="button"，否则点击会触发表单提交！
      onClick={onClick}
      className={`p-2 rounded-md transition-colors ${
        active 
          ? "bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100" 
          : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
      }`}
    >
      {children}
    </button>
  );
}