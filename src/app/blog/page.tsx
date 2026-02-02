'use client';

import { useState } from 'react';
import BlogCard from '@/components/BlogCard';
import CategoryFilter from '@/components/CategoryFilter';

// 模拟数据 (等数据库通了再替换)
const MOCK_POSTS = [
  { id: 1, title: 'Next.js 实战指南', category: 'React', date: '2024-05-20', excerpt: '探索 Next.js 14 的最新特性...' },
  { id: 2, title: 'Prisma 数据库建模', category: 'Database', date: '2024-05-22', excerpt: '如何优雅地设计你的数据库 schema...' },
  { id: 3, title: 'Tailwind CSS 技巧', category: 'CSS', date: '2024-05-25', excerpt: '从零开始掌握原子化 CSS...' },
  // ... 多加几条测试 Grid 布局
];

const CATEGORIES = ['All', 'React', 'Database', 'CSS', 'JavaScript'];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // 核心过滤逻辑
  const filteredPosts = MOCK_POSTS.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">My Blog</h1>

      {/* 搜索与过滤栏 */}
      <div className="flex flex-col md:flex-row gap-4 mb-10 justify-between items-center">
        <input 
          type="text"
          placeholder="搜索文章标题..."
          className="p-2 border rounded-lg w-full md:w-64 dark:bg-zinc-800"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <CategoryFilter 
          categories={CATEGORIES} 
          active={activeCategory} 
          onSelect={setActiveCategory} 
        />
      </div>

      {/* 响应式 Grid 布局 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map(post => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {/* 无结果处理 */}
      {filteredPosts.length === 0 && (
        <p className="text-center text-gray-500 mt-20">没找到相关文章，换个关键词试试？</p>
      )}
    </main>
  );
}