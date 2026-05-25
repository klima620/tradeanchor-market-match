import {
  marketProfileById,
  personalityArchetypeById,
  tradingStyleProfileById,
  tradingWindowProfileById,
} from "@/data/archetypes";
import { getSimpleReason } from "@/lib/resultEngine";
import type { MarketMatchResult } from "@/lib/types";

type ResultCardProps = {
  result: MarketMatchResult;
};

export default function ResultCard({ result }: ResultCardProps) {
  const primary = marketProfileById[result.primaryMarketId];
  const secondary = marketProfileById[result.secondaryMarketId];
  const style = tradingStyleProfileById[result.bestStyleId];
  const window = tradingWindowProfileById[result.bestWindowId];
  const archetype = personalityArchetypeById[result.archetypeId];

  return (
    <section className="overflow-hidden rounded-[2rem] border border-emerald-100 bg-white shadow-[0_28px_90px_rgba(15,23,42,0.12)]">
      <div className="bg-gradient-to-r from-[#32D583] via-[#22D3EE] to-[#FBBF24] p-5 sm:p-7">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0F172A]/70">
          Your Market Match™
        </p>
        <h1 className="mt-3 text-4xl font-black text-[#0F172A] sm:text-5xl">
          {primary.name}
        </h1>
        <p className="mt-3 max-w-2xl text-base font-semibold leading-7 text-[#0F172A]/80">
          {primary.beginnerFit}
        </p>
      </div>

      <div className="grid gap-5 p-5 sm:p-7">
        <div className="grid gap-4 md:grid-cols-2">
          {result.matches.map((match) => {
            const market = marketProfileById[match.marketId];

            return (
              <article
                key={match.marketId}
                className="rounded-[1.5rem] border border-slate-200 bg-[#F8FAFC] p-5"
              >
                <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                  {match.label === "Primary Market"
                    ? "Primary Market"
                    : "Secondary Market"}
                </p>
                <div
                  className={`mt-4 inline-flex rounded-full bg-gradient-to-r ${market.color} px-4 py-2 text-sm font-black text-[#0F172A]`}
                >
                  {match.label}
                </div>
                <h2 className="mt-4 text-2xl font-black text-[#0F172A]">
                  {market.name}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {market.beginnerFit}
                </p>
              </article>
            );
          })}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-[1.5rem] bg-emerald-50 p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">
              Best Trading Style
            </p>
            <h2 className="mt-2 text-2xl font-black text-[#0F172A]">
              {style.name}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {style.description}
            </p>
          </div>

          <div className="rounded-[1.5rem] bg-cyan-50 p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">
              Best Trading Window
            </p>
            <h2 className="mt-2 text-2xl font-black text-[#0F172A]">
              {window.name}
            </h2>
            <p className="mt-1 text-base font-semibold leading-6 text-cyan-700/75">
              {window.time}
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {window.description}
            </p>
          </div>
        </div>

        <div className="rounded-[1.5rem] bg-amber-50 p-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">
            Best Instruments/Tickers
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {[...primary.instruments, ...secondary.instruments.slice(0, 2)].map(
              (instrument) => (
                <span
                  key={instrument}
                  className="rounded-full bg-white px-4 py-2 text-sm font-black text-[#0F172A] shadow-sm"
                >
                  {instrument}
                </span>
              ),
            )}
          </div>
        </div>

        <div className="rounded-[1.5rem] bg-[#0F172A] p-5 text-white">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6EE7B7]">
            Personality Match Archetype
          </p>
          <h2 className="mt-2 text-2xl font-black">{archetype.name}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-200">
            {archetype.description}
          </p>
        </div>

        <div className="rounded-[1.5rem] border border-slate-200 p-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
            Simple reason why this fits
          </p>
          <p className="mt-3 text-base leading-7 text-slate-700">
            {getSimpleReason(result)}
          </p>
        </div>

        <div className="rounded-[1.5rem] border border-emerald-100 bg-emerald-50 p-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">
            Beginner-friendly next steps
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
            {primary.nextSteps.map((step) => (
              <li key={step} className="flex gap-3">
                <span className="mt-2 h-2 w-2 flex-none rounded-full bg-[#32D583]" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
