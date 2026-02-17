import { serve } from "inngest/next";
import { NextResponse } from "next/server";
import arcjet, { detectBot, shield } from "@arcjet/node";

import { inngest } from "@/lib/inngest/client"; // adjust if path differs
import {
  processRecurringTransaction,
  triggerRecurringTransactions,
  generateMonthlyReports,
  checkBudgetAlerts,
} from "@/lib/inngest/functions"; // adjust if needed

// -----------------------------------------------------------------------------
// Validate Environment Variable
// -----------------------------------------------------------------------------
if (!process.env.ARCJET_KEY) {
  throw new Error("ARCJET_KEY is not defined");
}

// -----------------------------------------------------------------------------
// Arcjet Configuration (Node Runtime)
// -----------------------------------------------------------------------------
const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    shield({
      mode: "LIVE",
    }),
    detectBot({
      mode: "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE",
        "GO_HTTP", // ✅ Required for Inngest
      ],
    }),
  ],
});

// -----------------------------------------------------------------------------
// Inngest Handler
// -----------------------------------------------------------------------------
const handler = serve({
  client: inngest,
  functions: [
    processRecurringTransaction,
    triggerRecurringTransactions,
    generateMonthlyReports,
    checkBudgetAlerts,
  ],
});

// -----------------------------------------------------------------------------
// API Route Handlers
// -----------------------------------------------------------------------------
export async function POST(req) {
  // Protect with Arcjet
  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    return NextResponse.json(
      { error: "Access denied by security layer" },
      { status: 403 }
    );
  }

  return handler(req);
}

export async function GET(req) {
  // Allow GET for Inngest sync
  return handler(req);
}
