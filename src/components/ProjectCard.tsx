import { ExternalLink, Github } from "lucide-react"

interface ProjectProps {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
}

export function ProjectCard({ title, description, tags, link, github }: ProjectProps) {
  return (
    <div className="group relative rounded-xl border border-purple-500/30 bg-slate-900/50 backdrop-blur-sm p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:border-fuchsia-500/50">
      {/* 发光边框效果 */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 via-fuchsia-500/0 to-pink-500/0 group-hover:from-purple-500/20 group-hover:via-fuchsia-500/20 group-hover:to-pink-500/20 transition-all duration-300 -z-10 blur-xl" />
      
      <div className="flex flex-col h-full relative">
        <h3 className="text-xl font-bold bg-gradient-to-r from-purple-300 to-fuchsia-300 bg-clip-text text-transparent mb-2 group-hover:from-purple-200 group-hover:to-fuchsia-200 transition-all">
          {title}
        </h3>
        <p className="text-purple-200/80 text-sm mb-4 flex-grow leading-relaxed">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="px-3 py-1 bg-purple-950/50 text-purple-300 text-xs rounded-full border border-purple-500/30 hover:border-purple-400/50 hover:shadow-[0_0_10px_rgba(168,85,247,0.3)] transition-all duration-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-4 mt-auto">
          {github && (
            <a href={github} target="_blank" className="flex items-center text-sm text-purple-300 hover:text-fuchsia-300 transition-colors">
              <Github className="w-4 h-4 mr-1" /> Code
            </a>
          )}
          {link && (
            <a href={link} target="_blank" className="flex items-center text-sm text-purple-300 hover:text-fuchsia-300 transition-colors">
              <ExternalLink className="w-4 h-4 mr-1" /> Demo
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
