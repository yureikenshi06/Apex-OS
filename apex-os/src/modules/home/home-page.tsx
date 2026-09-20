import { useState } from 'react';
import { format, subDays } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
  AlertTriangle, ArrowRight, ChevronRight, Dumbbell, Flame, GraduationCap,
  Plus, RotateCcw, ShieldCheck, Trash2, Wallet, CalendarClock,
} from 'lucide-react';
import { useHomeStats, useDailyScore, useNeedsAttention, useTodaySchedule } from './hooks';
import { useTasks, useUpdateTask } from '../tasks/hooks';
import { useUpdatePlannerEntry, useDeletePlannerEntry, useGenerateFromTemplate } from '../timetable/hooks';
import { useDisplayName, useStreaks, useWeekCfaHours } from './insights';
import { WeeklyDigestCard } from './weekly-digest-card';
import { StatCard, StatGrid } from '@/components/shared/stat-card';
import { ScoreRing } from '@/components/shared/score-ring';
import { StreakBadge } from '@/components/shared/streak-badge';
import { SyncPill } from '@/components/shared/sync-pill';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/ui-store';

const URGENCY_RANK = { critical: 0, warning: 1, info: 2, good: 3 } as const;

const ATTENTION_STYLE = {
  critical: { box: 'border-danger/25 bg-danger/[0.08]', icon: 'bg-danger/[0.16] text-red-400', arrow: 'text-red-400', sub: 'text-red-200/70' },
  warning: { box: 'border-warning/25 bg-warning/[0.08]', icon: 'bg-warning/[0.16] text-amber-400', arrow: 'text-amber-400', sub: 'text-amber-200/70' },
  info: { box: 'border-primary/25 bg-primary/[0.08]', icon: 'bg-primary/[0.16] text-blue-400', arrow: 'text-blue-400', sub: 'text-fg-muted' },
  good: { box: 'border-success/25 bg-success/[0.08]', icon: 'bg-success/[0.16] text-green-400', arrow: 'text-green-400', sub: 'text-fg-muted' },
} as const;

const hhmm = (t?: string) => t?.slice(0, 5) ?? '';

function SectionHeader({ title, meta, action }: { title: string; meta?: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="flex min-h-[28px] items-center justify-between gap-3">
      <div className="flex min-w-0 items-baseline gap-2">
        <h2 className="truncate text-[15px] font-bold md:text-sm">{title}</h2>
        {meta && <span className="shrink-0 font-mono text-[11px] text-fg-subtle">{meta}</span>}
      </div>
      {action}
    </div>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const openQuickAdd = useUIStore((s) => s.openQuickAdd);
  const name = useDisplayName();
  const today = format(new Date(), 'yyyy-MM-dd');

  const { fitnessHabits, monthlySpend, cfaHours, tasksDue } = useHomeStats();
  const { data: weekCfaHours = 0 } = useWeekCfaHours();
  const { data: dailyScore = 0 } = useDailyScore(today);
  const { data: yesterdayScore } = useDailyScore(format(subDays(new Date(), 1), 'yyyy-MM-dd'));
  const { data: attention = [] } = useNeedsAttention();
  const streaks = useStreaks();

  const { data: allTasks = [] } = useTasks();
  const { schedule = [], ongoingBlock, nextBlock, isLoading: scheduleLoading } = useTodaySchedule(today);
  const updatePlannerEntry = useUpdatePlannerEntry();
  const deletePlannerEntry = useDeletePlannerEntry();
  const generateFromTemplate = useGenerateFromTemplate();
  const updateTask = useUpdateTask();

  // ── Complete motion (260ms): the row stays on screen just long enough to
  //    show the check draw + success flash before it settles away.
  const [completing, setCompleting] = useState<Record<string, true>>({});
  const priorityTasks = allTasks
    .filter((t) => t.status !== 'Done' || completing[t.id])
    .sort((a, b) => Number(b.priority === 'High') - Number(a.priority === 'High'))
    .slice(0, 6);

  const completeTask = (id: string) => {
    setCompleting((c) => ({ ...c, [id]: true }));
    updateTask.mutate({ id, updates: { status: 'Done' } });
    window.setTimeout(
      () =>
        setCompleting((c) => {
          const { [id]: _drop, ...rest } = c;
          return rest;
        }),
      900
    );
  };

  const handleScheduleStatus = (id: string, done: boolean) =>
    updatePlannerEntry.mutate({ id, updates: { completion_status: done ? 'Completed' : 'In Progress' } });

  const handleDeleteScheduleItem = async (id: string) => {
    if (confirm("Delete this item from today's schedule?")) await deletePlannerEntry.mutateAsync(id);
  };

  const handleSyncMasterSchedule = async () => {
    if (confirm("Sync and populate today's complete routine from your Master Timetable?")) {
      await generateFromTemplate.mutateAsync(today);
    }
  };

  const doneBlocks = schedule.filter((s: any) => s.completion_status === 'Completed').length;
  const blocksLeft = schedule.length - doneBlocks;
  const habitsLeft = Math.max(0, fitnessHabits.total - fitnessHabits.completed);
  const plural = (n: number, w: string) => `${n} ${w}${n === 1 ? '' : 's'}`;
  const scoreLine = `${yesterdayScore !== undefined && dailyScore >= yesterdayScore ? 'Ahead of yesterday — ' : ''}${plural(habitsLeft, 'habit')} and ${plural(blocksLeft, 'block')} left today.`;

  const [showAllAttention, setShowAllAttention] = useState(false);
  const sortedAttention = [...attention].sort(
    (a: any, b: any) => (URGENCY_RANK[a.urgency as keyof typeof URGENCY_RANK] ?? 9) - (URGENCY_RANK[b.urgency as keyof typeof URGENCY_RANK] ?? 9)
  );

  const live = ongoingBlock ?? nextBlock;

  return (
    <div className="space-y-5 text-foreground md:space-y-6">
      {/* ── 1 · Hero ─────────────────────────────────────────────────────── */}
      {/* Desktop / tablet */}
      <section className="hidden gap-4 md:flex">
        <div className="flex flex-1 flex-col justify-center gap-3 rounded-[22px] border border-[#1E2C4D] bg-gradient-to-br from-blue-950 to-surface-1 to-65% px-7 py-6">
          <h2 className="text-[22px] font-extrabold tracking-tight">Welcome back, {name}</h2>
          <div className="flex flex-wrap gap-2">
            {streaks.workout.count > 0 && <StreakBadge streak={streaks.workout.count} label="workout streak" tone="red" />}
            {streaks.cfa.count > 0 && <StreakBadge streak={streaks.cfa.count} label="CFA streak" tone="blue" />}
            {streaks.habits.count > 0 && <StreakBadge streak={streaks.habits.count} label="habit streak" tone="green" />}
            {streaks.workout.count + streaks.cfa.count + streaks.habits.count === 0 && (
              <span className="text-sm text-fg-muted">Log a workout, a study session or your habits to start a streak.</span>
            )}
          </div>
        </div>
        <div className="flex w-[220px] shrink-0 items-center gap-3.5 rounded-[22px] border border-line bg-surface-1 p-5">
          <ScoreRing value={dailyScore} size={64} stroke={6} />
          <div>
            <div className="font-mono text-xl font-bold">{Math.round(dailyScore)}%</div>
            <div className="mt-0.5 text-[11px] font-semibold text-fg-muted">Execution score</div>
          </div>
        </div>
      </section>

      {/* Phone */}
      <section className="flex items-center gap-4 rounded-[24px] border border-[#1E2C4D] bg-gradient-to-br from-blue-950 to-surface-1 to-60% p-5 md:hidden">
        <ScoreRing value={dailyScore} size={72} stroke={7}>
          <span className="font-mono text-lg font-bold">{Math.round(dailyScore)}%</span>
        </ScoreRing>
        <div className="flex min-w-0 flex-col gap-1">
          <span className="text-sm font-bold">Execution score</span>
          <span className="text-xs leading-snug text-fg-muted">{scoreLine}</span>
        </div>
      </section>

      {/* Phone streaks (desktop shows them in the hero) */}
      {streaks.workout.count + streaks.cfa.count + streaks.habits.count > 0 && (
        <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 md:hidden">
          {streaks.workout.count > 0 && <StreakBadge streak={streaks.workout.count} label="workout" tone="red" className="shrink-0" />}
          {streaks.cfa.count > 0 && <StreakBadge streak={streaks.cfa.count} label="CFA" tone="blue" className="shrink-0" />}
          {streaks.habits.count > 0 && <StreakBadge streak={streaks.habits.count} label="habits" tone="green" className="shrink-0" />}
        </div>
      )}

      {/* ── 2 · Weekly digest (Sunday night → Monday, or from ⌘K) ───────── */}
      <WeeklyDigestCard />

      {/* ── 3 · Live now strip ───────────────────────────────────────────── */}
      {live && (
        <button
          type="button"
          onClick={() => navigate('/timetable')}
          className={cn(
            'tap animate-enter flex w-full items-center gap-3 rounded-2xl border bg-surface-1 px-3.5 py-3 text-left',
            ongoingBlock ? 'border-[#1E2C4D] border-l-[3px] border-l-primary' : 'border-line'
          )}
        >
          <span className="relative grid h-2 w-2 shrink-0 place-items-center">
            <span className={cn('h-2 w-2 rounded-full', ongoingBlock ? 'bg-primary' : 'bg-fg-subtle')} />
            {ongoingBlock && <span aria-hidden className="animate-live absolute inset-0 rounded-full bg-primary" />}
          </span>
          <span className="min-w-0 flex-1">
            <span className={cn('block text-[11px] font-semibold', ongoingBlock ? 'text-blue-400' : 'text-fg-subtle')}>
              {ongoingBlock ? 'Now' : 'Up next'} ·{' '}
              <span className="font-mono">
                {hhmm(live.start_time)}–{hhmm(live.end_time)}
              </span>
            </span>
            <span className="mt-px block truncate text-sm font-bold">{live.activity}</span>
          </span>
          <ChevronRight className="h-4 w-4 shrink-0 text-fg-subtle" aria-hidden />
        </button>
      )}

      {/* ── 4 · Stats: swipe row on phones, grid from sm ─────────────────── */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between sm:hidden">
          <span className="text-[13px] font-bold text-zinc-300">Today at a glance</span>
          <span className="text-[11px] text-fg-subtle">Swipe →</span>
        </div>
        <StatGrid>
          <StatCard
            title="CFA study velocity"
            value={weekCfaHours}
            format="hours"
            color="text-blue-400"
            icon={GraduationCap}
            syncScope="cfa"
            changeLabel={`${cfaHours.completedTopics}/${cfaHours.totalTopics} LOS · ${cfaHours.masteryPct}% · this week`}
          />
          <StatCard
            title="Monthly spend"
            value={monthlySpend.value}
            format="currency"
            prefix="₹"
            color="text-emerald-400"
            icon={Wallet}
            syncScope="finance"
            changeLabel={`Budget ₹${monthlySpend.budget.toLocaleString('en-IN')}`}
          />
          <StatCard
            title="Fitness & habits"
            value={fitnessHabits.pct}
            format="percent"
            color="text-violet-400"
            icon={Dumbbell}
            syncScope="fitness"
            changeLabel={`${fitnessHabits.completed}/${fitnessHabits.total} habits today`}
          />
          <StatCard
            title="Deliverables due"
            value={tasksDue.today}
            format="number"
            color="text-rose-400"
            icon={AlertTriangle}
            syncScope="tasks"
            changeLabel={tasksDue.overdue > 0 ? `${tasksDue.overdue} overdue` : 'Nothing overdue'}
          />
        </StatGrid>
      </section>

      {/* ── 5 · Priority deliverables + schedule ─────────────────────────── */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-4">
        <section className="min-w-0 space-y-2.5">
          <SectionHeader
            title="Priority deliverables"
            meta={`${priorityTasks.filter((t) => !completing[t.id]).length} active`}
            action={
              <span className="flex items-center gap-2">
                <SyncPill scope="tasks" />
                <button
                  type="button"
                  onClick={() => openQuickAdd('task')}
                  className="tap inline-flex h-9 items-center gap-1 rounded-[10px] px-2.5 text-xs font-bold text-blue-400 transition-colors hover:bg-primary/10"
                >
                  <Plus className="h-3.5 w-3.5" aria-hidden /> Add
                </button>
              </span>
            }
          />
          <div className="overflow-hidden rounded-[20px] border border-line bg-surface-1">
            {priorityTasks.length === 0 ? (
              <div className="flex flex-col items-center gap-2 px-4 py-10 text-center">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-success/[0.12]">
                  <ShieldCheck className="h-5 w-5 text-green-400" aria-hidden />
                </span>
                <p className="text-sm font-bold">All deliverables clear</p>
                <p className="text-xs text-fg-muted">Nothing pending right now.</p>
              </div>
            ) : (
              <ul className="divide-y divide-line/70">
                <AnimatePresence initial={false}>
                  {priorityTasks.map((task) => {
                    const done = !!completing[task.id];
                    return (
                      <motion.li
                        key={task.id}
                        layout="position"
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className={cn('flex items-center gap-3 px-4 py-3.5', done && 'animate-flash')}
                      >
                        <Checkbox
                          checked={done}
                          onCheckedChange={() => !done && completeTask(task.id)}
                          aria-label={`Mark “${task.title}” done`}
                          className="h-[22px] w-[22px]"
                        />
                        <div className="min-w-0 flex-1">
                          <div className={cn('truncate text-sm font-semibold transition-colors [transition-duration:260ms]', done && 'text-fg-subtle line-through')}>
                            {task.title}
                          </div>
                          <div className="mt-1.5 flex items-center gap-1.5">
                            <span
                              className={cn(
                                'rounded-md px-1.5 py-0.5 text-[11px] font-bold',
                                task.priority === 'High' ? 'bg-danger/[0.14] text-red-400' : 'bg-primary/[0.14] text-blue-400'
                              )}
                            >
                              {task.priority || 'Medium'}
                            </span>
                            {task.deadline && (
                              <span className="font-mono text-[11px] text-fg-subtle">
                                Due {new Date(task.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                              </span>
                            )}
                          </div>
                        </div>
                        <Link to="/tasks" aria-label="Open tasks" className="tap -mr-2 grid h-10 w-10 shrink-0 place-items-center text-fg-subtle hover:text-foreground">
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </motion.li>
                    );
                  })}
                </AnimatePresence>
              </ul>
            )}
          </div>
        </section>

        <section className="min-w-0 space-y-2.5">
          <SectionHeader
            title="Today’s schedule"
            meta={`${doneBlocks}/${schedule.length} done`}
            action={
              <span className="flex items-center gap-1">
                <SyncPill scope="timetable" />
                <button
                  type="button"
                  onClick={handleSyncMasterSchedule}
                  disabled={generateFromTemplate.isPending}
                  title="Populate or reset today’s routine from your Master Timetable"
                  className="tap inline-flex h-9 items-center gap-1 rounded-[10px] px-2.5 text-xs font-bold text-blue-400 transition-colors hover:bg-primary/10 disabled:opacity-50"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden /> Sync
                </button>
              </span>
            }
          />
          <div className="overflow-hidden rounded-[20px] border border-line bg-surface-1">
            {scheduleLoading ? (
              <div className="space-y-2 p-3">
                <div className="skeleton h-12 rounded-xl" />
                <div className="skeleton h-12 rounded-xl" />
              </div>
            ) : schedule.length === 0 ? (
              <div className="flex flex-col items-center gap-3 px-4 py-10 text-center">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/[0.05]">
                  <CalendarClock className="h-5 w-5 text-fg-muted" aria-hidden />
                </span>
                <p className="text-sm text-fg-muted">No schedule for today.</p>
                <button
                  type="button"
                  onClick={handleSyncMasterSchedule}
                  className="tap h-10 rounded-xl bg-primary px-4 text-[13px] font-bold text-white"
                >
                  Sync from Master Timetable
                </button>
              </div>
            ) : (
              <ul className="max-h-[420px] divide-y divide-line/70 overflow-y-auto overscroll-contain">
                {schedule.map((entry: any, idx: number) => {
                  const isDone = entry.completion_status === 'Completed';
                  const isNow = ongoingBlock && ongoingBlock.id === entry.id;
                  const canEdit = entry.source === 'planner';
                  return (
                    <li
                      key={entry.id || idx}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3',
                        isNow && 'border-l-[3px] border-l-primary bg-primary/[0.06] pl-[13px]',
                        isDone && 'opacity-60'
                      )}
                    >
                      {canEdit ? (
                        <Checkbox
                          checked={isDone}
                          onCheckedChange={(v) => handleScheduleStatus(entry.id, v === true)}
                          aria-label={`Mark “${entry.activity}” ${isDone ? 'not done' : 'done'}`}
                          className="h-[22px] w-[22px]"
                        />
                      ) : (
                        <span aria-hidden className="h-[22px] w-[22px] shrink-0" />
                      )}
                      <span className={cn('w-[86px] shrink-0 font-mono text-[11px]', isNow ? 'text-blue-400' : 'text-fg-subtle')}>
                        {hhmm(entry.start_time)}–{hhmm(entry.end_time)}
                      </span>
                      <span className={cn('min-w-0 flex-1 truncate text-[13px] font-semibold', isDone ? 'text-fg-subtle line-through' : isNow ? 'font-bold text-foreground' : 'text-zinc-300')}>
                        {entry.activity}
                      </span>
                      {canEdit && (
                        <button
                          type="button"
                          onClick={() => handleDeleteScheduleItem(entry.id)}
                          aria-label={`Delete “${entry.activity}”`}
                          // hover-reveal only where hover exists; always visible on touch
                          className="tap -mr-2 grid h-10 w-10 shrink-0 place-items-center rounded-lg text-fg-subtle transition-colors hover:bg-danger/10 hover:text-red-400 md:opacity-0 md:focus-visible:opacity-100 md:[li:hover_&]:opacity-100"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </section>
      </div>

      {/* ── 6 · Needs attention: one card on phones, all of them on desktop ─ */}
      <section className="space-y-2.5">
        <SectionHeader
          title="Needs attention"
          meta={sortedAttention.length > 0 ? `${sortedAttention.length}` : undefined}
        />
        {sortedAttention.length === 0 ? (
          <div className="flex items-center gap-3 rounded-2xl border border-success/25 bg-success/[0.08] p-4">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-success/[0.16]">
              <ShieldCheck className="h-[18px] w-[18px] text-green-400" aria-hidden />
            </span>
            <div>
              <p className="text-sm font-bold">All clear</p>
              <p className="text-xs text-fg-muted">No overdue work, budget overruns or study gaps.</p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
              {sortedAttention.map((item: any, i: number) => {
                const style = ATTENTION_STYLE[item.urgency as keyof typeof ATTENTION_STYLE] ?? ATTENTION_STYLE.info;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => navigate(item.link)}
                    className={cn(
                      'tap flex items-center gap-3 rounded-[18px] border px-4 py-3.5 text-left',
                      style.box,
                      // phones: only the most urgent one until expanded
                      i > 0 && !showAllAttention && 'hidden md:flex'
                    )}
                  >
                    <span className={cn('grid h-[34px] w-[34px] shrink-0 place-items-center rounded-[10px]', style.icon)}>
                      {item.type === 'Tasks' ? <AlertTriangle className="h-4 w-4" /> : item.type === 'Finance' ? <Wallet className="h-4 w-4" /> : item.type === 'Fitness' ? <Flame className="h-4 w-4" /> : <GraduationCap className="h-4 w-4" />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] font-bold">{item.title}</span>
                      <span className={cn('mt-px block truncate text-[11px]', style.sub)}>{item.description}</span>
                    </span>
                    <ChevronRight className={cn('h-4 w-4 shrink-0', style.arrow)} aria-hidden />
                  </button>
                );
              })}
            </div>
            {sortedAttention.length > 1 && (
              <button
                type="button"
                onClick={() => setShowAllAttention((v) => !v)}
                aria-expanded={showAllAttention}
                className="tap flex min-h-[44px] w-full items-center justify-center rounded-xl text-[13px] font-bold text-fg-muted hover:text-foreground md:hidden"
              >
                {showAllAttention ? 'Show less' : `Show ${sortedAttention.length - 1} more`}
              </button>
            )}
          </>
        )}
      </section>
    </div>
  );
}
