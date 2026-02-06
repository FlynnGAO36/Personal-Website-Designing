'use client';

import { useState } from 'react';
import BlogCard from '@/components/BlogCard';
import CategoryFilter from '@/components/CategoryFilter';

// 定义 Post 类型（为了 TS 不报错）
interface Post {
  id: string;
  title: string;
  category: string;
  createdAt: Date;
  excerpt: string;
  slug: string;
}

export default function BlogList({ initialPosts }: { initialPosts: Post[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // 动态生成全部分类
  const CATEGORIES = ['All', ...Array.from(new Set(initialPosts.map(p => p.category)))];

  // 核心过滤逻辑（现在针对数据库传来的 initialPosts）
  const filteredPosts = initialPosts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
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
          // 注意：确保 BlogCard 能接受数据库格式的 post 数据
          <BlogCard key={post.id} post={{
            ...post,
            date: new Date(post.createdAt).toLocaleDateString() // 转换日期格式
          }} />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <p className="text-center text-gray-500 mt-20">没找到相关文章，换个关键词试试？</p>
      )}
    </>
  );
}