import { prisma } from "@/lib/prisma";
import BlogList from "./_components/BlogList";

export default async function BlogPage() {
  // 1. 从数据库读取真实数据
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc', // 最新的文章排在前面
    },
  });

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">My Blog</h1>

      {/* 2. 将真实数据传给客户端组件 */}
      <BlogList initialPosts={posts} />
    </main>
  );
}