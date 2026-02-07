import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
// 1. 删掉这一行，因为我们不再需要解析 Markdown
// import ReactMarkdown from "react-markdown"; 
import { Calendar, Tag, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function PostDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post) notFound();

  return (
    <article className="max-w-3xl mx-auto py-20 px-4">
      {/* 返回按钮 */}
      <Link href="/blog" className="flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ChevronLeft className="w-4 h-4 mr-1" />
        返回列表
      </Link>

      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4 tracking-tight">{post.title}</h1>
        <div className="flex items-center text-muted-foreground gap-4 text-sm">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
          <span className="flex items-center gap-1">
            <Tag className="w-4 h-4" />
            {post.category}
          </span>
        </div>
      </header>

      <hr className="my-8 border-zinc-200 dark:border-zinc-800" />

      {/* 2. 修改这里：使用 dangerouslySetInnerHTML 来渲染编辑器生成的 HTML */}
      {/* 注意：prose 类名依然保留，它负责给这些 HTML 标签添加漂亮的样式 */}
      <div 
        className="prose prose-stone lg:prose-xl max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />
    </article>
  );
}