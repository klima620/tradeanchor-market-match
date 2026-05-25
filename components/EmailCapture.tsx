"use client";

import { useState } from "react";
import {
  notifyLocalStorageChange,
  useLocalStorageValue,
} from "@/lib/localStorageStore";
import { EMAIL_STORAGE_KEY } from "@/lib/resultEngine";

export default function EmailCapture() {
  const storedEmail = useLocalStorageValue(EMAIL_STORAGE_KEY);
  const [draftEmail, setDraftEmail] = useState<string | null>(null);
  const visibleEmail = draftEmail ?? storedEmail ?? "";
  const saved = Boolean(storedEmail) && visibleEmail === storedEmail;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!visibleEmail.trim()) {
      return;
    }

    window.localStorage.setItem(EMAIL_STORAGE_KEY, visibleEmail.trim());
    notifyLocalStorageChange();
    setDraftEmail(null);
  }

  return (
    <section className="rounded-[1.5rem] border border-emerald-100 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-6">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600">
        Private beta
      </p>
      <h2 className="mt-2 text-xl font-black text-[#0F172A]">
        Save your Market Match
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Leave your email to keep this profile attached to your future
        TradeAnchor setup. No backend is connected in this MVP.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="email">
          Email address
        </label>
        <input
          id="email"
          type="email"
          value={visibleEmail}
          onChange={(event) => {
            setDraftEmail(event.target.value);
          }}
          placeholder="you@example.com"
          className="min-h-12 flex-1 rounded-[1rem] border border-slate-200 bg-[#F8FAFC] px-4 text-base text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:border-[#32D583] focus:bg-white focus:ring-4 focus:ring-emerald-100"
        />
        <button
          type="submit"
          className="min-h-12 rounded-[1rem] bg-[#0F172A] px-5 text-sm font-black text-white transition hover:bg-slate-800"
        >
          {saved ? "Saved" : "Save"}
        </button>
      </form>
    </section>
  );
}
