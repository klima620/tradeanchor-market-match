import { questions } from "@/data/questions";
import type {
  AssessmentAnswer,
  LifestyleId,
  LifestyleWindowId,
  MarketId,
  MarketScores,
  PersonalityArchetypeId,
  ScoreBundle,
  StyleScores,
  TradingSessionId,
  TradingStyleId,
  TraitId,
  TraitScores,
  WindowScores,
} from "@/lib/types";

export const marketOrder: MarketId[] = [
  "forex",
  "stocks",
  "futures",
  "crypto",
  "options",
];

export const styleOrder: TradingStyleId[] = [
  "scalping",
  "dayTrading",
  "swingTrading",
  "positionTrading",
];

const traitOrder: TraitId[] = [
  "patience",
  "discipline",
  "emotionalControl",
  "stressTolerance",
  "impulsiveness",
  "decisionSpeed",
  "riskTolerance",
  "analyticalThinking",
  "consistency",
  "needForConfirmation",
];

const lifestyleOrder: LifestyleId[] = [
  "timeWindow",
  "limitedTime",
  "flexibleSchedule",
];

const windowOrder: LifestyleWindowId[] = [
  "earlyMorning",
  "marketHours",
  "evening",
  "flexibleShortBursts",
  "weeklyReview",
];

export const emptyScores = (): ScoreBundle => ({
  markets: {
    forex: 0,
    stocks: 0,
    futures: 0,
    crypto: 0,
    options: 0,
  },
  styles: {
    scalping: 0,
    dayTrading: 0,
    swingTrading: 0,
    positionTrading: 0,
  },
  traits: {
    patience: 0,
    discipline: 0,
    emotionalControl: 0,
    stressTolerance: 0,
    impulsiveness: 0,
    decisionSpeed: 0,
    riskTolerance: 0,
    analyticalThinking: 0,
    consistency: 0,
    needForConfirmation: 0,
  },
  lifestyle: {
    timeWindow: 0,
    limitedTime: 0,
    flexibleSchedule: 0,
  },
  windows: {
    earlyMorning: 0,
    marketHours: 0,
    evening: 0,
    flexibleShortBursts: 0,
    weeklyReview: 0,
  },
});

function addScore<T extends string>(
  target: Record<T, number>,
  source: Partial<Record<T, number>> | undefined,
  order: T[],
) {
  if (!source) {
    return;
  }

  for (const key of order) {
    target[key] += source[key] ?? 0;
  }
}

export function scoreAssessment(answers: AssessmentAnswer[]): ScoreBundle {
  return answers.reduce<ScoreBundle>((scores, answer) => {
    const question = questions.find((item) => item.id === answer.questionId);
    const option = question?.options.find((item) => item.id === answer.optionId);

    if (!option) {
      return scores;
    }

    addScore(scores.markets, option.scores.markets, marketOrder);
    addScore(scores.styles, option.scores.styles, styleOrder);
    addScore(scores.traits, option.scores.traits, traitOrder);
    addScore(scores.lifestyle, option.scores.lifestyle, lifestyleOrder);
    addScore(scores.windows, option.scores.windows, windowOrder);

    return scores;
  }, emptyScores());
}

function getLeader<T extends string>(scores: Record<T, number>, order: T[]): T {
  return order.reduce((leader, item) => {
    if (scores[item] > scores[leader]) {
      return item;
    }

    return leader;
  }, order[0]);
}

export function getTopMarkets(scores: MarketScores): [MarketId, MarketId] {
  const [first, second] = [...marketOrder].sort((a, b) => {
    const difference = scores[b] - scores[a];

    if (difference !== 0) {
      return difference;
    }

    return marketOrder.indexOf(a) - marketOrder.indexOf(b);
  });

  return [first, second];
}

export function getBestStyle(scores: StyleScores): TradingStyleId {
  return getLeader(scores, styleOrder);
}

export function getBestLifestyleWindow(scores: WindowScores): LifestyleWindowId {
  return getLeader(scores, windowOrder);
}

export function getRecommendedSession({
  answers,
  market,
  traits,
  lifestyle,
}: {
  answers: AssessmentAnswer[];
  market: MarketId;
  traits: TraitScores;
  lifestyle: Record<LifestyleId, number>;
}): TradingSessionId {
  const schedule = answers.find((answer) => answer.questionId === "availability")
    ?.optionId;
  const isFastDecisionMaker =
    traits.decisionSpeed + traits.stressTolerance >=
    traits.patience + traits.emotionalControl;
  const isPatientPlanner =
    traits.patience + traits.analyticalThinking + traits.needForConfirmation >
    traits.decisionSpeed + traits.impulsiveness;
  const needsFlexibility =
    schedule === "time-flexible" ||
    lifestyle.flexibleSchedule > lifestyle.timeWindow;

  if (market === "forex") {
    if (schedule === "time-12-8") {
      return "londonSession";
    }

    if (schedule === "time-5-12") {
      return "asiaSession";
    }

    if (schedule === "time-8-5" || isFastDecisionMaker) {
      return "newYorkSession";
    }

    return needsFlexibility ? "asiaSession" : "londonSession";
  }

  if (market === "stocks") {
    if (schedule === "time-8-5" && !isPatientPlanner) {
      return "nyOpenMomentum";
    }

    return "middaySwingWindow";
  }

  if (market === "crypto") {
    if (needsFlexibility && lifestyle.limitedTime > lifestyle.timeWindow) {
      return "weekendActiveSession";
    }

    return "eveningMomentumWindow";
  }

  if (market === "futures") {
    return isFastDecisionMaker ? "openingRangeWindow" : "volatilitySession";
  }

  if (market === "options") {
    return isPatientPlanner ? "middaySwingWindow" : "volatilitySession";
  }

  return "middaySwingWindow";
}

export function getPersonalityArchetype(
  traits: TraitScores,
): PersonalityArchetypeId {
  const steadyScore =
    traits.consistency + traits.discipline + traits.patience + traits.emotionalControl;
  const plannerScore =
    traits.analyticalThinking + traits.needForConfirmation + traits.patience;
  const quickScore =
    traits.decisionSpeed + traits.stressTolerance + traits.riskTolerance;
  const explorerScore =
    traits.impulsiveness + traits.decisionSpeed + traits.riskTolerance;

  const options: Array<[PersonalityArchetypeId, number]> = [
    ["steadyBuilder", steadyScore],
    ["calmPlanner", plannerScore],
    ["quickStarter", quickScore],
    ["curiousExplorer", explorerScore],
  ];

  return options.reduce((leader, option) =>
    option[1] > leader[1] ? option : leader,
  )[0];
}
