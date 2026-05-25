"use client";

import {
  EMAIL_STORAGE_KEY,
  FIRST_NAME_STORAGE_KEY,
  LEAD_STORAGE_KEY,
} from "@/lib/resultEngine";
import { insertMarketMatchLead } from "@/lib/supabaseClient";
import type { MarketMatchLead, MarketMatchResult } from "@/lib/types";

type SubmitMarketMatchLeadInput = {
  firstName: string;
  email: string;
  result: MarketMatchResult;
};

async function sendMarketMatchEmails(
  lead: MarketMatchLead,
  result: MarketMatchResult,
) {
  try {
    const response = await fetch("/api/send-market-match-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lead, result }),
    });

    if (!response.ok) {
      throw new Error(`Email route failed with status ${response.status}`);
    }
  } catch (error) {
    console.error("Market Match email send failed", error);
  }
}

export async function submitMarketMatchLead({
  firstName,
  email,
  result,
}: SubmitMarketMatchLeadInput): Promise<MarketMatchLead> {
  const lead: MarketMatchLead = {
    firstName: firstName.trim(),
    email: email.trim(),
    capturedAt: new Date().toISOString(),
  };

  await insertMarketMatchLead(lead, result);
  await sendMarketMatchEmails(lead, result);

  window.localStorage.setItem(FIRST_NAME_STORAGE_KEY, lead.firstName);
  window.localStorage.setItem(EMAIL_STORAGE_KEY, lead.email);
  window.localStorage.setItem(
    LEAD_STORAGE_KEY,
    JSON.stringify({ ...lead, resultId: result.completedAt }),
  );

  return lead;
}
