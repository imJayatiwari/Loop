"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export function FilterBar({ channels }: { channels: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("q") ?? "");

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (search) params.set("q", search);
      else params.delete("q");
      router.push(`${pathname}?${params.toString()}`);
    }, 400);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") params.delete(key);
    else params.set(key, value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex gap-3 mb-6">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search feedback..."
        className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500"
      />
      <select
        defaultValue={searchParams.get("channel") ?? "all"}
        onChange={(e) => updateParam("channel", e.target.value)}
        className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-400"
      >
        <option value="all">All channels</option>
        {channels.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <select
        defaultValue={searchParams.get("sentiment") ?? "all"}
        onChange={(e) => updateParam("sentiment", e.target.value)}
        className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-400"
      >
        <option value="all">All sentiment</option>
        <option value="POS">Positive</option>
        <option value="NEU">Neutral</option>
        <option value="NEG">Negative</option>
      </select>
      <select
        defaultValue={searchParams.get("status") ?? "all"}
        onChange={(e) => updateParam("status", e.target.value)}
        className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-400"
      >
        <option value="all">All status</option>
        <option value="NEW">New</option>
        <option value="REVIEWED">Reviewed</option>
        <option value="ACTIONED">Actioned</option>
      </select>
    </div>
  );
}