import Link from "next/link"; // 1. 引入 Link

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            🛡️ 管理员控制台
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            身份核验通过。欢迎回来，这是你的私人后台。
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 2. 将卡片包装在 Link 中 */}
            <Link href="/admin/posts/new">
              <div className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer">
                <h3 className="font-semibold mb-1 text-zinc-900 dark:text-zinc-100">发布文章</h3>
                <p className="text-sm text-zinc-500">撰写并发布新的博客内容</p>
              </div>
            </Link>

            <Link href="/admin/posts">
              <div className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer">
                <h3 className="font-semibold mb-1 text-zinc-900 dark:text-zinc-100">文章管理</h3>
                <p className="text-sm text-zinc-500">编辑或删除已发布的文章</p>
              </div>
            </Link>
          </div>

          <div className="mt-10 pt-6 border-t border-zinc-100 dark:border-zinc-800">
            <Link href="/api/auth/signout" className="text-sm text-red-600 hover:text-red-500 font-medium">
              安全退出登录 →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}