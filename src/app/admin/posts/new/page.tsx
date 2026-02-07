"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createPost } from "../actions"; 
// 1. 引入 dynamic 工具
import dynamic from "next/dynamic";

// 2. 使用 dynamic 导入组件，并关闭服务端渲染 (ssr: false)
// 这样可以彻底解决 Tiptap 的 Hydration 报错问题
const RichTextEditor = dynamic(() => import("../_components/RichTextEditor"), { 
  ssr: false,
  // 可选：添加一个加载时的占位状态，让 UI 更平滑
  loading: () => <div className="h-[400px] w-full bg-zinc-50 dark:bg-zinc-800/50 animate-pulse rounded-lg border border-zinc-200 dark:border-zinc-800" />
});

export default function NewPostPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">撰写新文章</h1>
      
      <form action={createPost} className="space-y-6">
        
        <div className="space-y-2">
          <label className="text-sm font-medium">文章标题</label>
          <Input name="title" required placeholder="输入一个吸引人的标题..." />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">分类</label>
            <Input name="category" required placeholder="例如: 技术, 生活..." />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Slug (URL 路径)</label>
            <Input name="slug" required placeholder="my-first-post" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">文章摘要 (Excerpt)</label>
          <Textarea name="excerpt" required placeholder="简短的描述，会显示在列表页..." />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">内容 (Rich Text)</label>
          {/* 3. 这里的用法保持不变 */}
          <RichTextEditor />
        </div>

        <div className="flex justify-end space-x-4">
          <Button variant="outline" type="button">取消</Button>
          <Button type="submit">保存并发布</Button>
        </div>
      </form>
    </div>
  );
}