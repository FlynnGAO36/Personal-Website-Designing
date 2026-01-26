import { Badge } from "@/components/ui/badge"

export function Hero() {
  const skills = ["Python", "C", "Java", "SQL", "JS", "TS", "Next.js"];

  return (
    <section className="py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              你好，我是 Flynn 👋
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              就读于 <span className="font-semibold text-foreground">墨尔本大学 (Unimelb)</span>
              <br />
              预计于 2027 年 12 月毕业
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="px-3 py-1 text-sm">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}