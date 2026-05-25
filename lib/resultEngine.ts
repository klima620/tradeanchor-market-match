import {
  marketProfileById,
  personalityArchetypeById,
  tradingStyleProfileById,
  tradingWindowProfileById,
} from "@/data/archetypes";
import { questions } from "@/data/questions";
import {
  getBestStyle,
  getPersonalityArchetype,
  getRecommendedSession,
  getTopMarkets,
  scoreAssessment,
} from "@/lib/scoring";
import type { AssessmentAnswer, MarketMatchResult } from "@/lib/types";

export const RESULT_STORAGE_KEY = "tradeanchor.marketMatch.result";
export const ANSWERS_STORAGE_KEY = "tradeanchor.marketMatch.answers";
export const EMAIL_STORAGE_KEY = "tradeanchor.marketMatch.email";
export const FIRST_NAME_STORAGE_KEY = "tradeanchor.marketMatch.firstName";
export const LEAD_STORAGE_KEY = "tradeanchor.marketMatch.lead";

export function buildMarketMatchResult(
  answers: AssessmentAnswer[],
): MarketMatchResult {
  const scores = scoreAssessment(answers);
  const [primaryMarketId, secondaryMarketId] = getTopMarkets(scores.markets);
  const bestStyleId = getBestStyle(scores.styles);
  const archetypeId = getPersonalityArchetype(scores.traits);
  const bestWindowId = getRecommendedSession({
    answers,
    market: primaryMarketId,
    traits: scores.traits,
    lifestyle: scores.lifestyle,
  });

  return {
    primaryMarketId,
    secondaryMarketId,
    bestStyleId,
    bestWindowId,
    archetypeId,
    completedAt: new Date().toISOString(),
    totalQuestions: questions.length,
    matches: [
      {
        marketId: primaryMarketId,
        name: marketProfileById[primaryMarketId].name,
        score: scores.markets[primaryMarketId],
        label: "Primary Market",
      },
      {
        marketId: secondaryMarketId,
        name: marketProfileById[secondaryMarketId].name,
        score: scores.markets[secondaryMarketId],
        label: "Secondary Match",
      },
    ],
    scores,
    answers,
  };
}

export function getSimpleReason(result: MarketMatchResult) {
  const market = marketProfileById[result.primaryMarketId];
  const style = tradingStyleProfileById[result.bestStyleId];
  const window = tradingWindowProfileById[result.bestWindowId];
  const session = `${window.name} (${window.time})`;

  return `Your answers point to ${market.name} because it fits your schedule, comfort with risk, and learning pace. ${style.name} gives you a practical rhythm, while ${session} keeps it realistic for your day.`;
}

export function parseStoredResult(value: string | null): MarketMatchResult | null {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(value) as MarketMatchResult;

    if (
      !parsed.primaryMarketId ||
      !parsed.secondaryMarketId ||
      !parsed.bestStyleId ||
      !parsed.bestWindowId ||
      !parsed.archetypeId ||
      !marketProfileById[parsed.primaryMarketId] ||
      !marketProfileById[parsed.secondaryMarketId] ||
      !tradingStyleProfileById[parsed.bestStyleId] ||
      !tradingWindowProfileById[parsed.bestWindowId] ||
      !personalityArchetypeById[parsed.archetypeId]
    ) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}
