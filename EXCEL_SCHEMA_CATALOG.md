# Comprehensive Excel Schema & Data Catalog

This document contains the complete extracted schema, column definitions, sheet layouts, and sample data for all 4 Excel workbooks.


==========================================================================================
# WORKBOOK: Prakhar_Super_Timetable.xlsx
**File Path:** `c:\Users\singh\Downloads\Prakhar_Super_Timetable.xlsx`  
**Total Sheets:** `13`  
**Sheet List:** `Instructions`, `Dashboard`, `Settings`, `Master Timetable`, `Daily Planner`, `Task Tracker`, `CFA Tracker`, `Placement Tracker`, `Academic Tracker`, `Fitness Tracker`, `Personal Brand`, `Habit Tracker`, `Weekly Review`
==========================================================================================

### 1. Sheet: `Instructions`
- **Dimensions:** 29 rows × 6 columns (Non-empty rows: 23)
- **Merged Cell Ranges (1):** A1:F1

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | HOW TO USE THIS WORKBOOK EVERY DAY |
| **Row 3** | *(empty)* `|` Every morning (2 minutes) |
| **Row 4** | *(empty)* `|` 1. Open Daily Planner. Today's rows are already there (planned block by block) — no need to add anything. |
| **Row 5** | *(empty)* `|` 2. Glance at Dashboard for yesterday's Daily Score and today's Overload status. |
| **Row 7** | *(empty)* `|` Through the day |
| **Row 8** | *(empty)* `|` 3. As you complete (or skip) each block, fill in the yellow cells on Daily Planner: Actual Activity, Actual Duration, Completion Status (dropdown), Energy Level (dropdown), Notes. |
| **Row 9** | *(empty)* `|` 4. If a task changes shape entirely (e.g. an interview gets scheduled over a Placement Flex Block), just overwrite Actual Activity and Category for that row — everything downstream recalculates. |
| **Row 11** | *(empty)* `|` Once a week — Saturday 20:00-21:00 Weekly Planning Session |
| *...* | *(15 more non-empty rows)* |

------------------------------------------------------------

### 2. Sheet: `Dashboard`
- **Dimensions:** 46 rows × 12 columns (Non-empty rows: 22)
- **Merged Cell Ranges (17):** A4:B4, G4:H4, A2:L2, E4:F4, I4:J4, A19:L19 ...

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | PRAKHAR'S SUPER TIMETABLE — WEEKLY DASHBOARD |
| **Row 2** | Auto-updates from Daily Planner, Habit Tracker, Fitness Tracker & CFA/Placement/Academic Trackers. Week of 24-30 Aug 2026. |
| **Row 4** | Overall Completion `|` *(empty)* `|` CFA Hours `|` *(empty)* `|` Placement Hours `|` *(empty)* `|` Academic Hours `|` *(empty)* `|` Gym Sessions `|` *(empty)* `|` Avg Sleep Hrs |
| **Row 5** | 0 `|` *(empty)* `|` 13.75 `|` *(empty)* `|` 9.5 `|` *(empty)* `|` 6.25 `|` *(empty)* `|` 0 `|` *(empty)* `|` 0 |
| **Row 9** | OVERLOAD INDICATOR (this week, by day) |
| **Row 10** | Date `|` Day `|` Fixed Hrs (class+travel+meals) `|` Deep-Work Hrs (CFA+Placement+Academic) `|` Total Scheduled Hrs `|` Status |
| **Row 11** | 2026-08-24 `|` Mon `|` 7.25 `|` 4.917 `|` 12.17 `|` Overloaded |
| **Row 12** | 2026-08-25 `|` Tue `|` 8 `|` 4.417 `|` 12.42 `|` Overloaded |
| *...* | *(14 more non-empty rows)* |

------------------------------------------------------------

### 3. Sheet: `Settings`
- **Dimensions:** 54 rows × 6 columns (Non-empty rows: 48)
- **Merged Cell Ranges (7):** A2:F2, A31:C31, A1:F1, A13:E13, A51:D51, A15:C15 ...

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | SETTINGS — edit these to reshape the whole workbook |
| **Row 2** | Change wake/sleep time, gym frequency, category weights, or dropdown lists here. Every other sheet reads from this sheet — nothing else needs to be rebuilt. |
| **Row 4** | CORE PARAMETERS |
| **Row 5** | Target wake time `|` 06:00 |
| **Row 6** | Target sleep time `|` 22:30 |
| **Row 7** | Target sleep hours (min) `|` 7.5 |
| **Row 8** | Gym sessions / week target `|` 4 |
| **Row 9** | CFA hours / week target `|` 12 |
| *...* | *(40 more non-empty rows)* |

------------------------------------------------------------

### 4. Sheet: `Master Timetable`
- **Dimensions:** 63 rows × 9 columns (Non-empty rows: 59)
- **Merged Cell Ranges (120):** E39:E40, C29:C30, D21:D22, C22:C28, B42:B43, G10:G11 ...

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | MASTER TIMETABLE — Ideal / Normal Recurring Week (edit times in Col A; classes are fixed) |
| **Row 2** | Mon & Thu = single 11:30 class + 15:30-18:00 block. Tue = continuous campus day 11:30-18:00 (incl. new DE 343, 1-3pm). Wed & Fri = only a morning class block (8:00-10:30) — your lightest, most flexible days. Sat/Sun = weekend structure. Colors match category weights in Settings. This is the NORMAL day template — see Heavy/Recovery variants and day-type notes in rows below the grid. |
| **Row 4** | Time `|` MON `|` TUE `|` WED `|` THU `|` FRI `|` SAT `|` SUN |
| **Row 5** | 06:00 `|` Wake + Hydration/Hygiene 06:00-06:20 `|` Wake + Hydration/Hygiene 06:00-06:20 `|` Wake + Hydration/Hygiene 06:00-06:15 `|` Wake + Hydration/Hygiene 06:00-06:20 `|` Wake + Hydration/Hygiene 06:00-06:15 |
| **Row 6** | 06:15 `|` *(empty)* `|` *(empty)* `|` Light Movement / Stretch 06:15-06:45 `|` *(empty)* `|` Light Movement / Stretch 06:15-06:45 |
| **Row 7** | 06:20 `|` Light Movement / Stretch 06:20-06:50 `|` Light Movement / Stretch 06:20-06:50 `|` *(empty)* `|` Light Movement / Stretch 06:20-06:50 |
| **Row 8** | 06:45 `|` *(empty)* `|` *(empty)* `|` Breakfast (quick) 06:45-07:00 `|` *(empty)* `|` Breakfast (quick) 06:45-07:00 |
| **Row 9** | 06:50 `|` Novel Reading 06:50-07:20 `|` Novel Reading 06:50-07:20 `|` *(empty)* `|` Novel Reading 06:50-07:20 |
| *...* | *(51 more non-empty rows)* |

------------------------------------------------------------

### 5. Sheet: `Daily Planner`
- **Dimensions:** 157 rows × 16 columns (Non-empty rows: 156)
- **Merged Cell Ranges (2):** A1:P1, A2:P2

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | DAILY PLANNER — log Planned vs Actual every day |
| **Row 2** | Pre-filled with the current week (24-30 Aug 2026) from the Master Timetable. Copy the whole block downward for future weeks and just change the Date/Day. Yellow cells are for you to fill in daily. Weight & Score Input are helper columns that power the Daily Score on the Habit Tracker / Dashboard — leave them alone. |
| **Row 4** | Date `|` Day `|` Planned Activity `|` Actual Activity `|` Start Time `|` End Time `|` Category `|` Priority `|` Planned Duration (min) `|` Actual Duration (min) `|` Completion Status `|` Energy Level (1-5) `|` Notes `|` Reason for Missed `|` Weight `|` Score Input |
| **Row 5** | 2026-08-24 `|` Mon `|` Wake + Hydration/Hygiene `|` *(empty)* `|` 06:00 `|` 06:20 `|` Personal Care `|` P0 `|` 20 `|` *(empty)* `|` *(empty)* `|` *(empty)* `|` *(empty)* `|` *(empty)* `|` 0 `|` 0 |
| **Row 6** | 2026-08-24 `|` Mon `|` Light Movement / Stretch `|` *(empty)* `|` 06:20 `|` 06:50 `|` Fitness `|` P2 `|` 30 `|` *(empty)* `|` *(empty)* `|` *(empty)* `|` *(empty)* `|` *(empty)* `|` 1.5 `|` 0 |
| **Row 7** | 2026-08-24 `|` Mon `|` Novel Reading `|` *(empty)* `|` 06:50 `|` 07:20 `|` Reading `|` P3 `|` 30 `|` *(empty)* `|` *(empty)* `|` *(empty)* `|` *(empty)* `|` *(empty)* `|` 0.5 `|` 0 |
| **Row 8** | 2026-08-24 `|` Mon `|` CFA — Concept Study (Deep Work) `|` *(empty)* `|` 07:20 `|` 08:30 `|` CFA `|` P1 `|` 70 `|` *(empty)* `|` *(empty)* `|` *(empty)* `|` *(empty)* `|` *(empty)* `|` 3 `|` 0 |
| **Row 9** | 2026-08-24 `|` Mon `|` Breakfast `|` *(empty)* `|` 08:30 `|` 09:00 `|` Meal `|` P0 `|` 30 `|` *(empty)* `|` *(empty)* `|` *(empty)* `|` *(empty)* `|` *(empty)* `|` 0 `|` 0 |
| *...* | *(148 more non-empty rows)* |

------------------------------------------------------------

### 6. Sheet: `Task Tracker`
- **Dimensions:** 44 rows × 10 columns (Non-empty rows: 3)
- **Merged Cell Ranges (2):** A1:J1, A2:J2

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | TASK TRACKER — everything that isn't a recurring timetable block |
| **Row 2** | Use for one-off tasks: assignments, applications, errands, admin. Filter by Status or Priority. |
| **Row 4** | Task `|` Category `|` Priority `|` Deadline `|` Status `|` Estimated Hours `|` Actual Hours `|` Owner Note `|` Linked Area `|` Date Added |

------------------------------------------------------------

### 7. Sheet: `CFA Tracker`
- **Dimensions:** 37 rows × 10 columns (Non-empty rows: 4)
- **Merged Cell Ranges (2):** A1:J1, A2:J2

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | CFA LEVEL I TRACKER — 2027 target |
| **Row 2** | Links to the existing CFA Level I 2027 study planner (181-day schedule, Aug 2026-Jan 2027). Log topic-level progress here week to week. |
| **Row 4** | Week Of `|` Topic / Reading `|` Activity Type `|` Planned Hours `|` Actual Hours `|` Questions Done `|` Accuracy % `|` Revision Status `|` Mock Score `|` Notes |
| **Row 37** | CFA HOURS THIS WEEK (auto, from Daily Planner) `|` *(empty)* `|` *(empty)* `|` 13.75 |

------------------------------------------------------------

### 8. Sheet: `Placement Tracker`
- **Dimensions:** 37 rows × 11 columns (Non-empty rows: 4)
- **Merged Cell Ranges (2):** A2:K2, A1:K1

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | PLACEMENT TRACKER — companies, applications & interviews |
| **Row 2** | Use the Placement/Career Flex Blocks in the timetable to work through this list. Update Status as things move. |
| **Row 4** | Company `|` Role `|` Prep Area `|` Application Status `|` Test/Interview Date `|` Prep Hours Logged `|` Mock Interviews Done `|` Networking Contact `|` Result `|` Priority `|` Notes |
| **Row 37** | PLACEMENT HOURS THIS WEEK (auto, from Daily Planner) `|` *(empty)* `|` *(empty)* `|` 9.5 |

------------------------------------------------------------

### 9. Sheet: `Academic Tracker`
- **Dimensions:** 33 rows × 9 columns (Non-empty rows: 11)
- **Merged Cell Ranges (2):** A1:I1, A2:I2

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | ACADEMIC TRACKER — courses this term |
| **Row 2** | Pre-filled with your current courses from the timetable. Add assignments/tests as rows. |
| **Row 4** | Course Code `|` Course Name `|` Item (assignment/test/lab) `|` Deadline `|` Status `|` Revision Status `|` Priority `|` Hours Logged `|` Notes |
| **Row 5** | BB627 |
| **Row 6** | CE725 |
| **Row 7** | EC457 |
| **Row 8** | AE641 |
| **Row 9** | PS643 |
| *...* | *(3 more non-empty rows)* |

------------------------------------------------------------

### 10. Sheet: `Fitness Tracker`
- **Dimensions:** 40 rows × 8 columns (Non-empty rows: 7)
- **Merged Cell Ranges (2):** A2:H2, A1:H1

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | FITNESS TRACKER — target 4 sessions / week (Mon, Wed, Fri, Sat) |
| **Row 2** | Log each gym session. Consistency % below compares Sessions Done to the weekly target in Settings. |
| **Row 4** | Date `|` Day `|` Workout Type `|` Duration (min) `|` Intensity (1-5) `|` Completed? `|` Energy After `|` Notes |
| **Row 37** | THIS WEEK'S CONSISTENCY |
| **Row 38** | Sessions logged `|` 0 |
| **Row 39** | Target `|` 4 |
| **Row 40** | Consistency % `|` 0 |

------------------------------------------------------------

### 11. Sheet: `Personal Brand`
- **Dimensions:** 41 rows × 9 columns (Non-empty rows: 8)
- **Merged Cell Ranges (11):** A41:C41, A2:I2, D38:I38, A37:I37, D40:I40, D41:I41 ...

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | PERSONAL BRAND — X/Twitter + Substack |
| **Row 2** | Track content ideas through to publishing. Keep X sessions short (daily flex); reserve 1-2 deeper Substack sessions/week (Fri + Sat in the timetable). |
| **Row 4** | Platform `|` Content Idea / Title `|` Stage `|` Date Drafted `|` Date Published `|` Time Spent (min) `|` Views/Engagement `|` Likes/Replies `|` Notes |
| **Row 37** | WEEKLY CONTENT/PERSONAL BRAND REVIEW (Fri evening slot) |
| **Row 38** | • What published this week? |
| **Row 39** | • What performed best, and why? |
| **Row 40** | • Next week's 1-2 content ideas: |
| **Row 41** | • Substack deep-session used well? (Y/N + note) |

------------------------------------------------------------

### 12. Sheet: `Habit Tracker`
- **Dimensions:** 22 rows × 13 columns (Non-empty rows: 20)
- **Merged Cell Ranges (2):** A2:M2, A1:M1

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | HABIT TRACKER — daily score & core habits |
| **Row 2** | Daily Score = weighted completion of important activities (SUMPRODUCT of Category weight x Completion value from the Daily Planner, divided by total scheduled weight for that date) x 100. CFA/Placement/Academic count most; Reading/Personal Brand count least; Class/Meal/Travel/Sleep are unweighted (always expected, not scored). |
| **Row 4** | Date `|` Day `|` Wake Time `|` Sleep Time `|` Sleep Hours `|` Gym? (Y/N) `|` Reading (min) `|` CFA Hours `|` Placement Hours `|` Academic Hours `|` X/Substack Hours `|` Overall Completion % `|` Daily Score |
| **Row 5** | 2026-08-24 `|` Mon `|` *(empty)* `|` *(empty)* `|` *(empty)* `|` *(empty)* `|` 30 `|` 2.167 `|` 1.5 `|` 1.25 `|` 0.5 `|` 0 `|` 0 |
| **Row 6** | 2026-08-25 `|` Tue `|` *(empty)* `|` *(empty)* `|` *(empty)* `|` *(empty)* `|` 30 `|` 1.917 `|` 1.5 `|` 1 `|` 0.5 `|` 0 `|` 0 |
| **Row 7** | 2026-08-26 `|` Wed `|` *(empty)* `|` *(empty)* `|` *(empty)* `|` *(empty)* `|` 30 `|` 2.5 `|` 2.5 `|` 0.75 `|` 0.5 `|` 0 `|` 0 |
| **Row 8** | 2026-08-27 `|` Thu `|` *(empty)* `|` *(empty)* `|` *(empty)* `|` *(empty)* `|` 60 `|` 2.167 `|` 1.5 `|` 1.25 `|` 0 `|` 0 `|` 0 |
| **Row 9** | 2026-08-28 `|` Fri `|` *(empty)* `|` *(empty)* `|` *(empty)* `|` *(empty)* `|` 30 `|` 1.5 `|` 0 `|` 0 `|` 1.5 `|` 0 `|` 0 |
| *...* | *(12 more non-empty rows)* |

------------------------------------------------------------

### 13. Sheet: `Weekly Review`
- **Dimensions:** 47 rows × 6 columns (Non-empty rows: 27)
- **Merged Cell Ranges (24):** A16:F16, A46:F46, B7:C7, B30:E30, A27:F27, B12:C12 ...

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | WEEKLY REVIEW & PLANNING SESSION |
| **Row 2** | Do this during the Saturday 20:00-21:00 Weekly Planning Session block. Takes ~45-60 min. Enter next week's known events so the Overload Indicator can flag conflicts early. |
| **Row 4** | Week of |
| **Row 6** | 1. REVIEW LAST WEEK |
| **Row 7** | • CFA progress (topics covered, hours vs target) |
| **Row 8** | • Academic workload (assignments/tests handled) |
| **Row 9** | • Placement progress (applications, interviews, prep) |
| **Row 10** | • Gym sessions completed vs target (4) |
| *...* | *(19 more non-empty rows)* |

------------------------------------------------------------


==========================================================================================
# WORKBOOK: Personal_Expense_Tracker.xlsx
**File Path:** `c:\Users\singh\Downloads\Personal_Expense_Tracker.xlsx`  
**Total Sheets:** `12`  
**Sheet List:** `Dashboard`, `Transactions`, `Quick Entry`, `Monthly Analysis`, `Weekly Analysis`, `Yearly Analysis`, `Budgets`, `Recurring Expenses`, `People-Splits`, `Net Worth`, `Financial Review`, `Settings`
==========================================================================================

### 1. Sheet: `Dashboard`
- **Dimensions:** 95 rows × 12 columns (Non-empty rows: 37)
- **Merged Cell Ranges (29):** D11:F11, A75:L75, A74:L74, A12:C12, A3:L3, J11:L11 ...

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | PERSONAL FINANCE DASHBOARD |
| **Row 3** | Selected Period |
| **Row 4** | *(empty)* `|` *(empty)* `|` Viewing |
| **Row 5** | Month (1-12) `|` 8 `|` August 2026 |
| **Row 6** | Year `|` 2026 |
| **Row 8** | INCOME `|` *(empty)* `|` *(empty)* `|` EXPENSES `|` *(empty)* `|` *(empty)* `|` SAVINGS `|` *(empty)* `|` *(empty)* `|` SAVINGS RATE |
| **Row 9** | 85000 `|` *(empty)* `|` *(empty)* `|` 35417 `|` *(empty)* `|` *(empty)* `|` 49583 `|` *(empty)* `|` *(empty)* `|` 0.5833 |
| **Row 11** | BUDGET USED `|` *(empty)* `|` *(empty)* `|` AVG DAILY SPEND `|` *(empty)* `|` *(empty)* `|` # TRANSACTIONS `|` *(empty)* `|` *(empty)* `|` LARGEST EXPENSE |
| *...* | *(29 more non-empty rows)* |

------------------------------------------------------------

### 2. Sheet: `Transactions`
- **Dimensions:** 3000 rows × 28 columns (Non-empty rows: 65)
- **Merged Cell Ranges (1):** A1:AA1

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | TRANSACTIONS — Master Database  (this is the only sheet you normally add rows to) |
| **Row 3** | Transaction ID `|` Date `|` Day `|` Week # `|` Month `|` Year `|` Transaction Type `|` Category `|` Subcategory `|` Description `|` Amount `|` Payment Method `|` Account/Wallet `|` Merchant/Payee `|` Assigned To `|` Need/Want `|` Essential/Discretionary `|` Recurring? `|` Recurring Frequency `|` Status `|` Paid By Me `|` My Share `|` Recoverable `|` Recovered `|` Outstanding `|` Notes `|` Tags |
| **Row 4** | T0001 `|` 2026-05-01T00:00:00 `|` Fri `|` 18 `|` May `|` 2026 `|` Income `|` *(empty)* `|` *(empty)* `|` Monthly Salary `|` 85000 `|` Bank Transfer `|` Bank Account `|` Employer Pvt Ltd `|` Self `|` *(empty)* `|` *(empty)* `|` No `|` *(empty)* `|` Completed `|` 85000 `|` 85000 `|` 0 `|` 0 `|` 0 `|` *(empty)* `|` salary |
| **Row 5** | T0002 `|` 2026-05-02T00:00:00 `|` Sat `|` 18 `|` May `|` 2026 `|` Expense `|` Food `|` Groceries `|` Weekly groceries - BigBasket `|` 2400 `|` UPI `|` Bank Account `|` BigBasket `|` Self `|` Need `|` Essential `|` No `|` *(empty)* `|` Completed `|` 2400 `|` 2400 `|` 0 `|` 0 `|` 0 `|` *(empty)* `|` groceries `|` 2400 |
| **Row 6** | T0003 `|` 2026-05-03T00:00:00 `|` Sun `|` 19 `|` May `|` 2026 `|` Expense `|` Transport `|` Fuel `|` Petrol fill-up `|` 1800 `|` Credit Card `|` Credit Card `|` HP Petrol Pump `|` Self `|` Need `|` Essential `|` No `|` *(empty)* `|` Completed `|` 1800 `|` 1800 `|` 0 `|` 0 `|` 0 `|` *(empty)* `|` fuel `|` 1800 |
| **Row 7** | T0004 `|` 2026-05-05T00:00:00 `|` Tue `|` 19 `|` May `|` 2026 `|` Expense `|` Housing `|` Rent `|` Monthly rent `|` 22000 `|` Bank Transfer `|` Bank Account `|` Landlord `|` Self `|` Need `|` Essential `|` Yes `|` Monthly `|` Completed `|` 22000 `|` 22000 `|` 0 `|` 0 `|` 0 `|` *(empty)* `|` rent,recurring `|` 22000 |
| **Row 8** | T0005 `|` 2026-05-06T00:00:00 `|` Wed `|` 19 `|` May `|` 2026 `|` Expense `|` Entertainment `|` Streaming `|` Netflix subscription `|` 649 `|` Credit Card `|` Credit Card `|` Netflix `|` Self `|` Want `|` Discretionary `|` Yes `|` Monthly `|` Completed `|` 649 `|` 649 `|` 0 `|` 0 `|` 0 `|` *(empty)* `|` subscription,recurring `|` 649 |
| **Row 9** | T0006 `|` 2026-05-07T00:00:00 `|` Thu `|` 19 `|` May `|` 2026 `|` Expense `|` Food `|` Restaurants `|` Dinner with friends `|` 3000 `|` UPI `|` UPI `|` The Bistro `|` Friend `|` Want `|` Discretionary `|` No `|` *(empty)* `|` Completed `|` 3000 `|` 1500 `|` 1500 `|` 1500 `|` 0 `|` Split with Friend A - my share is half `|` split `|` 1500 |
| *...* | *(57 more non-empty rows)* |

------------------------------------------------------------

### 3. Sheet: `Quick Entry`
- **Dimensions:** 20 rows × 27 columns (Non-empty rows: 15)
- **Merged Cell Ranges (4):** A1:D1, A18:D18, A3:D3, A5:B5

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | QUICK ENTRY — Fast daily transaction entry |
| **Row 3** | HOW TO USE: Fill in the 7 highlighted fields below for a new expense. Everything else is generated automatically in the 'Ready to Paste' row. Copy that row (Ctrl+C) and paste it (paste values, Ctrl+Shift+V) into the first blank row at the bottom of the Transactions sheet. For income, transfers, splits or anything more detailed, enter directly on the Transactions sheet instead. |
| **Row 5** | Enter Transaction |
| **Row 6** | Date `|` 2026-08-25T00:00:00 |
| **Row 7** | Amount `|` 500 |
| **Row 8** | Category `|` Food |
| **Row 9** | Subcategory `|` Groceries |
| **Row 10** | Description `|` Sample entry |
| *...* | *(7 more non-empty rows)* |

------------------------------------------------------------

### 4. Sheet: `Monthly Analysis`
- **Dimensions:** 101 rows × 8 columns (Non-empty rows: 91)
- **Merged Cell Ranges (9):** A21:H21, A86:B86, D86:E86, G86:H86, A35:D35, A98:B98 ...

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | MONTHLY ANALYSIS — Selected-Month Deep Dive |
| **Row 3** | Select Month & Year: |
| **Row 4** | (Selector lives on the Dashboard — linked here) |
| **Row 5** | Month (1-12) `|` 8 `|` 2026-08-01T00:00:00 `|` Period Start `|` 2026-08-31T00:00:00 `|` August 2026 `|` Showing: |
| **Row 6** | Year `|` 2026 `|` *(empty)* `|` Period End |
| **Row 7** | (Previous month, auto) `|` *(empty)* `|` 2026-07-01T00:00:00 `|` *(empty)* `|` 2026-07-31T00:00:00 |
| **Row 8** | (Same month last year, auto) `|` *(empty)* `|` 2025-08-01T00:00:00 `|` *(empty)* `|` 2025-08-31T00:00:00 |
| **Row 10** | Financial Summary |
| *...* | *(83 more non-empty rows)* |

------------------------------------------------------------

### 5. Sheet: `Weekly Analysis`
- **Dimensions:** 37 rows × 7 columns (Non-empty rows: 32)
- **Merged Cell Ranges (4):** A5:D5, A17:E17, A1:G1, A29:D29

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | WEEKLY ANALYSIS |
| **Row 3** | Week Start Date (any date; auto-snaps to Monday) `|` 2026-08-17T00:00:00 `|` 2026-08-17T00:00:00 `|` Week Start (Mon) `|` 2026-08-23T00:00:00 `|` Week End (Sun) |
| **Row 5** | Weekly Summary |
| **Row 6** | Total Spending `|` 1450 |
| **Row 7** | Total Income `|` 0 |
| **Row 8** | Net Cash Flow `|` -1450 |
| **Row 9** | Daily Average Spending `|` 207.1 |
| **Row 10** | Number of Transactions `|` 3 |
| *...* | *(24 more non-empty rows)* |

------------------------------------------------------------

### 6. Sheet: `Yearly Analysis`
- **Dimensions:** 45 rows × 8 columns (Non-empty rows: 39)
- **Merged Cell Ranges (4):** A5:D5, A34:E34, A13:E13, A1:H1

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | YEARLY ANALYSIS |
| **Row 3** | Select Year `|` 2026 |
| **Row 5** | Annual Summary |
| **Row 6** | Annual Income `|` 352000 |
| **Row 7** | Annual Expenses `|` 165598 |
| **Row 8** | Annual Savings `|` 186402 |
| **Row 9** | Savings Rate `|` 0.5296 |
| **Row 10** | Monthly Avg Spending `|` 1.38e+04 |
| *...* | *(31 more non-empty rows)* |

------------------------------------------------------------

### 7. Sheet: `Budgets`
- **Dimensions:** 16 rows × 7 columns (Non-empty rows: 14)
- **Merged Cell Ranges (2):** A3:G3, A1:G1

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | BUDGETS — Monthly budget by category |
| **Row 3** | Note: budgets below apply as a recurring MONTHLY target per category (same target every month). Edit the amounts in column B any time — all dashboards recalculate automatically. |
| **Row 5** | Category `|` Monthly Budget `|` Selected-Month Actual `|` Remaining `|` % Used `|` Status |
| **Row 6** | Food `|` 8000 `|` 3550 `|` 4450 `|` 0.4437 `|` Under Budget |
| **Row 7** | Transport `|` 3000 `|` 2600 `|` 400 `|` 0.8667 `|` Near Limit |
| **Row 8** | Education `|` 2000 `|` 0 `|` 2000 `|` 0 `|` Under Budget |
| **Row 9** | Health `|` 3000 `|` 1800 `|` 1200 `|` 0.6 `|` Under Budget |
| **Row 10** | Housing `|` 26000 `|` 22999 `|` 3001 `|` 0.8846 `|` Near Limit |
| *...* | *(6 more non-empty rows)* |

------------------------------------------------------------

### 8. Sheet: `Recurring Expenses`
- **Dimensions:** 16 rows × 13 columns (Non-empty rows: 13)
- **Merged Cell Ranges (2):** A13:D13, A1:M1

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | RECURRING EXPENSES — Subscriptions & fixed bills |
| **Row 3** | Expense Name `|` Category `|` Subcategory `|` Amount `|` Frequency `|` Start Date `|` End Date `|` Payment Method `|` Account `|` Assigned To `|` Next Due Date `|` Active? `|` Notes |
| **Row 4** | Rent `|` Housing `|` Rent `|` 22000 `|` Monthly `|` 2026-01-05T00:00:00 `|` *(empty)* `|` Bank Transfer `|` Bank Account `|` Self `|` 2026-09-05T00:00:00 `|` Yes |
| **Row 5** | Netflix `|` Entertainment `|` Streaming `|` 649 `|` Monthly `|` 2026-01-06T00:00:00 `|` *(empty)* `|` Credit Card `|` Credit Card `|` Self `|` 2026-09-06T00:00:00 `|` Yes |
| **Row 6** | Spotify `|` Entertainment `|` Streaming `|` 119 `|` Monthly `|` 2026-07-07T00:00:00 `|` *(empty)* `|` Credit Card `|` Credit Card `|` Self `|` 2026-09-07T00:00:00 `|` Yes |
| **Row 7** | Gym Membership `|` Health `|` Gym `|` 1500 `|` Monthly `|` 2026-01-08T00:00:00 `|` *(empty)* `|` UPI `|` Bank Account `|` Self `|` 2026-09-08T00:00:00 `|` Yes |
| **Row 8** | Broadband Internet `|` Housing `|` Internet `|` 999 `|` Monthly `|` 2026-01-12T00:00:00 `|` *(empty)* `|` Net Banking `|` Bank Account `|` Self `|` 2026-09-12T00:00:00 `|` Yes |
| **Row 9** | Health Insurance Premium `|` Health `|` Wellness `|` 14000 `|` Yearly `|` 2026-03-15T00:00:00 `|` *(empty)* `|` Bank Transfer `|` Bank Account `|` Self `|` 2027-03-15T00:00:00 `|` Yes |
| *...* | *(5 more non-empty rows)* |

------------------------------------------------------------

### 9. Sheet: `People-Splits`
- **Dimensions:** 18 rows × 7 columns (Non-empty rows: 14)
- **Merged Cell Ranges (3):** A3:F3, A16:F16, A1:G1

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | PEOPLE / SPLITS — Shared expenses & reimbursements |
| **Row 3** | Money Owed TO Me (from split / shared expenses recorded in Transactions) |
| **Row 5** | Person / Purpose `|` Recoverable `|` Recovered `|` Outstanding `|` Transactions |
| **Row 6** | Family `|` 0 `|` 0 `|` 0 `|` 1 |
| **Row 7** | Friend `|` 1500 `|` 1500 `|` 0 `|` 1 |
| **Row 8** | Roommate `|` 0 `|` 0 `|` 0 `|` 0 |
| **Row 9** | College `|` 0 `|` 0 `|` 0 `|` 0 |
| **Row 10** | Work `|` 0 `|` 0 `|` 0 `|` 2 |
| *...* | *(6 more non-empty rows)* |

------------------------------------------------------------

### 10. Sheet: `Net Worth`
- **Dimensions:** 9 rows × 11 columns (Non-empty rows: 8)
- **Merged Cell Ranges (1):** A1:I1

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | NET WORTH TRACKER (optional — update monthly) |
| **Row 3** | Month `|` Bank `|` Cash `|` Investments `|` Other Assets `|` Total Assets `|` Credit Card `|` Loans `|` Other Liab. `|` Total Liab. `|` Net Worth |
| **Row 4** | Mar-2026 `|` 120000 `|` 5000 `|` 250000 `|` 10000 `|` 385000 `|` 30000 `|` 180000 `|` 5000 `|` 215000 `|` 170000 |
| **Row 5** | Apr-2026 `|` 135000 `|` 4500 `|` 262000 `|` 10000 `|` 411500 `|` 28000 `|` 175000 `|` 5000 `|` 208000 `|` 203500 |
| **Row 6** | May-2026 `|` 128000 `|` 6000 `|` 275000 `|` 11000 `|` 420000 `|` 26000 `|` 170000 `|` 5000 `|` 201000 `|` 219000 |
| **Row 7** | Jun-2026 `|` 140000 `|` 5500 `|` 290000 `|` 11000 `|` 446500 `|` 24000 `|` 165000 `|` 5000 `|` 194000 `|` 252500 |
| **Row 8** | Jul-2026 `|` 148000 `|` 4800 `|` 305000 `|` 12000 `|` 469800 `|` 22000 `|` 160000 `|` 5000 `|` 187000 `|` 282800 |
| **Row 9** | Aug-2026 `|` 155000 `|` 5200 `|` 318000 `|` 12000 `|` 490200 `|` 20000 `|` 155000 `|` 5000 `|` 180000 `|` 310200 |

------------------------------------------------------------

### 11. Sheet: `Financial Review`
- **Dimensions:** 34 rows × 5 columns (Non-empty rows: 27)
- **Merged Cell Ranges (14):** A21:E21, A34:E34, B9:E9, A4:E4, B8:E8, A12:D12 ...

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | FINANCIAL REVIEW — Monthly & Year-End Summary |
| **Row 3** | Monthly Review (uses the Dashboard's selected month) |
| **Row 4** | August 2026 |
| **Row 6** | What did I spend the most on? `|` Housing — ₹22,999 |
| **Row 7** | How much did I save this month? `|` ₹49,583  (58.3% savings rate) |
| **Row 8** | What % of spending was discretionary? `|` 19.8% |
| **Row 9** | How did this month compare with last month? `|` Expenses down 35.1% vs last month. |
| **Row 10** | Recurring expenses coming up (next 14 days) `|` 5 item(s) — see Recurring Expenses sheet |
| *...* | *(19 more non-empty rows)* |

------------------------------------------------------------

### 12. Sheet: `Settings`
- **Dimensions:** 27 rows × 11 columns (Non-empty rows: 25)
- **Merged Cell Ranges (4):** A18:C18, A1:K1, A3:C3, A8:K8

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | SETTINGS  /  MASTER DATA  (edit lists here — changes flow through the whole workbook) |
| **Row 3** | Global Settings |
| **Row 4** | Currency Symbol `|` ₹ |
| **Row 5** | Near-Limit Budget Threshold `|` 0.8 |
| **Row 6** | Healthy Savings-Rate Target `|` 0.2 |
| **Row 8** | Categories & Subcategories (dependent dropdown source — add/edit freely, keep category names as single words) |
| **Row 9** | Category List → `|` Food `|` Transport `|` Education `|` Health `|` Housing `|` Entertainment `|` Shopping `|` Finance `|` Travel `|` Personal |
| **Row 10** | Food `|` Groceries `|` Public Transport `|` Tuition `|` Medicine `|` Rent `|` Movies `|` Clothing `|` Bank Fees `|` Flights `|` Gifts |
| *...* | *(17 more non-empty rows)* |

------------------------------------------------------------


==========================================================================================
# WORKBOOK: Fitness_Command_Center.xlsx
**File Path:** `c:\Users\singh\Downloads\Fitness_Command_Center.xlsx`  
**Total Sheets:** `17`  
**Sheet List:** `Dashboard`, `How to Use`, `Settings`, `Workout Plan`, `Workout Log`, `Daily Habit Tracker`, `Meal Plan`, `Daily Food Log`, `Daily Nutrition Summary`, `Grocery Budget Tracker`, `Supplement Tracker`, `Weight & Measurements`, `Progress Photos`, `Cardio & Steps`, `Sleep & Recovery`, `Weekly Review`, `Monthly Analysis`
==========================================================================================

### 1. Sheet: `Dashboard`
- **Dimensions:** 30 rows × 8 columns (Non-empty rows: 25)
- **Merged Cell Ranges (8):** A4:B4, A26:B26, A30:H30, D4:H4, A2:H2, A1:H1 ...

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | FITNESS COMMAND CENTER — DASHBOARD |
| **Row 2** | Updates automatically from every other sheet. Just keep logging daily — this page does the math. |
| **Row 4** | Body Stats `|` *(empty)* `|` *(empty)* `|` Progress to Goal |
| **Row 5** | Starting Weight (kg) `|` 83 `|` *(empty)* `|` % of Goal Weight Loss Achieved `|` 0 |
| **Row 6** | Current Weight (kg) `|` 83 |
| **Row 7** | Target Weight (kg) `|` 75 |
| **Row 8** | Weight Lost So Far (kg) `|` 0 |
| **Row 9** | BMI `|` 30.49 |
| *...* | *(17 more non-empty rows)* |

------------------------------------------------------------

### 2. Sheet: `How to Use`
- **Dimensions:** 34 rows × 2 columns (Non-empty rows: 30)
- **Merged Cell Ranges (11):** A4:B4, A30:B30, A2:B2, A29:B29, A28:B28, A32:B32 ...

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | HOW TO USE THIS WORKBOOK |
| **Row 2** | This workbook is your complete fitness command center: Workout + Diet + Calories + Protein + Steps + Water + Sleep + Weight + Measurements + Budget + Supplements + Progress — all in one place. |
| **Row 4** | Color Key |
| **Row 5** | *(empty)* `|` Yellow = INPUT cell — type your data here |
| **Row 6** | *(empty)* `|` Grey = CALCULATED cell — formula, do not overtype |
| **Row 8** | Sheet-by-Sheet Guide |
| **Row 9** | Sheet `|` What to do |
| **Row 10** | Settings `|` Fill this in FIRST. Set your height, weight, age, activity level, goal, and targets. Everything else in the workbook reads from here. Only edit the yellow cells. |
| *...* | *(22 more non-empty rows)* |

------------------------------------------------------------

### 3. Sheet: `Settings`
- **Dimensions:** 29 rows × 7 columns (Non-empty rows: 27)
- **Merged Cell Ranges (8):** A1:G1, E13:G13, A14:C14, A27:C27, A2:G2, E4:G4 ...

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | USER SETTINGS — change values here, the whole workbook updates automatically |
| **Row 2** | Yellow cells = INPUT (edit these). Grey cells = CALCULATED (do not edit). Blue bold text = your entries. |
| **Row 4** | Personal Details `|` *(empty)* `|` *(empty)* `|` *(empty)* `|` Automatic Calculations |
| **Row 5** | Height (cm) `|` 165 `|` 5 ft 5 in = 165 cm `|` *(empty)* `|` BMI `|` 30.49 `|` Weight(kg) / Height(m)^2 |
| **Row 6** | Current Weight (kg) `|` 83 `|` Update weekly from Weight Tracker `|` *(empty)* `|` BMI Category `|` Obese |
| **Row 7** | Starting Weight (kg) `|` 83 `|` Set once at the start, don't change `|` *(empty)* `|` BMR (Mifflin-St Jeor) `|` 1741 `|` Basal Metabolic Rate, kcal/day |
| **Row 8** | Target Weight (kg) `|` 75 `|` *(empty)* `|` *(empty)* `|` Activity Multiplier `|` 1.55 |
| **Row 9** | Age (years) `|` 25 `|` *(empty)* `|` *(empty)* `|` Estimated TDEE (maintenance kcal) `|` 2699 |
| *...* | *(19 more non-empty rows)* |

------------------------------------------------------------

### 4. Sheet: `Workout Plan`
- **Dimensions:** 82 rows × 11 columns (Non-empty rows: 75)
- **Merged Cell Ranges (9):** A50:K50, A18:K18, A4:K4, A2:K2, A63:K63, A76:K76 ...

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | WEEKLY WORKOUT PLAN — Standard Commercial Gym (Full Equipment) |
| **Row 2** | Beginner/Intermediate program for fat loss, strength, and a lean athletic physique — not a bodybuilding split. Fill in Target Weight and log actual performance each session below. Est. session length ≈ 60 min including warm-up, cardio and cooldown. |
| **Row 4** | MONDAY — Upper Body A (Push Emphasis) + Cardio |
| **Row 5** | Exercise `|` Muscle Group `|` Sets `|` Reps `|` Target Weight (kg) `|` Actual Weight (kg) `|` Reps Completed `|` RPE (1-10) `|` Rest (sec) `|` Est. Duration (min) `|` Notes |
| **Row 6** | Warm-up `|` Arm circles, band pull-aparts, incline treadmill walk `|` - `|` 5 min `|` *(empty)* `|` *(empty)* `|` *(empty)* `|` *(empty)* `|` - `|` 6 |
| **Row 7** | Barbell Bench Press `|` Chest `|` 4 `|` 8-10 `|` 40 `|` *(empty)* `|` *(empty)* `|` *(empty)* `|` 90 `|` 12 `|` Increase 2.5kg when you hit 10 reps on all sets |
| **Row 8** | Lat Pulldown (wide grip) `|` Back `|` 3 `|` 10-12 `|` 45 `|` *(empty)* `|` *(empty)* `|` *(empty)* `|` 75 `|` 8 `|` Machine |
| **Row 9** | Seated Dumbbell Shoulder Press `|` Shoulders `|` 3 `|` 10-12 `|` 12 `|` *(empty)* `|` *(empty)* `|` *(empty)* `|` 75 `|` 8 `|` Per dumbbell |
| *...* | *(67 more non-empty rows)* |

------------------------------------------------------------

### 5. Sheet: `Workout Log`
- **Dimensions:** 204 rows × 14 columns (Non-empty rows: 6)
- **Merged Cell Ranges (2):** A2:N2, A1:N1

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | DAILY WORKOUT LOG |
| **Row 2** | Enter Date, Workout Day, Exercise, Sets, Reps, Weight, RPE and (optional) cardio details after every session. Volume, PR status and comparisons calculate automatically. Fill rows top-to-bottom without leaving blank rows in between. |
| **Row 4** | Date `|` Workout Day `|` Exercise `|` Sets `|` Reps `|` Weight (kg) `|` Volume (Sets x Reps x Weight) `|` RPE (1-10) `|` Cardio Type `|` Cardio Duration (min) `|` Calories Burned `|` vs Previous Session `|` Personal Record? `|` Notes |
| **Row 5** | 2026-08-24T00:00:00 `|` Monday `|` Barbell Bench Press `|` 4 `|` 8 `|` 40 `|` 1280 `|` 7 `|` *(empty)* `|` *(empty)* `|` *(empty)* `|` First entry `|` New PR! `|` Felt strong today |
| **Row 6** | 2026-08-24T00:00:00 `|` Monday `|` Lat Pulldown (wide grip) `|` 3 `|` 10 `|` 45 `|` 1350 `|` 7 `|` *(empty)* `|` *(empty)* `|` *(empty)* `|` First entry `|` New PR! |
| **Row 7** | 2026-08-24T00:00:00 `|` Monday `|` Cardio: Treadmill Incline Walk/Jog `|` *(empty)* `|` *(empty)* `|` *(empty)* `|` *(empty)* `|` *(empty)* `|` Treadmill `|` 10 `|` 70 `|` *(empty)* `|` *(empty)* `|` Moderate pace |

------------------------------------------------------------

### 6. Sheet: `Daily Habit Tracker`
- **Dimensions:** 204 rows × 12 columns (Non-empty rows: 4)
- **Merged Cell Ranges (2):** A2:L2, A1:L1

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | DAILY HABIT TRACKER & CONSISTENCY SCORE |
| **Row 2** | Pick Yes/No for each habit every day. Consistency Score is calculated automatically using the weights set on the Settings sheet. |
| **Row 4** | Date `|` Workout Completed `|` Steps Completed `|` Calories Within Target `|` Protein Target Hit `|` Water Target Hit `|` Sleep Target Hit `|` Fruits/Veg Consumed `|` No Junk Food `|` Mobility/ Stretching `|` Consistency Score /100 `|` Workout Streak |
| **Row 5** | 2026-08-24T00:00:00 `|` Yes `|` Yes `|` Yes `|` Yes `|` No `|` Yes `|` Yes `|` No `|` Yes `|` 90 `|` 1 |

------------------------------------------------------------

### 7. Sheet: `Meal Plan`
- **Dimensions:** 51 rows × 7 columns (Non-empty rows: 45)
- **Merged Cell Ranges (8):** A1:G1, A4:G4, A48:G48, A26:G26, A2:G2, A15:G15 ...

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | BUDGET-FRIENDLY INDIAN MEAL PLAN |
| **Row 2** | All items use common, affordable Indian foods. Swap any option for another in the same meal category without breaking your daily targets — each option is portioned to roughly the same calorie/protein range. Adjust quantities on the Daily Food Log to hit your exact targets. |
| **Row 4** | BREAKFAST OPTIONS |
| **Row 5** | Meal Option `|` Quantity / Serving `|` Calories (kcal) `|` Protein (g) `|` Carbs (g) `|` Fat (g) `|` Approx. Cost (Rs.) |
| **Row 6** | Masala Oats + 2 Boiled Eggs `|` 60g oats + 2 eggs `|` 380 `|` 22 `|` 40 `|` 14 `|` 25 |
| **Row 7** | Poha with Peanuts `|` 1.5 cups poha + 15g peanuts `|` 350 `|` 9 `|` 55 `|` 11 `|` 18 |
| **Row 8** | Vegetable Upma `|` 1.5 cups `|` 320 `|` 8 `|` 52 `|` 9 `|` 15 |
| **Row 9** | Besan Chilla (2) + Curd `|` 2 chillas + 100g curd `|` 380 `|` 20 `|` 40 `|` 14 `|` 20 |
| *...* | *(37 more non-empty rows)* |

------------------------------------------------------------

### 8. Sheet: `Daily Food Log`
- **Dimensions:** 404 rows × 9 columns (Non-empty rows: 6)
- **Merged Cell Ranges (2):** A1:I1, A2:I2

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | DAILY FOOD LOG |
| **Row 2** | Log every meal/snack you eat (one row each). Use the Meal Plan sheet for quick reference values, or enter your own. Daily totals below compare automatically against your Settings targets. |
| **Row 4** | Date `|` Meal `|` Food Item `|` Quantity `|` Calories `|` Protein (g) `|` Carbs (g) `|` Fat (g) `|` Cost (Rs.) |
| **Row 5** | 2026-08-24T00:00:00 `|` Breakfast `|` Masala Oats + 2 Boiled Eggs `|` 60g oats + 2 eggs `|` 380 `|` 22 `|` 40 `|` 14 `|` 25 |
| **Row 6** | 2026-08-24T00:00:00 `|` Lunch `|` Dal + Rice + Sabzi + Salad `|` 1 cup dal, 1 cup rice, 1 cup sabzi `|` 550 `|` 20 `|` 85 `|` 12 `|` 30 |
| **Row 7** | 2026-08-24T00:00:00 `|` Dinner `|` Grilled Chicken/Paneer + Salad + 1 Roti `|` 120g chicken `|` 450 `|` 32 `|` 30 `|` 18 `|` 45 |

------------------------------------------------------------

### 9. Sheet: `Daily Nutrition Summary`
- **Dimensions:** 184 rows × 10 columns (Non-empty rows: 4)
- **Merged Cell Ranges (2):** A1:J1, A2:J2

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | DAILY NUTRITION SUMMARY (auto-calculated from Daily Food Log) |
| **Row 2** | Enter each date you tracked in column A (or copy dates from the Food Log). Totals and target comparisons calculate automatically. Green = target achieved, Yellow = close, Red = significantly off target. |
| **Row 4** | Date `|` Total Calories `|` Calorie Target `|` Total Protein (g) `|` Protein Target (g) `|` Total Carbs (g) `|` Total Fat (g) `|` Total Cost (Rs.) `|` Calories Status `|` Protein Status |
| **Row 5** | 2026-08-24T00:00:00 `|` 1380 `|` 2199 `|` 74 `|` 149 `|` 155 `|` 44 `|` 100 `|` Off Target `|` Below Target |

------------------------------------------------------------

### 10. Sheet: `Grocery Budget Tracker`
- **Dimensions:** 174 rows × 8 columns (Non-empty rows: 24)
- **Merged Cell Ranges (4):** A156:H156, A2:H2, A165:H165, A1:H1

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | GROCERY & MEAL BUDGET TRACKER (India) |
| **Row 2** | Log every grocery purchase. Cost per serving, weekly/monthly totals, and cost-per-gram-of-protein calculate automatically. |
| **Row 4** | Item `|` Category `|` Quantity Purchased `|` Unit `|` Price (Rs.) `|` Purchase Date `|` Servings per Purchase `|` Cost per Serving (Rs.) |
| **Row 5** | Eggs (30 pack) `|` Protein `|` 30 `|` pcs `|` 210 `|` 2026-08-24T00:00:00 `|` 30 `|` 7 |
| **Row 6** | Chicken Breast `|` Protein `|` 1 `|` kg `|` 260 `|` 2026-08-24T00:00:00 `|` 8 `|` 32.5 |
| **Row 7** | Rice (basmati) `|` Carbohydrates `|` 5 `|` kg `|` 400 `|` 2026-08-24T00:00:00 `|` 25 `|` 16 |
| **Row 156** | SUMMARY |
| **Row 157** | Total Spend Logged (Rs.) `|` 870 |
| *...* | *(16 more non-empty rows)* |

------------------------------------------------------------

### 11. Sheet: `Supplement Tracker`
- **Dimensions:** 21 rows × 8 columns (Non-empty rows: 11)
- **Merged Cell Ranges (2):** A2:H2, A1:H1

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | SUPPLEMENT TRACKER — 100% Optional |
| **Row 2** | Food first. Supplements are optional extras, not requirements. Do not start Vitamin D/B12 or any medical supplement without a blood test or doctor's/dietitian's advice. Avoid fat burners, detox teas, and testosterone boosters — they are unnecessary and often unregulated. This sheet is informational only and is not medical advice. |
| **Row 4** | Supplement `|` Dose `|` Timing `|` Frequency `|` Monthly Cost (Rs.) `|` Reason for Taking `|` Purchased? `|` Remaining Qty |
| **Row 5** | Whey Protein (optional) `|` 1 scoop (~25-30g) `|` Post-workout or as a meal top-up `|` Daily / as needed `|` 1800 `|` Convenient way to hit protein target if food alone falls short `|` No |
| **Row 6** | Creatine Monohydrate (optional) `|` 3-5g `|` Any time, consistently `|` Daily `|` 500 `|` Well-researched for strength & performance; optional, not required `|` No |
| **Row 7** | Vitamin D3 (only if deficient/advised) `|` As prescribed `|` Morning with food `|` As advised `|` 150 `|` Only if a blood test or doctor indicates deficiency `|` No |
| **Row 8** | Vitamin B12 (only if deficient/advised) `|` As prescribed `|` Morning `|` As advised `|` 150 `|` Only if diet is low in B12 (e.g. vegetarian) or advised by a doctor `|` No |
| **Row 9** | Electrolytes (optional) `|` 1 sachet `|` During/after intense or long cardio sessions `|` As needed `|` 200 `|` Useful only on high-sweat days; not a daily necessity `|` No |
| *...* | *(3 more non-empty rows)* |

------------------------------------------------------------

### 12. Sheet: `Weight & Measurements`
- **Dimensions:** 160 rows × 11 columns (Non-empty rows: 9)
- **Merged Cell Ranges (3):** A2:K2, A1:K1, A157:D157

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | WEIGHT & BODY MEASUREMENT TRACKER |
| **Row 2** | Weigh in under similar conditions each time (e.g. morning, before food). Judge progress by weekly averages and trend, not a single day's number. |
| **Row 4** | Date `|` Body Weight (kg) `|` Waist (cm) `|` Chest (cm) `|` Arms (cm) `|` Thighs (cm) `|` Hips (cm) `|` Neck (cm) `|` Body Fat % (if available) `|` Change from Start (kg) `|` % Weight Lost |
| **Row 5** | 2026-08-17T00:00:00 `|` 83.4 `|` 92 `|` 98 `|` 32 `|` 55 `|` 98 `|` 38 `|` *(empty)* `|` 0.4 `|` -0.004819 |
| **Row 6** | 2026-08-24T00:00:00 `|` 83 `|` 91.3 `|` 98.2 `|` 32.1 `|` 55.1 `|` 97.8 `|` 38 `|` *(empty)* `|` 0 `|` 0 |
| **Row 157** | WEEKLY AVERAGE WEIGHT (last 8 entries) |
| **Row 158** | Average of last 7 logged weights (kg) `|` 83.2 |
| **Row 159** | Average of previous 7 weights (kg) `|` - |
| *...* | *(1 more non-empty rows)* |

------------------------------------------------------------

### 13. Sheet: `Progress Photos`
- **Dimensions:** 104 rows × 5 columns (Non-empty rows: 3)
- **Merged Cell Ranges (2):** A2:E2, A1:E1

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | PROGRESS PHOTO LOG |
| **Row 2** | Excel doesn't store photos neatly inline across all devices, so this sheet logs a file path or cloud link (Google Drive/OneDrive) for each photo instead. To insert an actual photo in desktop Excel: Insert > Pictures, then resize it to fit near the row. Take photos in the same lighting, pose, and clothing every time, ideally weekly. |
| **Row 4** | Date `|` Front Photo (file path/link) `|` Side Photo (file path/link) `|` Back Photo (file path/link) `|` Notes |

------------------------------------------------------------

### 14. Sheet: `Cardio & Steps`
- **Dimensions:** 207 rows × 7 columns (Non-empty rows: 7)
- **Merged Cell Ranges (2):** A2:G2, A1:G1

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | CARDIO & STEPS TRACKER |
| **Row 2** | Log daily steps and any dedicated cardio session. Calories burned can be entered from your phone/watch, or left blank. |
| **Row 4** | Date `|` Steps `|` Cardio Type `|` Duration (min) `|` Distance (km) `|` Calories Burned `|` Avg Heart Rate (if available) |
| **Row 5** | 2026-08-23T00:00:00 `|` 7800 `|` Outdoor Walk `|` 30 `|` 2.5 `|` 150 |
| **Row 6** | 2026-08-24T00:00:00 `|` 8200 `|` Treadmill `|` 10 `|` 1.2 `|` 90 |
| **Row 206** | Weekly Average Steps (last 7 entries) `|` 8000 |
| **Row 207** | Steps Target `|` 8000 |

------------------------------------------------------------

### 15. Sheet: `Sleep & Recovery`
- **Dimensions:** 208 rows × 8 columns (Non-empty rows: 7)
- **Merged Cell Ranges (2):** A2:H2, A1:H1

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | SLEEP & RECOVERY TRACKER |
| **Row 2** | Track sleep and recovery markers daily. Weeks with low sleep quality or high soreness are flagged automatically below. |
| **Row 4** | Date `|` Bedtime `|` Wake Time `|` Total Sleep (hrs) `|` Sleep Quality (1-10) `|` Resting HR (if available) `|` Energy Level (1-10) `|` Muscle Soreness (1-10) |
| **Row 5** | 2026-08-24T00:00:00 `|` 23:00 `|` 06:45 `|` 7.75 `|` 7 `|` 65 `|` 7 `|` 4 |
| **Row 206** | Weekly Avg Sleep (last 7 entries, hrs) `|` 7.75 |
| **Row 207** | Weekly Avg Soreness (last 7 entries) `|` 4 |
| **Row 208** | Recovery Flag `|` Recovery OK |

------------------------------------------------------------

### 16. Sheet: `Weekly Review`
- **Dimensions:** 37 rows × 13 columns (Non-empty rows: 8)
- **Merged Cell Ranges (6):** C35:M35, A1:M1, A34:M34, C36:M36, A2:M2, C37:M37

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | WEEKLY REVIEW |
| **Row 2** | Enter each week's Monday start date in column A; End Date and all metrics calculate automatically from the other sheets. Add your own notes in the reflection boxes below. |
| **Row 5** | Week Start Date `|` Week End Date `|` Avg Body Weight (kg) `|` Weight Change (kg) `|` Avg Calories `|` Avg Protein (g) `|` Avg Steps `|` Avg Sleep (hrs) `|` Workouts Completed `|` Workout Completion % `|` Avg Consistency Score `|` Weekly Food Cost (Rs.) `|` Avg Waist (cm) |
| **Row 6** | 2026-08-18T00:00:00 `|` 2026-08-24T00:00:00 `|` 83 `|` *(empty)* `|` 1380 `|` 74 `|` 8000 `|` 7.75 `|` 1 `|` 0.1667 `|` 90 `|` 870 `|` 91.3 |
| **Row 34** | WEEKLY REFLECTION (fill in manually each week) |
| **Row 35** | What went well? |
| **Row 36** | What needs improvement? |
| **Row 37** | Next week's target |

------------------------------------------------------------

### 17. Sheet: `Monthly Analysis`
- **Dimensions:** 17 rows × 14 columns (Non-empty rows: 4)
- **Merged Cell Ranges (2):** A2:N2, A1:N1

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | MONTHLY ANALYSIS |
| **Row 2** | Enter the 1st date of each month you want to analyze in column A (e.g. 01-Sep-2026). Everything else calculates automatically. |
| **Row 5** | Month (1st date) `|` Starting Weight (kg) `|` Ending Weight (kg) `|` Weight Change (kg) `|` Waist Change (cm) `|` Avg Calories `|` Avg Protein (g) `|` Total Workouts `|` Workout Completion % `|` Avg Steps `|` Avg Sleep (hrs) `|` Food Spend (Rs.) `|` Supplement Spend (Rs.) `|` Total Fitness Spend (Rs.) |
| **Row 6** | 2026-08-01T00:00:00 `|` 83.4 `|` 83.2 `|` -0.2 `|` *(empty)* `|` 1380 `|` 74 `|` 1 `|` 0.03849 `|` 8000 `|` 7.75 `|` 870 `|` 0 `|` 870 |

------------------------------------------------------------


==========================================================================================
# WORKBOOK: CFA_2027_Level_I_Study_Planner.xlsx
**File Path:** `c:\Users\singh\Downloads\CFA_2027_Level_I_Study_Planner.xlsx`  
**Total Sheets:** `13`  
**Sheet List:** `Dashboard`, `M1 Quant Methods`, `M2 Economics`, `M3 Corp Finance`, `M4 FSA`, `M5 Equities`, `M6 Fixed Income`, `M7 Derivatives`, `M8 Alt Investments`, `M9 Portfolio Constr`, `M10 Ethics`, `Buffer Day`, `Feb Revision`
==========================================================================================

### 1. Sheet: `Dashboard`
- **Dimensions:** 52 rows × 13 columns (Non-empty rows: 43)
- **Merged Cell Ranges (44):** E12:F12, A24:B24, A8:D8, C24:D24, E24:F24, D32:F32 ...

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | CFA 2027 Level I - Study Planner Dashboard |
| **Row 4** | START DATE (editable): `|` 2026-08-05T00:00:00 |
| **Row 5** | SYLLABUS COMPLETION DEADLINE: `|` 2027-01-31T00:00:00 |
| **Row 7** | STUDY OVERVIEW `|` *(empty)* `|` *(empty)* `|` *(empty)* `|` *(empty)* `|` *(empty)* `|` *(empty)* `|` MODULE-WISE PROGRESS |
| **Row 8** | Total Modules `|` *(empty)* `|` *(empty)* `|` *(empty)* `|` 10 `|` *(empty)* `|` *(empty)* `|` Module `|` Total Topics `|` Completed `|` Remaining `|` Completion % `|` Status |
| **Row 9** | Total Chapters / Topics `|` *(empty)* `|` *(empty)* `|` *(empty)* `|` 102 `|` *(empty)* `|` *(empty)* `|` Quantitative Methods `|` 18 `|` 3 `|` 15 `|` 0.1667 `|` In Progress |
| **Row 10** | Total Learning Outcomes `|` *(empty)* `|` *(empty)* `|` *(empty)* `|` 340 `|` *(empty)* `|` *(empty)* `|` Economics `|` 15 `|` 0 `|` 15 `|` 0 `|` Not Started |
| **Row 11** | Total Study Days (to 31-Jan) `|` *(empty)* `|` *(empty)* `|` *(empty)* `|` 180 `|` *(empty)* `|` *(empty)* `|` Corporate Finance `|` 13 `|` 0 `|` 13 `|` 0 `|` Not Started |
| *...* | *(35 more non-empty rows)* |

------------------------------------------------------------

### 2. Sheet: `M1 Quant Methods`
- **Dimensions:** 37 rows × 11 columns (Non-empty rows: 36)
- **Merged Cell Ranges (2):** A3:F3, A2:D2

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | ← Back to Dashboard |
| **Row 2** | Quantitative Methods |
| **Row 3** | 11 chapters | 30 learning outcomes | CFA 2027 Level I Topic Outlines |
| **Row 5** | Date `|` Day `|` Chapter / Topic `|` Subtopic / Learning Outcome(s) `|` Task `|` Planned Hours `|` Priority `|` Status `|` Completed `|` Notes `|` RowType |
| **Row 6** | 2026-08-05T00:00:00 `|` Wednesday `|` Returns of Financial Assets and Instruments `|` Describe, compare, and interpret returns | Describe, compare, and interpret required rates of return, risk-free rates, risk premia, and inflation `|` Learn concepts + solve practice questions `|` 2.2 `|` High `|` Completed `|` Yes `|` *(empty)* `|` STUDY |
| **Row 7** | 2026-08-05T00:00:00 `|` Wednesday `|` Quantitative Methods - Consolidation `|` Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. `|` Additional practice questions + weak-area drilling `|` 0.8 `|` Medium `|` Completed `|` Yes `|` *(empty)* `|` REVIEW |
| **Row 8** | 2026-08-06T00:00:00 `|` Thursday `|` Types of Financial Returns `|` Calculate, compare, and interpret different types of returns for financial assets, instruments, and indicators `|` Learn concepts + solve practice questions `|` 1.6 `|` Medium `|` Completed `|` Yes `|` *(empty)* `|` STUDY |
| **Row 9** | 2026-08-07T00:00:00 `|` Friday `|` Benchmarking Returns `|` Calculate and compare money-weighted and time-weighted rates of return | Describe weighting methods used in index construction/management; calculate, interpret, and explain the value and returns of an index `|` Learn concepts + solve practice questions `|` 2.2 `|` High `|` Completed `|` Yes `|` *(empty)* `|` STUDY |
| *...* | *(28 more non-empty rows)* |

------------------------------------------------------------

### 3. Sheet: `M2 Economics`
- **Dimensions:** 34 rows × 11 columns (Non-empty rows: 33)
- **Merged Cell Ranges (2):** A3:F3, A2:D2

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | ← Back to Dashboard |
| **Row 2** | Economics |
| **Row 3** | 8 chapters | 30 learning outcomes | CFA 2027 Level I Topic Outlines |
| **Row 5** | Date `|` Day `|` Chapter / Topic `|` Subtopic / Learning Outcome(s) `|` Task `|` Planned Hours `|` Priority `|` Status `|` Completed `|` Notes `|` RowType |
| **Row 6** | 2026-08-06T00:00:00 `|` Thursday `|` Economics - Consolidation `|` Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. `|` Additional practice questions + weak-area drilling `|` 1.4 `|` Medium `|` Not Started `|` No `|` *(empty)* `|` REVIEW |
| **Row 7** | 2026-08-20T00:00:00 `|` Thursday `|` The Firm and Market Structures `|` Determine/interpret breakeven and shutdown points of production; economies/diseconomies of scale under perfect and imperfect competition | Describe characteristics of perfect competition, monopolistic competition, oligopoly, and pure monopoly `|` Learn concepts + practice (Part 1 of 2) `|` 2 `|` High `|` Not Started `|` No `|` *(empty)* `|` STUDY |
| **Row 8** | 2026-08-21T00:00:00 `|` Friday `|` The Firm and Market Structures `|` Explain supply/demand relationships under monopolistic competition incl. optimal price/output and pricing strategy | Explain supply/demand relationships under oligopoly incl. optimal price/output and pricing strategy | Identify market structure type; describe use and limitations of concentration measures `|` Learn concepts + practice (Part 2 of 2) `|` 2 `|` High `|` Not Started `|` No `|` *(empty)* `|` STUDY |
| **Row 9** | 2026-08-21T00:00:00 `|` Friday `|` Economics - Consolidation `|` Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. `|` Additional practice questions + weak-area drilling `|` 1 `|` Medium `|` Not Started `|` No `|` *(empty)* `|` REVIEW |
| *...* | *(25 more non-empty rows)* |

------------------------------------------------------------

### 4. Sheet: `M3 Corp Finance`
- **Dimensions:** 32 rows × 11 columns (Non-empty rows: 31)
- **Merged Cell Ranges (2):** A3:F3, A2:D2

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | ← Back to Dashboard |
| **Row 2** | Corporate Finance |
| **Row 3** | 7 chapters | 22 learning outcomes | CFA 2027 Level I Topic Outlines |
| **Row 5** | Date `|` Day `|` Chapter / Topic `|` Subtopic / Learning Outcome(s) `|` Task `|` Planned Hours `|` Priority `|` Status `|` Completed `|` Notes `|` RowType |
| **Row 6** | 2026-08-07T00:00:00 `|` Friday `|` Corporate Finance - Consolidation `|` Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. `|` Additional practice questions + weak-area drilling `|` 0.8 `|` Medium `|` Not Started `|` No `|` *(empty)* `|` REVIEW |
| **Row 7** | 2026-08-23T00:00:00 `|` Sunday `|` Corporate Finance - Consolidation `|` Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. `|` Additional practice questions + weak-area drilling `|` 1.3 `|` Medium `|` Not Started `|` No `|` *(empty)* `|` REVIEW |
| **Row 8** | 2026-09-02T00:00:00 `|` Wednesday `|` Organizational Forms, Corporate Issuer Features, and Ownership `|` Compare the organizational forms of businesses `|` Learn concepts + practice (Part 1 of 2) `|` 1.4 `|` Medium `|` Not Started `|` No `|` *(empty)* `|` STUDY |
| **Row 9** | 2026-09-02T00:00:00 `|` Wednesday `|` Organizational Forms, Corporate Issuer Features, and Ownership `|` Describe key features of corporate issuers | Compare publicly and privately owned corporate issuers `|` Learn concepts + practice (Part 2 of 2) `|` 1.4 `|` Medium `|` Not Started `|` No `|` *(empty)* `|` STUDY |
| *...* | *(23 more non-empty rows)* |

------------------------------------------------------------

### 5. Sheet: `M4 FSA`
- **Dimensions:** 44 rows × 11 columns (Non-empty rows: 43)
- **Merged Cell Ranges (2):** A3:F3, A2:D2

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | ← Back to Dashboard |
| **Row 2** | Financial Statement Analysis |
| **Row 3** | 12 chapters | 53 learning outcomes | CFA 2027 Level I Topic Outlines |
| **Row 5** | Date `|` Day `|` Chapter / Topic `|` Subtopic / Learning Outcome(s) `|` Task `|` Planned Hours `|` Priority `|` Status `|` Completed `|` Notes `|` RowType |
| **Row 6** | 2026-08-09T00:00:00 `|` Sunday `|` Financial Statement Analysis - Consolidation `|` Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. `|` Additional practice questions + weak-area drilling `|` 1.3 `|` Medium `|` Completed `|` Yes `|` *(empty)* `|` REVIEW |
| **Row 7** | 2026-08-24T00:00:00 `|` Monday `|` Financial Statement Analysis - Consolidation `|` Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. `|` Additional practice questions + weak-area drilling `|` 1.3 `|` Medium `|` Completed `|` Yes `|` *(empty)* `|` REVIEW |
| **Row 8** | 2026-09-11T00:00:00 `|` Friday `|` Financial Statement Analysis - Consolidation `|` Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. `|` Additional practice questions + weak-area drilling `|` 1.4 `|` Medium `|` Completed `|` Yes `|` *(empty)* `|` REVIEW |
| **Row 9** | 2026-09-12T00:00:00 `|` Saturday `|` Introduction to Financial Statement Analysis `|` Describe the steps in the financial statement analysis framework | Describe the roles of financial statement analysis `|` Learn concepts + practice (Part 1 of 2) `|` 2 `|` High `|` Completed `|` Yes `|` *(empty)* `|` STUDY |
| *...* | *(35 more non-empty rows)* |

------------------------------------------------------------

### 6. Sheet: `M5 Equities`
- **Dimensions:** 41 rows × 11 columns (Non-empty rows: 40)
- **Merged Cell Ranges (2):** A3:F3, A2:D2

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | ← Back to Dashboard |
| **Row 2** | Equities |
| **Row 3** | 12 chapters | 37 learning outcomes | CFA 2027 Level I Topic Outlines |
| **Row 5** | Date `|` Day `|` Chapter / Topic `|` Subtopic / Learning Outcome(s) `|` Task `|` Planned Hours `|` Priority `|` Status `|` Completed `|` Notes `|` RowType |
| **Row 6** | 2026-08-10T00:00:00 `|` Monday `|` Equities - Consolidation `|` Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. `|` Additional practice questions + weak-area drilling `|` 1.3 `|` Medium `|` Not Started `|` No `|` *(empty)* `|` REVIEW |
| **Row 7** | 2026-08-25T00:00:00 `|` Tuesday `|` Equities - Consolidation `|` Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. `|` Additional practice questions + weak-area drilling `|` 1.3 `|` Medium `|` Not Started `|` No `|` *(empty)* `|` REVIEW |
| **Row 8** | 2026-09-12T00:00:00 `|` Saturday `|` Equities - Consolidation `|` Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. `|` Additional practice questions + weak-area drilling `|` 1 `|` Medium `|` Not Started `|` No `|` *(empty)* `|` REVIEW |
| **Row 9** | 2026-09-25T00:00:00 `|` Friday `|` Equities - Consolidation `|` Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. `|` Additional practice questions + weak-area drilling `|` 1.3 `|` Medium `|` Not Started `|` No `|` *(empty)* `|` REVIEW |
| *...* | *(32 more non-empty rows)* |

------------------------------------------------------------

### 7. Sheet: `M6 Fixed Income`
- **Dimensions:** 50 rows × 11 columns (Non-empty rows: 49)
- **Merged Cell Ranges (2):** A3:F3, A2:D2

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | ← Back to Dashboard |
| **Row 2** | Fixed Income |
| **Row 3** | 19 chapters | 51 learning outcomes | CFA 2027 Level I Topic Outlines |
| **Row 5** | Date `|` Day `|` Chapter / Topic `|` Subtopic / Learning Outcome(s) `|` Task `|` Planned Hours `|` Priority `|` Status `|` Completed `|` Notes `|` RowType |
| **Row 6** | 2026-08-11T00:00:00 `|` Tuesday `|` Fixed Income - Consolidation `|` Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. `|` Additional practice questions + weak-area drilling `|` 1.3 `|` Medium `|` Not Started `|` No `|` *(empty)* `|` REVIEW |
| **Row 7** | 2026-08-26T00:00:00 `|` Wednesday `|` Fixed Income - Consolidation `|` Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. `|` Additional practice questions + weak-area drilling `|` 1.3 `|` Medium `|` Not Started `|` No `|` *(empty)* `|` REVIEW |
| **Row 8** | 2026-09-13T00:00:00 `|` Sunday `|` Fixed Income - Consolidation `|` Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. `|` Additional practice questions + weak-area drilling `|` 1 `|` Medium `|` Not Started `|` No `|` *(empty)* `|` REVIEW |
| **Row 9** | 2026-09-26T00:00:00 `|` Saturday `|` Fixed Income - Consolidation `|` Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. `|` Additional practice questions + weak-area drilling `|` 1.1 `|` Medium `|` Not Started `|` No `|` *(empty)* `|` REVIEW |
| *...* | *(41 more non-empty rows)* |

------------------------------------------------------------

### 8. Sheet: `M7 Derivatives`
- **Dimensions:** 31 rows × 11 columns (Non-empty rows: 30)
- **Merged Cell Ranges (2):** A3:F3, A2:D2

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | ← Back to Dashboard |
| **Row 2** | Derivatives |
| **Row 3** | 10 chapters | 22 learning outcomes | CFA 2027 Level I Topic Outlines |
| **Row 5** | Date `|` Day `|` Chapter / Topic `|` Subtopic / Learning Outcome(s) `|` Task `|` Planned Hours `|` Priority `|` Status `|` Completed `|` Notes `|` RowType |
| **Row 6** | 2026-08-12T00:00:00 `|` Wednesday `|` Derivatives - Consolidation `|` Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. `|` Additional practice questions + weak-area drilling `|` 1.3 `|` Medium `|` Not Started `|` No `|` *(empty)* `|` REVIEW |
| **Row 7** | 2026-08-27T00:00:00 `|` Thursday `|` Derivatives - Consolidation `|` Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. `|` Additional practice questions + weak-area drilling `|` 0.7 `|` Medium `|` Not Started `|` No `|` *(empty)* `|` REVIEW |
| **Row 8** | 2026-09-14T00:00:00 `|` Monday `|` Derivatives - Consolidation `|` Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. `|` Additional practice questions + weak-area drilling `|` 1 `|` Medium `|` Not Started `|` No `|` *(empty)* `|` REVIEW |
| **Row 9** | 2026-09-27T00:00:00 `|` Sunday `|` Derivatives - Consolidation `|` Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. `|` Additional practice questions + weak-area drilling `|` 1.1 `|` Medium `|` Not Started `|` No `|` *(empty)* `|` REVIEW |
| *...* | *(22 more non-empty rows)* |

------------------------------------------------------------

### 9. Sheet: `M8 Alt Investments`
- **Dimensions:** 32 rows × 11 columns (Non-empty rows: 31)
- **Merged Cell Ranges (2):** A3:F3, A2:D2

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | ← Back to Dashboard |
| **Row 2** | Alternative Investments |
| **Row 3** | 7 chapters | 22 learning outcomes | CFA 2027 Level I Topic Outlines |
| **Row 5** | Date `|` Day `|` Chapter / Topic `|` Subtopic / Learning Outcome(s) `|` Task `|` Planned Hours `|` Priority `|` Status `|` Completed `|` Notes `|` RowType |
| **Row 6** | 2026-08-16T00:00:00 `|` Sunday `|` Alternative Investments - Consolidation `|` Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. `|` Additional practice questions + weak-area drilling `|` 1.3 `|` Medium `|` Not Started `|` No `|` *(empty)* `|` REVIEW |
| **Row 7** | 2026-08-28T00:00:00 `|` Friday `|` Alternative Investments - Consolidation `|` Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. `|` Additional practice questions + weak-area drilling `|` 0.7 `|` Medium `|` Not Started `|` No `|` *(empty)* `|` REVIEW |
| **Row 8** | 2026-09-15T00:00:00 `|` Tuesday `|` Alternative Investments - Consolidation `|` Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. `|` Additional practice questions + weak-area drilling `|` 1 `|` Medium `|` Not Started `|` No `|` *(empty)* `|` REVIEW |
| **Row 9** | 2026-09-28T00:00:00 `|` Monday `|` Alternative Investments - Consolidation `|` Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. `|` Additional practice questions + weak-area drilling `|` 1.1 `|` Medium `|` Not Started `|` No `|` *(empty)* `|` REVIEW |
| *...* | *(23 more non-empty rows)* |

------------------------------------------------------------

### 10. Sheet: `M9 Portfolio Constr`
- **Dimensions:** 35 rows × 11 columns (Non-empty rows: 34)
- **Merged Cell Ranges (2):** A3:F3, A2:D2

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | ← Back to Dashboard |
| **Row 2** | Portfolio Construction |
| **Row 3** | 6 chapters | 40 learning outcomes | CFA 2027 Level I Topic Outlines |
| **Row 5** | Date `|` Day `|` Chapter / Topic `|` Subtopic / Learning Outcome(s) `|` Task `|` Planned Hours `|` Priority `|` Status `|` Completed `|` Notes `|` RowType |
| **Row 6** | 2026-08-17T00:00:00 `|` Monday `|` Portfolio Construction - Consolidation `|` Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. `|` Additional practice questions + weak-area drilling `|` 1.3 `|` Medium `|` Not Started `|` No `|` *(empty)* `|` REVIEW |
| **Row 7** | 2026-09-01T00:00:00 `|` Tuesday `|` Portfolio Construction - Consolidation `|` Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. `|` Additional practice questions + weak-area drilling `|` 1 `|` Medium `|` Not Started `|` No `|` *(empty)* `|` REVIEW |
| **Row 8** | 2026-09-16T00:00:00 `|` Wednesday `|` Portfolio Construction - Consolidation `|` Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. `|` Additional practice questions + weak-area drilling `|` 1 `|` Medium `|` Not Started `|` No `|` *(empty)* `|` REVIEW |
| **Row 9** | 2026-09-29T00:00:00 `|` Tuesday `|` Portfolio Construction - Consolidation `|` Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. `|` Additional practice questions + weak-area drilling `|` 0.7 `|` Medium `|` Not Started `|` No `|` *(empty)* `|` REVIEW |
| *...* | *(26 more non-empty rows)* |

------------------------------------------------------------

### 11. Sheet: `M10 Ethics`
- **Dimensions:** 38 rows × 11 columns (Non-empty rows: 37)
- **Merged Cell Ranges (2):** A3:F3, A2:D2

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | ← Back to Dashboard |
| **Row 2** | Ethical and Professional Standards |
| **Row 3** | 10 chapters | 33 learning outcomes | CFA 2027 Level I Topic Outlines |
| **Row 5** | Date `|` Day `|` Chapter / Topic `|` Subtopic / Learning Outcome(s) `|` Task `|` Planned Hours `|` Priority `|` Status `|` Completed `|` Notes `|` RowType |
| **Row 6** | 2026-08-19T00:00:00 `|` Wednesday `|` Ethical and Professional Standards - Consolidation `|` Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. `|` Additional practice questions + weak-area drilling `|` 0.6 `|` Medium `|` Not Started `|` No `|` *(empty)* `|` REVIEW |
| **Row 7** | 2026-09-06T00:00:00 `|` Sunday `|` Ethical and Professional Standards - Consolidation `|` Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. `|` Additional practice questions + weak-area drilling `|` 1.3 `|` Medium `|` Not Started `|` No `|` *(empty)* `|` REVIEW |
| **Row 8** | 2026-09-17T00:00:00 `|` Thursday `|` Ethical and Professional Standards - Consolidation `|` Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. `|` Additional practice questions + weak-area drilling `|` 1 `|` Medium `|` Not Started `|` No `|` *(empty)* `|` REVIEW |
| **Row 9** | 2026-09-30T00:00:00 `|` Wednesday `|` Ethical and Professional Standards - Consolidation `|` Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. `|` Additional practice questions + weak-area drilling `|` 0.7 `|` Medium `|` Not Started `|` No `|` *(empty)* `|` REVIEW |
| *...* | *(29 more non-empty rows)* |

------------------------------------------------------------

### 12. Sheet: `Buffer Day`
- **Dimensions:** 9 rows × 6 columns (Non-empty rows: 4)
- **Merged Cell Ranges (1):** A5:F9

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | ← Back to Dashboard |
| **Row 2** | BUFFER DAY |
| **Row 3** | Date: Saturday, 21 November 2026 |
| **Row 5** | This day is intentionally left free of new syllabus content. Use it to catch up on any topic that took longer than planned, revisit a difficult concept from the past few weeks, or absorb an unexpected interruption without derailing the rest of the schedule. It sits at roughly the 60% mark of the pre-January-31 schedule (after Fixed Income begins) rather than at the very end, so backlog does not simply pile up until the last day. |

------------------------------------------------------------

### 13. Sheet: `Feb Revision`
- **Dimensions:** 33 rows × 10 columns (Non-empty rows: 32)

**Structure & Sample Rows:**

| Row # | Content / Columns |
| :--- | :--- |
| **Row 1** | ← Back to Dashboard |
| **Row 2** | February Revision Plan |
| **Row 3** | Revision -> Practice -> Weak Areas -> Mock Tests -> Final Revision |
| **Row 5** | Date `|` Day `|` Revision Round / Phase `|` Module `|` Activity `|` Planned Hours `|` Status `|` Score / Result `|` Weak Areas Identified `|` Notes |
| **Row 6** | 2027-02-01T00:00:00 `|` Monday `|` First Revision `|` Quantitative Methods `|` Full re-read of notes/summaries + key formulas `|` 3 `|` Not Started |
| **Row 7** | 2027-02-02T00:00:00 `|` Tuesday `|` First Revision `|` Economics `|` Full re-read of notes/summaries + key formulas `|` 3 `|` Not Started |
| **Row 8** | 2027-02-03T00:00:00 `|` Wednesday `|` First Revision `|` Corporate Finance `|` Full re-read of notes/summaries + key formulas `|` 3 `|` Not Started |
| **Row 9** | 2027-02-04T00:00:00 `|` Thursday `|` First Revision `|` Financial Statement Analysis `|` Full re-read of notes/summaries + key formulas `|` 3 `|` Not Started |
| *...* | *(24 more non-empty rows)* |

------------------------------------------------------------
