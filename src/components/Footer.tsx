export default function Footer() {
  return (
    <footer className="border-t border-purple-500/20 bg-slate-900/70 backdrop-blur-md py-8 md:py-0 relative">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row max-w-7xl mx-auto px-4">
        <p className="text-center text-sm leading-loose text-purple-200/70 md:text-left">
          Built by <span className="text-fuchsia-400 font-semibold">You</span>. Currently studying at <span className="text-fuchsia-400 font-semibold">University of Melbourne</span>. 2024-2027.
        </p>
      </div>
    </footer>
  )
}
