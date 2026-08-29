import "dotenv/config";
import { prisma } from "../lib/prisma";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function main() {
  const items = await prisma.feedback.findMany();

  for (const item of items) {
    const msg = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 200,
      messages: [
        {
          role: "user",
          content: `Classify this customer feedback. Return ONLY valid JSON, no markdown, no explanation:
{"sentiment": "POS" | "NEU" | "NEG", "sentimentScore": number between -1 and 1, "featureArea": "short label"}

Feedback: "${item.content}"`,
        },
      ],
    });

    const text = msg.content[0].type === "text" ? msg.content[0].text : "{}";
    const clean = text.replace(/```json|```/g, "").trim();
    const result = JSON.parse(clean);

    await prisma.feedback.update({
      where: { id: item.id },
      data: {
        sentiment: result.sentiment,
        sentimentScore: result.sentimentScore,
      },
    });

    console.log(`Classified: "${item.content.slice(0, 40)}..." → ${result.sentiment}`);
  }

  console.log("Done classifying all feedback!");
}

main().finally(() => prisma.$disconnect());