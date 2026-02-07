import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { updatePost } from "../../actions";
import EditPostForm from "../../_components/EditPostForm"; // 引入刚才创建的表单

export const dynamic = "force-dynamic"; // <--- 强制该页面为动态渲染

export default async function EditPostPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });

  if (!post) notFound();

  async function handleUpdate(formData: FormData) {
    "use server"; 
    await updatePost(id, formData);
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">编辑文章</h1>
      {/* 使用客户端表单组件，并把数据和方法传过去 */}
      <EditPostForm post={post} handleUpdate={handleUpdate} />
    </div>
  );
}