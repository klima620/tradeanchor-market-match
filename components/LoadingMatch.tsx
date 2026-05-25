export default function LoadingMatch() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-5 text-[#0F172A]">
      <section className="w-full max-w-md rounded-[2rem] border border-emerald-100 bg-white p-6 text-center shadow-[0_24px_70px_rgba(15,23,42,0.12)]">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-[#32D583] text-3xl font-black text-[#0F172A]">
          M
        </div>
        <h1 className="mt-6 text-3xl font-black text-[#0F172A]">
          Finding your match
        </h1>
        <p className="mt-3 text-base leading-7 text-slate-600">
          We are matching your schedule, personality, and risk comfort to a
          beginner-friendly market.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <span className="h-3 w-3 animate-bounce rounded-full bg-[#32D583]" />
          <span className="h-3 w-3 animate-bounce rounded-full bg-[#22D3EE] [animation-delay:120ms]" />
          <span className="h-3 w-3 animate-bounce rounded-full bg-[#FBBF24] [animation-delay:240ms]" />
        </div>
      </section>
    </main>
  );
}
