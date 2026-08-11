export default function AskLoop() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <aside className="w-60 border-r border-slate-800 p-6 flex flex-col gap-1">
        <div className="text-xl font-bold mb-8">LOOP</div>
        <a href="/dashboard" className="px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white transition">Dashboard</a>
        <a href="/inbox" className="px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white transition">Inbox</a>
        <a href="/trends" className="px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white transition">Trends</a>
        <a href="/ask" className="px-3 py-2 rounded-lg bg-indigo-500/10 text-indigo-400 font-medium">Ask LOOP</a>
        <a href="/reports" className="px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white transition">Reports</a>
      </aside>

      <main className="flex-1 p-8 flex flex-col max-w-3xl">
        <h1 className="text-2xl font-bold mb-1">Ask LOOP</h1>
        <p className="text-slate-400 mb-6">Ask a plain-English question about your feedback</p>

        <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-5 mb-4 min-h-[300px]">
          <div className="bg-slate-800 rounded-lg p-4 mb-3 max-w-md">
            <p className="text-sm">What are users saying about onboarding?</p>
          </div>
          <div className="bg-indigo-500/10 rounded-lg p-4 max-w-lg">
            <p className="text-sm text-slate-200">
              Based on 42 feedback items, onboarding is the #1 complaint theme. Users
              consistently mention difficulty inviting team members and unclear first steps.
            </p>
            <p className="text-xs text-slate-500 mt-2">Sources: 3 support tickets, 2 NPS responses</p>
          </div>
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Ask a question about your feedback..."
            className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <button className="bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-lg font-medium transition">
            Ask
          </button>
        </div>
      </main>
    </div>
  );
}