import { format, subDays } from 'date-fns';
import { CheckCircle2, TrendingUp, TrendingDown, Calendar, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { StreakBadge } from '@/components/shared/streak-badge';
import { useDailyScore, useHomeStats, useTodaySchedule } from '@/modules/home/hooks';
import { greetingFor, useDisplayName, useStreaks } from '@/modules/home/insights';

interface DailyDigestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DailyDigestModal({ isOpen, onClose }: DailyDigestModalProps) {
  const name = useDisplayName();
  const { tasksDue } = useHomeStats();
  const { schedule } = useTodaySchedule(format(new Date(), 'yyyy-MM-dd'));
  const { data: yesterday } = useDailyScore(format(subDays(new Date(), 1), 'yyyy-MM-dd'));
  const { data: twoDaysAgo } = useDailyScore(format(subDays(new Date(), 2), 'yyyy-MM-dd'));
  const { workout, cfa, habits } = useStreaks();

  const best = [
    { label: 'workout streak', tone: 'red' as const, count: workout.count },
    { label: 'CFA streak', tone: 'blue' as const, count: cfa.count },
    { label: 'habit streak', tone: 'green' as const, count: habits.count },
  ].sort((a, b) => b.count - a.count)[0];

  const up = (yesterday ?? 0) >= (twoDaysAgo ?? 0);

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="gap-5 sm:max-w-md">
        <div className="space-y-1 pr-6">
          <DialogTitle className="text-2xl">
            {greetingFor()}, {name}
          </DialogTitle>
          <DialogDescription>Here’s your daily briefing.</DialogDescription>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-line bg-surface-2 p-4">
            <div className="text-xs font-semibold text-fg-muted">Yesterday’s score</div>
            <div className="flex items-center gap-2 font-mono text-3xl font-bold">
              {yesterday ?? '—'}
              {yesterday !== undefined &&
                (up ? <TrendingUp className="h-5 w-5 text-green-400" /> : <TrendingDown className="h-5 w-5 text-red-400" />)}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-line bg-surface-2 p-4">
            <div className="text-xs font-semibold text-fg-muted">Best streak</div>
            {best.count > 0 ? (
              <StreakBadge streak={best.count} label={best.label} tone={best.tone} />
            ) : (
              <span className="text-sm font-semibold text-fg-subtle">Start one today</span>
            )}
          </div>
        </div>

        <div className="space-y-2.5">
          <Row icon={Calendar} tint="bg-primary/[0.14] text-blue-400" title="Today’s schedule" detail={`${schedule.length} blocks planned`} />
          <Row icon={CheckCircle2} tint="bg-success/[0.14] text-green-400" title="Tasks due today" detail={`${tasksDue.today} remaining`} />
          {tasksDue.overdue > 0 && (
            <Row
              icon={AlertCircle}
              tint="bg-danger/[0.14] text-red-400"
              title="Overdue"
              detail={`${tasksDue.overdue} task${tasksDue.overdue > 1 ? 's need' : ' needs'} attention`}
              danger
            />
          )}
        </div>

        <Button onClick={onClose} size="lg" className="w-full">
          Let’s go
        </Button>
      </DialogContent>
    </Dialog>
  );
}

function Row({
  icon: Icon, tint, title, detail, danger,
}: {
  icon: typeof Calendar; tint: string; title: string; detail: string; danger?: boolean;
}) {
  return (
    <div className={`flex items-center gap-3 rounded-2xl border p-3 ${danger ? 'border-danger/25 bg-danger/[0.08]' : 'border-line bg-surface-2'}`}>
      <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-[10px] ${tint}`}>
        <Icon className="h-[18px] w-[18px]" aria-hidden />
      </div>
      <div className="min-w-0">
        <div className={`text-sm font-bold ${danger ? 'text-red-400' : ''}`}>{title}</div>
        <div className="text-xs text-fg-muted">{detail}</div>
      </div>
    </div>
  );
}
