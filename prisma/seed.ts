import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const channels = ["Support ticket", "App store review", "NPS survey", "Sales call note", "Community post"];

const sampleFeedback = [
  { content: "Onboarding took forever — I couldn't figure out how to invite my team.", channel: "Support ticket", sentiment: "NEG" },
  { content: "The new dashboard is gorgeous and finally fast. Huge improvement.", channel: "App store review", sentiment: "POS" },
  { content: "It does the job, but the mobile experience needs work.", channel: "NPS survey", sentiment: "NEU" },
  { content: "Prospect wants SSO before they'll sign — third time this month.", channel: "Sales call note", sentiment: "NEG" },
  { content: "Love the new export feature, saved me an hour today.", channel: "Community post", sentiment: "POS" },
  { content: "Billing page keeps timing out when I try to download an invoice.", channel: "Support ticket", sentiment: "NEG" },
  { content: "Support team resolved my issue in minutes, great experience.", channel: "Support ticket", sentiment: "POS" },
  { content: "Search is slow when I have more than 500 items in my inbox.", channel: "NPS survey", sentiment: "NEG" },
  { content: "Would love a dark mode option for the dashboard.", channel: "Community post", sentiment: "NEU" },
  { content: "The onboarding checklist doesn't match what's actually in the app.", channel: "Support ticket", sentiment: "NEG" },
];

async function main() {
  console.log("Seeding database...");

  const workspace = await prisma.workspace.create({
    data: { name: "Acme Inc (Demo)" },
  });

  const passwordHash = await bcrypt.hash("password123", 10);

  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@demo.com",
      passwordHash,
      role: "ADMIN",
      workspaceId: workspace.id,
    },
  });

  await prisma.user.create({
    data: {
      name: "Analyst User",
      email: "analyst@demo.com",
      passwordHash,
      role: "ANALYST",
      workspaceId: workspace.id,
    },
  });

  await prisma.user.create({
    data: {
      name: "Viewer User",
      email: "viewer@demo.com",
      passwordHash,
      role: "VIEWER",
      workspaceId: workspace.id,
    },
  });

  for (const item of sampleFeedback) {
    await prisma.feedback.create({
      data: {
        content: item.content,
        channel: item.channel,
        sentiment: item.sentiment as "POS" | "NEU" | "NEG",
        sentimentScore: item.sentiment === "POS" ? 0.7 : item.sentiment === "NEG" ? -0.7 : 0,
        status: "NEW",
        workspaceId: workspace.id,
      },
    });
  }

  console.log("Seed complete!");
  console.log("Login credentials (all use password: password123):");
  console.log("  Admin:   admin@demo.com");
  console.log("  Analyst: analyst@demo.com");
  console.log("  Viewer:  viewer@demo.com");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });