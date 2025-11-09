export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/20 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <h1 className="text-base md:text-lg font-semibold text-cyan-300">Banking Application</h1>
        <div className="text-xs text-gray-400">React + Tailwind + Axios</div>
      </div>
    </header>
  )
}
