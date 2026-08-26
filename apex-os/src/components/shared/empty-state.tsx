import { motion } from 'framer-motion';
import { 
  Inbox, Calendar, Wallet, Dumbbell, GraduationCap, 
  CheckSquare, FileText, type LucideIcon 
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

export function EmptyState({ 
  icon: Icon = Inbox, 
  title, 
  description, 
  actionLabel, 
  onAction 
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="w-16 h-16 rounded-2xl bg-secondary/80 flex items-center justify-center mb-4"
      >
        <Icon className="w-8 h-8 text-muted-foreground" />
      </motion.div>
      
      <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground text-center max-w-sm mb-6">{description}</p>
      
      {actionLabel && onAction && (
        <Button onClick={onAction} size="sm">
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
}

export function getModuleIcon(module: string): LucideIcon {
  return moduleIcons[module] || moduleIcons.default;
}
