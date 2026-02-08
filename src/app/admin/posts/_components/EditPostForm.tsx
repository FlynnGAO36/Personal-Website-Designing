"use client"; // <--- 关键：声明为客户端组件

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation"; // 1. 引入路由钩子

// 在这里安全地使用 dynamic ssr: false
const RichTextEditor = dynamic(() => import("./RichTextEditor"), { 
  ssr: false,
  loading: () => <div className="h-[400px] w-full bg-zinc-50 dark:bg-zinc-800 animate-pulse rounded-lg" />
});

interface EditPostFormProps {
  post: any;
  handleUpdate: (formData: FormData) => Promise<void>;
}

export default function EditPostForm({ post, handleUpdate }: EditPostFormProps) {
  const router = useRouter(); // 2. 初始化路由

  return (
    <form action={handleUpdate} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">文章标题</label>
        <Input name="title" defaultValue={post.title} required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">分类</label>
          <Input name="category" defaultValue={post.category} required />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Slug (URL 路径)</label>
          <Input name="slug" defaultValue={post.slug} required />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">文章摘要</label>
        <Textarea name="excerpt" defaultValue={post.excerpt} required />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">内容</label>
        <RichTextEditor initialContent={post.content} />
      </div>

      <div className="flex justify-end space-x-4">
        {/* 3. 修改取消按钮：添加跳转逻辑和鼠标手势 */}
        <Button 
          variant="outline" 
          type="button" 
          onClick={() => router.push("/admin/posts")}
          className="cursor-pointer"
        >
          取消
        </Button>

        {/* 4. 修改保存按钮：添加鼠标手势 */}
        <Button 
          type="submit" 
          className="cursor-pointer"
          onClick={() => router.push("/admin/posts")}
        >
          保存修改
        </Button>
      </div>
    </form>
  );
}