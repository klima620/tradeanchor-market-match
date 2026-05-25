import Link from "next/link";

const floatingCards = [
  {
    label: "Stocks",
    detail: "steady learning",
    className: "left-0 top-6 rotate-[-5deg] bg-white",
  },
  {
    label: "Crypto",
    detail: "flexible check-ins",
    className: "right-2 top-20 rotate-[4deg] bg-cyan-50",
  },
  {
    label: "Forex",
    detail: "global sessions",
    className: "left-8 bottom-24 rotate-[5deg] bg-emerald-50",
  },
  {
    label: "Options",
    detail: "careful planning",
    className: "right-0 bottom-8 rotate-[-4deg] bg-amber-50",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F8FAFC] text-[#0F172A]">
      <section className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-6 sm:px-8 lg:px-10">
        <div className="pointer-events-none absolute left-[-6rem] top-20 h-64 w-64 rounded-full bg-[#6EE7B7]/35 blur-3xl" />
        <div className="pointer-events-none absolute right-[-5rem] top-36 h-72 w-72 rounded-full bg-[#22D3EE]/25 blur-3xl" />
        <div className="pointer-events-none absolute bottom-16 left-1/3 h-56 w-56 rounded-full bg-[#FBBF24]/20 blur-3xl" />

        <nav className="relative z-10 flex items-center justify-between">
          <Link href="/" className="text-lg font-black">
            TradeAnchor
          </Link>
        </nav>

        <div className="relative z-10 grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1fr_0.9fr] lg:py-10">
          <div className="max-w-2xl">
            <div className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-emerald-700">
              TradeAnchor Market Match™
            </div>
            <h1 className="mt-5 text-5xl font-black leading-[1.02] text-[#0F172A] sm:text-6xl">
              Find Your Market Match™
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              Discover the market, trading style, session, and ticker types that
              best fit your personality, schedule, and risk tolerance.
            </p>

            <div className="mt-8">
              <Link
                href="/assessment"
                className="inline-flex min-h-12 items-center justify-center rounded-[1rem] bg-[#32D583] px-6 text-base font-black text-[#0F172A] shadow-[0_18px_35px_rgba(50,213,131,0.3)] transition hover:bg-[#6EE7B7]"
              >
                Start My Match
              </Link>
            </div>
          </div>

          <div className="relative min-h-[31rem]">
            <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-[3rem] bg-[#32D583] shadow-[0_30px_80px_rgba(50,213,131,0.35)]" />
            <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/75" />
            <div className="absolute left-1/2 top-1/2 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[2.25rem] bg-[#0F172A] text-center text-4xl font-black text-white shadow-[0_24px_60px_rgba(15,23,42,0.25)]">
              Match
            </div>

            {floatingCards.map((card) => (
              <div
                key={card.label}
                className={`absolute w-40 rounded-[1.5rem] border border-white/80 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.14)] ${card.className}`}
              >
                <p className="text-xl font-black text-[#0F172A]">{card.label}</p>
                <p className="mt-1 text-sm font-semibold text-slate-500">
                  {card.detail}
                </p>
              </div>
            ))}

            <div className="absolute bottom-0 left-1/2 w-56 -translate-x-1/2 rounded-[1.5rem] bg-white p-4 text-center shadow-[0_18px_50px_rgba(15,23,42,0.16)]">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                Beginner friendly
              </p>
              <p className="mt-2 text-base font-black text-[#0F172A]">
                No trading experience needed
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
