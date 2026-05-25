import type {
  MarketId,
  MarketProfile,
  PersonalityArchetype,
  PersonalityArchetypeId,
  TradingSessionId,
  TradingStyleId,
  TradingStyleProfile,
  TradingWindowProfile,
} from "@/lib/types";

export const marketProfiles: MarketProfile[] = [
  {
    id: "stocks",
    name: "Stocks",
    shortName: "Stocks",
    beginnerFit:
      "Stocks are familiar, easier to research, and work well for steady learners who want a clear place to begin.",
    instruments: ["AAPL", "MSFT", "SPY", "QQQ", "large-cap stocks"],
    nextSteps: [
      "Start by learning how one company and one broad ETF move.",
      "Practice with a watchlist before putting real money at risk.",
      "Keep your first plan simple: one idea, one entry, one exit rule.",
    ],
    color: "from-[#32D583] to-[#22D3EE]",
  },
  {
    id: "forex",
    name: "Forex",
    shortName: "Forex",
    beginnerFit:
      "Forex can fit flexible schedules because major currency pairs move across global sessions.",
    instruments: ["EUR/USD", "GBP/USD", "USD/JPY", "AUD/USD"],
    nextSteps: [
      "Learn one currency pair before looking at several.",
      "Focus on session times so you know when the pair is most active.",
      "Use small practice risk while you learn how fast currencies can move.",
    ],
    color: "from-[#6EE7B7] to-[#22D3EE]",
  },
  {
    id: "futures",
    name: "Futures",
    shortName: "Futures",
    beginnerFit:
      "Futures may suit focused, decisive people who can protect uninterrupted screen time.",
    instruments: ["MES", "MNQ", "MCL", "MGC"],
    nextSteps: [
      "Begin with micro contracts in a simulator.",
      "Set a daily stop before each practice session starts.",
      "Study one market window instead of watching all day.",
    ],
    color: "from-[#FBBF24] to-[#32D583]",
  },
  {
    id: "crypto",
    name: "Crypto",
    shortName: "Crypto",
    beginnerFit:
      "Crypto can fit curious, flexible learners who are comfortable with movement and uncertainty.",
    instruments: ["BTC", "ETH", "SOL", "major crypto pairs"],
    nextSteps: [
      "Start with the most liquid coins before exploring smaller names.",
      "Decide in advance how often you will check prices.",
      "Avoid reacting to every alert while you are learning.",
    ],
    color: "from-[#22D3EE] to-[#32D583]",
  },
  {
    id: "options",
    name: "Options",
    shortName: "Options",
    beginnerFit:
      "Options fit analytical learners who like rules, scenarios, and taking time before acting.",
    instruments: ["SPY options", "QQQ options", "AAPL options", "MSFT options"],
    nextSteps: [
      "Learn calls and puts before learning multi-leg strategies.",
      "Practice reading expiration dates and risk before any live trade.",
      "Keep position size tiny while the mechanics become familiar.",
    ],
    color: "from-[#32D583] to-[#FBBF24]",
  },
];

export const tradingStyleProfiles: TradingStyleProfile[] = [
  {
    id: "scalping",
    name: "Scalping",
    description:
      "Short, focused sessions with quick decisions and strict guardrails.",
  },
  {
    id: "dayTrading",
    name: "Day Trading",
    description:
      "Same-day decisions for people who can protect a clear trading window.",
  },
  {
    id: "swingTrading",
    name: "Swing Trading",
    description:
      "A calmer pace that lets you plan, check in, and hold for days or weeks.",
  },
  {
    id: "positionTrading",
    name: "Position Trading",
    description:
      "Longer-term decisions for patient learners with less daily screen time.",
  },
];

export const tradingWindowProfiles: TradingWindowProfile[] = [
  {
    id: "londonSession",
    name: "London Session",
    time: "3:00 AM – 12:00 PM EST",
    description:
      "A focused early window that fits structured people who can prepare before the day gets busy.",
  },
  {
    id: "newYorkSession",
    name: "New York Session",
    time: "8:00 AM – 5:00 PM EST",
    description:
      "A high-activity daytime window for people who can stay focused while markets are moving.",
  },
  {
    id: "asiaSession",
    name: "Asia Session",
    time: "7:00 PM – 4:00 AM EST",
    description:
      "A night-friendly forex window for flexible schedules and calmer global movement.",
  },
  {
    id: "nyOpenMomentum",
    name: "NY Open Momentum",
    time: "9:30 AM – 11:30 AM EST",
    description:
      "Best for decisive beginners who can handle faster feedback during the most active stock window.",
  },
  {
    id: "middaySwingWindow",
    name: "Midday Swing Window",
    time: "11:30 AM – 3:30 PM EST",
    description:
      "A steadier daytime window for patient learners who prefer planning over chasing.",
  },
  {
    id: "eveningMomentumWindow",
    name: "Evening Momentum Window",
    time: "7:00 PM – 11:00 PM EST",
    description:
      "A flexible evening window for people who like movement after work or school.",
  },
  {
    id: "weekendActiveSession",
    name: "Weekend Active Session",
    time: "Saturday – Sunday",
    description:
      "A flexible practice window for schedules that move around during the week.",
  },
  {
    id: "openingRangeWindow",
    name: "Opening Range Window",
    time: "9:30 AM – 10:30 AM EST",
    description:
      "A short, clear session for focused beginners who can follow rules under pressure.",
  },
  {
    id: "volatilitySession",
    name: "Volatility Session",
    time: "8:30 AM – 11:30 AM EST",
    description:
      "A more active window for higher stress tolerance and faster decision-making.",
  },
];

export const personalityArchetypes: PersonalityArchetype[] = [
  {
    id: "steadyBuilder",
    name: "Steady Builder",
    description:
      "You do best with a simple routine, clear rules, and a pace that lets confidence build.",
  },
  {
    id: "calmPlanner",
    name: "Calm Planner",
    description:
      "You like to understand the why before acting and prefer decisions that feel prepared.",
  },
  {
    id: "quickStarter",
    name: "Quick Starter",
    description:
      "You have energy and decisiveness, so your best fit includes structure that keeps speed focused.",
  },
  {
    id: "curiousExplorer",
    name: "Curious Explorer",
    description:
      "You learn by exploring, comparing, and testing ideas in a low-pressure way.",
  },
];

export const marketProfileById = Object.fromEntries(
  marketProfiles.map((profile) => [profile.id, profile]),
) as Record<MarketId, MarketProfile>;

export const tradingStyleProfileById = Object.fromEntries(
  tradingStyleProfiles.map((profile) => [profile.id, profile]),
) as Record<TradingStyleId, TradingStyleProfile>;

export const tradingWindowProfileById = Object.fromEntries(
  tradingWindowProfiles.map((profile) => [profile.id, profile]),
) as Record<TradingSessionId, TradingWindowProfile>;

export const personalityArchetypeById = Object.fromEntries(
  personalityArchetypes.map((profile) => [profile.id, profile]),
) as Record<PersonalityArchetypeId, PersonalityArchetype>;
