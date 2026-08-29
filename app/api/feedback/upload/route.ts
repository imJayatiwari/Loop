import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const text = await file.text();
    const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);

    if (lines.length < 2) {
      return NextResponse.json({ error: "CSV has no data rows" }, { status: 400 });
    }

    const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
    const contentIdx = headers.indexOf("content");
    const channelIdx = headers.indexOf("channel");

    if (contentIdx === -1 || channelIdx === -1) {
      return NextResponse.json(
        { error: "CSV must have 'content' and 'channel' columns" },
        { status: 400 }
      );
    }

    const workspace = await prisma.workspace.findFirst();
    if (!workspace) {
      return NextResponse.json({ error: "No workspace found" }, { status: 400 });
    }

    let success = 0;
    let failed = 0;

    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(",");
      const content = cols[contentIdx]?.trim();
      const channel = cols[channelIdx]?.trim();

      if (!content || !channel) {
        failed++;
        continue;
      }

      await prisma.feedback.create({
        data: {
          content,
          channel,
          status: "NEW",
          workspaceId: workspace.id,
        },
      });
      success++;
    }

    return NextResponse.json({ success, failed });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}