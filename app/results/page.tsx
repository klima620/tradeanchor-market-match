"use client";

import Link from "next/link";
import ResultCard from "@/components/ResultCard";
import { useLocalStorageValue } from "@/lib/localStorageStore";
import { RESULT_STORAGE_KEY, parseStoredResult } from "@/lib/resultEngine";

export default function ResultsPage() {
  const storedResult = useLocalStorageValue(RESULT_STORAGE_KEY);
  const result = parseStoredResult(storedResult);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#d9ffe8_0%,#F8FAFC_38%,#ffffff_100%)] text-[#0F172A]">
      <section className="mx-auto w-full max-w-4xl px-5 py-6 sm:px-8">
        <nav className="mb-8 flex items-center justify-between">
          <Link href="/" className="text-lg font-black">
            Market Match™
          </Link>
          <Link
            href="/assessment"
            className="rounded-[1rem] border border-emerald-100 bg-white px-4 py-2 text-sm font-black text-[#0F172A] shadow-sm transition hover:bg-emerald-50"
          >
            Retake
          </Link>
        </nav>

        {result ? (
          <div className="grid gap-5">
            <div className="flex flex-col gap-3 rounded-[1.5rem] border border-emerald-100 bg-white p-4 shadow-[0_14px_40px_rgba(15,23,42,0.08)] sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-black text-[#0F172A]">
                Your Market Match profile has been saved.
              </p>
              <Link
                href="/"
                className="inline-flex min-h-10 items-center justify-center rounded-[1rem] bg-emerald-100 px-4 text-sm font-black text-emerald-700 transition hover:bg-emerald-200"
              >
                Back to start
              </Link>
            </div>
            <ResultCard result={result} />
          </div>
        ) : (
          <section className="rounded-[2rem] border border-emerald-100 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600">
              No saved match
            </p>
            <h1 className="mt-3 text-3xl font-black text-[#0F172A]">
              Your Market Match™ will appear here.
            </h1>
            <p className="mt-3 max-w-xl text-base leading-7 text-slate-600">
              Complete the assessment once and the result will be stored locally
              in this browser for the MVP.
            </p>
            <Link
              href="/assessment"
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-[1rem] bg-[#32D583] px-6 text-base font-black text-[#0F172A] transition hover:bg-[#6EE7B7]"
            >
              Start My Match
            </Link>
          </section>
        )}
      </section>
    </main>
  );
}
