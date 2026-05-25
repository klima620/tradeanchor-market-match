import {
  marketProfileById,
  personalityArchetypeById,
  tradingStyleProfileById,
  tradingWindowProfileById,
} from "@/data/archetypes";
import { getSimpleReason } from "@/lib/resultEngine";
import type { MarketMatchLead, MarketMatchResult } from "@/lib/types";

export const traderEmailSubject =
  "Your TradeAnchor Market Match™ Results Are Ready";

export const adminEmailSubject = "New Market Match Completed";

export function generateTraderEmailCopy(
  lead: Pick<MarketMatchLead, "firstName">,
  result: MarketMatchResult,
) {
  const primary = marketProfileById[result.primaryMarketId];
  const secondary = marketProfileById[result.secondaryMarketId];
  const style = tradingStyleProfileById[result.bestStyleId];
  const window = tradingWindowProfileById[result.bestWindowId];
  const archetype = personalityArchetypeById[result.archetypeId];

  return {
    subject: traderEmailSubject,
    body: `Hi ${lead.firstName},

Your TradeAnchor Market Match™ is ready.

Primary Market: ${primary.name}
Secondary Market: ${secondary.name}
Best Trading Style: ${style.name}
Best Trading Window: ${window.name}
${window.time}
Best Instruments/Tickers: ${primary.instruments.join(", ")}
Personality Match Archetype: ${archetype.name}

Why this fits:
${getSimpleReason(result)}

Beginner-friendly next steps:
${primary.nextSteps.map((step) => `- ${step}`).join("\n")}

You are not behind. Start small, learn the rhythm, and build confidence one simple step at a time.

Follow TradeAnchor for more beginner-friendly trading guidance.`,
  };
}

export function generateAdminNotificationEmailCopy(
  lead: MarketMatchLead,
  result: MarketMatchResult,
) {
  const primary = marketProfileById[result.primaryMarketId];
  const secondary = marketProfileById[result.secondaryMarketId];
  const style = tradingStyleProfileById[result.bestStyleId];
  const window = tradingWindowProfileById[result.bestWindowId];
  const archetype = personalityArchetypeById[result.archetypeId];

  return {
    subject: adminEmailSubject,
    body: `New Market Match Completed

Name: ${lead.firstName}
Email: ${lead.email}
Primary Market: ${primary.name}
Secondary Market: ${secondary.name}
Best Trading Style: ${style.name}
Best Trading Window: ${window.name} (${window.time})
Personality Match Archetype: ${archetype.name}
Timestamp: ${lead.capturedAt}`,
  };
}
