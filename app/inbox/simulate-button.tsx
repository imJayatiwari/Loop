"use client";

import { useState } from "react";

export function SimulateButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const res = await fetch("/api/feedback/simulate", { method: "POST" });
    if (res.ok) {
      window.location.reload();
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-2 rounded-lg text-sm transition"
    >
      {loading ? "Syncing..." : "Sync Support Channel"}
    </button>
  );
}