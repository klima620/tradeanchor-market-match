type ProgressBarProps = {
  current: number;
  total: number;
};

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = Math.min(Math.max((current / total) * 100, 0), 100);

  return (
    <div className="w-full" aria-label={`Question ${current} of ${total}`}>
      <div className="mb-3 flex items-center justify-between text-xs font-black uppercase tracking-[0.18em] text-slate-500">
        <span>Market Match</span>
        <span>
          {current}/{total}
        </span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-white shadow-inner">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#32D583] via-[#6EE7B7] to-[#22D3EE] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
