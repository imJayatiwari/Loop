export default function Trends() {
  const themes = [
    { name: "Onboarding friction", count: 42, change: "+18%", spiking: true },
    { name: "Billing issues", count: 31, change: "+6%", spiking: false },
    { name: "Mobile experience", count: 27, change: "-4%", spiking: false },
    { name: "SSO requests", count: 19, change: "+40%", spiking: true },
    { name: "Export feature", count: 15, change: "+2%", spiking: false },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <aside className="w-60 border-r border-slate-800 p-6 flex flex-col gap-1">
        <div className="text-xl font-bold mb-8">LOOP</div>
        <a href="/dashboard" className="px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white transition">Dashboard</a>
        <a href="/inbox" className="px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white transition">Inbox</a>
        <a href="/trends" className="px-3 py-2 rounded-lg bg-indigo-500/10 text-indigo-400 font-medium">Trends</a>
        <a href="/ask" className="px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white transition">Ask LOOP</a>
        <a href="/reports" className="px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white transition">Reports</a>
      </aside>

      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-1">Trends</h1>
        <p className="text-slate-400 mb-6">Themes and how they're moving week over week</p>

        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-left">
                <th className="px-5 py-3 font-medium">Theme</th>
                <th className="px-5 py-3 font-medium">Count</th>
                <th className="px-5 py-3 font-medium">Change vs last period</th>
              </tr>
            </thead>
            <tbody>
              {themes.map((t) => (
                <tr key={t.name} className="border-b border-slate-800 last:border-0 hover:bg-slate-800/50">
                  <td className="px-5 py-4 flex items-center gap-2">
                    {t.name}
                    {t.spiking && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium text-orange-400 bg-orange-500/10">
                        Spiking
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-slate-400">{t.count}</td>
                  <td className={`px-5 py-4 font-medium ${t.change.startsWith("+") ? "text-red-400" : "text-green-400"}`}>
                    {t.change}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}