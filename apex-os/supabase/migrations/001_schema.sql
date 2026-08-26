-- 001_schema.sql
-- Initial Schema for Apex OS

-- ==========================================
-- Trigger Function for updated_at
-- ==========================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- ==========================================
-- TIMETABLE MODULE
-- ==========================================

CREATE TABLE timetable_blocks (
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

CREATE TABLE daily_planner_entries (
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

CREATE TABLE habit_tracker_daily (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    
    date date,
    wake_time time,
    sleep_time time,
    sleep_hours numeric(4,2),
    gym boolean,
    reading_min int,
    cfa_hours numeric(5,2),
    placement_hours numeric(5,2),
    academic_hours numeric(5,2),
    content_hours numeric(5,2),
    overall_completion_pct numeric(5,2),
    daily_score numeric(5,2),
    unique(owner_id, date)
);

CREATE TABLE placement_tracker (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    
    company text,
    role text,
    prep_area text,
    application_status text,
    test_interview_date date,
    prep_hours_logged numeric(5,2),
    mock_interviews_done int,
    networking_contact text,
    result text,
    priority text,
    notes text
);

CREATE TABLE academic_tracker (
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
    hours_logged numeric(5,2),
    notes text
);

CREATE TABLE personal_brand_tracker (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    
    platform text,
    content_idea text,
    stage text,
    date_drafted date,
    date_published date,
    time_spent_min int,
    views_engagement int,
    likes_replies int,
    notes text
);

CREATE TABLE weekly_reviews (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    
    week_of date,
    review_data jsonb default '{}',
    upcoming_events jsonb default '[]',
    top_priorities jsonb default '[]'
);

-- ==========================================
-- FINANCE MODULE
-- ==========================================

CREATE TABLE transactions (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    
    date date,
    transaction_type text check (transaction_type in ('Income', 'Expense', 'Transfer')),
    category text,
    subcategory text,
    description text,
    amount numeric(12,2),
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

CREATE TABLE budgets (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    
    category text,
    monthly_budget numeric(12,2),
    unique(owner_id, category)
);

CREATE TABLE recurring_expenses (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    
    expense_name text,
    category text,
    subcategory text,
    amount numeric(12,2),
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

CREATE TABLE people_splits (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    
    person_name text,
    direction text check (direction in ('owed_to_me', 'i_owe')),
    description text,
    amount numeric(12,2),
    settled boolean default false,
    outstanding numeric(12,2),
    notes text
);

CREATE TABLE net_worth_entries (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    
    month_date date,
    bank numeric(12,2) default 0,
    cash numeric(12,2) default 0,
    investments numeric(12,2) default 0,
    other_assets numeric(12,2) default 0,
    total_assets numeric(12,2) generated always as (bank + cash + investments + other_assets) stored,
    credit_card numeric(12,2) default 0,
    loans numeric(12,2) default 0,
    other_liabilities numeric(12,2) default 0,
    total_liabilities numeric(12,2) generated always as (credit_card + loans + other_liabilities) stored,
    net_worth numeric(12,2) generated always as (bank + cash + investments + other_assets - credit_card - loans - other_liabilities) stored
);

-- ==========================================
-- FITNESS MODULE
-- ==========================================

CREATE TABLE workout_plan (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    
    day_of_week smallint,
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

CREATE TABLE workout_log (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    
    date date,
    workout_day text,
    exercise text,
    sets int,
    reps int,
    weight_kg numeric(6,2),
    volume numeric(10,2),
    rpe smallint,
    cardio_type text,
    cardio_duration_min int,
    calories_burned int,
    vs_previous text,
    is_pr boolean default false,
    notes text
);

CREATE TABLE fitness_habit_daily (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    
    date date,
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

CREATE TABLE meal_plan_items (
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

CREATE TABLE food_log (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    
    date date,
    meal text check (meal in ('Breakfast', 'Lunch', 'Dinner', 'Snack')),
    food_item text,
    quantity text,
    calories int,
    protein_g numeric(6,2),
    carbs_g numeric(6,2),
    fat_g numeric(6,2),
    cost numeric(8,2)
);

CREATE TABLE grocery_log (
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

CREATE TABLE supplements (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    
    supplement_name text,
    dose text,
    timing text,
    frequency text,
    monthly_cost numeric(8,2),
    reason text,
    purchased boolean default false,
    remaining_qty text
);

CREATE TABLE body_measurements (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    
    date date,
    body_weight_kg numeric(6,2),
    waist_cm numeric(5,2),
    chest_cm numeric(5,2),
    arms_cm numeric(5,2),
    thighs_cm numeric(5,2),
    hips_cm numeric(5,2),
    neck_cm numeric(5,2),
    body_fat_pct numeric(4,1)
);

CREATE TABLE progress_photos (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    
    date date,
    front_photo_url text,
    side_photo_url text,
    back_photo_url text,
    notes text
);

CREATE TABLE cardio_steps_log (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    
    date date,
    steps int,
    cardio_type text,
    duration_min int,
    distance_km numeric(6,2),
    calories_burned int,
    avg_heart_rate int
);

CREATE TABLE sleep_log (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    
    date date,
    bedtime time,
    wake_time time,
    total_sleep_hrs numeric(4,2),
    sleep_quality smallint,
    resting_hr int,
    energy_level smallint,
    muscle_soreness smallint
);

-- ==========================================
-- CFA MODULE & SHARED (CIRCULAR REFS)
-- ==========================================

-- Create basic tables without foreign keys
CREATE TABLE cfa_topics (
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

CREATE TABLE tasks (
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

-- Add foreign keys for circular reference
ALTER TABLE cfa_topics ADD CONSTRAINT fk_cfa_linked_task FOREIGN KEY (linked_task_id) REFERENCES tasks(id) ON DELETE SET NULL;
ALTER TABLE tasks ADD CONSTRAINT fk_task_linked_cfa FOREIGN KEY (linked_cfa_topic_id) REFERENCES cfa_topics(id) ON DELETE SET NULL;

CREATE TABLE cfa_revision_plan (
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

CREATE TABLE app_settings (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    
    settings jsonb not null default '{}'
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS)
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
        EXECUTE format('CREATE POLICY "Users can view own data" ON %I FOR SELECT USING (auth.uid() = owner_id);', t_name);
        EXECUTE format('CREATE POLICY "Users can insert own data" ON %I FOR INSERT WITH CHECK (auth.uid() = owner_id);', t_name);
        EXECUTE format('CREATE POLICY "Users can update own data" ON %I FOR UPDATE USING (auth.uid() = owner_id);', t_name);
        EXECUTE format('CREATE POLICY "Users can delete own data" ON %I FOR DELETE USING (auth.uid() = owner_id);', t_name);
    END LOOP;
END $$;

-- ==========================================
-- INDEXES
-- ==========================================

-- Date-indexed tables (owner_id, date/week_of/month_date/purchase_date/deadline/test_interview_date)
CREATE INDEX idx_daily_planner_entries_owner_date ON daily_planner_entries(owner_id, date);
CREATE INDEX idx_habit_tracker_daily_owner_date ON habit_tracker_daily(owner_id, date);
CREATE INDEX idx_placement_tracker_owner_date ON placement_tracker(owner_id, test_interview_date);
CREATE INDEX idx_academic_tracker_owner_date ON academic_tracker(owner_id, deadline);
CREATE INDEX idx_weekly_reviews_owner_date ON weekly_reviews(owner_id, week_of);
CREATE INDEX idx_transactions_owner_date ON transactions(owner_id, date);
CREATE INDEX idx_net_worth_entries_owner_date ON net_worth_entries(owner_id, month_date);
CREATE INDEX idx_workout_log_owner_date ON workout_log(owner_id, date);
CREATE INDEX idx_fitness_habit_daily_owner_date ON fitness_habit_daily(owner_id, date);
CREATE INDEX idx_food_log_owner_date ON food_log(owner_id, date);
CREATE INDEX idx_grocery_log_owner_date ON grocery_log(owner_id, purchase_date);
CREATE INDEX idx_body_measurements_owner_date ON body_measurements(owner_id, date);
CREATE INDEX idx_progress_photos_owner_date ON progress_photos(owner_id, date);
CREATE INDEX idx_cardio_steps_log_owner_date ON cardio_steps_log(owner_id, date);
CREATE INDEX idx_sleep_log_owner_date ON sleep_log(owner_id, date);

-- Status-indexed tables
CREATE INDEX idx_tasks_owner_status ON tasks(owner_id, status);
CREATE INDEX idx_cfa_topics_owner_status ON cfa_topics(owner_id, status);

-- Category-indexed table
CREATE INDEX idx_transactions_owner_category ON transactions(owner_id, category);

-- ==========================================
-- UPDATED_AT TRIGGERS
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
        EXECUTE format('
            CREATE TRIGGER set_updated_at
            BEFORE UPDATE ON %I
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
        ', t_name);
    END LOOP;
END $$;
