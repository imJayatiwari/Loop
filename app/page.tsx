export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-medium mb-6">
          AI Customer-Feedback Intelligence
        </span>
        <h1 className="text-5xl font-bold mb-4">
          Close the loop on customer feedback
        </h1>
        <p className="text-slate-400 text-lg mb-8">
          LOOP turns scattered customer feedback into a ranked, evidence-backed
          list of what to do next.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-lg font-medium transition">
            Get Started
          </button>
          <button className="border border-slate-700 hover:border-slate-500 px-6 py-3 rounded-lg font-medium transition">
            Log In
          </button>
        </div>
      </div>
    </main>
  );
}