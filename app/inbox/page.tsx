export default function Inbox() {
  const feedback = [
    { id: 1, content: "Onboarding took forever — couldn't figure out how to invite my team.", channel: "Support ticket", sentiment: "Negative", status: "NEW" },
    { id: 2, content: "The new dashboard is gorgeous and finally fast.", channel: "App store", sentiment: "Positive", status: "REVIEWED" },
    { id: 3, content: "It does the job, but the mobile experience needs work.", channel: "NPS survey", sentiment: "Neutral", status: "NEW" },
    { id: 4, content: "Prospect wants SSO before they'll sign — third time this month.", channel: "Sales call", sentiment: "Negative", status: "ACTIONED" },
    { id: 5, content: "Love the new export feature, saved me an hour today.", channel: "Community post", sentiment: "Positive", status: "REVIEWED" },
  ];

  const sentimentColor: Record<string, string> = {
    Positive: "text-green-400 bg-green-500/10",
    Neutral: "text-slate-400 bg-slate-500/10",
    Negative: "text-red-400 bg-red-500/10",
  };

  const statusColor: Record<string, string> = {
    NEW: "text-indigo-400 bg-indigo-500/10",
    REVIEWED: "text-yellow-400 bg-yellow-500/10",
    ACTIONED: "text-green-400 bg-green-500/10",
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      {/* Sidebar */}
      <aside className="w-60 border-r border-slate-800 p-6 flex flex-col gap-1">
        <div className="text-xl font-bold mb-8">LOOP</div>
        <a href="/dashboard" className="px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white transition">
          Dashboard
        </a>
        <a href="/inbox" className="px-3 py-2 rounded-lg bg-indigo-500/10 text-indigo-400 font-medium">
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
        <h1 className="text-2xl font-bold mb-1">Inbox</h1>
        <p className="text-slate-400 mb-6">Search, filter, and triage feedback</p>

        {/* Search + filters */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Search feedback..."
            className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <select className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-400">
            <option>All channels</option>
          </select>
          <select className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-400">
            <option>All sentiment</option>
          </select>
          <select className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-400">
            <option>All status</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-left">
                <th className="px-5 py-3 font-medium">Feedback</th>
                <th className="px-5 py-3 font-medium">Channel</th>
                <th className="px-5 py-3 font-medium">Sentiment</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {feedback.map((item) => (
                <tr key={item.id} className="border-b border-slate-800 last:border-0 hover:bg-slate-800/50">
                  <td className="px-5 py-4 max-w-md">{item.content}</td>
                  <td className="px-5 py-4 text-slate-400">{item.channel}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${sentimentColor[item.sentiment]}`}>
                      {item.sentiment}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[item.status]}`}>
                      {item.status}
                    </span>
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