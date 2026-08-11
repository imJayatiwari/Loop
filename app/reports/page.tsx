export default function Reports() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <aside className="w-60 border-r border-slate-800 p-6 flex flex-col gap-1">
        <div className="text-xl font-bold mb-8">LOOP</div>
        <a href="/dashboard" className="px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white transition">Dashboard</a>
        <a href="/inbox" className="px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white transition">Inbox</a>
        <a href="/trends" className="px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white transition">Trends</a>
        <a href="/ask" className="px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white transition">Ask LOOP</a>
        <a href="/reports" className="px-3 py-2 rounded-lg bg-indigo-500/10 text-indigo-400 font-medium">Reports</a>
      </aside>

      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">Voice-of-Customer Reports</h1>
            <p className="text-slate-400">Weekly digests generated from your feedback</p>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 rounded-lg font-medium transition">
            Generate Report
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {["Aug 4 – Aug 10, 2026", "Jul 28 – Aug 3, 2026", "Jul 21 – Jul 27, 2026"].map((period) => (
            <div key={period} className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex items-center justify-between">
              <div>
                <p className="font-medium">{period}</p>
                <p className="text-slate-400 text-sm">Top theme: Onboarding friction · 18% negative</p>
              </div>
              <button className="text-indigo-400 text-sm font-medium hover:underline">View →</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}