import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const simulatedItems = [
  { content: "App crashes every time I try to export a PDF report.", channel: "App store review" },
  { content: "The pricing page doesn't clearly show what's in each plan.", channel: "Sales call note" },
  { content: "Really love how fast search results load now.", channel: "NPS survey" },
  { content: "Can we get a Slack integration for notifications?", channel: "Community post" },
  { content: "Had to contact support twice for the same billing issue.", channel: "Support ticket" },
  { content: "The new onboarding video was really helpful, thanks!", channel: "NPS survey" },
];

export async function POST() {
  try {
    const workspace = await prisma.workspace.findFirst();
    if (!workspace) {
      return NextResponse.json({ error: "No workspace found" }, { status: 400 });
    }

    for (const item of simulatedItems) {
      await prisma.feedback.create({
        data: {
          content: item.content,
          channel: item.channel,
          status: "NEW",
          workspaceId: workspace.id,
        },
      });
    }

    return NextResponse.json({ success: simulatedItems.length });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Simulation failed" }, { status: 500 });
  }
}