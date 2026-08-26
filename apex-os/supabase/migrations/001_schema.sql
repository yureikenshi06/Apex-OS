-- ==============================================================================
-- 001_schema.sql — Apex OS Complete Database Schema (Idempotent & Safe to Re-run)
-- ==============================================================================
-- If you want a completely fresh database reset, you can run this first:
--   DROP SCHEMA public CASCADE;
--   CREATE SCHEMA public;
--   GRANT ALL ON SCHEMA public TO postgres;
--   GRANT ALL ON SCHEMA public TO public;
-- ==============================================================================

-- Trigger Function for auto-updating updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- ==========================================
-- 1. TIMETABLE MODULE
-- ==========================================

CREATE TABLE IF NOT EXISTS timetable_blocks (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    
    day_of_week smallint check (day_of_week >= 0 and day_of_week <= 6),
    start_time time,
    end_time time,
    activity text,
    category text,
    color text,
    sort_order int
);

CREATE TABLE IF NOT EXISTS daily_planner_entries (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    
    date date,
    planned_activity text,
    actual_activity text,
    start_time time,
    end_time time,
    category text,
    priority text check (priority in ('P0', 'P1', 'P2', 'P3')),
    planned_duration_min int,
    actual_duration_min int,
    completion_status text check (completion_status in ('Completed', 'In Progress', 'Missed', 'Rescheduled')),
    energy_level smallint check (energy_level >= 1 and energy_level <= 5),
    notes text,
    reason_for_missed text,
    sort_order int
);

CREATE TABLE IF NOT EXISTS habit_tracker_daily (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    
    date date,
    wake_time time,
    sleep_time time,
    sleep_hours numeric(4,2),
    gym boolean default false,
    reading_min int default 0,
    cfa_hours numeric(5,2) default 0,
    placement_hours numeric(5,2) default 0,
    academic_hours numeric(5,2) default 0,
    content_hours numeric(5,2) default 0,
    overall_completion_pct numeric(5,2) default 0,
    daily_score numeric(5,2) default 0,
    unique(owner_id, date)
);

CREATE TABLE IF NOT EXISTS placement_tracker (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    
    company text,
    role text,
    prep_area text,
    application_status text,
    test_interview_date date,
    prep_hours_logged numeric(5,2) default 0,
    mock_interviews_done int default 0,
    networking_contact text,
    result text,
    priority text,
    notes text
);

CREATE TABLE IF NOT EXISTS academic_tracker (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    
    course_code text,
    course_name text,
    item text,
    deadline date,
    status text,
    revision_status text,
    priority text,
    hours_logged numeric(5,2) default 0,
    notes text
);

CREATE TABLE IF NOT EXISTS personal_brand_tracker (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    
    platform text,
    content_idea text,
    stage text,
    date_drafted date,
    date_published date,
    time_spent_min int default 0,
    views_engagement int default 0,
    likes_replies int default 0,
    notes text
);

CREATE TABLE IF NOT EXISTS weekly_reviews (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    
    week_of date,
    review_data jsonb default '{}',
    upcoming_events jsonb default '[]',
    top_priorities jsonb default '[]',
    unique(owner_id, week_of)
);

-- ==========================================
-- 2. FINANCE MODULE
-- ==========================================

CREATE TABLE IF NOT EXISTS transactions (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    
    date date not null,
    transaction_type text check (transaction_type in ('Income', 'Expense', 'Transfer')),
    category text,
    subcategory text,
    description text,
    amount numeric(12,2) not null,
    payment_method text,
    account_wallet text,
    merchant_payee text,
    assigned_to text default 'Self',
    need_want text check (need_want in ('Need', 'Want')),
    essential_discretionary text check (essential_discretionary in ('Essential', 'Discretionary')),
    is_recurring boolean default false,
    recurring_frequency text,
    status text default 'Completed' check (status in ('Completed', 'Pending')),
    
    paid_by_me numeric(12,2),
    my_share numeric(12,2),
    recoverable numeric(12,2) default 0,
    recovered numeric(12,2) default 0,
    outstanding numeric(12,2) default 0,
    
    notes text,
    tags text[]
);

CREATE TABLE IF NOT EXISTS budgets (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    
    category text not null,
    monthly_budget numeric(12,2) not null,
    unique(owner_id, category)
);

CREATE TABLE IF NOT EXISTS recurring_expenses (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    
    expense_name text not null,
    category text,
    subcategory text,
    amount numeric(12,2) not null,
    frequency text check (frequency in ('Monthly', 'Quarterly', 'Yearly')),
    start_date date,
    end_date date,
    payment_method text,
    account text,
    assigned_to text default 'Self',
    next_due_date date,
    is_active boolean default true,
    notes text
);

CREATE TABLE IF NOT EXISTS people_splits (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    
    person_name text not null,
    direction text check (direction in ('owed_to_me', 'i_owe')),
    description text,
    amount numeric(12,2) not null,
    settled boolean default false,
    outstanding numeric(12,2),
    notes text
);

CREATE TABLE IF NOT EXISTS net_worth_entries (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    
    month_date date not null,
    bank numeric(12,2) default 0,
    cash numeric(12,2) default 0,
    investments numeric(12,2) default 0,
    other_assets numeric(12,2) default 0,
    total_assets numeric(12,2) generated always as (coalesce(bank,0) + coalesce(cash,0) + coalesce(investments,0) + coalesce(other_assets,0)) stored,
    
    credit_card numeric(12,2) default 0,
    loans numeric(12,2) default 0,
    other_liabilities numeric(12,2) default 0,
    total_liabilities numeric(12,2) generated always as (coalesce(credit_card,0) + coalesce(loans,0) + coalesce(other_liabilities,0)) stored,
    
    net_worth numeric(12,2) generated always as (
        coalesce(bank,0) + coalesce(cash,0) + coalesce(investments,0) + coalesce(other_assets,0) -
        coalesce(credit_card,0) - coalesce(loans,0) - coalesce(other_liabilities,0)
    ) stored,
    unique(owner_id, month_date)
);

-- ==========================================
-- 3. FITNESS MODULE
-- ==========================================

CREATE TABLE IF NOT EXISTS workout_plan (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    
    day_of_week smallint check (day_of_week >= 0 and day_of_week <= 6),
    section_label text,
    exercise text,
    muscle_group text,
    sets text,
    reps text,
    target_weight_kg numeric(6,2),
    rest_sec int,
    est_duration_min int,
    notes text,
    sort_order int
);

CREATE TABLE IF NOT EXISTS workout_log (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    
    date date not null,
    workout_day text,
    exercise text,
    sets int,
    reps int,
    weight_kg numeric(6,2),
    volume numeric(10,2),
    rpe smallint check (rpe >= 1 and rpe <= 10),
    cardio_type text,
    cardio_duration_min int,
    calories_burned int,
    vs_previous text,
    is_pr boolean default false,
    notes text
);

CREATE TABLE IF NOT EXISTS fitness_habit_daily (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    
    date date not null,
    workout_completed boolean default false,
    steps_completed boolean default false,
    calories_within_target boolean default false,
    protein_target_hit boolean default false,
    water_target_hit boolean default false,
    sleep_target_hit boolean default false,
    fruits_veg_consumed boolean default false,
    no_junk_food boolean default false,
    mobility_stretching boolean default false,
    consistency_score numeric(5,2) default 0,
    workout_streak int default 0,
    unique(owner_id, date)
);

CREATE TABLE IF NOT EXISTS meal_plan_items (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    
    meal_category text,
    meal_option text,
    quantity_serving text,
    calories int,
    protein_g numeric(6,2),
    carbs_g numeric(6,2),
    fat_g numeric(6,2),
    approx_cost numeric(8,2)
);

CREATE TABLE IF NOT EXISTS food_log (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    
    date date not null,
    meal text check (meal in ('Breakfast', 'Lunch', 'Dinner', 'Snack')),
    food_item text,
    quantity text,
    calories int,
    protein_g numeric(6,2),
    carbs_g numeric(6,2),
    fat_g numeric(6,2),
    cost numeric(8,2)
);

CREATE TABLE IF NOT EXISTS grocery_log (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    
    item text,
    category text,
    quantity_purchased numeric(8,2),
    unit text,
    price numeric(8,2),
    purchase_date date,
    servings_per_purchase int
);

CREATE TABLE IF NOT EXISTS supplements (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    
    supplement_name text not null,
    dose text,
    timing text,
    frequency text,
    monthly_cost numeric(8,2),
    reason text,
    purchased boolean default false,
    remaining_qty text
);

CREATE TABLE IF NOT EXISTS body_measurements (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    
    date date not null,
    body_weight_kg numeric(6,2),
    waist_cm numeric(5,2),
    chest_cm numeric(5,2),
    arms_cm numeric(5,2),
    thighs_cm numeric(5,2),
    hips_cm numeric(5,2),
    neck_cm numeric(5,2),
    body_fat_pct numeric(4,1)
);

CREATE TABLE IF NOT EXISTS progress_photos (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    
    date date not null,
    front_photo_url text,
    side_photo_url text,
    back_photo_url text,
    notes text
);

CREATE TABLE IF NOT EXISTS cardio_steps_log (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    
    date date not null,
    steps int default 0,
    cardio_type text,
    duration_min int,
    distance_km numeric(6,2),
    calories_burned int,
    avg_heart_rate int
);

CREATE TABLE IF NOT EXISTS sleep_log (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    
    date date not null,
    bedtime time,
    wake_time time,
    total_sleep_hrs numeric(4,2),
    sleep_quality smallint check (sleep_quality >= 1 and sleep_quality <= 10),
    resting_hr int,
    energy_level smallint check (energy_level >= 1 and energy_level <= 5),
    muscle_soreness smallint check (muscle_soreness >= 1 and muscle_soreness <= 5)
);

-- ==========================================
-- 4. CFA MODULE & TASKS
-- ==========================================

CREATE TABLE IF NOT EXISTS cfa_topics (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    
    module text not null,
    chapter_topic text,
    subtopic_lo text,
    task text,
    planned_hours numeric(4,1),
    priority text check (priority in ('High', 'Medium', 'Low')),
    status text default 'Not Started' check (status in ('Completed', 'In Progress', 'Not Started')),
    completed boolean default false,
    revision_status text default 'Not Started' check (revision_status in ('Not Started', 'First Pass Done', 'Revised Once', 'Revised Twice', 'Mastered')),
    notes text,
    row_type text default 'STUDY' check (row_type in ('STUDY', 'REVIEW')),
    sort_order int,
    linked_task_id uuid
);

CREATE TABLE IF NOT EXISTS tasks (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    
    title text not null,
    category text default 'Personal',
    priority text default 'Medium' check (priority in ('High', 'Medium', 'Low')),
    deadline date,
    status text default 'To Do' check (status in ('To Do', 'In Progress', 'Done')),
    estimated_hours numeric(5,2),
    actual_hours numeric(5,2),
    linked_area text,
    notes text,
    linked_cfa_topic_id uuid
);

-- Safe Foreign Key Constraint additions
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_cfa_linked_task') THEN
        ALTER TABLE cfa_topics ADD CONSTRAINT fk_cfa_linked_task FOREIGN KEY (linked_task_id) REFERENCES tasks(id) ON DELETE SET NULL;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_task_linked_cfa') THEN
        ALTER TABLE tasks ADD CONSTRAINT fk_task_linked_cfa FOREIGN KEY (linked_cfa_topic_id) REFERENCES cfa_topics(id) ON DELETE SET NULL;
    END IF;
END $$;

CREATE TABLE IF NOT EXISTS cfa_revision_plan (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    
    revision_round text,
    module text,
    activity text,
    planned_hours numeric(4,1),
    status text default 'Not Started',
    score_result text,
    weak_areas text,
    notes text,
    sort_order int
);

CREATE TABLE IF NOT EXISTS app_settings (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    
    settings jsonb not null default '{}',
    constraint unique_user_settings unique (owner_id)
);

-- ==========================================
-- 5. ROW LEVEL SECURITY (RLS) - IDEMPOTENT
-- ==========================================

DO $$ 
DECLARE
    t_name text;
    tables text[] := array[
        'timetable_blocks', 'daily_planner_entries', 'habit_tracker_daily', 
        'placement_tracker', 'academic_tracker', 'personal_brand_tracker', 'weekly_reviews',
        'transactions', 'budgets', 'recurring_expenses', 'people_splits', 'net_worth_entries',
        'workout_plan', 'workout_log', 'fitness_habit_daily', 'meal_plan_items',
        'food_log', 'grocery_log', 'supplements', 'body_measurements', 'progress_photos',
        'cardio_steps_log', 'sleep_log', 'cfa_topics', 'cfa_revision_plan', 'tasks', 'app_settings'
    ];
BEGIN
    FOREACH t_name IN ARRAY tables LOOP
        EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY;', t_name);
        
        -- Drop existing policies if already present to avoid 42710 error
        EXECUTE format('DROP POLICY IF EXISTS "Users can view own data" ON %I;', t_name);
        EXECUTE format('DROP POLICY IF EXISTS "Users can insert own data" ON %I;', t_name);
        EXECUTE format('DROP POLICY IF EXISTS "Users can update own data" ON %I;', t_name);
        EXECUTE format('DROP POLICY IF EXISTS "Users can delete own data" ON %I;', t_name);
        
        -- Recreate policies cleanly
        EXECUTE format('CREATE POLICY "Users can view own data" ON %I FOR SELECT USING (auth.uid() = owner_id);', t_name);
        EXECUTE format('CREATE POLICY "Users can insert own data" ON %I FOR INSERT WITH CHECK (auth.uid() = owner_id);', t_name);
        EXECUTE format('CREATE POLICY "Users can update own data" ON %I FOR UPDATE USING (auth.uid() = owner_id);', t_name);
        EXECUTE format('CREATE POLICY "Users can delete own data" ON %I FOR DELETE USING (auth.uid() = owner_id);', t_name);
    END LOOP;
END $$;

-- ==========================================
-- 6. INDEXES - IDEMPOTENT
-- ==========================================

CREATE INDEX IF NOT EXISTS idx_daily_planner_entries_owner_date ON daily_planner_entries(owner_id, date);
CREATE INDEX IF NOT EXISTS idx_habit_tracker_daily_owner_date ON habit_tracker_daily(owner_id, date);
CREATE INDEX IF NOT EXISTS idx_placement_tracker_owner_date ON placement_tracker(owner_id, test_interview_date);
CREATE INDEX IF NOT EXISTS idx_academic_tracker_owner_date ON academic_tracker(owner_id, deadline);
CREATE INDEX IF NOT EXISTS idx_weekly_reviews_owner_date ON weekly_reviews(owner_id, week_of);
CREATE INDEX IF NOT EXISTS idx_transactions_owner_date ON transactions(owner_id, date);
CREATE INDEX IF NOT EXISTS idx_net_worth_entries_owner_date ON net_worth_entries(owner_id, month_date);
CREATE INDEX IF NOT EXISTS idx_workout_log_owner_date ON workout_log(owner_id, date);
CREATE INDEX IF NOT EXISTS idx_fitness_habit_daily_owner_date ON fitness_habit_daily(owner_id, date);
CREATE INDEX IF NOT EXISTS idx_food_log_owner_date ON food_log(owner_id, date);
CREATE INDEX IF NOT EXISTS idx_grocery_log_owner_date ON grocery_log(owner_id, purchase_date);
CREATE INDEX IF NOT EXISTS idx_body_measurements_owner_date ON body_measurements(owner_id, date);
CREATE INDEX IF NOT EXISTS idx_progress_photos_owner_date ON progress_photos(owner_id, date);
CREATE INDEX IF NOT EXISTS idx_cardio_steps_log_owner_date ON cardio_steps_log(owner_id, date);
CREATE INDEX IF NOT EXISTS idx_sleep_log_owner_date ON sleep_log(owner_id, date);
CREATE INDEX IF NOT EXISTS idx_tasks_owner_status ON tasks(owner_id, status);
CREATE INDEX IF NOT EXISTS idx_cfa_topics_owner_status ON cfa_topics(owner_id, status);
CREATE INDEX IF NOT EXISTS idx_transactions_owner_category ON transactions(owner_id, category);

-- ==========================================
-- 7. AUTO-UPDATING TIMESTAMP TRIGGERS
-- ==========================================

DO $$ 
DECLARE
    t_name text;
    tables text[] := array[
        'timetable_blocks', 'daily_planner_entries', 'habit_tracker_daily', 
        'placement_tracker', 'academic_tracker', 'personal_brand_tracker', 'weekly_reviews',
        'transactions', 'budgets', 'recurring_expenses', 'people_splits', 'net_worth_entries',
        'workout_plan', 'workout_log', 'fitness_habit_daily', 'meal_plan_items',
        'food_log', 'grocery_log', 'supplements', 'body_measurements', 'progress_photos',
        'cardio_steps_log', 'sleep_log', 'cfa_topics', 'cfa_revision_plan', 'tasks', 'app_settings'
    ];
BEGIN
    FOREACH t_name IN ARRAY tables LOOP
        EXECUTE format('DROP TRIGGER IF EXISTS set_updated_at ON %I;', t_name);
        EXECUTE format('
            CREATE TRIGGER set_updated_at
            BEFORE UPDATE ON %I
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
        ', t_name);
    END LOOP;
END $$;
