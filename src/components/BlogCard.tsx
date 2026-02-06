import Link from 'next/link';
import { Calendar, ChevronRight } from 'lucide-react';

const categoryStyles: { [key: string]: string } = {
  React: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Database: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  CSS: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
  JavaScript: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  Default: 'bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-zinc-400',
};

// 【修改 1】：在接口中增加 slug，因为它决定了跳转路径
interface PostProps {
  post: {
    id: number | string;
    title: string;
    category: string;
    date: string;
    excerpt: string;
    slug: string; // <--- 新增
  };
}

export default function BlogCard({ post }: PostProps) {
  const categoryStyle = categoryStyles[post.category] || categoryStyles.Default;

  return (
    // 【修改 2】：关键！将 href 从 /blog/${post.id} 改为 /blog/${post.slug}
    <Link href={`/blog/${post.slug}`} className="group">
      <article className="h-full flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        
        {/* 占位图区域 */}
        <div className="aspect-video bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center overflow-hidden">
          <span className="text-4xl group-hover:scale-110 transition-transform duration-500">📝</span>
        </div>

        {/* 内容区域 */}
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center gap-3 mb-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryStyle}`}>
              {post.category}
            </span>
            <span className="flex items-center text-xs text-zinc-500 dark:text-zinc-400">
              <Calendar className="w-3 h-3 mr-1" />
              {post.date}
            </span>
          </div>

          <h3 className="text-xl font-bold mb-3 text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
            {post.title}
          </h3>

          <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed line-clamp-2 mb-6 flex-grow">
            {post.excerpt}
          </p>

          <div className="flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
            阅读全文 <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </div>
      </article>
    </Link>
  );
}