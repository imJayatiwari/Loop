"use client";

import { useState } from "react";

export function UploadForm() {
  const [status, setStatus] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setStatus("");

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/feedback/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      setStatus(`Imported ${data.success} items (${data.failed} failed)`);
      setTimeout(() => window.location.reload(), 1500);
    } else {
      setStatus(`Error: ${data.error}`);
    }

    setUploading(false);
  };

  return (
    <div className="flex items-center gap-3">
      <label className="bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-2 rounded-lg text-sm cursor-pointer transition">
        {uploading ? "Uploading..." : "Upload CSV"}
        <input
          type="file"
          accept=".csv"
          onChange={handleUpload}
          disabled={uploading}
          className="hidden"
        />
      </label>
      {status && <span className="text-sm text-slate-400">{status}</span>}
    </div>
  );
}