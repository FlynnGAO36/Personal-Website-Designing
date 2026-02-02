interface CategoryFilterProps {
  categories: string[];               // 这是一个字符串数组
  active: string;                     // 当前选中的分类
  onSelect: (category: string) => void; // 这是一个函数，接收一个字符串且没有返回值
}

export default function CategoryFilter({ categories, active, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-1 rounded-full text-sm transition-colors whitespace-nowrap ${
            active === cat
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}