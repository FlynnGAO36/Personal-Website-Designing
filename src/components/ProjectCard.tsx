import { ExternalLink, Github } from "lucide-react" // 如果报错，运行 npm install lucide-react

interface ProjectProps {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
}

export function ProjectCard({ title, description, tags, link, github }: ProjectProps) {
  return (
    <div className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      <div className="flex flex-col h-full">
        <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-600 text-sm mb-4 flex-grow leading-relaxed">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-4 mt-auto">
          {github && (
            <a href={github} target="_blank" className="flex items-center text-sm text-slate-500 hover:text-blue-600 transition-colors">
              <Github className="w-4 h-4 mr-1" /> Code
            </a>
          )}
          {link && (
            <a href={link} target="_blank" className="flex items-center text-sm text-slate-500 hover:text-blue-600 transition-colors">
              <ExternalLink className="w-4 h-4 mr-1" /> Demo
            </a>
          )}
        </div>
      </div>
    </div>
  )
}