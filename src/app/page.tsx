// 1. 引入依赖
import { prisma } from "@/lib/prisma" 
import { Hero } from "@/components/Hero"
import { Timeline } from "@/components/Timeline"
import { ProjectCard } from "@/components/ProjectCard"

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

export default async function HomePage() {
  // 2. 读取数据库中的文章数据
  // 如果这里 prisma 下方有红线，请确保你创建了 src/lib/prisma.ts 文件
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    take: 3 
  });

  return (
    <main className="min-h-screen bg-white">
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

      {/* 博客文章展示区 */}
      <section className="py-20 px-6 max-w-5xl mx-auto border-t border-slate-100">
        <h2 className="text-3xl font-bold mb-12 text-center text-slate-800">
          Latest Blog Posts
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <div key={post.id} className="group p-6 bg-white border border-slate-200 rounded-2xl hover:border-blue-400 transition-all">
              <span className="text-xs font-medium text-blue-600 uppercase tracking-wider">
                {post.category}
              </span>
              <h3 className="text-xl font-bold mt-2 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h3>
              <p className="text-slate-600 mt-3 line-clamp-2">
                {post.excerpt}
              </p>
              <div className="mt-6 flex items-center text-sm text-slate-400">
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                <span className="mx-2">•</span>
                <span className="text-blue-500 font-medium">Read more →</span>
              </div>
            </div>
          ))}
        </div>

        {posts.length === 0 && (
          <p className="text-center text-slate-400 italic">数据库里暂时没有文章...</p>
        )}
      </section>

      <section className="bg-slate-50/50">
        <Timeline />
      </section>
    </main>
  )
}