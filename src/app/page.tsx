// 1. 引入依赖
import { prisma } from "@/lib/prisma" 
import { Hero } from "@/components/Hero"
import { Timeline } from "@/components/Timeline"
import { ProjectCard } from "@/components/ProjectCard"
import { ParticleBackground } from "@/components/ParticleBackground"
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
  // 添加错误处理，如果数据库连接失败，使用空数组
  let posts: any[] = [];
  try {
    posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: 4
    });
  } catch (error) {
    console.log('Database connection failed, using empty posts array', error);
  }

  return (
    <main className="min-h-screen relative">
      <ParticleBackground />
      <div className="relative z-10">
        <Hero />
      
        {/* 项目展示区 */}
        <section className="py-20 px-6 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
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
            <h2 className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent tracking-tight">
              Latest Insights
            </h2>
            <span className="text-sm text-purple-300/70 font-medium">
              {posts.length} Posts Found
            </span>
          </div>
        
        
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <article 
                key={post.id} 
                className="group relative flex flex-col p-7 bg-slate-900/50 backdrop-blur-sm border border-purple-500/30 rounded-3xl hover:shadow-2xl hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:-translate-y-2 hover:border-fuchsia-500/50 transition-all duration-300"
              >
                {/* 发光边框效果 */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/0 via-fuchsia-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:via-fuchsia-500/10 group-hover:to-pink-500/10 transition-all duration-300 -z-10 blur-xl" />
                
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-purple-950/50 text-purple-300 border border-purple-500/30">
                    {post.category}
                  </span>
                  <time className="text-xs text-purple-300/60">
                    {new Date(post.createdAt).toLocaleDateString('zh-CN')}
                  </time>
                </div>

                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-fuchsia-300 bg-clip-text text-transparent group-hover:from-purple-200 group-hover:to-fuchsia-200 transition-all">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>

                <p className="text-purple-200/80 mt-4 line-clamp-2 text-sm leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="mt-8 pt-6 border-t border-purple-500/20 flex items-center justify-between">
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="text-sm font-bold text-fuchsia-400 group-hover:text-fuchsia-300 flex items-center gap-1"
                  >
                    Read full story <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
      </section>


        <Timeline />
      </div>
    </main>
  )
}
