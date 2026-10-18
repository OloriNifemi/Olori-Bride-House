import { Crown, CircleCheck, Clock } from 'lucide-react'

// Temporary test screen — proves Tailwind, fonts, colours and icons work.
// We'll replace this with the real app layout in the next stage.
export default function App() {
  const swatches = [
    ['ivory', 'bg-ivory'],
    ['cream', 'bg-cream'],
    ['champagne', 'bg-champagne'],
    ['blush', 'bg-blush'],
    ['rose', 'bg-rose'],
    ['sage', 'bg-sage'],
    ['gold', 'bg-gold'],
    ['cocoa', 'bg-cocoa'],
  ]

  return (
    <main className="min-h-screen p-8 md:p-12">
      <div className="max-w-3xl mx-auto bg-cream border border-line rounded-2xl p-8 shadow-soft">
        <div className="flex items-center gap-3 text-rose">
          <Crown size={28} strokeWidth={1.5} />
          <span className="uppercase tracking-[0.2em] text-sm font-medium">Business HQ</span>
        </div>

        <h1 className="text-5xl mt-4">Olóri Bride House</h1>
        <p className="text-muted mt-2 text-lg">
          We take care of the bride, so she can enjoy her wedding.
        </p>

        <div className="grid grid-cols-4 gap-3 mt-8">
          {swatches.map(([name, cls]) => (
            <div key={name} className="text-sm text-muted">
              <div className={`${cls} h-14 rounded-lg border border-line`} />
              <span className="block mt-1">{name}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mt-8">
          <button className="bg-cocoa text-cream px-5 py-2.5 rounded-lg hover:bg-rose-deep transition-colors">
            Primary button
          </button>
          <span className="inline-flex items-center gap-1.5 bg-sage text-sage-deep px-3 py-1.5 rounded-full text-sm">
            <CircleCheck size={16} /> Completed
          </span>
          <span className="inline-flex items-center gap-1.5 bg-amber text-amber-deep px-3 py-1.5 rounded-full text-sm">
            <Clock size={16} /> Overdue
          </span>
        </div>

        <p className="tabular mt-8 text-2xl">₦80,000 · ₦200,000 · ₦480,000</p>
      </div>
    </main>
  )
}