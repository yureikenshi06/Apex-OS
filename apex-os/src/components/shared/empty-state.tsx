import {
  Inbox, Calendar, Wallet, Dumbbell, GraduationCap,
  CheckSquare, FileText, type LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

const moduleIcons: Record<string, LucideIcon> = {
  tasks: CheckSquare,
  timetable: Calendar,
  finance: Wallet,
  fitness: Dumbbell,
  cfa: GraduationCap,
  default: FileText,
};

export function EmptyState({ icon: Icon = Inbox, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="animate-enter flex flex-col items-center justify-center px-4 py-14 text-center">
      <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl border border-line bg-surface-2">
        <Icon className="h-6 w-6 text-fg-muted" aria-hidden />
      </div>
      <h3 className="mb-1 text-base font-bold text-foreground">{title}</h3>
      <p className="mb-5 max-w-sm text-sm text-fg-muted">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} size="sm">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export function getModuleIcon(module: string): LucideIcon {
  return moduleIcons[module] || moduleIcons.default;
}
