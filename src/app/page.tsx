import { Hero } from "@/components/Hero"
import { Timeline } from "@/components/Timeline"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* Hero 区域 */}
      <Hero />
      
      <hr className="border-slate-100" /> {/* 加一条若隐若现的分隔线 */}

      {/* Timeline 区域 */}
      <section className="flex-grow">
         <Timeline />
      </section>
    </main>
  )
}