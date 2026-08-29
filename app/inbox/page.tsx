import { prisma } from "@/lib/prisma";
import { UploadForm } from "./upload-form";
import { SimulateButton } from "./simulate-button";
import { FilterBar } from "./filter-bar";
import type { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function Inbox({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; channel?: string; sentiment?: string; status?: string }>;
}) {
  const params = await searchParams;
  const workspace = await prisma.workspace.findFirst();

  const where: Prisma.FeedbackWhereInput = workspace ? { workspaceId: workspace.id } : {};

  if (params.q) {
    where.content = { contains: params.q, mode: "insensitive" };
  }
  if (params.channel) {
    where.channel = params.channel;
  }
  if (params.sentiment) {
    where.sentiment = params.sentiment as "POS" | "NEU" | "NEG";
  }
  if (params.status) {
    where.status = params.status as "NEW" | "REVIEWED" | "ACTIONED";
  }

  const feedback = workspace
    ? await prisma.feedback.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: 50,
      })
    : [];

  const allFeedback = workspace
    ? await prisma.feedback.findMany({ where: { workspaceId: workspace.id }, select: { channel: true } })
    : [];
  const channels = Array.from(new Set(allFeedback.map((f) => f.channel)));

  const sentimentColor: Record<string, string> = {
    POS: "text-green-400 bg-green-500/10",
    NEU: "text-slate-400 bg-slate-500/10",
    NEG: "text-red-400 bg-red-500/10",
  };

  const sentimentLabel: Record<string, string> = {
    POS: "Positive",
    NEU: "Neutral",
    NEG: "Negative",
  };

  const statusColor: Record<string, string> = {
    NEW: "text-indigo-400 bg-indigo-500/10",
    REVIEWED: "text-yellow-400 bg-yellow-500/10",
    ACTIONED: "text-green-400 bg-green-500/10",
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <aside className="w-60 border-r border-slate-800 p-6 flex flex-col gap-1">
        <div className="text-xl font-bold mb-8">LOOP</div>
        <a href="/dashboard" className="px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white transition">Dashboard</a>
        <a href="/inbox" className="px-3 py-2 rounded-lg bg-indigo-500/10 text-indigo-400 font-medium">Inbox</a>
        <a href="/trends" className="px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white transition">Trends</a>
        <a href="/ask" className="px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white transition">Ask LOOP</a>
        <a href="/reports" className="px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white transition">Reports</a>
      </aside>

      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-1">Inbox</h1>
        <div className="flex items-center justify-between mb-6">
          <p className="text-slate-400">
            {feedback.length} feedback item{feedback.length !== 1 ? "s" : ""} · live from database
          </p>
          <div className="flex gap-3">
            <SimulateButton />
            <UploadForm />
          </div>
        </div>

        <FilterBar channels={channels} />

        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          {feedback.length === 0 ? (
            <div className="p-10 text-center text-slate-500">
              No feedback matches your filters.
            </div>
          ) : (
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
                      {item.sentiment && (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${sentimentColor[item.sentiment]}`}>
                          {sentimentLabel[item.sentiment]}
                        </span>
                      )}
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
          )}
        </div>
      </main>
    </div>
  );
}