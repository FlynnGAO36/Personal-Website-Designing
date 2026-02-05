import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { updatePost } from "../../actions";

// 【修改点 1】：params 现在是一个 Promise
export default async function EditPostPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // 【修改点 2】：必须先 await params 才能拿到 id
  const { id } = await params;

  // 2. 从数据库读取这篇文章的当前内容
  const post = await prisma.post.findUnique({
    where: { id },
  });

  // 3. 如果找不到文章，显示 404
  if (!post) {
    notFound();
  }

  // 4. 定义包装函数
  async function handleUpdate(formData: FormData) {
    "use server"; 
    await updatePost(id, formData);
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">编辑文章</h1>
      
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
          <Textarea 
            name="content" 
            defaultValue={post.content} 
            required 
            className="min-h-[400px] font-mono"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button variant="outline" type="button">取消</Button>
          <Button type="submit">保存修改</Button>
        </div>
      </form>
    </div>
  );
}