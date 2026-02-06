import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Calendar, Tag, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function PostDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  // 1. 获取 URL 中的 slug
  const { slug } = await params;

  // 2. 去数据库找对应 slug 的文章
  const post = await prisma.post.findUnique({
    where: { slug },
  });

  // 3. 没找到就报 404
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

      {/* 4. 关键：渲染正文。prose 类会让 Markdown 变得非常精美 */}
      <div className="prose prose-stone lg:prose-xl max-w-none dark:prose-invert">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}