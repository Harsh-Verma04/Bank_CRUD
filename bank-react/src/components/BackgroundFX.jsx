export default function BackgroundFX() {
  return (
    <>
      {/* Radial glow accents */}
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-70">
        <div className="absolute -top-24 right-0 h-96 w-[42rem] blur-3xl"
             style={{ background: 'radial-gradient(600px 300px at 80% 0%, rgba(34,211,238,0.22), transparent 60%)' }} />
        <div className="absolute top-32 left-0 h-80 w-[36rem] blur-3xl"
             style={{ background: 'radial-gradient(500px 250px at 10% 20%, rgba(96,165,250,0.18), transparent 60%)' }} />
      </div>
      {/* Subtle grid */}
      <div className="pointer-events-none fixed inset-0 -z-20 opacity-[0.06] bg-grid" />
    </>
  )
}
