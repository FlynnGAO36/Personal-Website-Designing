// 1. 引入依赖
import { prisma } from "@/lib/prisma" 
import { Hero } from "@/components/Hero"
import { Timeline } from "@/components/Timeline"
import { ProjectCard } from "@/components/ProjectCard"
import Link from "next/link"

// --- 补回你的静态项目数据 ---
const projects = [
  {
    title: "Python Data Analyzer",
    description: "Developed as part of COMP10001 at Unimelb. A robust tool for processing complex datasets using foundational Python algorithms.",
    tags: ["Python", "Algorithms", "Academic"],
  },
  {
    title: "C Memory Management Tool",
    description: "Built for COMP10002. Focused on efficient data structures and manual memory management in C.",
    tags: ["C", "Pointers", "Data Structures"],
  },
  {
    title: "Personal Portfolio Website",
    description: "The very site you are seeing now! Built with Next.js 15, Tailwind CSS v4, and Shadcn UI.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind"],
    github: "https://github.com/your-username/unimelb-blog"
  }
];

// 第 7 天核心：分类颜色映射表
const categoryStyles: Record<string, string> = {
  "Food": "bg-orange-100 text-orange-700",
  "Life": "bg-green-100 text-green-700",
  "Study Tips": "bg-purple-100 text-purple-700",
  "Melbourne Life": "bg-blue-100 text-blue-700",
};

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // 2. 读取数据库中的文章数据
  // 如果这里 prisma 下方有红线，请确保你创建了 src/lib/prisma.ts 文件
  const posts = await prisma.post.findMany({
      where: { published: true }, // 过滤：只看发布的
      orderBy: { createdAt: 'desc' }, // 排序：最新的在最前
      take: 4 // 限制：展示最新的 4 篇
    });

  return (
    <main className="min-h-screen bg-slate-50/30">
      <Hero />
      
      {/* 项目展示区 */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center text-slate-800">
          Projects & Coursework
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </section>

      {/* 博客文章展示区 (原本第 9 天的重点：数据渲染) */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Latest Insights
          </h2>
          <span className="text-sm text-slate-500 font-medium">
            {posts.length} Posts Found
          </span>
        </div>
        
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <article 
              key={post.id} 
              className="group relative flex flex-col p-7 bg-white border border-slate-200 rounded-3xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${categoryStyles[post.category] || 'bg-slate-100 text-slate-600'}`}>
                  {post.category}
                </span>
                <time className="text-xs text-slate-400">
                  {new Date(post.createdAt).toLocaleDateString('zh-CN')}
                </time>
              </div>

              <h3 className="text-2xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                <Link href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h3>

              <p className="text-slate-600 mt-4 line-clamp-2 text-sm leading-relaxed">
                {post.excerpt}
              </p>

              <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                <Link 
                  href={`/blog/${post.slug}`}
                  className="text-sm font-bold text-blue-500 group-hover:text-blue-700 flex items-center gap-1"
                >
                  Read full story <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>


      <Timeline />
    </main>
  )
}