export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      {/* Sidebar */}
      <aside className="w-60 border-r border-slate-800 p-6 flex flex-col gap-1">
        <div className="text-xl font-bold mb-8">LOOP</div>
        <a href="/dashboard" className="px-3 py-2 rounded-lg bg-indigo-500/10 text-indigo-400 font-medium">
          Dashboard
        </a>
        <a href="/inbox" className="px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white transition">
          Inbox
        </a>
        <a href="/trends" className="px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white transition">
          Trends
        </a>
        <a href="/ask" className="px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white transition">
          Ask LOOP
        </a>
        <a href="/reports" className="px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white transition">
          Reports
        </a>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
        <p className="text-slate-400 mb-8">Overview of your feedback, last 30 days</p>

        {/* Stat cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <p className="text-slate-400 text-sm mb-1">Total feedback</p>
            <p className="text-3xl font-bold">1,284</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <p className="text-slate-400 text-sm mb-1">% Negative</p>
            <p className="text-3xl font-bold text-red-400">18%</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <p className="text-slate-400 text-sm mb-1">New this week</p>
            <p className="text-3xl font-bold">96</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <p className="text-slate-400 text-sm mb-1">Active themes</p>
            <p className="text-3xl font-bold">12</p>
          </div>
        </div>

        {/* Chart placeholders */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 h-64 flex items-center justify-center text-slate-600">
            Volume over time (chart)
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 h-64 flex items-center justify-center text-slate-600">
            Sentiment breakdown (chart)
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 h-64 flex items-center justify-center text-slate-600 col-span-2">
            Top themes (chart)
          </div>
        </div>
      </main>
    </div>
  );
}