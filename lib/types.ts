export type MarketId = "forex" | "stocks" | "futures" | "crypto" | "options";

export type TradingStyleId =
  | "scalping"
  | "dayTrading"
  | "swingTrading"
  | "positionTrading";

export type TraitId =
  | "patience"
  | "discipline"
  | "emotionalControl"
  | "stressTolerance"
  | "impulsiveness"
  | "decisionSpeed"
  | "riskTolerance"
  | "analyticalThinking"
  | "consistency"
  | "needForConfirmation";

export type LifestyleId = "timeWindow" | "limitedTime" | "flexibleSchedule";

export type LifestyleWindowId =
  | "earlyMorning"
  | "marketHours"
  | "evening"
  | "flexibleShortBursts"
  | "weeklyReview";

export type TradingSessionId =
  | "londonSession"
  | "newYorkSession"
  | "asiaSession"
  | "nyOpenMomentum"
  | "middaySwingWindow"
  | "eveningMomentumWindow"
  | "weekendActiveSession"
  | "openingRangeWindow"
  | "volatilitySession";

export type PersonalityArchetypeId =
  | "steadyBuilder"
  | "calmPlanner"
  | "quickStarter"
  | "curiousExplorer";

export type MarketScores = Record<MarketId, number>;
export type StyleScores = Record<TradingStyleId, number>;
export type TraitScores = Record<TraitId, number>;
export type LifestyleScores = Record<LifestyleId, number>;
export type WindowScores = Record<LifestyleWindowId, number>;

export type ScoreBundle = {
  markets: MarketScores;
  styles: StyleScores;
  traits: TraitScores;
  lifestyle: LifestyleScores;
  windows: WindowScores;
};

export type PartialScoreBundle = {
  markets?: Partial<MarketScores>;
  styles?: Partial<StyleScores>;
  traits?: Partial<TraitScores>;
  lifestyle?: Partial<LifestyleScores>;
  windows?: Partial<WindowScores>;
};

export type AnswerOption = {
  id: string;
  label: string;
  description: string;
  scores: PartialScoreBundle;
};

export type Question = {
  id: string;
  eyebrow: string;
  prompt: string;
  options: AnswerOption[];
};

export type MarketProfile = {
  id: MarketId;
  name: string;
  shortName: string;
  beginnerFit: string;
  instruments: string[];
  nextSteps: string[];
  color: string;
};

export type TradingStyleProfile = {
  id: TradingStyleId;
  name: string;
  description: string;
};

export type TradingWindowProfile = {
  id: TradingSessionId;
  name: string;
  time: string;
  description: string;
};

export type PersonalityArchetype = {
  id: PersonalityArchetypeId;
  name: string;
  description: string;
};

export type AssessmentAnswer = {
  questionId: string;
  optionId: string;
};

export type MarketMatch = {
  marketId: MarketId;
  name: string;
  score: number;
  label: "Primary Market" | "Secondary Match";
};

export type MarketMatchResult = {
  primaryMarketId: MarketId;
  secondaryMarketId: MarketId;
  bestStyleId: TradingStyleId;
  bestWindowId: TradingSessionId;
  archetypeId: PersonalityArchetypeId;
  completedAt: string;
  totalQuestions: number;
  matches: [MarketMatch, MarketMatch];
  scores: ScoreBundle;
  answers: AssessmentAnswer[];
};

export type MarketMatchLead = {
  firstName: string;
  email: string;
  capturedAt: string;
};
