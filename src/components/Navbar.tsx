import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <nav className="border-b border-purple-500/20 bg-slate-900/70 backdrop-blur-md sticky top-0 z-50 shadow-[0_4px_20px_rgba(168,85,247,0.1)]">
      <div className="flex h-16 items-center px-4 max-w-7xl mx-auto justify-between">
        <div className="font-bold text-xl tracking-tighter bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
          <Link href="/" className="hover:opacity-80 transition-opacity">UNIMELB.LOG</Link>
        </div>
        <div className="space-x-6 text-sm font-medium flex items-center text-purple-200">
          <Link href="/blog" className="hover:text-fuchsia-400 transition-colors relative group">
            Blog
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-fuchsia-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="/about" className="hover:text-fuchsia-400 transition-colors relative group">
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-fuchsia-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="/admin">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-purple-500/50 bg-purple-950/30 text-purple-200 hover:bg-purple-900/50 hover:text-fuchsia-300 hover:border-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all duration-300"
            >
              Admin
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
