"use client";

import type { MarketMatchLead, MarketMatchResult } from "@/lib/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function getRestUrl(path: string) {
  if (!supabaseUrl) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  }

  return `${supabaseUrl.replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "")}/rest/v1/${path}`;
}

async function insertRow<TPayload>(table: string, payload: TPayload) {
  if (!supabaseAnonKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  const response = await fetch(getRestUrl(table), {
    method: "POST",
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Supabase insert failed: ${details || response.statusText}`);
  }

  return;
}

export function buildMarketMatchLeadPayload(
  lead: MarketMatchLead,
  result: MarketMatchResult,
) {
  const primaryMarket = result.matches[0].name;
  const secondaryMarket = result.matches[1].name;

  return {
    first_name: lead.firstName,
    email: lead.email,
    primary_market: primaryMarket,
    secondary_market: secondaryMarket,
    best_style: result.bestStyleId,
    best_window: result.bestWindowId,
    archetype: result.archetypeId,
  };
}

export async function insertMarketMatchLead(
  lead: MarketMatchLead,
  result: MarketMatchResult,
) {
  return insertRow("market_match_leads", buildMarketMatchLeadPayload(lead, result));
}
