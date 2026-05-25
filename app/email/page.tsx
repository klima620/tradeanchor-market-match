"use client";

import Link from "next/link";
import { useState } from "react";
import LoadingMatch from "@/components/LoadingMatch";
import {
  notifyLocalStorageChange,
  useLocalStorageValue,
} from "@/lib/localStorageStore";
import { submitMarketMatchLead } from "@/lib/leadCapture";
import {
  EMAIL_STORAGE_KEY,
  FIRST_NAME_STORAGE_KEY,
  RESULT_STORAGE_KEY,
  parseStoredResult,
} from "@/lib/resultEngine";

export default function EmailPage() {
  const storedResult = useLocalStorageValue(RESULT_STORAGE_KEY);
  const storedFirstName = useLocalStorageValue(FIRST_NAME_STORAGE_KEY);
  const storedEmail = useLocalStorageValue(EMAIL_STORAGE_KEY);
  const result = parseStoredResult(storedResult);
  const [firstName, setFirstName] = useState(storedFirstName ?? "");
  const [email, setEmail] = useState(storedEmail ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!result || !firstName.trim() || !email.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await submitMarketMatchLead({
        firstName,
        email,
        result,
      });
      notifyLocalStorageChange();
      window.location.href = "/results";
    } catch {
      setError("We could not save your match yet. Please try again.");
      setIsSubmitting(false);
    }
  }

  if (isSubmitting) {
    return <LoadingMatch />;
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#F8FAFC] text-[#0F172A]">
      <div className="pointer-events-none fixed left-[-5rem] top-16 h-56 w-56 rounded-full bg-[#6EE7B7]/35 blur-3xl" />
      <div className="pointer-events-none fixed bottom-8 right-[-4rem] h-56 w-56 rounded-full bg-[#22D3EE]/25 blur-3xl" />

      <section className="relative mx-auto flex min-h-screen w-full max-w-3xl flex-col px-5 py-6 sm:px-8">
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
          <div className="flex flex-1 items-center">
            <section className="w-full rounded-[2rem] border border-emerald-100 bg-white p-5 shadow-[0_28px_90px_rgba(15,23,42,0.12)] sm:p-8">
              <div className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-emerald-700">
                One last step
              </div>
              <h1 className="mt-5 text-4xl font-black leading-tight text-[#0F172A] sm:text-5xl">
                Your Market Match is ready 🎯
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                Enter your email to unlock your personalized Market Match
                profile and get a copy sent to your inbox.
              </p>

              <form onSubmit={handleSubmit} className="mt-7 grid gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="text-sm font-black text-[#0F172A]"
                  >
                    First name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    autoComplete="given-name"
                    className="mt-2 min-h-12 w-full rounded-[1rem] border border-slate-200 bg-[#F8FAFC] px-4 text-base text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:border-[#32D583] focus:bg-white focus:ring-4 focus:ring-emerald-100"
                    placeholder="Alex"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-black text-[#0F172A]"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="email"
                    className="mt-2 min-h-12 w-full rounded-[1rem] border border-slate-200 bg-[#F8FAFC] px-4 text-base text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:border-[#32D583] focus:bg-white focus:ring-4 focus:ring-emerald-100"
                    placeholder="you@example.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!firstName.trim() || !email.trim()}
                  className="mt-2 min-h-12 rounded-[1rem] bg-[#32D583] px-6 text-base font-black text-[#0F172A] shadow-[0_18px_35px_rgba(50,213,131,0.28)] transition hover:bg-[#6EE7B7] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Show My Market Match
                </button>
              </form>

              {error ? (
                <p className="mt-4 rounded-[1rem] bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
                  {error}
                </p>
              ) : null}

              <p className="mt-5 text-sm leading-6 text-slate-500">
                Your details are saved securely so we can send your profile and
                keep your result ready on this device.
              </p>
            </section>
          </div>
        ) : (
          <section className="rounded-[2rem] border border-emerald-100 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600">
              No match yet
            </p>
            <h1 className="mt-3 text-3xl font-black text-[#0F172A]">
              Complete the assessment first.
            </h1>
            <p className="mt-3 max-w-xl text-base leading-7 text-slate-600">
              Your email unlock page appears after your Market Match has been
              calculated.
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
