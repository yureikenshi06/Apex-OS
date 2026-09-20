import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CalendarCheck, Flame, X, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  STREAK_LABELS, digestWeekKey, dismissDigest, isDigestDismissed, isDigestWindow,
  useStreaks, useWeeklyDigest,
} from './insights';

function Metric({
  label, value, sub, pct, bar,
}: { label: string; value: string; sub: string; pct: number; bar: string }) {
  return (
    <div className="min-w-0 space-y-1.5">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-xs font-semibold text-fg-muted">{label}</span>
        <span className="font-mono text-[11px] text-fg-subtle">{Math.min(999, pct)}%</span>
      </div>
      <div className="font-mono text-xl font-bold leading-none">{value}</div>
      <div className="h-1.5 overflow-hidden rounded-full bg-line" role="progressbar" aria-label={label} aria-valuenow={Math.min(100, pct)} aria-valuemin={0} aria-valuemax={100}>
        <div className={cn('h-full rounded-full transition-[width] duration-700 ease-out', bar)} style={{ width: `${Math.min(100, pct)}%` }} />
      </div>
      <div className="text-[11px] text-fg-subtle">{sub}</div>
    </div>
  );
}

/**
 * The Sunday-night recap: CFA hours vs plan, spend vs budget, habit
 * consistency, and any streaks still at risk. Dismissible per week; reachable
 * any time from the command palette ("Weekly digest").
 */
export function WeeklyDigestCard() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const forced = params.get('digest') === '1';
  const weekKey = digestWeekKey();
  const [dismissed, setDismissed] = useState(() => isDigestDismissed(weekKey));

  const visible = forced || (isDigestWindow() && !dismissed);
  const { data } = useWeeklyDigest(visible);
  const { atRisk } = useStreaks();

  if (!visible) return null;

  const close = () => {
    dismissDigest(weekKey);
    setDismissed(true);
    if (forced) {
      params.delete('digest');
      setParams(params, { replace: true });
    }
  };

  const spendPct = data?.spend.pct ?? 0;
  const spendBar = spendPct > 100 ? 'bg-danger' : spendPct > 85 ? 'bg-warning' : 'bg-success';

  return (
    <section
      aria-label="Weekly digest"
      className="animate-enter relative overflow-hidden rounded-[20px] border border-primary/25 bg-surface-1 p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-primary/[0.14]">
            <CalendarCheck className="h-[18px] w-[18px] text-blue-400" aria-hidden />
          </span>
          <div>
            <h2 className="text-[15px] font-extrabold leading-tight">Your week in review</h2>
            <p className="font-mono text-[11px] text-fg-subtle">{data?.weekLabel ?? ' '}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={close}
          aria-label="Dismiss weekly digest"
          className="tap -mr-2 -mt-2 grid h-11 w-11 shrink-0 place-items-center rounded-xl text-fg-subtle transition-colors hover:bg-white/[0.06] hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {data ? (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
          <Metric
            label="CFA hours"
            value={`${data.cfa.hours.toFixed(1)}h / ${data.cfa.plan}h`}
            pct={data.cfa.pct}
            bar="bg-primary"
            sub={data.cfa.pct >= 100 ? 'Plan met' : `${(data.cfa.plan - data.cfa.hours).toFixed(1)}h short of plan`}
          />
          <Metric
            label="Spend vs budget"
            value={`₹${Math.round(data.spend.amount).toLocaleString('en-IN')}`}
            pct={data.spend.pct ?? 0}
            bar={spendBar}
            sub={data.spend.budget ? `of ₹${data.spend.budget.toLocaleString('en-IN')} weekly share` : 'Set budgets to compare'}
          />
          <Metric
            label="Habit consistency"
            value={`${data.habits.pct}%`}
            pct={data.habits.pct}
            bar="bg-violet-500"
            sub={`${data.habits.daysLogged} of ${data.daysElapsed} days logged`}
          />
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5" aria-busy>
          {[0, 1, 2].map((i) => (
            <div key={i} className="skeleton h-[88px] rounded-xl" />
          ))}
        </div>
      )}

      {atRisk.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2 border-t border-line pt-4">
          <span className="w-full text-xs font-semibold text-fg-muted">Streaks at risk today</span>
          {atRisk.map(({ key, count }) => (
            <button
              key={key}
              type="button"
              onClick={() => navigate(STREAK_LABELS[key].path)}
              className="tap inline-flex min-h-[36px] items-center gap-1.5 rounded-lg bg-danger/[0.12] px-2.5 py-1.5 text-[12px] font-bold text-red-400"
            >
              <Flame className="h-3.5 w-3.5" aria-hidden />
              <span><span className="font-mono">{count}</span>-day {STREAK_LABELS[key].noun}</span>
              <ArrowRight className="h-3 w-3 opacity-70" aria-hidden />
            </button>
          ))}
        </div>
      )}

      <div className="mt-4">
        <button
          type="button"
          onClick={() => navigate('/timetable/review')}
          className="tap inline-flex min-h-[44px] items-center gap-1.5 text-[13px] font-bold text-blue-400 hover:text-blue-300"
        >
          Write your weekly review <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </button>
      </div>
    </section>
  );
}
