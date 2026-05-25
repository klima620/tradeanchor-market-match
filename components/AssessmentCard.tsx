"use client";

import type { AnswerOption, Question } from "@/lib/types";

type AssessmentCardProps = {
  question: Question;
  selectedOptionId?: string;
  onSelect: (option: AnswerOption) => void;
};

export default function AssessmentCard({
  question,
  selectedOptionId,
  onSelect,
}: AssessmentCardProps) {
  return (
    <section className="rounded-[1.75rem] border border-emerald-100 bg-white p-5 shadow-[0_24px_70px_rgba(15,23,42,0.1)] sm:p-7">
      <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-emerald-600">
        {question.eyebrow}
      </p>
      <h1 className="text-2xl font-black leading-tight text-[#0F172A] sm:text-3xl">
        {question.prompt}
      </h1>

      <div className="mt-7 grid gap-3">
        {question.options.map((option) => {
          const isSelected = selectedOptionId === option.id;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option)}
              className={`w-full rounded-[1.25rem] border p-4 text-left transition ${
                isSelected
                  ? "border-[#32D583] bg-emerald-50 shadow-[0_12px_28px_rgba(50,213,131,0.2)]"
                  : "border-slate-200 bg-[#F8FAFC] hover:border-[#32D583] hover:bg-white"
              }`}
              aria-pressed={isSelected}
            >
              <span className="block text-base font-black text-[#0F172A]">
                {option.label}
              </span>
              <span className="mt-1 block text-sm leading-6 text-slate-600">
                {option.description}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
