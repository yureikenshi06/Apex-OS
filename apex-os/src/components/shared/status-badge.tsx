import { Badge } from '@/components/ui/badge';
import type { BadgeProps } from '@/components/ui/badge';

type StatusType = 
  | 'Completed' | 'In Progress' | 'Missed' | 'Rescheduled' | 'Not Started'
  | 'To Do' | 'Done'
  | 'Under Budget' | 'Near Limit' | 'Over Budget'
  | 'High' | 'Medium' | 'Low'
  | 'P0' | 'P1' | 'P2' | 'P3'
  | 'Income' | 'Expense' | 'Transfer'
  | 'Need' | 'Want'
  | 'Essential' | 'Discretionary'
  | 'First Pass Done' | 'Revised Once' | 'Revised Twice' | 'Mastered'
  | 'Active' | 'Inactive'
  | 'Pending'
  | 'Yes' | 'No'
  | string;

const statusConfig: Record<string, BadgeProps['variant']> = {
  // Completion
  'Completed': 'success',
  'Done': 'success',
  'Mastered': 'success',
  'In Progress': 'warning',
  'To Do': 'secondary',
  'Not Started': 'secondary',
  'Missed': 'destructive',
  'Rescheduled': 'info',
  
  // Budget
  'Under Budget': 'success',
  'Near Limit': 'warning',
  'Over Budget': 'destructive',
  
  // Priority
  'High': 'destructive',
  'P0': 'outline',
  'P1': 'destructive',
  'Medium': 'warning',
  'P2': 'warning',
  'Low': 'secondary',
  'P3': 'secondary',
  
  // Finance types
  'Income': 'success',
  'Expense': 'destructive',
  'Transfer': 'info',
  'Need': 'info',
  'Want': 'warning',
  'Essential': 'info',
  'Discretionary': 'warning',
  
  // Revision
  'First Pass Done': 'info',
  'Revised Once': 'warning',
  'Revised Twice': 'success',
  
  // Active
  'Active': 'success',
  'Inactive': 'secondary',
  'Pending': 'warning',
  
  // Boolean
  'Yes': 'success',
  'No': 'secondary',
};

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const variant = statusConfig[status] || 'outline';
  return (
    <Badge variant={variant} className={className}>
      {status}
    </Badge>
  );
}
