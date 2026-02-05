import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createPost } from "../actions"; // 确保路径正确

export default function NewPostPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">撰写新文章</h1>
      
      {/* 1. 绑定 action */}
      <form action={createPost} className="space-y-6">
        
        <div className="space-y-2">
          <label className="text-sm font-medium">文章标题</label>
          {/* 2. name="title" 对应 formData.get("title") */}
          <Input name="title" required placeholder="输入一个吸引人的标题..." />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">分类</label>
            {/* 3. name="category" 对应数据库的 category 字段 */}
            <Input name="category" required placeholder="例如: 技术, 生活..." />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Slug (URL 路径)</label>
            {/* 4. name="slug" 必须唯一 */}
            <Input name="slug" required placeholder="my-first-post" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">文章摘要 (Excerpt)</label>
          {/* 5. 把之前的 description 改名为 excerpt */}
          <Textarea name="excerpt" required placeholder="简短的描述，会显示在列表页..." />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">内容 (Markdown)</label>
          {/* 6. name="content" */}
          <Textarea 
            name="content"
            required
            placeholder="使用 Markdown 语法书写..." 
            className="min-h-[400px] font-mono"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button variant="outline" type="button">取消</Button>
          <Button type="submit">保存并发布</Button>
        </div>
      </form>
    </div>
  );
}