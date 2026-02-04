import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function NewPostPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">撰写新文章</h1>
      
      <form className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">文章标题</label>
          <Input placeholder="输入一个吸引人的标题..." />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">文章描述 (SEO)</label>
          <Textarea placeholder="简短的描述，会显示在列表页..." />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">分类</label>
            <Input placeholder="例如: 技术, 生活..." />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Slug (URL 路径)</label>
            <Input placeholder="my-first-post" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">内容 (Markdown)</label>
          <Textarea 
            placeholder="使用 Markdown 语法书写..." 
            className="min-h-[400px] font-mono"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button variant="outline">取消</Button>
          <Button>保存并发布</Button>
        </div>
      </form>
    </div>
  );
}