import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const workspace = await prisma.workspace.findFirst();

  const totalFeedback = workspace
    ? await prisma.feedback.count({ where: { workspaceId: workspace.id } })
    : 0;

  const negativeCount = workspace
    ? await prisma.feedback.count({
        where: { workspaceId: workspace.id, sentiment: "NEG" },
      })
    : 0;

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const newThisWeek = workspace
    ? await prisma.feedback.count({
        where: { workspaceId: workspace.id, createdAt: { gte: weekAgo } },
      })
    : 0;

  const channelCounts = workspace
    ? await prisma.feedback.groupBy({
        by: ["channel"],
        where: { workspaceId: workspace.id },
        _count: true,
      })
    : [];

  const sentimentCounts = workspace
    ? await prisma.feedback.groupBy({
        by: ["sentiment"],
        where: { workspaceId: workspace.id },
        _count: true,
      })
    : [];

  const percentNegative = totalFeedback > 0 ? Math.round((negativeCount / totalFeedback) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <aside className="w-60 border-r border-slate-800 p-6 flex flex-col gap-1">
        <div className="text-xl font-bold mb-8">LOOP</div>
        <a href="/dashboard" className="px-3 py-2 rounded-lg bg-indigo-500/10 text-indigo-400 font-medium">Dashboard</a>
        <a href="/inbox" className="px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white transition">Inbox</a>
        <a href="/trends" className="px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white transition">Trends</a>
        <a href="/ask" className="px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white transition">Ask LOOP</a>
        <a href="/reports" className="px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white transition">Reports</a>
      </aside>

      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
        <p className="text-slate-400 mb-8">Overview of your feedback · live from database</p>

        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <p className="text-slate-400 text-sm mb-1">Total feedback</p>
            <p className="text-3xl font-bold">{totalFeedback}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <p className="text-slate-400 text-sm mb-1">% Negative</p>
            <p className="text-3xl font-bold text-red-400">{percentNegative}%</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <p className="text-slate-400 text-sm mb-1">New this week</p>
            <p className="text-3xl font-bold">{newThisWeek}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <p className="text-slate-400 text-sm mb-1">Channels</p>
            <p className="text-3xl font-bold">{channelCounts.length}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <p className="text-sm text-slate-400 mb-4">Feedback by channel</p>
            <div className="flex flex-col gap-3">
              {channelCounts.length === 0 ? (
                <p className="text-slate-600 text-sm">No data yet</p>
              ) : (
                channelCounts.map((c) => (
                  <div key={c.channel} className="flex items-center gap-3">
                    <span className="text-sm text-slate-300 w-32 truncate">{c.channel}</span>
                    <div className="flex-1 bg-slate-800 rounded-full h-2">
                      <div
                        className="bg-indigo-500 h-2 rounded-full"
                        style={{ width: `${(c._count / totalFeedback) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-slate-400 w-8 text-right">{c._count}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <p className="text-sm text-slate-400 mb-4">Sentiment breakdown</p>
            <div className="flex flex-col gap-3">
              {sentimentCounts.length === 0 ? (
                <p className="text-slate-600 text-sm">No data yet — run classification</p>
              ) : (
                sentimentCounts.map((s) => (
                  <div key={s.sentiment} className="flex items-center gap-3">
                    <span className="text-sm text-slate-300 w-32">{s.sentiment ?? "Unclassified"}</span>
                    <div className="flex-1 bg-slate-800 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          s.sentiment === "POS" ? "bg-green-500" : s.sentiment === "NEG" ? "bg-red-500" : "bg-slate-500"
                        }`}
                        style={{ width: `${(s._count / totalFeedback) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-slate-400 w-8 text-right">{s._count}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}