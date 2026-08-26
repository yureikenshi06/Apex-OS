// ============================================================================
// Apex OS — Shared TypeScript types matching the Supabase DB schema
// Every table type lives here. API functions and components import from this file.
// ============================================================================

// ─── Base row type (every table has these) ───────────────────────────────────
export interface BaseRow {
  id: string;
  owner_id: string;
  created_at?: string;
  updated_at?: string;
}

// ─── Timetable Module ────────────────────────────────────────────────────────

export interface TimetableBlock extends BaseRow {
  day_of_week: number; // 0=Sun, 1=Mon, ..., 6=Sat
  start_time: string;
  end_time: string;
  activity: string;
  category: string;
  color?: string | null;
  sort_order?: number;
}

export type CompletionStatus = 'Completed' | 'In Progress' | 'Missed' | 'Rescheduled';
export type PriorityLevel = 'P0' | 'P1' | 'P2' | 'P3';

export interface DailyPlannerEntry extends BaseRow {
  date: string;
  planned_activity: string;
  actual_activity?: string | null;
  start_time: string;
  end_time: string;
  category: string;
  priority: PriorityLevel;
  planned_duration_min?: number;
  actual_duration_min?: number | null;
  completion_status?: CompletionStatus | null;
  energy_level?: number | null; // 1-5
  notes?: string | null;
  reason_for_missed?: string | null;
  sort_order?: number;
}

export interface HabitTrackerDaily extends BaseRow {
  date: string;
  wake_time?: string | null;
  sleep_time?: string | null;
  sleep_hours?: number | null;
  gym?: boolean;
  reading_min?: number;
  cfa_hours?: number;
  placement_hours?: number;
  academic_hours?: number;
  content_hours?: number;
  overall_completion_pct?: number;
  daily_score?: number;
}

export type ApplicationStatus =
  | 'Not Applied'
  | 'Applied'
  | 'Test Scheduled'
  | 'Interview Scheduled'
  | 'Offer'
  | 'Rejected'
  | 'Waitlisted';

export interface PlacementTrackerItem extends BaseRow {
  company: string;
  role?: string | null;
  prep_area?: string | null;
  application_status: string;
  test_interview_date?: string | null;
  prep_hours_logged?: number;
  mock_interviews_done?: number;
  networking_contact?: string | null;
  result?: string | null;
  priority: string;
  notes?: string | null;
}
export type PlacementTracker = PlacementTrackerItem;

export interface AcademicTrackerItem extends BaseRow {
  course_code: string;
  course_name?: string | null;
  item?: string | null;
  deadline?: string | null;
  status: string;
  revision_status?: string | null;
  priority: string;
  hours_logged?: number;
  notes?: string | null;
}
export type AcademicTracker = AcademicTrackerItem;

export type ContentStage = 'Idea' | 'Drafting' | 'Editing' | 'Ready' | 'Published';

export interface PersonalBrandItem extends BaseRow {
  platform: string;
  content_idea: string;
  stage: string;
  date_drafted?: string | null;
  date_published?: string | null;
  time_spent_min?: number;
  views_engagement?: number;
  likes_replies?: number;
  notes?: string | null;
}
export type PersonalBrandTracker = PersonalBrandItem;

export interface WeeklyReview extends BaseRow {
  week_of: string;
  review_data?: Record<string, string>;
  upcoming_events?: Array<{
    event: string;
    date: string;
    type: string;
    prep_needed: boolean;
    notes: string;
  }>;
  top_priorities?: string[];
}

// ─── Finance Module ──────────────────────────────────────────────────────────

export type TransactionType = 'Income' | 'Expense' | 'Transfer';
export type NeedWant = 'Need' | 'Want';
export type EssentialDiscretionary = 'Essential' | 'Discretionary';
export type TransactionStatus = 'Completed' | 'Pending';
export type RecurringFrequency = 'Monthly' | 'Quarterly' | 'Yearly';

export interface Transaction extends BaseRow {
  date: string;
  transaction_type: TransactionType;
  category?: string | null;
  subcategory?: string | null;
  description: string;
  amount: number;
  payment_method?: string | null;
  account_wallet?: string | null;
  merchant_payee?: string | null;
  assigned_to?: string;
  need_want?: NeedWant | null;
  essential_discretionary?: EssentialDiscretionary | null;
  is_recurring?: boolean;
  recurring_frequency?: RecurringFrequency | null;
  status?: TransactionStatus;
  paid_by_me?: number | null;
  my_share?: number | null;
  recoverable?: number;
  recovered?: number;
  outstanding?: number;
  notes?: string | null;
  tags?: string[] | null;
}

export interface Budget extends BaseRow {
  category: string;
  monthly_budget: number;
}

export interface RecurringExpense extends BaseRow {
  expense_name: string;
  category?: string;
  subcategory?: string | null;
  amount: number;
  frequency: RecurringFrequency;
  start_date: string;
  end_date?: string | null;
  payment_method?: string | null;
  account?: string | null;
  assigned_to?: string;
  next_due_date?: string | null;
  is_active?: boolean;
  notes?: string | null;
}

export type SplitDirection = 'owed_to_me' | 'i_owe';

export interface PeopleSplit extends BaseRow {
  person_name: string;
  direction: SplitDirection;
  description?: string | null;
  amount: number;
  settled: boolean;
  outstanding: number;
  notes?: string | null;
}

export interface NetWorthEntry extends BaseRow {
  month_date: string;
  bank?: number;
  cash?: number;
  investments?: number;
  other_assets?: number;
  total_assets?: number;    // generated column
  credit_card?: number;
  loans?: number;
  other_liabilities?: number;
  total_liabilities?: number; // generated column
  net_worth?: number;         // generated column
}

// ─── Fitness Module ──────────────────────────────────────────────────────────

export interface WorkoutPlan extends BaseRow {
  day_of_week: number;
  section_label?: string | null;
  exercise: string;
  muscle_group?: string | null;
  sets?: string;
  reps?: string;
  target_weight_kg?: number | null;
  rest_sec?: number | null;
  est_duration_min?: number | null;
  notes?: string | null;
  sort_order?: number;
}
export type WorkoutPlanItem = WorkoutPlan;

export interface WorkoutLog extends BaseRow {
  date: string;
  workout_day?: string | null;
  exercise: string;
  sets?: number | null;
  reps?: number | null;
  weight_kg?: number | null;
  volume?: number | null;
  rpe?: number | null;
  cardio_type?: string | null;
  cardio_duration_min?: number | null;
  calories_burned?: number | null;
  vs_previous?: string | null;
  is_pr?: boolean;
  notes?: string | null;
}

export interface FitnessHabitDaily extends BaseRow {
  date: string;
  workout_completed?: boolean;
  steps_completed?: boolean;
  calories_within_target?: boolean;
  protein_target_hit?: boolean;
  water_target_hit?: boolean;
  sleep_target_hit?: boolean;
  fruits_veg_consumed?: boolean;
  no_junk_food?: boolean;
  mobility_stretching?: boolean;
  consistency_score?: number;
  workout_streak?: number;
}

export type MealCategory = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Pre-Workout' | 'Post-Workout';

export interface MealPlanItem extends BaseRow {
  meal_category: string;
  meal_option: string;
  quantity_serving?: string | null;
  calories?: number;
  protein_g?: number;
  carbs_g?: number;
  fat_g?: number;
  approx_cost?: number;
}

export interface FoodLog extends BaseRow {
  date: string;
  meal: string;
  food_item: string;
  quantity?: string | null;
  calories?: number;
  protein_g?: number;
  carbs_g?: number;
  fat_g?: number;
  cost?: number;
}

export interface GroceryLog extends BaseRow {
  item: string;
  category?: string | null;
  quantity_purchased?: number;
  unit?: string | null;
  price?: number;
  purchase_date: string;
  servings_per_purchase?: number | null;
}

export interface Supplement extends BaseRow {
  supplement_name: string;
  dose?: string | null;
  timing?: string | null;
  frequency?: string | null;
  monthly_cost?: number;
  reason?: string | null;
  purchased?: boolean;
  remaining_qty?: string | null;
}

export interface BodyMeasurement extends BaseRow {
  date: string;
  body_weight_kg: number;
  waist_cm?: number | null;
  chest_cm?: number | null;
  arms_cm?: number | null;
  thighs_cm?: number | null;
  hips_cm?: number | null;
  neck_cm?: number | null;
  body_fat_pct?: number | null;
}

export interface ProgressPhoto extends BaseRow {
  date: string;
  front_photo_url?: string | null;
  side_photo_url?: string | null;
  back_photo_url?: string | null;
  notes?: string | null;
}

export interface CardioStepsLog extends BaseRow {
  date: string;
  steps?: number | null;
  cardio_type?: string | null;
  duration_min?: number | null;
  distance_km?: number | null;
  calories_burned?: number | null;
  avg_heart_rate?: number | null;
}

export interface SleepLog extends BaseRow {
  date: string;
  bedtime?: string | null;
  wake_time?: string | null;
  total_sleep_hrs?: number | null;
  sleep_quality?: number | null; // 1-10
  resting_hr?: number | null;
  energy_level?: number | null;  // 1-10
  muscle_soreness?: number | null; // 1-10
}

// ─── CFA Module ──────────────────────────────────────────────────────────────

export type CFAModule =
  | 'Quantitative Methods'
  | 'Economics'
  | 'Corporate Finance'
  | 'Financial Statement Analysis'
  | 'Equities'
  | 'Fixed Income'
  | 'Derivatives'
  | 'Alternative Investments'
  | 'Portfolio Construction'
  | 'Ethical and Professional Standards';

export type CFAPriority = 'High' | 'Medium' | 'Low';
export type CFAStatus = 'Completed' | 'In Progress' | 'Not Started';
export type RevisionStatus =
  | 'Not Started'
  | 'First Pass Done'
  | 'Revised Once'
  | 'Revised Twice'
  | 'Mastered';
export type RowType = 'STUDY' | 'REVIEW';

export interface CFATopic extends BaseRow {
  module: CFAModule | string;
  chapter_topic: string;
  subtopic_lo?: string | null;
  task?: string | null;
  planned_hours?: number;
  priority: CFAPriority | string;
  status: CFAStatus | string;
  completed: boolean;
  revision_status: RevisionStatus | string;
  notes?: string | null;
  row_type: RowType | string;
  sort_order?: number;
  linked_task_id?: string | null;
}

export interface CFARevisionPlan extends BaseRow {
  revision_round: string;
  module: string;
  activity: string;
  planned_hours?: number;
  status: string;
  score_result?: string | null;
  weak_areas?: string | null;
  notes?: string | null;
  sort_order?: number;
}

// ─── Shared ──────────────────────────────────────────────────────────────────

export type TaskCategory =
  | 'Personal'
  | 'CFA'
  | 'Placement'
  | 'Academic'
  | 'Fitness'
  | 'Finance'
  | 'Other';
export type TaskPriority = 'High' | 'Medium' | 'Low';
export type TaskStatus = 'To Do' | 'In Progress' | 'Done';

export interface Task extends BaseRow {
  title: string;
  category?: TaskCategory | string;
  priority?: TaskPriority | string;
  deadline?: string | null;
  status?: TaskStatus | string;
  estimated_hours?: number | null;
  actual_hours?: number | null;
  linked_area?: string | null;
  notes?: string | null;
  linked_cfa_topic_id?: string | null;
}

export interface AppSettingsRow extends BaseRow {
  settings: Record<string, unknown>;
}

export interface AppSettings {
  id?: string;
  owner_id?: string;
  theme?: string;
  sidebarCollapsed?: boolean;
  [key: string]: unknown;
}

// ─── Insert/Update types ───────────────────────────────────────────────────

type InsertFields = 'id' | 'created_at' | 'updated_at';
type GeneratedNetWorthFields = 'total_assets' | 'total_liabilities' | 'net_worth';

export type TimetableBlockInsert = Omit<TimetableBlock, InsertFields>;
export type TimetableBlockUpdate = Partial<TimetableBlockInsert>;

export type DailyPlannerEntryInsert = Omit<DailyPlannerEntry, InsertFields>;
export type DailyPlannerEntryUpdate = Partial<DailyPlannerEntryInsert>;

export type HabitTrackerDailyInsert = Omit<HabitTrackerDaily, InsertFields>;
export type HabitTrackerDailyUpdate = Partial<HabitTrackerDailyInsert>;

export type PlacementTrackerItemInsert = Omit<PlacementTrackerItem, InsertFields>;
export type PlacementTrackerItemUpdate = Partial<PlacementTrackerItemInsert>;
export type PlacementTrackerInsert = PlacementTrackerItemInsert;
export type PlacementTrackerUpdate = PlacementTrackerItemUpdate;

export type AcademicTrackerItemInsert = Omit<AcademicTrackerItem, InsertFields>;
export type AcademicTrackerItemUpdate = Partial<AcademicTrackerItemInsert>;
export type AcademicTrackerInsert = AcademicTrackerItemInsert;
export type AcademicTrackerUpdate = AcademicTrackerItemUpdate;

export type PersonalBrandItemInsert = Omit<PersonalBrandItem, InsertFields>;
export type PersonalBrandItemUpdate = Partial<PersonalBrandItemInsert>;
export type PersonalBrandTrackerInsert = PersonalBrandItemInsert;
export type PersonalBrandTrackerUpdate = PersonalBrandItemUpdate;

export type WeeklyReviewInsert = Omit<WeeklyReview, InsertFields>;
export type WeeklyReviewUpdate = Partial<WeeklyReviewInsert>;

export type TransactionInsert = Omit<Transaction, InsertFields>;
export type TransactionUpdate = Partial<TransactionInsert>;

export type BudgetInsert = Omit<Budget, InsertFields>;
export type BudgetUpdate = Partial<BudgetInsert>;

export type RecurringExpenseInsert = Omit<RecurringExpense, InsertFields>;
export type RecurringExpenseUpdate = Partial<RecurringExpenseInsert>;

export type PeopleSplitInsert = Omit<PeopleSplit, InsertFields>;
export type PeopleSplitUpdate = Partial<PeopleSplitInsert>;

export type NetWorthEntryInsert = Omit<NetWorthEntry, InsertFields | GeneratedNetWorthFields>;
export type NetWorthEntryUpdate = Partial<NetWorthEntryInsert>;

export type WorkoutPlanInsert = Omit<WorkoutPlan, InsertFields>;
export type WorkoutPlanUpdate = Partial<WorkoutPlanInsert>;
export type WorkoutPlanItemInsert = WorkoutPlanInsert;
export type WorkoutPlanItemUpdate = WorkoutPlanUpdate;

export type WorkoutLogInsert = Omit<WorkoutLog, InsertFields>;
export type WorkoutLogUpdate = Partial<WorkoutLogInsert>;

export type FitnessHabitDailyInsert = Omit<FitnessHabitDaily, InsertFields>;
export type FitnessHabitDailyUpdate = Partial<FitnessHabitDailyInsert>;

export type MealPlanItemInsert = Omit<MealPlanItem, InsertFields>;
export type MealPlanItemUpdate = Partial<MealPlanItemInsert>;

export type FoodLogInsert = Omit<FoodLog, InsertFields>;
export type FoodLogUpdate = Partial<FoodLogInsert>;

export type GroceryLogInsert = Omit<GroceryLog, InsertFields>;
export type GroceryLogUpdate = Partial<GroceryLogInsert>;

export type SupplementInsert = Omit<Supplement, InsertFields>;
export type SupplementUpdate = Partial<SupplementInsert>;

export type BodyMeasurementInsert = Omit<BodyMeasurement, InsertFields>;
export type BodyMeasurementUpdate = Partial<BodyMeasurementInsert>;

export type ProgressPhotoInsert = Omit<ProgressPhoto, InsertFields>;
export type ProgressPhotoUpdate = Partial<ProgressPhotoInsert>;

export type CardioStepsLogInsert = Omit<CardioStepsLog, InsertFields>;
export type CardioStepsLogUpdate = Partial<CardioStepsLogInsert>;

export type SleepLogInsert = Omit<SleepLog, InsertFields>;
export type SleepLogUpdate = Partial<SleepLogInsert>;

export type CFATopicInsert = Omit<CFATopic, InsertFields>;
export type CFATopicUpdate = Partial<CFATopicInsert>;

export type CFARevisionPlanInsert = Omit<CFARevisionPlan, InsertFields>;
export type CFARevisionPlanUpdate = Partial<CFARevisionPlanInsert>;

export type TaskInsert = Omit<Task, InsertFields>;
export type TaskUpdate = Partial<TaskInsert>;

export type AppSettingsInsert = Omit<AppSettingsRow, InsertFields>;
export type AppSettingsUpdate = Partial<AppSettingsInsert>;

// ─── Supabase Database schema interface ──────────────────────────────────────

export interface Database {
  public: {
    Tables: {
      timetable_blocks: { Row: TimetableBlock; Insert: TimetableBlockInsert; Update: TimetableBlockUpdate };
      daily_planner_entries: { Row: DailyPlannerEntry; Insert: DailyPlannerEntryInsert; Update: DailyPlannerEntryUpdate };
      habit_tracker_daily: { Row: HabitTrackerDaily; Insert: HabitTrackerDailyInsert; Update: HabitTrackerDailyUpdate };
      placement_tracker: { Row: PlacementTrackerItem; Insert: PlacementTrackerItemInsert; Update: PlacementTrackerItemUpdate };
      academic_tracker: { Row: AcademicTrackerItem; Insert: AcademicTrackerItemInsert; Update: AcademicTrackerItemUpdate };
      personal_brand_tracker: { Row: PersonalBrandItem; Insert: PersonalBrandItemInsert; Update: PersonalBrandItemUpdate };
      weekly_reviews: { Row: WeeklyReview; Insert: WeeklyReviewInsert; Update: WeeklyReviewUpdate };
      transactions: { Row: Transaction; Insert: TransactionInsert; Update: TransactionUpdate };
      budgets: { Row: Budget; Insert: BudgetInsert; Update: BudgetUpdate };
      recurring_expenses: { Row: RecurringExpense; Insert: RecurringExpenseInsert; Update: RecurringExpenseUpdate };
      people_splits: { Row: PeopleSplit; Insert: PeopleSplitInsert; Update: PeopleSplitUpdate };
      net_worth_entries: { Row: NetWorthEntry; Insert: NetWorthEntryInsert; Update: NetWorthEntryUpdate };
      workout_plan: { Row: WorkoutPlan; Insert: WorkoutPlanInsert; Update: WorkoutPlanUpdate };
      workout_log: { Row: WorkoutLog; Insert: WorkoutLogInsert; Update: WorkoutLogUpdate };
      fitness_habit_daily: { Row: FitnessHabitDaily; Insert: FitnessHabitDailyInsert; Update: FitnessHabitDailyUpdate };
      meal_plan_items: { Row: MealPlanItem; Insert: MealPlanItemInsert; Update: MealPlanItemUpdate };
      food_log: { Row: FoodLog; Insert: FoodLogInsert; Update: FoodLogUpdate };
      grocery_log: { Row: GroceryLog; Insert: GroceryLogInsert; Update: GroceryLogUpdate };
      supplements: { Row: Supplement; Insert: SupplementInsert; Update: SupplementUpdate };
      body_measurements: { Row: BodyMeasurement; Insert: BodyMeasurementInsert; Update: BodyMeasurementUpdate };
      progress_photos: { Row: ProgressPhoto; Insert: ProgressPhotoInsert; Update: ProgressPhotoUpdate };
      cardio_steps_log: { Row: CardioStepsLog; Insert: CardioStepsLogInsert; Update: CardioStepsLogUpdate };
      sleep_log: { Row: SleepLog; Insert: SleepLogInsert; Update: SleepLogUpdate };
      cfa_topics: { Row: CFATopic; Insert: CFATopicInsert; Update: CFATopicUpdate };
      cfa_revision_plan: { Row: CFARevisionPlan; Insert: CFARevisionPlanInsert; Update: CFARevisionPlanUpdate };
      tasks: { Row: Task; Insert: TaskInsert; Update: TaskUpdate };
      app_settings: { Row: AppSettingsRow; Insert: AppSettingsInsert; Update: AppSettingsUpdate };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
