import { useQuery } from '@tanstack/react-query';
import { addDays, differenceInCalendarDays, endOfMonth, format, getDay, startOfWeek, subDays } from 'date-fns';
import { useAuth } from '@/hooks/use-auth';
import { getFitnessHabitRange } from '@/api/fitness';
import { getHabitTrackerRange, getTimetableBlocks } from '@/api/timetable';
import { getBudgets, getTransactions } from '@/api/finance';
import type { FitnessHabitDaily } from '@/api/types';

const ymd = (d: Date) => format(d, 'yyyy-MM-dd');

// ─── Display name ────────────────────────────────────────────────────────────
export function useDisplayName() {
  const { user } = useAuth();
  const meta = (user?.user_metadata ?? {}) as Record<string, string | undefined>;
  return meta.first_name || meta.full_name?.split(' ')[0] || meta.name?.split(' ')[0] || 'Prakhar';
}

export function greetingFor(date = new Date()) {
  const h = date.getHours();
  return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
}

// ─── Streaks ─────────────────────────────────────────────────────────────────
export interface StreakInfo {
  count: number;
  doneToday: boolean;
  /** A live streak that today's activity hasn't extended yet. */
  atRisk: boolean;
}
export type StreakKey = 'workout' | 'cfa' | 'habits';

const habitsHit = (h: FitnessHabitDaily) =>
  [
    h.workout_completed, h.steps_completed, h.calories_within_target, h.protein_target_hit,
    h.water_target_hit, h.sleep_target_hit, h.fruits_veg_consumed, h.no_junk_food, h.mobility_stretching,
  ].filter(Boolean).length;

export const HABITS_TOTAL = 9;
/** A day counts toward the habit streak once at least 5 of the 9 habits are hit. */
export const HABIT_DAY_THRESHOLD = 5;

function computeStreak(done: Set<string>, today: Date): StreakInfo {
  const doneToday = done.has(ymd(today));
  let cursor = doneToday ? today : subDays(today, 1);
  let count = 0;
  while (done.has(ymd(cursor))) {
    count++;
    cursor = subDays(cursor, 1);
  }
  return { count, doneToday, atRisk: !doneToday && count > 0 };
}

export const STREAK_LABELS: Record<StreakKey, { noun: string; action: string; path: string }> = {
  workout: { noun: 'workout', action: 'Log today’s workout', path: '/fitness/log' },
  cfa: { noun: 'CFA study', action: 'Log a CFA study session', path: '/timetable/habits' },
  habits: { noun: 'habit', action: 'Hit 5 habits today', path: '/fitness/habits' },
};

export function useStreaks() {
  const { user } = useAuth();
  const ownerId = user?.id || '';
  const todayKey = ymd(new Date());

  const query = useQuery({
    queryKey: ['streaks', ownerId, todayKey],
    enabled: !!ownerId,
    staleTime: 60_000,
    queryFn: async () => {
      const today = new Date();
      const from = ymd(subDays(today, 120));
      const [fitness, tracker] = await Promise.all([
        getFitnessHabitRange(ownerId, from, ymd(today)),
        getHabitTrackerRange(ownerId, from, ymd(today)),
      ]);

      const workout = new Set<string>();
      const cfa = new Set<string>();
      const habits = new Set<string>();
      fitness.forEach((f) => {
        if (f.workout_completed) workout.add(f.date);
        if (habitsHit(f) >= HABIT_DAY_THRESHOLD) habits.add(f.date);
      });
      tracker.forEach((t) => {
        if (t.gym) workout.add(t.date);
        if (Number(t.cfa_hours || 0) > 0) cfa.add(t.date);
      });

      return {
        workout: computeStreak(workout, today),
        cfa: computeStreak(cfa, today),
        habits: computeStreak(habits, today),
      } satisfies Record<StreakKey, StreakInfo>;
    },
  });

  const empty: StreakInfo = { count: 0, doneToday: false, atRisk: false };
  const streaks = query.data ?? { workout: empty, cfa: empty, habits: empty };

  /** Longest live streaks that today's activity hasn't extended yet, biggest first. */
  const atRisk = (Object.keys(streaks) as StreakKey[])
    .filter((k) => streaks[k].atRisk)
    .sort((a, b) => streaks[b].count - streaks[a].count)
    .map((key) => ({ key, count: streaks[key].count }));

  return { ...streaks, atRisk, isLoading: query.isLoading };
}

// ─── Weekly digest ───────────────────────────────────────────────────────────
export interface WeeklyDigest {
  weekKey: string;
  weekLabel: string;
  daysElapsed: number;
  cfa: { hours: number; plan: number; pct: number };
  spend: { amount: number; budget: number | null; pct: number | null };
  habits: { pct: number; daysLogged: number };
}

const DEFAULT_CFA_WEEKLY_PLAN = 20;

const blockHours = (start?: string, end?: string) => {
  if (!start || !end) return 0;
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  return Math.max(0, (eh * 60 + em - (sh * 60 + sm)) / 60);
};

export function useWeeklyDigest(enabled = true) {
  const { user } = useAuth();
  const ownerId = user?.id || '';
  const now = new Date();
  // On Monday the digest still summarises the week that just ended (through Sunday).
  const anchor = getDay(now) === 1 ? subDays(now, 1) : now;
  const weekStart = startOfWeek(anchor, { weekStartsOn: 1 });
  const weekKey = ymd(weekStart);

  return useQuery({
    queryKey: ['weeklyDigest', ownerId, weekKey],
    enabled: !!ownerId && enabled,
    staleTime: 5 * 60_000,
    queryFn: async (): Promise<WeeklyDigest> => {
      const today = anchor;
      const startStr = weekKey;
      const endStr = ymd(today);
      const daysElapsed = Math.max(1, differenceInCalendarDays(today, weekStart) + 1);

      const monthsNeeded = new Map<string, { month: number; year: number }>();
      [weekStart, today].forEach((d) =>
        monthsNeeded.set(format(d, 'yyyy-MM'), { month: d.getMonth() + 1, year: d.getFullYear() })
      );

      const [tracker, fitness, blocks, budgets, ...txnSets] = await Promise.all([
        getHabitTrackerRange(ownerId, startStr, endStr),
        getFitnessHabitRange(ownerId, startStr, endStr),
        getTimetableBlocks(ownerId),
        getBudgets(ownerId),
        ...[...monthsNeeded.values()].map((m) => getTransactions(ownerId, m)),
      ]);

      // CFA hours vs. what the timetable actually schedules for CFA each week
      const hours = tracker.reduce((sum, t) => sum + Number(t.cfa_hours || 0), 0);
      const planned = blocks
        .filter((b) => /cfa/i.test(b.category || '') || /cfa/i.test(b.activity || ''))
        .reduce((sum, b) => sum + blockHours(b.start_time, b.end_time), 0);
      const plan = planned > 0 ? Math.round(planned * 10) / 10 : DEFAULT_CFA_WEEKLY_PLAN;

      // Spend this week vs. a pro-rated slice of the monthly budget
      const spendAmount = txnSets
        .flat()
        .filter((t) => t.transaction_type === 'Expense' && t.date >= startStr && t.date <= endStr)
        .reduce((s, t) => s + Number(t.amount || 0), 0);
      const monthlyBudget = budgets.reduce((s, b) => s + Number(b.monthly_budget || 0), 0);
      const daysInMonth = endOfMonth(today).getDate();
      const weeklyBudget = monthlyBudget > 0 ? Math.round((monthlyBudget * 7) / daysInMonth) : null;

      // Habit consistency across the days elapsed so far this week
      const totalHits = fitness.reduce((s, f) => s + habitsHit(f), 0);
      const habitPct = Math.round((totalHits / (HABITS_TOTAL * daysElapsed)) * 100);

      return {
        weekKey,
        weekLabel: `${format(weekStart, 'd MMM')} – ${format(addDays(weekStart, 6), 'd MMM')}`,
        daysElapsed,
        cfa: { hours, plan, pct: Math.min(100, Math.round((hours / plan) * 100)) },
        spend: {
          amount: spendAmount,
          budget: weeklyBudget,
          pct: weeklyBudget ? Math.round((spendAmount / weeklyBudget) * 100) : null,
        },
        habits: { pct: Math.min(100, habitPct), daysLogged: fitness.length },
      };
    },
  });
}

// ─── When to surface the digest ──────────────────────────────────────────────
const DIGEST_DISMISS_KEY = 'apex_weekly_digest_dismissed';

/** Sunday from 6pm through the end of Monday. */
export function isDigestWindow(now = new Date()) {
  const day = getDay(now);
  return (day === 0 && now.getHours() >= 18) || day === 1;
}

export function isDigestDismissed(weekKey: string) {
  try {
    return localStorage.getItem(DIGEST_DISMISS_KEY) === weekKey;
  } catch {
    return false;
  }
}

export function dismissDigest(weekKey: string) {
  try {
    localStorage.setItem(DIGEST_DISMISS_KEY, weekKey);
  } catch {
    /* storage unavailable (private mode) — the card simply reappears next load */
  }
}

/** Week key the digest refers to: on Monday it's still last week's summary. */
export function digestWeekKey(now = new Date()) {
  const base = getDay(now) === 1 ? subDays(now, 1) : now;
  return ymd(startOfWeek(base, { weekStartsOn: 1 }));
}

// ─── This week's CFA study hours (Mon → today) ───────────────────────────────
export function useWeekCfaHours() {
  const { user } = useAuth();
  const ownerId = user?.id || '';
  const weekKey = ymd(startOfWeek(new Date(), { weekStartsOn: 1 }));

  return useQuery({
    queryKey: ['weekCfaHours', ownerId, weekKey],
    enabled: !!ownerId,
    staleTime: 60_000,
    queryFn: async () => {
      const rows = await getHabitTrackerRange(ownerId, weekKey, ymd(new Date()));
      return rows.reduce((sum, r) => sum + Number(r.cfa_hours || 0), 0);
    },
  });
}
