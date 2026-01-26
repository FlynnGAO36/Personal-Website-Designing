import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 max-w-7xl mx-auto justify-between">
        <div className="font-bold text-xl tracking-tighter">
          <Link href="/">UNIMELB.LOG</Link>
        </div>
        <div className="space-x-6 text-sm font-medium flex items-center">
          <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
          <Link href="/about" className="hover:text-primary transition-colors">About</Link>
          {/* 这里预留给未来的管理后台入口 */}
          <Link href="/admin">
            <Button variant="outline" size="sm">Admin</Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}