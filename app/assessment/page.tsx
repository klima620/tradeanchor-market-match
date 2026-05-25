"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import AssessmentCard from "@/components/AssessmentCard";
import LoadingMatch from "@/components/LoadingMatch";
import ProgressBar from "@/components/ProgressBar";
import { questions } from "@/data/questions";
import {
  ANSWERS_STORAGE_KEY,
  RESULT_STORAGE_KEY,
  buildMarketMatchResult,
} from "@/lib/resultEngine";
import { notifyLocalStorageChange } from "@/lib/localStorageStore";
import type { AnswerOption, AssessmentAnswer } from "@/lib/types";

export default function AssessmentPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswer[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState<string>();
  const [isFinishing, setIsFinishing] = useState(false);
  const question = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const progressCurrent = useMemo(
    () => Math.min(currentIndex + 1, questions.length),
    [currentIndex],
  );

  function handleSelect(option: AnswerOption) {
    const nextAnswers = [
      ...answers.filter((answer) => answer.questionId !== question.id),
      { questionId: question.id, optionId: option.id },
    ];

    setSelectedOptionId(option.id);
    setAnswers(nextAnswers);
  }

  function handleNext() {
    if (!selectedOptionId) {
      return;
    }

    const nextAnswers = [
      ...answers.filter((answer) => answer.questionId !== question.id),
      { questionId: question.id, optionId: selectedOptionId },
    ];

    if (isLastQuestion) {
      const result = buildMarketMatchResult(nextAnswers);
      window.localStorage.setItem(ANSWERS_STORAGE_KEY, JSON.stringify(nextAnswers));
      window.localStorage.setItem(RESULT_STORAGE_KEY, JSON.stringify(result));
      notifyLocalStorageChange();
      setAnswers(nextAnswers);
      setIsFinishing(true);

      window.setTimeout(() => {
        window.location.href = "/email";
      }, 900);

      return;
    }

    const nextIndex = currentIndex + 1;
    const nextQuestion = questions[nextIndex];
    const existingAnswer = nextAnswers.find(
      (answer) => answer.questionId === nextQuestion.id,
    );

    setAnswers(nextAnswers);
    setCurrentIndex(nextIndex);
    setSelectedOptionId(existingAnswer?.optionId);
  }

  function handleBack() {
    if (currentIndex === 0) {
      return;
    }

    const previousIndex = currentIndex - 1;
    const previousQuestion = questions[previousIndex];
    const previousAnswer = answers.find(
      (answer) => answer.questionId === previousQuestion.id,
    );

    setCurrentIndex(previousIndex);
    setSelectedOptionId(previousAnswer?.optionId);
  }

  if (isFinishing) {
    return <LoadingMatch />;
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#F8FAFC] text-[#0F172A]">
      <div className="pointer-events-none fixed left-[-4rem] top-20 h-40 w-40 rounded-full bg-[#6EE7B7]/35 blur-2xl" />
      <div className="pointer-events-none fixed bottom-10 right-[-3rem] h-44 w-44 rounded-full bg-[#22D3EE]/25 blur-2xl" />
      <section className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-5 py-6 sm:px-8">
        <nav className="mb-8 flex items-center justify-between">
          <Link href="/" className="text-lg font-black">
            Market Match™
          </Link>
          <Link href="/results" className="text-sm font-black text-slate-600">
            Results
          </Link>
        </nav>

        <div className="mb-6">
          <ProgressBar current={progressCurrent} total={questions.length} />
        </div>

        <AssessmentCard
          question={question}
          selectedOptionId={selectedOptionId}
          onSelect={handleSelect}
        />

        <div className="mt-5 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentIndex === 0}
            className="min-h-12 rounded-[1rem] border border-slate-200 bg-white px-5 text-sm font-black text-[#0F172A] transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={!selectedOptionId}
            className="min-h-12 rounded-[1rem] bg-[#32D583] px-6 text-sm font-black text-[#0F172A] shadow-[0_15px_35px_rgba(50,213,131,0.28)] transition hover:bg-[#6EE7B7] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isLastQuestion ? "Continue" : "Next"}
          </button>
        </div>
      </section>
    </main>
  );
}
