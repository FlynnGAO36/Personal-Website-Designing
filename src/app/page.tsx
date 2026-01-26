import { Hero } from "@/components/Hero"
import { Timeline } from "@/components/Timeline"
import { ProjectCard } from "@/components/ProjectCard"

// 定义项目数据
const projects = [
  {
    title: "Python Data Analyzer",
    description: "Developed as part of COMP10001 at Unimelb. A robust tool for processing complex datasets using foundational Python algorithms.",
    tags: ["Python", "Algorithms", "Academic"],
    // github: "https://github.com/your-username/project-1" // 如果以后有了再填
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

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      
      {/* 项目展示区 */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center text-slate-800">
          Projects & Coursework
        </h2>
        
        {/* 使用 Grid 布局：手机 1 列，平板 2 列，电脑 3 列 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </section>

      <section className="bg-slate-50/50">
        <Timeline />
      </section>
    </main>
  )
}