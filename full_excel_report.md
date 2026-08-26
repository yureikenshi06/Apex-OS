# Workbook: `Prakhar_Super_Timetable.xlsx`

- **Path:** `c:\Users\singh\Downloads\Prakhar_Super_Timetable.xlsx`
- **Total Sheets:** 13
- **Sheet Names:** `Instructions`, `Dashboard`, `Settings`, `Master Timetable`, `Daily Planner`, `Task Tracker`, `CFA Tracker`, `Placement Tracker`, `Academic Tracker`, `Fitness Tracker`, `Personal Brand`, `Habit Tracker`, `Weekly Review`

## 1. Sheet: `Instructions`
- **Dimensions:** 29 rows x 6 columns (Non-empty rows: 23)
- **Merged Cell Ranges (1):** A1:F1

### Row Structure & Sample Data:
```text
Row   1 (1 cols): HOW TO USE THIS WORKBOOK EVERY DAY
Row   3 (2 cols):  | Every morning (2 minutes)
Row   4 (2 cols):  | 1. Open Daily Planner. Today's rows are already there (planned block by block) — no need to add anything.
Row   5 (2 cols):  | 2. Glance at Dashboard for yesterday's Daily Score and today's Overload status.
Row   7 (2 cols):  | Through the day
Row   8 (2 cols):  | 3. As you complete (or skip) each block, fill in the yellow cells on Daily Planner: Actual Activity, Actual Duration, Completion Status (dropdown), Energy Level (dropdown), Notes.
Row   9 (2 cols):  | 4. If a task changes shape entirely (e.g. an interview gets scheduled over a Placement Flex Block), just overwrite Actual Activity and Category for that row — everything downstream recalculates.
Row  11 (2 cols):  | Once a week — Saturday 20:00-21:00 Weekly Planning Session
Row  12 (2 cols):  | 5. Open Weekly Review. Fill sections 1-3 (review last week, log next week's known events/deadlines, set top 5 priorities).
Row  13 (2 cols):  | 6. Copy next week's block of rows in Daily Planner downward (select this week's 154 rows, copy, paste below, update the Date column) and adjust any Actual columns back to blank/yellow.
Row  14 (2 cols):  | 7. If Dashboard's Overload Indicator shows Heavy/Red for an upcoming day, use section 5 of Weekly Review to decide what moves to a Flex Block, following the cut order: P3 first, then P2, only then trim (never cancel) a P1 block. Never touch sleep or fixed classes.
Row  16 (2 cols):  | Keeping the trackers current
Row  17 (2 cols):  | 8. CFA Tracker: log a row whenever you finish a topic, question set, or mock — CFA Hours (auto) already pulls from Daily Planner, this tracker is for topic-level detail and accuracy.
Row  18 (2 cols):  | 9. Placement Tracker: add a row per company/opportunity as soon as it appears; update Status as you move through the pipeline.
Row  19 (2 cols):  | 10. Academic Tracker: add assignment/test rows under the relevant course as they're announced.
```

## 2. Sheet: `Dashboard`
- **Dimensions:** 46 rows x 12 columns (Non-empty rows: 22)
- **Merged Cell Ranges (17):** A4:B4, G4:H4, A2:L2, E4:F4, I4:J4, A19:L19, A1:L1, C5:D6 ...

### Row Structure & Sample Data:
```text
Row   1 (1 cols): PRAKHAR'S SUPER TIMETABLE — WEEKLY DASHBOARD
Row   2 (1 cols): Auto-updates from Daily Planner, Habit Tracker, Fitness Tracker & CFA/Placement/Academic Trackers. Week of 24-30 Aug 2026.
Row   4 (11 cols): Overall Completion |  | CFA Hours |  | Placement Hours |  | Academic Hours |  | Gym Sessions |  | Avg Sleep Hrs
Row   5 (11 cols): 0 |  | 13.75 |  | 9.5 |  | 6.25 |  | 0 |  | 0
Row   9 (1 cols): OVERLOAD INDICATOR (this week, by day)
Row  10 (6 cols): Date | Day | Fixed Hrs (class+travel+meals) | Deep-Work Hrs (CFA+Placement+Academic) | Total Scheduled Hrs | Status
Row  11 (6 cols): 2026-08-24 | Mon | 7.25 | 4.917 | 12.17 | Overloaded
Row  12 (6 cols): 2026-08-25 | Tue | 8 | 4.417 | 12.42 | Overloaded
Row  13 (6 cols): 2026-08-26 | Wed | 4.5 | 5.75 | 10.25 | Heavy
Row  14 (6 cols): 2026-08-27 | Thu | 7.25 | 4.917 | 12.17 | Overloaded
Row  15 (6 cols): 2026-08-28 | Fri | 6.5 | 1.5 | 8 | Sustainable
Row  16 (6 cols): 2026-08-29 | Sat | 2.5 | 4.5 | 7 | Sustainable
Row  17 (6 cols): 2026-08-30 | Sun | 2 | 3.5 | 5.5 | Sustainable
Row  19 (1 cols): Thresholds: <=9.5 hrs = Sustainable, 9.5-11 hrs = Heavy, >11 hrs = Overloaded. Edit in Settings if your pace differs.
Row  39 (1 cols): PLANNED VS ACTUAL MINUTES BY CATEGORY (this week, helper table for chart)
```

## 3. Sheet: `Settings`
- **Dimensions:** 54 rows x 6 columns (Non-empty rows: 48)
- **Merged Cell Ranges (7):** A2:F2, A31:C31, A1:F1, A13:E13, A51:D51, A15:C15, A4:C4

### Row Structure & Sample Data:
```text
Row   1 (1 cols): SETTINGS — edit these to reshape the whole workbook
Row   2 (1 cols): Change wake/sleep time, gym frequency, category weights, or dropdown lists here. Every other sheet reads from this sheet — nothing else needs to be rebuilt.
Row   4 (1 cols): CORE PARAMETERS
Row   5 (2 cols): Target wake time | 06:00
Row   6 (2 cols): Target sleep time | 22:30
Row   7 (2 cols): Target sleep hours (min) | 7.5
Row   8 (2 cols): Gym sessions / week target | 4
Row   9 (2 cols): CFA hours / week target | 12
Row  10 (2 cols): Placement hours / week target | 10
Row  11 (2 cols): Novel reading min / day target | 30
Row  12 (2 cols): Hostel-to-class travel buffer (min) | 30
Row  13 (1 cols): Blue cells = editable inputs used by formulas elsewhere in the workbook.
Row  15 (1 cols): CATEGORY WEIGHTS (used in Daily Score)
Row  16 (4 cols): Category | Weight (score) | Priority tier | Color tag
Row  17 (4 cols): CFA | 3 | P1 | CFA
```

## 4. Sheet: `Master Timetable`
- **Dimensions:** 63 rows x 9 columns (Non-empty rows: 59)
- **Merged Cell Ranges (120):** E39:E40, C29:C30, D21:D22, C22:C28, B42:B43, G10:G11, D45:D46, B29:B30 ...

### Row Structure & Sample Data:
```text
Row   1 (1 cols): MASTER TIMETABLE — Ideal / Normal Recurring Week (edit times in Col A; classes are fixed)
Row   2 (1 cols): Mon & Thu = single 11:30 class + 15:30-18:00 block. Tue = continuous campus day 11:30-18:00 (incl. new DE 343, 1-3pm). Wed & Fri = only a morning class block (8:00-10:30) — your lightest, most flexible days. Sat/Sun = weekend structure. Colors match category weights in Settings. This is the NORMAL day template — see Heavy/Recovery variants and day-type notes in rows below the grid.
Row   4 (8 cols): Time | MON | TUE | WED | THU | FRI | SAT | SUN
Row   5 (6 cols): 06:00 | Wake + Hydration/Hygiene
06:00-06:20 | Wake + Hydration/Hygiene
06:00-06:20 | Wake + Hydration/Hygiene
06:00-06:15 | Wake + Hydration/Hygiene
06:00-06:20 | Wake + Hydration/Hygiene
06:00-06:15
Row   6 (6 cols): 06:15 |  |  | Light Movement / Stretch
06:15-06:45 |  | Light Movement / Stretch
06:15-06:45
Row   7 (5 cols): 06:20 | Light Movement / Stretch
06:20-06:50 | Light Movement / Stretch
06:20-06:50 |  | Light Movement / Stretch
06:20-06:50
Row   8 (6 cols): 06:45 |  |  | Breakfast (quick)
06:45-07:00 |  | Breakfast (quick)
06:45-07:00
Row   9 (5 cols): 06:50 | Novel Reading
06:50-07:20 | Novel Reading
06:50-07:20 |  | Novel Reading
06:50-07:20
Row  10 (7 cols): 07:00 |  |  | Novel Reading
07:00-07:30 |  | Novel Reading
07:00-07:30 | Hygiene / Hydration
07:00-07:30
Row  11 (5 cols): 07:20 | CFA — Concept Study (Deep Work)
07:20-08:30 | CFA — Concept Study (Deep Work)
07:20-08:30 |  | CFA — Concept Study (Deep Work)
07:20-08:30
Row  12 (8 cols): 07:30 |  |  | Travel to Class
07:30-08:00 |  | Travel to Class
07:30-08:00 | Novel Reading (extended)
07:30-08:00 | Hygiene / Hydration
07:30-08:00
Row  13 (8 cols): 08:00 |  |  | CE725 Class
08:00-09:00 |  | CE725 Class
08:00-09:00 | Breakfast
08:00-08:30 | Novel Reading (extended)
08:00-08:30
Row  14 (8 cols): 08:30 | Breakfast
08:30-09:00 | Breakfast
08:30-09:00 |  | Breakfast
08:30-09:00 |  | CFA — Deep Work / Mock Test Section
08:30-10:30 | Breakfast
08:30-09:00
Row  15 (8 cols): 09:00 | Placement — Technical/Quant (Deep Work)
09:00-10:30 | Placement — Finance/Behavioral Prep
09:00-10:30 | Break (on campus)
09:00-09:30 | Placement — Aptitude/Case Prep (Deep Work)
09:00-10:30 | Break (on campus)
09:00-09:30 |  | CFA — Full-Length Mock / Practice
09:00-10:30
Row  16 (6 cols): 09:30 |  |  | EC457 Class
09:30-10:30 |  | EC457 Class
09:30-10:30
```

## 5. Sheet: `Daily Planner`
- **Dimensions:** 157 rows x 16 columns (Non-empty rows: 156)
- **Merged Cell Ranges (2):** A1:P1, A2:P2

### Row Structure & Sample Data:
```text
Row   1 (1 cols): DAILY PLANNER — log Planned vs Actual every day
Row   2 (1 cols): Pre-filled with the current week (24-30 Aug 2026) from the Master Timetable. Copy the whole block downward for future weeks and just change the Date/Day. Yellow cells are for you to fill in daily. Weight & Score Input are helper columns that power the Daily Score on the Habit Tracker / Dashboard — leave them alone.
Row   4 (16 cols): Date | Day | Planned Activity | Actual Activity | Start Time | End Time | Category | Priority | Planned Duration (min) | Actual Duration (min) | Completion Status | Energy Level (1-5) | Notes | Reason for Missed | Weight | Score Input
Row   5 (16 cols): 2026-08-24 | Mon | Wake + Hydration/Hygiene |  | 06:00 | 06:20 | Personal Care | P0 | 20 |  |  |  |  |  | 0 | 0
Row   6 (16 cols): 2026-08-24 | Mon | Light Movement / Stretch |  | 06:20 | 06:50 | Fitness | P2 | 30 |  |  |  |  |  | 1.5 | 0
Row   7 (16 cols): 2026-08-24 | Mon | Novel Reading |  | 06:50 | 07:20 | Reading | P3 | 30 |  |  |  |  |  | 0.5 | 0
Row   8 (16 cols): 2026-08-24 | Mon | CFA — Concept Study (Deep Work) |  | 07:20 | 08:30 | CFA | P1 | 70 |  |  |  |  |  | 3 | 0
Row   9 (16 cols): 2026-08-24 | Mon | Breakfast |  | 08:30 | 09:00 | Meal | P0 | 30 |  |  |  |  |  | 0 | 0
Row  10 (16 cols): 2026-08-24 | Mon | Placement — Technical/Quant (Deep Work) |  | 09:00 | 10:30 | Placement | P1 | 90 |  |  |  |  |  | 3 | 0
Row  11 (16 cols): 2026-08-24 | Mon | Free / Buffer |  | 10:30 | 11:00 | Free | P3 | 30 |  |  |  |  |  | 0 | 0
Row  12 (16 cols): 2026-08-24 | Mon | Travel to Class |  | 11:00 | 11:30 | Travel | P0 | 30 |  |  |  |  |  | 0 | 0
Row  13 (16 cols): 2026-08-24 | Mon | BB627 Class |  | 11:30 | 12:30 | Class | P0 | 60 |  |  |  |  |  | 0 | 0
Row  14 (16 cols): 2026-08-24 | Mon | Travel to Hostel |  | 12:30 | 13:00 | Travel | P0 | 30 |  |  |  |  |  | 0 | 0
Row  15 (16 cols): 2026-08-24 | Mon | Lunch |  | 13:00 | 13:45 | Meal | P0 | 45 |  |  |  |  |  | 0 | 0
Row  16 (16 cols): 2026-08-24 | Mon | Academic Revision / Assignments |  | 13:45 | 15:00 | Academic | P2 | 75 |  |  |  |  |  | 2 | 0
```

## 6. Sheet: `Task Tracker`
- **Dimensions:** 44 rows x 10 columns (Non-empty rows: 3)
- **Merged Cell Ranges (2):** A1:J1, A2:J2

### Row Structure & Sample Data:
```text
Row   1 (1 cols): TASK TRACKER — everything that isn't a recurring timetable block
Row   2 (1 cols): Use for one-off tasks: assignments, applications, errands, admin. Filter by Status or Priority.
Row   4 (10 cols): Task | Category | Priority | Deadline | Status | Estimated Hours | Actual Hours | Owner Note | Linked Area | Date Added
```

## 7. Sheet: `CFA Tracker`
- **Dimensions:** 37 rows x 10 columns (Non-empty rows: 4)
- **Merged Cell Ranges (2):** A1:J1, A2:J2

### Row Structure & Sample Data:
```text
Row   1 (1 cols): CFA LEVEL I TRACKER — 2027 target
Row   2 (1 cols): Links to the existing CFA Level I 2027 study planner (181-day schedule, Aug 2026-Jan 2027). Log topic-level progress here week to week.
Row   4 (10 cols): Week Of | Topic / Reading | Activity Type | Planned Hours | Actual Hours | Questions Done | Accuracy % | Revision Status | Mock Score | Notes
Row  37 (4 cols): CFA HOURS THIS WEEK (auto, from Daily Planner) |  |  | 13.75
```

## 8. Sheet: `Placement Tracker`
- **Dimensions:** 37 rows x 11 columns (Non-empty rows: 4)
- **Merged Cell Ranges (2):** A2:K2, A1:K1

### Row Structure & Sample Data:
```text
Row   1 (1 cols): PLACEMENT TRACKER — companies, applications & interviews
Row   2 (1 cols): Use the Placement/Career Flex Blocks in the timetable to work through this list. Update Status as things move.
Row   4 (11 cols): Company | Role | Prep Area | Application Status | Test/Interview Date | Prep Hours Logged | Mock Interviews Done | Networking Contact | Result | Priority | Notes
Row  37 (4 cols): PLACEMENT HOURS THIS WEEK (auto, from Daily Planner) |  |  | 9.5
```

## 9. Sheet: `Academic Tracker`
- **Dimensions:** 33 rows x 9 columns (Non-empty rows: 11)
- **Merged Cell Ranges (2):** A1:I1, A2:I2

### Row Structure & Sample Data:
```text
Row   1 (1 cols): ACADEMIC TRACKER — courses this term
Row   2 (1 cols): Pre-filled with your current courses from the timetable. Add assignments/tests as rows.
Row   4 (9 cols): Course Code | Course Name | Item (assignment/test/lab) | Deadline | Status | Revision Status | Priority | Hours Logged | Notes
Row   5 (1 cols): BB627
Row   6 (1 cols): CE725
Row   7 (1 cols): EC457
Row   8 (1 cols): AE641
Row   9 (1 cols): PS643
Row  10 (1 cols): HS449
Row  11 (1 cols): DE 343
Row  33 (4 cols): ACADEMIC HOURS THIS WEEK (auto, from Daily Planner) |  |  | 6.25
```

## 10. Sheet: `Fitness Tracker`
- **Dimensions:** 40 rows x 8 columns (Non-empty rows: 7)
- **Merged Cell Ranges (2):** A2:H2, A1:H1

### Row Structure & Sample Data:
```text
Row   1 (1 cols): FITNESS TRACKER — target 4 sessions / week (Mon, Wed, Fri, Sat)
Row   2 (1 cols): Log each gym session. Consistency % below compares Sessions Done to the weekly target in Settings.
Row   4 (8 cols): Date | Day | Workout Type | Duration (min) | Intensity (1-5) | Completed? | Energy After | Notes
Row  37 (1 cols): THIS WEEK'S CONSISTENCY
Row  38 (2 cols): Sessions logged | 0
Row  39 (2 cols): Target | 4
Row  40 (2 cols): Consistency % | 0
```

## 11. Sheet: `Personal Brand`
- **Dimensions:** 41 rows x 9 columns (Non-empty rows: 8)
- **Merged Cell Ranges (11):** A41:C41, A2:I2, D38:I38, A37:I37, D40:I40, D41:I41, A1:I1, A40:C40 ...

### Row Structure & Sample Data:
```text
Row   1 (1 cols): PERSONAL BRAND — X/Twitter + Substack
Row   2 (1 cols): Track content ideas through to publishing. Keep X sessions short (daily flex); reserve 1-2 deeper Substack sessions/week (Fri + Sat in the timetable).
Row   4 (9 cols): Platform | Content Idea / Title | Stage | Date Drafted | Date Published | Time Spent (min) | Views/Engagement | Likes/Replies | Notes
Row  37 (1 cols): WEEKLY CONTENT/PERSONAL BRAND REVIEW (Fri evening slot)
Row  38 (1 cols): • What published this week?
Row  39 (1 cols): • What performed best, and why?
Row  40 (1 cols): • Next week's 1-2 content ideas:
Row  41 (1 cols): • Substack deep-session used well? (Y/N + note)
```

## 12. Sheet: `Habit Tracker`
- **Dimensions:** 22 rows x 13 columns (Non-empty rows: 20)
- **Merged Cell Ranges (2):** A2:M2, A1:M1

### Row Structure & Sample Data:
```text
Row   1 (1 cols): HABIT TRACKER — daily score & core habits
Row   2 (1 cols): Daily Score = weighted completion of important activities (SUMPRODUCT of Category weight x Completion value from the Daily Planner, divided by total scheduled weight for that date) x 100. CFA/Placement/Academic count most; Reading/Personal Brand count least; Class/Meal/Travel/Sleep are unweighted (always expected, not scored).
Row   4 (13 cols): Date | Day | Wake Time | Sleep Time | Sleep Hours | Gym? (Y/N) | Reading (min) | CFA Hours | Placement Hours | Academic Hours | X/Substack Hours | Overall Completion % | Daily Score
Row   5 (13 cols): 2026-08-24 | Mon |  |  |  |  | 30 | 2.167 | 1.5 | 1.25 | 0.5 | 0 | 0
Row   6 (13 cols): 2026-08-25 | Tue |  |  |  |  | 30 | 1.917 | 1.5 | 1 | 0.5 | 0 | 0
Row   7 (13 cols): 2026-08-26 | Wed |  |  |  |  | 30 | 2.5 | 2.5 | 0.75 | 0.5 | 0 | 0
Row   8 (13 cols): 2026-08-27 | Thu |  |  |  |  | 60 | 2.167 | 1.5 | 1.25 | 0 | 0 | 0
Row   9 (13 cols): 2026-08-28 | Fri |  |  |  |  | 30 | 1.5 | 0 | 0 | 1.5 | 0 | 0
Row  10 (13 cols): 2026-08-29 | Sat |  |  |  |  | 30 | 2 | 1.5 | 1 | 1 | 0 | 0
Row  11 (13 cols): 2026-08-30 | Sun |  |  |  |  | 60 | 1.5 | 1 | 1 | 0.5 | 0 | 0
Row  13 (1 cols): WEEKLY AVERAGES / TOTALS
Row  14 (2 cols): Avg Sleep Hours | 0
Row  15 (2 cols): Gym Sessions | 0
Row  16 (2 cols): Total Reading (min) | 270
Row  17 (2 cols): Total CFA Hours | 13.75
```

## 13. Sheet: `Weekly Review`
- **Dimensions:** 47 rows x 6 columns (Non-empty rows: 27)
- **Merged Cell Ranges (24):** A16:F16, A46:F46, B7:C7, B30:E30, A27:F27, B12:C12, B32:E32, A2:F2 ...

### Row Structure & Sample Data:
```text
Row   1 (1 cols): WEEKLY REVIEW & PLANNING SESSION
Row   2 (1 cols): Do this during the Saturday 20:00-21:00 Weekly Planning Session block. Takes ~45-60 min. Enter next week's known events so the Overload Indicator can flag conflicts early.
Row   4 (1 cols): Week of
Row   6 (1 cols): 1. REVIEW LAST WEEK
Row   7 (1 cols): • CFA progress (topics covered, hours vs target)
Row   8 (1 cols): • Academic workload (assignments/tests handled)
Row   9 (1 cols): • Placement progress (applications, interviews, prep)
Row  10 (1 cols): • Gym sessions completed vs target (4)
Row  11 (1 cols): • Personal brand output (X posts, Substack pieces)
Row  12 (1 cols): • Reading consistency (days with novel reading)
Row  13 (1 cols): • Sleep consistency (avg hours, wake-time consistency)
Row  14 (1 cols): • Missed tasks and why
Row  16 (1 cols): 2. UPCOMING NEXT WEEK (enter known events)
Row  17 (5 cols): Event/Deadline | Date | Type | Prep Needed? | Notes
Row  27 (1 cols): 3. NEXT WEEK'S TOP PRIORITIES (max 5)
```

# Workbook: `Personal_Expense_Tracker.xlsx`

- **Path:** `c:\Users\singh\Downloads\Personal_Expense_Tracker.xlsx`
- **Total Sheets:** 12
- **Sheet Names:** `Dashboard`, `Transactions`, `Quick Entry`, `Monthly Analysis`, `Weekly Analysis`, `Yearly Analysis`, `Budgets`, `Recurring Expenses`, `People-Splits`, `Net Worth`, `Financial Review`, `Settings`

## 1. Sheet: `Dashboard`
- **Dimensions:** 95 rows x 12 columns (Non-empty rows: 37)
- **Merged Cell Ranges (29):** D11:F11, A75:L75, A74:L74, A12:C12, A3:L3, J11:L11, A76:L76, A71:L71 ...

### Row Structure & Sample Data:
```text
Row   1 (1 cols): PERSONAL FINANCE DASHBOARD
Row   3 (1 cols): Selected Period
Row   4 (3 cols):  |  | Viewing
Row   5 (3 cols): Month (1-12) | 8 | August 2026
Row   6 (2 cols): Year | 2026
Row   8 (10 cols): INCOME |  |  | EXPENSES |  |  | SAVINGS |  |  | SAVINGS RATE
Row   9 (10 cols): 85000 |  |  | 35417 |  |  | 49583 |  |  | 0.5833
Row  11 (10 cols): BUDGET USED |  |  | AVG DAILY SPEND |  |  | # TRANSACTIONS |  |  | LARGEST EXPENSE
Row  12 (10 cols): 0.6499 |  |  | 1142 |  |  | 13 |  |  | 22000
Row  51 (1 cols): Top 5 Spending Categories (Selected Month)
Row  52 (3 cols): Rank | Category | Amount
Row  53 (3 cols): 1 | Housing | 22999
Row  54 (3 cols): 2 | Food | 3550
Row  55 (3 cols): 3 | Shopping | 3200
Row  56 (3 cols): 4 | Transport | 2600
```

## 2. Sheet: `Transactions`
- **Dimensions:** 3000 rows x 28 columns (Non-empty rows: 65)
- **Merged Cell Ranges (1):** A1:AA1

### Row Structure & Sample Data:
```text
Row   1 (1 cols): TRANSACTIONS — Master Database  (this is the only sheet you normally add rows to)
Row   3 (27 cols): Transaction ID | Date | Day | Week # | Month | Year | Transaction Type | Category | Subcategory | Description | Amount | Payment Method | Account/Wallet | Merchant/Payee | Assigned To | Need/Want | Essential/Discretionary | Recurring? | Recurring Frequency | Status | Paid By Me | My Share | Recoverable | Recovered | Outstanding | Notes | Tags
Row   4 (27 cols): T0001 | 2026-05-01T00:00:00 | Fri | 18 | May | 2026 | Income |  |  | Monthly Salary | 85000 | Bank Transfer | Bank Account | Employer Pvt Ltd | Self |  |  | No |  | Completed | 85000 | 85000 | 0 | 0 | 0 |  | salary
Row   5 (28 cols): T0002 | 2026-05-02T00:00:00 | Sat | 18 | May | 2026 | Expense | Food | Groceries | Weekly groceries - BigBasket | 2400 | UPI | Bank Account | BigBasket | Self | Need | Essential | No |  | Completed | 2400 | 2400 | 0 | 0 | 0 |  | groceries | 2400
Row   6 (28 cols): T0003 | 2026-05-03T00:00:00 | Sun | 19 | May | 2026 | Expense | Transport | Fuel | Petrol fill-up | 1800 | Credit Card | Credit Card | HP Petrol Pump | Self | Need | Essential | No |  | Completed | 1800 | 1800 | 0 | 0 | 0 |  | fuel | 1800
Row   7 (28 cols): T0004 | 2026-05-05T00:00:00 | Tue | 19 | May | 2026 | Expense | Housing | Rent | Monthly rent | 22000 | Bank Transfer | Bank Account | Landlord | Self | Need | Essential | Yes | Monthly | Completed | 22000 | 22000 | 0 | 0 | 0 |  | rent,recurring | 22000
Row   8 (28 cols): T0005 | 2026-05-06T00:00:00 | Wed | 19 | May | 2026 | Expense | Entertainment | Streaming | Netflix subscription | 649 | Credit Card | Credit Card | Netflix | Self | Want | Discretionary | Yes | Monthly | Completed | 649 | 649 | 0 | 0 | 0 |  | subscription,recurring | 649
Row   9 (28 cols): T0006 | 2026-05-07T00:00:00 | Thu | 19 | May | 2026 | Expense | Food | Restaurants | Dinner with friends | 3000 | UPI | UPI | The Bistro | Friend | Want | Discretionary | No |  | Completed | 3000 | 1500 | 1500 | 1500 | 0 | Split with Friend A - my share is half | split | 1500
Row  10 (28 cols): T0007 | 2026-05-08T00:00:00 | Fri | 19 | May | 2026 | Expense | Health | Gym | Gym monthly fee | 1500 | UPI | Bank Account | FitZone Gym | Self | Want | Discretionary | Yes | Monthly | Completed | 1500 | 1500 | 0 | 0 | 0 |  | recurring | 1500
Row  11 (28 cols): T0008 | 2026-05-10T00:00:00 | Sun | 20 | May | 2026 | Expense | Shopping | Clothing | New shoes | 2200 | Credit Card | Credit Card | Nike Store | Self | Want | Discretionary | No |  | Completed | 2200 | 2200 | 0 | 0 | 0 |  | shopping | 2200
Row  12 (28 cols): T0009 | 2026-05-12T00:00:00 | Tue | 20 | May | 2026 | Expense | Housing | Electricity | Electricity bill | 1800 | Net Banking | Bank Account | State Electricity Board | Self | Need | Essential | No |  | Completed | 1800 | 1800 | 0 | 0 | 0 |  | utility | 1800
Row  13 (28 cols): T0010 | 2026-05-14T00:00:00 | Thu | 20 | May | 2026 | Expense | Housing | Internet | Broadband bill | 999 | Net Banking | Bank Account | ACT Fibernet | Self | Need | Essential | Yes | Monthly | Completed | 999 | 999 | 0 | 0 | 0 |  | recurring | 999
Row  14 (28 cols): T0011 | 2026-05-15T00:00:00 | Fri | 20 | May | 2026 | Expense | Food | Cafes | Coffee with colleague | 350 | UPI | UPI | Starbucks | Self | Want | Discretionary | No |  | Completed | 350 | 350 | 0 | 0 | 0 |  | coffee | 350
Row  15 (28 cols): T0012 | 2026-05-18T00:00:00 | Mon | 21 | May | 2026 | Expense | Transport | Taxi | Cab to airport | 850 | UPI | UPI | Ola | Self | Need | Essential | No |  | Completed | 850 | 850 | 0 | 0 | 0 |  | travel | 850
Row  16 (28 cols): T0013 | 2026-05-20T00:00:00 | Wed | 21 | May | 2026 | Expense | Entertainment | Movies | Movie night | 600 | Credit Card | Credit Card | PVR Cinemas | Self | Want | Discretionary | No |  | Completed | 600 | 600 | 0 | 0 | 0 |  | movie | 600
```

## 3. Sheet: `Quick Entry`
- **Dimensions:** 20 rows x 27 columns (Non-empty rows: 15)
- **Merged Cell Ranges (4):** A1:D1, A18:D18, A3:D3, A5:B5

### Row Structure & Sample Data:
```text
Row   1 (1 cols): QUICK ENTRY — Fast daily transaction entry
Row   3 (1 cols): HOW TO USE: Fill in the 7 highlighted fields below for a new expense. Everything else is generated automatically in the 'Ready to Paste' row. Copy that row (Ctrl+C) and paste it (paste values, Ctrl+Shift+V) into the first blank row at the bottom of the Transactions sheet. For income, transfers, splits or anything more detailed, enter directly on the Transactions sheet instead.
Row   5 (1 cols): Enter Transaction
Row   6 (2 cols): Date | 2026-08-25T00:00:00
Row   7 (2 cols): Amount | 500
Row   8 (2 cols): Category | Food
Row   9 (2 cols): Subcategory | Groceries
Row  10 (2 cols): Description | Sample entry
Row  11 (2 cols): Payment Method | UPI
Row  12 (2 cols): Account | Bank Account
Row  14 (2 cols): Optional: Assigned To | Self
Row  15 (1 cols): Optional: Merchant/Payee
Row  18 (1 cols): Ready to Paste — copy A20:AA20 into Transactions
Row  19 (27 cols): Transaction ID | Date | Day | Week # | Month | Year | Transaction Type | Category | Subcategory | Description | Amount | Payment Method | Account/Wallet | Merchant/Payee | Assigned To | Need/Want | Essential/Discretionary | Recurring? | Recurring Frequency | Status | Paid By Me | My Share | Recoverable | Recovered | Outstanding | Notes | Tags
Row  20 (25 cols): T0064 | 2026-08-25T00:00:00 | Tue | 35 | Aug | 2026 | Expense | Food | Groceries | Sample entry | 500 | UPI | Bank Account | 0 | Self |  |  | No |  | Completed | 500 | 500 | 0 | 0 | 0
```

## 4. Sheet: `Monthly Analysis`
- **Dimensions:** 101 rows x 8 columns (Non-empty rows: 91)
- **Merged Cell Ranges (9):** A21:H21, A86:B86, D86:E86, G86:H86, A35:D35, A98:B98, D98:E98, A10:H10 ...

### Row Structure & Sample Data:
```text
Row   1 (1 cols): MONTHLY ANALYSIS — Selected-Month Deep Dive
Row   3 (1 cols): Select Month & Year:
Row   4 (1 cols): (Selector lives on the Dashboard — linked here)
Row   5 (7 cols): Month (1-12) | 8 | 2026-08-01T00:00:00 | Period Start | 2026-08-31T00:00:00 | August 2026 | Showing:
Row   6 (4 cols): Year | 2026 |  | Period End
Row   7 (5 cols): (Previous month, auto) |  | 2026-07-01T00:00:00 |  | 2026-07-31T00:00:00
Row   8 (5 cols): (Same month last year, auto) |  | 2025-08-01T00:00:00 |  | 2025-08-31T00:00:00
Row  10 (1 cols): Financial Summary
Row  11 (5 cols): Total Income | 85000 |  | Prev. Month Income | 85000
Row  12 (5 cols): Total Expenses | 35417 |  | Prev. Month Expenses | 54566
Row  13 (5 cols): Net Cash Flow | 49583 |  | Prev. Month Savings | 30434
Row  14 (5 cols): Savings (Income - Expenses) | 49583 |  | Income Change % | 0
Row  15 (5 cols): Savings Rate | 0.5833 |  | Expense Change % | -0.3509
Row  16 (5 cols): Number of Transactions | 13 |  | Savings Change % | 0.6292
Row  17 (5 cols): Average Daily Spending | 1142 |  | Same-Month-LY Expenses | 0
```

## 5. Sheet: `Weekly Analysis`
- **Dimensions:** 37 rows x 7 columns (Non-empty rows: 32)
- **Merged Cell Ranges (4):** A5:D5, A17:E17, A1:G1, A29:D29

### Row Structure & Sample Data:
```text
Row   1 (1 cols): WEEKLY ANALYSIS
Row   3 (6 cols): Week Start Date (any date; auto-snaps to Monday) | 2026-08-17T00:00:00 | 2026-08-17T00:00:00 | Week Start (Mon) | 2026-08-23T00:00:00 | Week End (Sun)
Row   5 (1 cols): Weekly Summary
Row   6 (2 cols): Total Spending | 1450
Row   7 (2 cols): Total Income | 0
Row   8 (2 cols): Net Cash Flow | -1450
Row   9 (2 cols): Daily Average Spending | 207.1
Row  10 (2 cols): Number of Transactions | 3
Row  11 (2 cols): Essential Spending | 300
Row  12 (2 cols): Discretionary Spending | 1150
Row  13 (2 cols): Approx. Weekly Budget (Monthly/4.345) | 1.254e+04
Row  14 (2 cols): Budget Utilization % | 0.1156
Row  17 (1 cols): Spending by Day of the Selected Week
Row  18 (5 cols): Day | Date | Spending | Income | Transactions
Row  19 (5 cols): Monday | 2026-08-17T00:00:00 | 0 | 0 | 0
```

## 6. Sheet: `Yearly Analysis`
- **Dimensions:** 45 rows x 8 columns (Non-empty rows: 39)
- **Merged Cell Ranges (4):** A5:D5, A34:E34, A13:E13, A1:H1

### Row Structure & Sample Data:
```text
Row   1 (1 cols): YEARLY ANALYSIS
Row   3 (2 cols): Select Year | 2026
Row   5 (1 cols): Annual Summary
Row   6 (2 cols): Annual Income | 352000
Row   7 (2 cols): Annual Expenses | 165598
Row   8 (2 cols): Annual Savings | 186402
Row   9 (2 cols): Savings Rate | 0.5296
Row  10 (2 cols): Monthly Avg Spending | 1.38e+04
Row  11 (2 cols): Monthly Avg Income | 2.933e+04
Row  13 (1 cols): Month-by-Month Comparison
Row  14 (5 cols): Month | Income | Expenses | Savings | Savings Rate
Row  15 (5 cols): Jan | 0 | 0 | 0 | 0
Row  16 (5 cols): Feb | 0 | 0 | 0 | 0
Row  17 (5 cols): Mar | 0 | 0 | 0 | 0
Row  18 (5 cols): Apr | 0 | 0 | 0 | 0
```

## 7. Sheet: `Budgets`
- **Dimensions:** 16 rows x 7 columns (Non-empty rows: 14)
- **Merged Cell Ranges (2):** A3:G3, A1:G1

### Row Structure & Sample Data:
```text
Row   1 (1 cols): BUDGETS — Monthly budget by category
Row   3 (1 cols): Note: budgets below apply as a recurring MONTHLY target per category (same target every month). Edit the amounts in column B any time — all dashboards recalculate automatically.
Row   5 (6 cols): Category | Monthly Budget | Selected-Month Actual | Remaining | % Used | Status
Row   6 (6 cols): Food | 8000 | 3550 | 4450 | 0.4437 | Under Budget
Row   7 (6 cols): Transport | 3000 | 2600 | 400 | 0.8667 | Near Limit
Row   8 (6 cols): Education | 2000 | 0 | 2000 | 0 | Under Budget
Row   9 (6 cols): Health | 3000 | 1800 | 1200 | 0.6 | Under Budget
Row  10 (6 cols): Housing | 26000 | 22999 | 3001 | 0.8846 | Near Limit
Row  11 (6 cols): Entertainment | 2000 | 1268 | 732 | 0.634 | Under Budget
Row  12 (6 cols): Shopping | 3000 | 3200 | -200 | 1.067 | Over Budget
Row  13 (6 cols): Finance | 1000 | 0 | 1000 | 0 | Under Budget
Row  14 (6 cols): Travel | 5000 | 0 | 5000 | 0 | Under Budget
Row  15 (6 cols): Personal | 1500 | 0 | 1500 | 0 | Under Budget
Row  16 (5 cols): TOTAL | 54500 | 35417 | 19083 | 0.6499
```

## 8. Sheet: `Recurring Expenses`
- **Dimensions:** 16 rows x 13 columns (Non-empty rows: 13)
- **Merged Cell Ranges (2):** A13:D13, A1:M1

### Row Structure & Sample Data:
```text
Row   1 (1 cols): RECURRING EXPENSES — Subscriptions & fixed bills
Row   3 (13 cols): Expense Name | Category | Subcategory | Amount | Frequency | Start Date | End Date | Payment Method | Account | Assigned To | Next Due Date | Active? | Notes
Row   4 (12 cols): Rent | Housing | Rent | 22000 | Monthly | 2026-01-05T00:00:00 |  | Bank Transfer | Bank Account | Self | 2026-09-05T00:00:00 | Yes
Row   5 (12 cols): Netflix | Entertainment | Streaming | 649 | Monthly | 2026-01-06T00:00:00 |  | Credit Card | Credit Card | Self | 2026-09-06T00:00:00 | Yes
Row   6 (12 cols): Spotify | Entertainment | Streaming | 119 | Monthly | 2026-07-07T00:00:00 |  | Credit Card | Credit Card | Self | 2026-09-07T00:00:00 | Yes
Row   7 (12 cols): Gym Membership | Health | Gym | 1500 | Monthly | 2026-01-08T00:00:00 |  | UPI | Bank Account | Self | 2026-09-08T00:00:00 | Yes
Row   8 (12 cols): Broadband Internet | Housing | Internet | 999 | Monthly | 2026-01-12T00:00:00 |  | Net Banking | Bank Account | Self | 2026-09-12T00:00:00 | Yes
Row   9 (12 cols): Health Insurance Premium | Health | Wellness | 14000 | Yearly | 2026-03-15T00:00:00 |  | Bank Transfer | Bank Account | Self | 2027-03-15T00:00:00 | Yes
Row  10 (12 cols): Personal Loan EMI | Finance | Loan Payments | 3500 | Monthly | 2026-02-28T00:00:00 | 2027-01-28T00:00:00 | Bank Transfer | Bank Account | Self | 2026-08-28T00:00:00 | Yes
Row  13 (1 cols): Recurring Expense Burden (active items only)
Row  14 (2 cols): Monthly Equivalent Total | 2.993e+04
Row  15 (2 cols): Annual Total | 359204
Row  16 (2 cols): Active Recurring Items | 7
```

## 9. Sheet: `People-Splits`
- **Dimensions:** 18 rows x 7 columns (Non-empty rows: 14)
- **Merged Cell Ranges (3):** A3:F3, A16:F16, A1:G1

### Row Structure & Sample Data:
```text
Row   1 (1 cols): PEOPLE / SPLITS — Shared expenses & reimbursements
Row   3 (1 cols): Money Owed TO Me (from split / shared expenses recorded in Transactions)
Row   5 (5 cols): Person / Purpose | Recoverable | Recovered | Outstanding | Transactions
Row   6 (5 cols): Family | 0 | 0 | 0 | 1
Row   7 (5 cols): Friend | 1500 | 1500 | 0 | 1
Row   8 (5 cols): Roommate | 0 | 0 | 0 | 0
Row   9 (5 cols): College | 0 | 0 | 0 | 0
Row  10 (5 cols): Work | 0 | 0 | 0 | 2
Row  11 (5 cols): Business | 0 | 0 | 0 | 0
Row  12 (5 cols): Other | 0 | 0 | 0 | 0
Row  13 (4 cols): TOTAL | 1500 | 1500 | 0
Row  16 (1 cols): Money I Owe Others (manual entries)
Row  17 (6 cols): Person | Description | Amount | Settled? | Outstanding | Notes
Row  18 (5 cols): Friend B | My share of concert tickets | 800 | No | 800
```

## 10. Sheet: `Net Worth`
- **Dimensions:** 9 rows x 11 columns (Non-empty rows: 8)
- **Merged Cell Ranges (1):** A1:I1

### Row Structure & Sample Data:
```text
Row   1 (1 cols): NET WORTH TRACKER (optional — update monthly)
Row   3 (11 cols): Month | Bank | Cash | Investments | Other Assets | Total Assets | Credit Card | Loans | Other Liab. | Total Liab. | Net Worth
Row   4 (11 cols): Mar-2026 | 120000 | 5000 | 250000 | 10000 | 385000 | 30000 | 180000 | 5000 | 215000 | 170000
Row   5 (11 cols): Apr-2026 | 135000 | 4500 | 262000 | 10000 | 411500 | 28000 | 175000 | 5000 | 208000 | 203500
Row   6 (11 cols): May-2026 | 128000 | 6000 | 275000 | 11000 | 420000 | 26000 | 170000 | 5000 | 201000 | 219000
Row   7 (11 cols): Jun-2026 | 140000 | 5500 | 290000 | 11000 | 446500 | 24000 | 165000 | 5000 | 194000 | 252500
Row   8 (11 cols): Jul-2026 | 148000 | 4800 | 305000 | 12000 | 469800 | 22000 | 160000 | 5000 | 187000 | 282800
Row   9 (11 cols): Aug-2026 | 155000 | 5200 | 318000 | 12000 | 490200 | 20000 | 155000 | 5000 | 180000 | 310200
```

## 11. Sheet: `Financial Review`
- **Dimensions:** 34 rows x 5 columns (Non-empty rows: 27)
- **Merged Cell Ranges (14):** A21:E21, A34:E34, B9:E9, A4:E4, B8:E8, A12:D12, B6:E6, A33:E33 ...

### Row Structure & Sample Data:
```text
Row   1 (1 cols): FINANCIAL REVIEW — Monthly & Year-End Summary
Row   3 (1 cols): Monthly Review (uses the Dashboard's selected month)
Row   4 (1 cols): August 2026
Row   6 (2 cols): What did I spend the most on? | Housing — ₹22,999
Row   7 (2 cols): How much did I save this month? | ₹49,583  (58.3% savings rate)
Row   8 (2 cols): What % of spending was discretionary? | 19.8%
Row   9 (2 cols): How did this month compare with last month? | Expenses down 35.1% vs last month.
Row  10 (2 cols): Recurring expenses coming up (next 14 days) | 5 item(s) — see Recurring Expenses sheet
Row  12 (1 cols): Top 5 Expenses This Month
Row  13 (4 cols): Rank | Description | Category | Amount
Row  14 (4 cols): 1 | Monthly rent | Housing | 22000
Row  15 (4 cols): 2 | Office wear | Shopping | 3200
Row  16 (4 cols): 3 | Groceries - BigBasket | Food | 2500
Row  17 (4 cols): 4 | Petrol fill-up | Transport | 1900
Row  18 (4 cols): 5 | Gym monthly fee | Health | 1500
```

## 12. Sheet: `Settings`
- **Dimensions:** 27 rows x 11 columns (Non-empty rows: 25)
- **Merged Cell Ranges (4):** A18:C18, A1:K1, A3:C3, A8:K8

### Row Structure & Sample Data:
```text
Row   1 (1 cols): SETTINGS  /  MASTER DATA  (edit lists here — changes flow through the whole workbook)
Row   3 (1 cols): Global Settings
Row   4 (2 cols): Currency Symbol | ₹
Row   5 (2 cols): Near-Limit Budget Threshold | 0.8
Row   6 (2 cols): Healthy Savings-Rate Target | 0.2
Row   8 (1 cols): Categories & Subcategories (dependent dropdown source — add/edit freely, keep category names as single words)
Row   9 (11 cols): Category List → | Food | Transport | Education | Health | Housing | Entertainment | Shopping | Finance | Travel | Personal
Row  10 (11 cols): Food | Groceries | Public Transport | Tuition | Medicine | Rent | Movies | Clothing | Bank Fees | Flights | Gifts
Row  11 (11 cols): Transport | Restaurants | Taxi | Books | Doctor | Electricity | Games | Electronics | Investment Fees | Hotels | Donations
Row  12 (11 cols): Education | Cafes | Fuel | Courses | Fitness | Internet | Events | Personal Care | Loan Payments | Food | Miscellaneous
Row  13 (10 cols): Health | Snacks | Parking | Certifications | Gym | Maintenance | Streaming | Accessories | Credit Card Fees | Local Transport
Row  14 (10 cols): Housing | Delivery | Vehicle Maintenance | Study Material | Wellness | Household Items | Hobbies |  |  | Activities
Row  15 (2 cols): Entertainment | Dining Out
Row  16 (1 cols): Shopping
Row  17 (1 cols): Finance
```

# Workbook: `Fitness_Command_Center.xlsx`

- **Path:** `c:\Users\singh\Downloads\Fitness_Command_Center.xlsx`
- **Total Sheets:** 17
- **Sheet Names:** `Dashboard`, `How to Use`, `Settings`, `Workout Plan`, `Workout Log`, `Daily Habit Tracker`, `Meal Plan`, `Daily Food Log`, `Daily Nutrition Summary`, `Grocery Budget Tracker`, `Supplement Tracker`, `Weight & Measurements`, `Progress Photos`, `Cardio & Steps`, `Sleep & Recovery`, `Weekly Review`, `Monthly Analysis`

## 1. Sheet: `Dashboard`
- **Dimensions:** 30 rows x 8 columns (Non-empty rows: 25)
- **Merged Cell Ranges (8):** A4:B4, A26:B26, A30:H30, D4:H4, A2:H2, A1:H1, A18:B18, A12:B12

### Row Structure & Sample Data:
```text
Row   1 (1 cols): FITNESS COMMAND CENTER — DASHBOARD
Row   2 (1 cols): Updates automatically from every other sheet. Just keep logging daily — this page does the math.
Row   4 (4 cols): Body Stats |  |  | Progress to Goal
Row   5 (5 cols): Starting Weight (kg) | 83 |  | % of Goal Weight Loss Achieved | 0
Row   6 (2 cols): Current Weight (kg) | 83
Row   7 (2 cols): Target Weight (kg) | 75
Row   8 (2 cols): Weight Lost So Far (kg) | 0
Row   9 (2 cols): BMI | 30.49
Row  10 (2 cols): Body Fat % (latest, if logged) | Not logged
Row  12 (1 cols): Nutrition Snapshot
Row  13 (2 cols): Daily Calorie Target | 2199
Row  14 (2 cols): Avg Daily Calories (last 7 logged) | 1380
Row  15 (2 cols): Daily Protein Target (g) | 149
Row  16 (2 cols): Avg Daily Protein (last 7 logged, g) | 74
Row  18 (1 cols): Activity & Recovery
```

## 2. Sheet: `How to Use`
- **Dimensions:** 34 rows x 2 columns (Non-empty rows: 30)
- **Merged Cell Ranges (11):** A4:B4, A30:B30, A2:B2, A29:B29, A28:B28, A32:B32, A1:B1, A27:B27 ...

### Row Structure & Sample Data:
```text
Row   1 (1 cols): HOW TO USE THIS WORKBOOK
Row   2 (1 cols): This workbook is your complete fitness command center: Workout + Diet + Calories + Protein + Steps + Water + Sleep + Weight + Measurements + Budget + Supplements + Progress — all in one place.
Row   4 (1 cols): Color Key
Row   5 (2 cols):    | Yellow = INPUT cell — type your data here
Row   6 (2 cols):    | Grey = CALCULATED cell — formula, do not overtype
Row   8 (1 cols): Sheet-by-Sheet Guide
Row   9 (2 cols): Sheet | What to do
Row  10 (2 cols): Settings | Fill this in FIRST. Set your height, weight, age, activity level, goal, and targets. Everything else in the workbook reads from here. Only edit the yellow cells.
Row  11 (2 cols): Dashboard | Your daily overview — don't type anything here except nothing at all. Just glance at it to see progress.
Row  12 (2 cols): Workout Plan | Your weekly training template (Mon-Sun). Fill Target Weight once as a plan; log what you actually did in the Workout Log sheet.
Row  13 (2 cols): Workout Log | After every gym session, add one row per exercise: Date, Workout Day, Exercise, Sets, Reps, Weight, RPE. Volume and PR status calculate automatically.
Row  14 (2 cols): Daily Habit Tracker | Every day, mark Yes/No for each habit (workout, steps, calories, protein, water, sleep, fruits/veg, no junk, mobility). Your Consistency Score/100 and workout streak calculate automatically.
Row  15 (2 cols): Meal Plan | Reference sheet — 5+ options per meal using affordable Indian foods. Mix and match freely; each option in a category is roughly nutritionally equivalent.
Row  16 (2 cols): Daily Food Log | Log every meal/snack you eat: food item, quantity, calories, protein, carbs, fat, cost. Add one row per item.
Row  17 (2 cols): Daily Nutrition Summary | Enter the date once per day here (or copy from the Food Log); totals vs targets calculate automatically with green/yellow/red status.
```

## 3. Sheet: `Settings`
- **Dimensions:** 29 rows x 7 columns (Non-empty rows: 27)
- **Merged Cell Ranges (8):** A1:G1, E13:G13, A14:C14, A27:C27, A2:G2, E4:G4, A4:C4, A20:C20

### Row Structure & Sample Data:
```text
Row   1 (1 cols): USER SETTINGS — change values here, the whole workbook updates automatically
Row   2 (1 cols): Yellow cells = INPUT (edit these). Grey cells = CALCULATED (do not edit). Blue bold text = your entries.
Row   4 (5 cols): Personal Details |  |  |  | Automatic Calculations
Row   5 (7 cols): Height (cm) | 165 | 5 ft 5 in = 165 cm |  | BMI | 30.49 | Weight(kg) / Height(m)^2
Row   6 (6 cols): Current Weight (kg) | 83 | Update weekly from Weight Tracker |  | BMI Category | Obese
Row   7 (7 cols): Starting Weight (kg) | 83 | Set once at the start, don't change |  | BMR (Mifflin-St Jeor) | 1741 | Basal Metabolic Rate, kcal/day
Row   8 (6 cols): Target Weight (kg) | 75 |  |  | Activity Multiplier | 1.55
Row   9 (6 cols): Age (years) | 25 |  |  | Estimated TDEE (maintenance kcal) | 2699
Row  10 (7 cols): Sex | Male |  |  | Suggested Daily Calorie Target | 2199 | Moderate ~500 kcal deficit for fat loss, floored above BMR x1.2 (no crash dieting)
Row  11 (7 cols): Activity Level | Moderately Active (gym 4-6x/week) |  |  | Suggested Daily Protein Target (g) | 149 | 1.8 g/kg body weight — supports muscle retention during fat loss
Row  12 (2 cols): Primary Goal | Fat Loss + Strength (lean athletic look)
Row  13 (5 cols):  |  |  |  | Consistency Score Weights (must total 100)
Row  14 (6 cols): Training Settings |  |  |  | Workout completed | 20
Row  15 (6 cols): Weekly Training Frequency (days) | 6 |  |  | Calories within target | 20
Row  16 (6 cols): Gym Session Duration (minutes) | 60 |  |  | Protein target achieved | 15
```

## 4. Sheet: `Workout Plan`
- **Dimensions:** 82 rows x 11 columns (Non-empty rows: 75)
- **Merged Cell Ranges (9):** A50:K50, A18:K18, A4:K4, A2:K2, A63:K63, A76:K76, A36:K36, A1:K1 ...

### Row Structure & Sample Data:
```text
Row   1 (1 cols): WEEKLY WORKOUT PLAN — Standard Commercial Gym (Full Equipment)
Row   2 (1 cols): Beginner/Intermediate program for fat loss, strength, and a lean athletic physique — not a bodybuilding split. Fill in Target Weight and log actual performance each session below. Est. session length ≈ 60 min including warm-up, cardio and cooldown.
Row   4 (1 cols): MONDAY — Upper Body A (Push Emphasis) + Cardio
Row   5 (11 cols): Exercise | Muscle Group | Sets | Reps | Target Weight (kg) | Actual Weight (kg) | Reps Completed | RPE (1-10) | Rest (sec) | Est. Duration (min) | Notes
Row   6 (10 cols): Warm-up | Arm circles, band pull-aparts, incline treadmill walk | - | 5 min |  |  |  |  | - | 6
Row   7 (11 cols): Barbell Bench Press | Chest | 4 | 8-10 | 40 |  |  |  | 90 | 12 | Increase 2.5kg when you hit 10 reps on all sets
Row   8 (11 cols): Lat Pulldown (wide grip) | Back | 3 | 10-12 | 45 |  |  |  | 75 | 8 | Machine
Row   9 (11 cols): Seated Dumbbell Shoulder Press | Shoulders | 3 | 10-12 | 12 |  |  |  | 75 | 8 | Per dumbbell
Row  10 (11 cols): Seated Cable Row | Back | 3 | 10-12 | 40 |  |  |  | 75 | 8 | Machine
Row  11 (10 cols): Cable Tricep Pushdown | Triceps | 3 | 12-15 | 20 |  |  |  | 60 | 6
Row  12 (11 cols): Dumbbell Bicep Curl | Biceps | 3 | 12-15 | 10 |  |  |  | 60 | 6 | Per dumbbell
Row  13 (11 cols): Plank | Core | 3 | 40-45 sec hold | - |  |  |  | 45 | 4 | Bodyweight
Row  14 (11 cols): Cardio: Treadmill Incline Walk/Jog | Cardiovascular | - | 10 min | - |  |  |  | - | 10 | Moderate pace, incline 4-6%
Row  15 (10 cols): Cooldown / Stretch | Chest, Shoulders, Back | - | 5 min | - |  |  |  | - | 5
Row  16 (11 cols):   Estimated Total Session Duration |  |  |  |  |  |  |  |  | 73 | minutes (target ≈ 60)
```

## 5. Sheet: `Workout Log`
- **Dimensions:** 204 rows x 14 columns (Non-empty rows: 6)
- **Merged Cell Ranges (2):** A2:N2, A1:N1

### Row Structure & Sample Data:
```text
Row   1 (1 cols): DAILY WORKOUT LOG
Row   2 (1 cols): Enter Date, Workout Day, Exercise, Sets, Reps, Weight, RPE and (optional) cardio details after every session. Volume, PR status and comparisons calculate automatically. Fill rows top-to-bottom without leaving blank rows in between.
Row   4 (14 cols): Date | Workout Day | Exercise | Sets | Reps | Weight (kg) | Volume
(Sets x Reps x Weight) | RPE
(1-10) | Cardio Type | Cardio Duration
(min) | Calories Burned | vs Previous
Session | Personal
Record? | Notes
Row   5 (14 cols): 2026-08-24T00:00:00 | Monday | Barbell Bench Press | 4 | 8 | 40 | 1280 | 7 |  |  |  | First entry | New PR! | Felt strong today
Row   6 (13 cols): 2026-08-24T00:00:00 | Monday | Lat Pulldown (wide grip) | 3 | 10 | 45 | 1350 | 7 |  |  |  | First entry | New PR!
Row   7 (14 cols): 2026-08-24T00:00:00 | Monday | Cardio: Treadmill Incline Walk/Jog |  |  |  |  |  | Treadmill | 10 | 70 |  |  | Moderate pace
```

## 6. Sheet: `Daily Habit Tracker`
- **Dimensions:** 204 rows x 12 columns (Non-empty rows: 4)
- **Merged Cell Ranges (2):** A2:L2, A1:L1

### Row Structure & Sample Data:
```text
Row   1 (1 cols): DAILY HABIT TRACKER & CONSISTENCY SCORE
Row   2 (1 cols): Pick Yes/No for each habit every day. Consistency Score is calculated automatically using the weights set on the Settings sheet.
Row   4 (12 cols): Date | Workout
Completed | Steps
Completed | Calories
Within Target | Protein
Target Hit | Water
Target Hit | Sleep
Target Hit | Fruits/Veg
Consumed | No Junk
Food | Mobility/
Stretching | Consistency
Score /100 | Workout
Streak
Row   5 (12 cols): 2026-08-24T00:00:00 | Yes | Yes | Yes | Yes | No | Yes | Yes | No | Yes | 90 | 1
```

## 7. Sheet: `Meal Plan`
- **Dimensions:** 51 rows x 7 columns (Non-empty rows: 45)
- **Merged Cell Ranges (8):** A1:G1, A4:G4, A48:G48, A26:G26, A2:G2, A15:G15, A51:G51, A37:G37

### Row Structure & Sample Data:
```text
Row   1 (1 cols): BUDGET-FRIENDLY INDIAN MEAL PLAN
Row   2 (1 cols): All items use common, affordable Indian foods. Swap any option for another in the same meal category without breaking your daily targets — each option is portioned to roughly the same calorie/protein range. Adjust quantities on the Daily Food Log to hit your exact targets.
Row   4 (1 cols): BREAKFAST OPTIONS
Row   5 (7 cols): Meal Option | Quantity / Serving | Calories (kcal) | Protein (g) | Carbs (g) | Fat (g) | Approx. Cost (Rs.)
Row   6 (7 cols): Masala Oats + 2 Boiled Eggs | 60g oats + 2 eggs | 380 | 22 | 40 | 14 | 25
Row   7 (7 cols): Poha with Peanuts | 1.5 cups poha + 15g peanuts | 350 | 9 | 55 | 11 | 18
Row   8 (7 cols): Vegetable Upma | 1.5 cups | 320 | 8 | 52 | 9 | 15
Row   9 (7 cols): Besan Chilla (2) + Curd | 2 chillas + 100g curd | 380 | 20 | 40 | 14 | 20
Row  10 (7 cols): Milk + Banana + 4 Almonds | 300ml milk + 1 banana + 4 almonds | 350 | 14 | 48 | 11 | 22
Row  11 (7 cols): Sprouts Bhel | 1.5 cups moong sprouts mix | 300 | 16 | 42 | 6 | 15
Row  12 (7 cols): Paneer Bhurji + 2 Roti | 80g paneer + 2 roti | 420 | 24 | 38 | 18 | 30
Row  13 (7 cols):   Average of options above |  | 357.1 | 16.14 | 45 | 11.86 | 20.71
Row  15 (1 cols): LUNCH OPTIONS
Row  16 (7 cols): Meal Option | Quantity / Serving | Calories (kcal) | Protein (g) | Carbs (g) | Fat (g) | Approx. Cost (Rs.)
Row  17 (7 cols): Dal + Rice + Sabzi + Salad | 1 cup dal, 1 cup rice, 1 cup sabzi | 550 | 20 | 85 | 12 | 30
```

## 8. Sheet: `Daily Food Log`
- **Dimensions:** 404 rows x 9 columns (Non-empty rows: 6)
- **Merged Cell Ranges (2):** A1:I1, A2:I2

### Row Structure & Sample Data:
```text
Row   1 (1 cols): DAILY FOOD LOG
Row   2 (1 cols): Log every meal/snack you eat (one row each). Use the Meal Plan sheet for quick reference values, or enter your own. Daily totals below compare automatically against your Settings targets.
Row   4 (9 cols): Date | Meal | Food Item | Quantity | Calories | Protein (g) | Carbs (g) | Fat (g) | Cost (Rs.)
Row   5 (9 cols): 2026-08-24T00:00:00 | Breakfast | Masala Oats + 2 Boiled Eggs | 60g oats + 2 eggs | 380 | 22 | 40 | 14 | 25
Row   6 (9 cols): 2026-08-24T00:00:00 | Lunch | Dal + Rice + Sabzi + Salad | 1 cup dal, 1 cup rice, 1 cup sabzi | 550 | 20 | 85 | 12 | 30
Row   7 (9 cols): 2026-08-24T00:00:00 | Dinner | Grilled Chicken/Paneer + Salad + 1 Roti | 120g chicken | 450 | 32 | 30 | 18 | 45
```

## 9. Sheet: `Daily Nutrition Summary`
- **Dimensions:** 184 rows x 10 columns (Non-empty rows: 4)
- **Merged Cell Ranges (2):** A1:J1, A2:J2

### Row Structure & Sample Data:
```text
Row   1 (1 cols): DAILY NUTRITION SUMMARY (auto-calculated from Daily Food Log)
Row   2 (1 cols): Enter each date you tracked in column A (or copy dates from the Food Log). Totals and target comparisons calculate automatically. Green = target achieved, Yellow = close, Red = significantly off target.
Row   4 (10 cols): Date | Total
Calories | Calorie
Target | Total
Protein (g) | Protein
Target (g) | Total
Carbs (g) | Total
Fat (g) | Total
Cost (Rs.) | Calories
Status | Protein
Status
Row   5 (10 cols): 2026-08-24T00:00:00 | 1380 | 2199 | 74 | 149 | 155 | 44 | 100 | Off Target | Below Target
```

## 10. Sheet: `Grocery Budget Tracker`
- **Dimensions:** 174 rows x 8 columns (Non-empty rows: 24)
- **Merged Cell Ranges (4):** A156:H156, A2:H2, A165:H165, A1:H1

### Row Structure & Sample Data:
```text
Row   1 (1 cols): GROCERY & MEAL BUDGET TRACKER (India)
Row   2 (1 cols): Log every grocery purchase. Cost per serving, weekly/monthly totals, and cost-per-gram-of-protein calculate automatically.
Row   4 (8 cols): Item | Category | Quantity
Purchased | Unit | Price (Rs.) | Purchase
Date | Servings
per Purchase | Cost per
Serving (Rs.)
Row   5 (8 cols): Eggs (30 pack) | Protein | 30 | pcs | 210 | 2026-08-24T00:00:00 | 30 | 7
Row   6 (8 cols): Chicken Breast | Protein | 1 | kg | 260 | 2026-08-24T00:00:00 | 8 | 32.5
Row   7 (8 cols): Rice (basmati) | Carbohydrates | 5 | kg | 400 | 2026-08-24T00:00:00 | 25 | 16
Row 156 (1 cols): SUMMARY
Row 157 (2 cols): Total Spend Logged (Rs.) | 870
Row 158 (2 cols): This Week's Spend (Rs.) | 870
Row 159 (2 cols): This Month's Spend (Rs.) | 870
Row 160 (2 cols): Monthly Food Budget (Rs.) | 6000
Row 161 (2 cols): Budget Remaining This Month (Rs.) | 5130
Row 162 (3 cols): Cost per Gram of Protein (Rs., from Food Log) | 1.351 | Total food cost logged / total protein (g) logged
Row 163 (2 cols): Average Cost per Meal (Rs.) | 33.33
Row 165 (1 cols): SPEND BY CATEGORY
```

## 11. Sheet: `Supplement Tracker`
- **Dimensions:** 21 rows x 8 columns (Non-empty rows: 11)
- **Merged Cell Ranges (2):** A2:H2, A1:H1

### Row Structure & Sample Data:
```text
Row   1 (1 cols): SUPPLEMENT TRACKER — 100% Optional
Row   2 (1 cols): Food first. Supplements are optional extras, not requirements. Do not start Vitamin D/B12 or any medical supplement without a blood test or doctor's/dietitian's advice. Avoid fat burners, detox teas, and testosterone boosters — they are unnecessary and often unregulated. This sheet is informational only and is not medical advice.
Row   4 (8 cols): Supplement | Dose | Timing | Frequency | Monthly Cost (Rs.) | Reason for Taking | Purchased? | Remaining Qty
Row   5 (7 cols): Whey Protein (optional) | 1 scoop (~25-30g) | Post-workout or as a meal top-up | Daily / as needed | 1800 | Convenient way to hit protein target if food alone falls short | No
Row   6 (7 cols): Creatine Monohydrate (optional) | 3-5g | Any time, consistently | Daily | 500 | Well-researched for strength & performance; optional, not required | No
Row   7 (7 cols): Vitamin D3 (only if deficient/advised) | As prescribed | Morning with food | As advised | 150 | Only if a blood test or doctor indicates deficiency | No
Row   8 (7 cols): Vitamin B12 (only if deficient/advised) | As prescribed | Morning | As advised | 150 | Only if diet is low in B12 (e.g. vegetarian) or advised by a doctor | No
Row   9 (7 cols): Electrolytes (optional) | 1 sachet | During/after intense or long cardio sessions | As needed | 200 | Useful only on high-sweat days; not a daily necessity | No
Row  19 (5 cols): Total Monthly Supplement Cost (Rs.) |  |  |  | 2800
Row  20 (5 cols): Supplement Budget (Rs.) |  |  |  | 1500
Row  21 (5 cols): Remaining Budget (Rs.) |  |  |  | -1300
```

## 12. Sheet: `Weight & Measurements`
- **Dimensions:** 160 rows x 11 columns (Non-empty rows: 9)
- **Merged Cell Ranges (3):** A2:K2, A1:K1, A157:D157

### Row Structure & Sample Data:
```text
Row   1 (1 cols): WEIGHT & BODY MEASUREMENT TRACKER
Row   2 (1 cols): Weigh in under similar conditions each time (e.g. morning, before food). Judge progress by weekly averages and trend, not a single day's number.
Row   4 (11 cols): Date | Body Weight
(kg) | Waist
(cm) | Chest
(cm) | Arms
(cm) | Thighs
(cm) | Hips
(cm) | Neck
(cm) | Body Fat %
(if available) | Change from
Start (kg) | % Weight
Lost
Row   5 (11 cols): 2026-08-17T00:00:00 | 83.4 | 92 | 98 | 32 | 55 | 98 | 38 |  | 0.4 | -0.004819
Row   6 (11 cols): 2026-08-24T00:00:00 | 83 | 91.3 | 98.2 | 32.1 | 55.1 | 97.8 | 38 |  | 0 | 0
Row 157 (1 cols): WEEKLY AVERAGE WEIGHT (last 8 entries)
Row 158 (2 cols): Average of last 7 logged weights (kg) | 83.2
Row 159 (2 cols): Average of previous 7 weights (kg) | -
Row 160 (2 cols): Weekly Change (kg) | -
```

## 13. Sheet: `Progress Photos`
- **Dimensions:** 104 rows x 5 columns (Non-empty rows: 3)
- **Merged Cell Ranges (2):** A2:E2, A1:E1

### Row Structure & Sample Data:
```text
Row   1 (1 cols): PROGRESS PHOTO LOG
Row   2 (1 cols): Excel doesn't store photos neatly inline across all devices, so this sheet logs a file path or cloud link (Google Drive/OneDrive) for each photo instead. To insert an actual photo in desktop Excel: Insert > Pictures, then resize it to fit near the row. Take photos in the same lighting, pose, and clothing every time, ideally weekly.
Row   4 (5 cols): Date | Front Photo (file path/link) | Side Photo (file path/link) | Back Photo (file path/link) | Notes
```

## 14. Sheet: `Cardio & Steps`
- **Dimensions:** 207 rows x 7 columns (Non-empty rows: 7)
- **Merged Cell Ranges (2):** A2:G2, A1:G1

### Row Structure & Sample Data:
```text
Row   1 (1 cols): CARDIO & STEPS TRACKER
Row   2 (1 cols): Log daily steps and any dedicated cardio session. Calories burned can be entered from your phone/watch, or left blank.
Row   4 (7 cols): Date | Steps | Cardio Type | Duration (min) | Distance (km) | Calories Burned | Avg Heart Rate
(if available)
Row   5 (6 cols): 2026-08-23T00:00:00 | 7800 | Outdoor Walk | 30 | 2.5 | 150
Row   6 (6 cols): 2026-08-24T00:00:00 | 8200 | Treadmill | 10 | 1.2 | 90
Row 206 (2 cols): Weekly Average Steps (last 7 entries) | 8000
Row 207 (2 cols): Steps Target | 8000
```

## 15. Sheet: `Sleep & Recovery`
- **Dimensions:** 208 rows x 8 columns (Non-empty rows: 7)
- **Merged Cell Ranges (2):** A2:H2, A1:H1

### Row Structure & Sample Data:
```text
Row   1 (1 cols): SLEEP & RECOVERY TRACKER
Row   2 (1 cols): Track sleep and recovery markers daily. Weeks with low sleep quality or high soreness are flagged automatically below.
Row   4 (8 cols): Date | Bedtime | Wake Time | Total Sleep
(hrs) | Sleep Quality
(1-10) | Resting HR
(if available) | Energy Level
(1-10) | Muscle Soreness
(1-10)
Row   5 (8 cols): 2026-08-24T00:00:00 | 23:00 | 06:45 | 7.75 | 7 | 65 | 7 | 4
Row 206 (2 cols): Weekly Avg Sleep (last 7 entries, hrs) | 7.75
Row 207 (2 cols): Weekly Avg Soreness (last 7 entries) | 4
Row 208 (2 cols): Recovery Flag | Recovery OK
```

## 16. Sheet: `Weekly Review`
- **Dimensions:** 37 rows x 13 columns (Non-empty rows: 8)
- **Merged Cell Ranges (6):** C35:M35, A1:M1, A34:M34, C36:M36, A2:M2, C37:M37

### Row Structure & Sample Data:
```text
Row   1 (1 cols): WEEKLY REVIEW
Row   2 (1 cols): Enter each week's Monday start date in column A; End Date and all metrics calculate automatically from the other sheets. Add your own notes in the reflection boxes below.
Row   5 (13 cols): Week
Start Date | Week
End Date | Avg Body
Weight (kg) | Weight
Change (kg) | Avg
Calories | Avg
Protein (g) | Avg
Steps | Avg
Sleep (hrs) | Workouts
Completed | Workout
Completion % | Avg Consistency
Score | Weekly Food
Cost (Rs.) | Avg Waist
(cm)
Row   6 (13 cols): 2026-08-18T00:00:00 | 2026-08-24T00:00:00 | 83 |  | 1380 | 74 | 8000 | 7.75 | 1 | 0.1667 | 90 | 870 | 91.3
Row  34 (1 cols): WEEKLY REFLECTION (fill in manually each week)
Row  35 (1 cols): What went well?
Row  36 (1 cols): What needs improvement?
Row  37 (1 cols): Next week's target
```

## 17. Sheet: `Monthly Analysis`
- **Dimensions:** 17 rows x 14 columns (Non-empty rows: 4)
- **Merged Cell Ranges (2):** A2:N2, A1:N1

### Row Structure & Sample Data:
```text
Row   1 (1 cols): MONTHLY ANALYSIS
Row   2 (1 cols): Enter the 1st date of each month you want to analyze in column A (e.g. 01-Sep-2026). Everything else calculates automatically.
Row   5 (14 cols): Month
(1st date) | Starting
Weight (kg) | Ending
Weight (kg) | Weight
Change (kg) | Waist
Change (cm) | Avg
Calories | Avg
Protein (g) | Total
Workouts | Workout
Completion % | Avg
Steps | Avg
Sleep (hrs) | Food
Spend (Rs.) | Supplement
Spend (Rs.) | Total Fitness
Spend (Rs.)
Row   6 (14 cols): 2026-08-01T00:00:00 | 83.4 | 83.2 | -0.2 |  | 1380 | 74 | 1 | 0.03849 | 8000 | 7.75 | 870 | 0 | 870
```

# Workbook: `CFA_2027_Level_I_Study_Planner.xlsx`

- **Path:** `c:\Users\singh\Downloads\CFA_2027_Level_I_Study_Planner.xlsx`
- **Total Sheets:** 13
- **Sheet Names:** `Dashboard`, `M1 Quant Methods`, `M2 Economics`, `M3 Corp Finance`, `M4 FSA`, `M5 Equities`, `M6 Fixed Income`, `M7 Derivatives`, `M8 Alt Investments`, `M9 Portfolio Constr`, `M10 Ethics`, `Buffer Day`, `Feb Revision`

## 1. Sheet: `Dashboard`
- **Dimensions:** 52 rows x 13 columns (Non-empty rows: 43)
- **Merged Cell Ranges (44):** E12:F12, A24:B24, A8:D8, C24:D24, E24:F24, D32:F32, E23:F23, H41:I41 ...

### Row Structure & Sample Data:
```text
Row   1 (1 cols): CFA 2027 Level I - Study Planner Dashboard
Row   4 (2 cols): START DATE (editable): | 2026-08-05T00:00:00
Row   5 (2 cols): SYLLABUS COMPLETION DEADLINE: | 2027-01-31T00:00:00
Row   7 (8 cols): STUDY OVERVIEW |  |  |  |  |  |  | MODULE-WISE PROGRESS
Row   8 (13 cols): Total Modules |  |  |  | 10 |  |  | Module | Total Topics | Completed | Remaining | Completion % | Status
Row   9 (13 cols): Total Chapters / Topics |  |  |  | 102 |  |  | Quantitative Methods | 18 | 3 | 15 | 0.1667 | In Progress
Row  10 (13 cols): Total Learning Outcomes |  |  |  | 340 |  |  | Economics | 15 | 0 | 15 | 0 | Not Started
Row  11 (13 cols): Total Study Days (to 31-Jan) |  |  |  | 180 |  |  | Corporate Finance | 13 | 0 | 13 | 0 | Not Started
Row  12 (13 cols): Buffer Days |  |  |  | 1 |  |  | Financial Statement Analysis | 24 | 6 | 18 | 0.25 | In Progress
Row  13 (13 cols): February Revision Days |  |  |  | 28 |  |  | Equities | 21 | 0 | 21 | 0 | Not Started
Row  14 (13 cols): Overall Completion % |  |  |  | 0.04972 |  |  | Fixed Income | 30 | 0 | 30 | 0 | Not Started
Row  15 (13 cols):  |  |  |  |  |  |  | Derivatives | 12 | 0 | 12 | 0 | Not Started
Row  16 (13 cols):  |  |  |  |  |  |  | Alternative Investments | 13 | 0 | 13 | 0 | Not Started
Row  17 (13 cols):  |  |  |  |  |  |  | Portfolio Construction | 16 | 0 | 16 | 0 | Not Started
Row  18 (13 cols):  |  |  |  |  |  |  | Ethical and Professional Standards | 19 | 0 | 19 | 0 | Not Started
```

## 2. Sheet: `M1 Quant Methods`
- **Dimensions:** 37 rows x 11 columns (Non-empty rows: 36)
- **Merged Cell Ranges (2):** A3:F3, A2:D2

### Row Structure & Sample Data:
```text
Row   1 (1 cols): ← Back to Dashboard
Row   2 (1 cols): Quantitative Methods
Row   3 (1 cols): 11 chapters | 30 learning outcomes | CFA 2027 Level I Topic Outlines
Row   5 (11 cols): Date | Day | Chapter / Topic | Subtopic / Learning Outcome(s) | Task | Planned Hours | Priority | Status | Completed | Notes | RowType
Row   6 (11 cols): 2026-08-05T00:00:00 | Wednesday | Returns of Financial Assets and Instruments | Describe, compare, and interpret returns | Describe, compare, and interpret required rates of return, risk-free rates, risk premia, and inflation | Learn concepts + solve practice questions | 2.2 | High | Completed | Yes |  | STUDY
Row   7 (11 cols): 2026-08-05T00:00:00 | Wednesday | Quantitative Methods - Consolidation | Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. | Additional practice questions + weak-area drilling | 0.8 | Medium | Completed | Yes |  | REVIEW
Row   8 (11 cols): 2026-08-06T00:00:00 | Thursday | Types of Financial Returns | Calculate, compare, and interpret different types of returns for financial assets, instruments, and indicators | Learn concepts + solve practice questions | 1.6 | Medium | Completed | Yes |  | STUDY
Row   9 (11 cols): 2026-08-07T00:00:00 | Friday | Benchmarking Returns | Calculate and compare money-weighted and time-weighted rates of return | Describe weighting methods used in index construction/management; calculate, interpret, and explain the value and returns of an index | Learn concepts + solve practice questions | 2.2 | High | Completed | Yes |  | STUDY
Row  10 (11 cols): 2026-08-08T00:00:00 | Saturday | The Time Value of Money in Finance | Calculate and interpret the present value of fixed-income and equity instruments based on expected future cash flows | Learn concepts + practice (Part 1 of 2) | 1.4 | Medium | Not Started | No |  | STUDY
Row  11 (11 cols): 2026-08-08T00:00:00 | Saturday | The Time Value of Money in Finance | Calculate and interpret implied return of fixed-income instruments and required return/implied growth of equity instruments | Explain the cash flow additivity principle and its use in calculating implied forward rates, forward exchange rates, and option values | Learn concepts + practice (Part 2 of 2) | 1.4 | Medium | Not Started | No |  | STUDY
Row  12 (11 cols): 2026-08-09T00:00:00 | Sunday | Statistical Characteristics of Asset Returns | Calculate, interpret, and evaluate measures of central tendency/location and dispersion | Describe, interpret, and evaluate measures of skewness and kurtosis | Learn concepts + practice (Part 1 of 2) | 1.7 | Medium | Not Started | No |  | STUDY
Row  13 (11 cols): 2026-08-10T00:00:00 | Monday | Statistical Characteristics of Asset Returns | Calculate, interpret, and evaluate covariance and correlation | Calculate, interpret, and evaluate semi-deviation and coefficient of variation | Learn concepts + practice (Part 2 of 2) | 1.7 | Medium | Not Started | No |  | STUDY
Row  14 (11 cols): 2026-08-11T00:00:00 | Tuesday | Statistical Distributions for Financial Asset Prices and Returns | Calculate, interpret, and evaluate unconditional expected values for mean, variance, and covariance | Calculate, interpret, and evaluate the principal moments of key statistical distributions used in finance | Learn concepts + practice (Part 1 of 2) | 1.7 | Medium | Not Started | No |  | STUDY
Row  15 (11 cols): 2026-08-12T00:00:00 | Wednesday | Statistical Distributions for Financial Asset Prices and Returns | Calculate, interpret, and evaluate conditional expectations, variances, and covariances | Formulate investment problems through Bayesian updating | Learn concepts + practice (Part 2 of 2) | 1.7 | Medium | Not Started | No |  | STUDY
Row  16 (11 cols): 2026-08-13T00:00:00 | Thursday | Estimation and Hypothesis Testing | Explain the central limit theorem and application of confidence intervals and sampling methodologies | Learn concepts + practice (Part 1 of 2) | 1.4 | Medium | Not Started | No |  | STUDY
```

## 3. Sheet: `M2 Economics`
- **Dimensions:** 34 rows x 11 columns (Non-empty rows: 33)
- **Merged Cell Ranges (2):** A3:F3, A2:D2

### Row Structure & Sample Data:
```text
Row   1 (1 cols): ← Back to Dashboard
Row   2 (1 cols): Economics
Row   3 (1 cols): 8 chapters | 30 learning outcomes | CFA 2027 Level I Topic Outlines
Row   5 (11 cols): Date | Day | Chapter / Topic | Subtopic / Learning Outcome(s) | Task | Planned Hours | Priority | Status | Completed | Notes | RowType
Row   6 (11 cols): 2026-08-06T00:00:00 | Thursday | Economics - Consolidation | Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. | Additional practice questions + weak-area drilling | 1.4 | Medium | Not Started | No |  | REVIEW
Row   7 (11 cols): 2026-08-20T00:00:00 | Thursday | The Firm and Market Structures | Determine/interpret breakeven and shutdown points of production; economies/diseconomies of scale under perfect and imperfect competition | Describe characteristics of perfect competition, monopolistic competition, oligopoly, and pure monopoly | Learn concepts + practice (Part 1 of 2) | 2 | High | Not Started | No |  | STUDY
Row   8 (11 cols): 2026-08-21T00:00:00 | Friday | The Firm and Market Structures | Explain supply/demand relationships under monopolistic competition incl. optimal price/output and pricing strategy | Explain supply/demand relationships under oligopoly incl. optimal price/output and pricing strategy | Identify market structure type; describe use and limitations of concentration measures | Learn concepts + practice (Part 2 of 2) | 2 | High | Not Started | No |  | STUDY
Row   9 (11 cols): 2026-08-21T00:00:00 | Friday | Economics - Consolidation | Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. | Additional practice questions + weak-area drilling | 1 | Medium | Not Started | No |  | REVIEW
Row  10 (11 cols): 2026-08-22T00:00:00 | Saturday | Understanding Business Cycles | Describe the business cycle and its phases | Learn concepts + practice (Part 1 of 2) | 1.4 | Medium | Not Started | No |  | STUDY
Row  11 (11 cols): 2026-08-22T00:00:00 | Saturday | Understanding Business Cycles | Describe credit cycles | Describe how resource use, consumer/business activity, housing, and external trade vary over the cycle; measurement via indicators | Learn concepts + practice (Part 2 of 2) | 1.4 | Medium | Not Started | No |  | STUDY
Row  12 (11 cols): 2026-08-23T00:00:00 | Sunday | Fiscal Policy | Compare monetary and fiscal policy | Describe roles/objectives of fiscal policy; arguments on national debt relative to GDP | Learn concepts + practice (Part 1 of 2) | 1.7 | Medium | Not Started | No |  | STUDY
Row  13 (11 cols): 2026-08-24T00:00:00 | Monday | Fiscal Policy | Describe tools of fiscal policy incl. advantages/disadvantages | Explain implementation of fiscal policy, difficulties, and expansionary/contractionary stance | Learn concepts + practice (Part 2 of 2) | 1.7 | Medium | Not Started | No |  | STUDY
Row  14 (11 cols): 2026-08-25T00:00:00 | Tuesday | Monetary Policy | Describe roles and objectives of central banks | Describe monetary policy tools and transmission mechanism; relate to growth, inflation, interest, exchange rates | Learn concepts + practice (Part 1 of 2) | 1.7 | Medium | Not Started | No |  | STUDY
Row  15 (11 cols): 2026-08-26T00:00:00 | Wednesday | Monetary Policy | Describe qualities of effective central banks; contrast inflation/interest rate/exchange rate targeting; describe limitations | Explain the interaction of monetary and fiscal policy | Learn concepts + practice (Part 2 of 2) | 1.7 | Medium | Not Started | No |  | STUDY
Row  16 (11 cols): 2026-08-27T00:00:00 | Thursday | Introduction to Geopolitics | Describe geopolitics from a cooperation vs. competition perspective | Describe geopolitics and its relationship with globalization | Describe functions/objectives of international organizations facilitating trade (World Bank, IMF, WTO) | Learn concepts + practice (Part 1 of 2) | 2.3 | High | Not Started | No |  | STUDY
```

## 4. Sheet: `M3 Corp Finance`
- **Dimensions:** 32 rows x 11 columns (Non-empty rows: 31)
- **Merged Cell Ranges (2):** A3:F3, A2:D2

### Row Structure & Sample Data:
```text
Row   1 (1 cols): ← Back to Dashboard
Row   2 (1 cols): Corporate Finance
Row   3 (1 cols): 7 chapters | 22 learning outcomes | CFA 2027 Level I Topic Outlines
Row   5 (11 cols): Date | Day | Chapter / Topic | Subtopic / Learning Outcome(s) | Task | Planned Hours | Priority | Status | Completed | Notes | RowType
Row   6 (11 cols): 2026-08-07T00:00:00 | Friday | Corporate Finance - Consolidation | Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. | Additional practice questions + weak-area drilling | 0.8 | Medium | Not Started | No |  | REVIEW
Row   7 (11 cols): 2026-08-23T00:00:00 | Sunday | Corporate Finance - Consolidation | Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. | Additional practice questions + weak-area drilling | 1.3 | Medium | Not Started | No |  | REVIEW
Row   8 (11 cols): 2026-09-02T00:00:00 | Wednesday | Organizational Forms, Corporate Issuer Features, and Ownership | Compare the organizational forms of businesses | Learn concepts + practice (Part 1 of 2) | 1.4 | Medium | Not Started | No |  | STUDY
Row   9 (11 cols): 2026-09-02T00:00:00 | Wednesday | Organizational Forms, Corporate Issuer Features, and Ownership | Describe key features of corporate issuers | Compare publicly and privately owned corporate issuers | Learn concepts + practice (Part 2 of 2) | 1.4 | Medium | Not Started | No |  | STUDY
Row  10 (11 cols): 2026-09-03T00:00:00 | Thursday | Investors and Other Stakeholders | Compare the financial claims and motivations of lenders and shareholders | Learn concepts + practice (Part 1 of 2) | 1.4 | Medium | Not Started | No |  | STUDY
Row  11 (11 cols): 2026-09-03T00:00:00 | Thursday | Investors and Other Stakeholders | Describe a company's stakeholder groups and compare their interests | Describe ESG factors of corporate issuers considered by investors | Learn concepts + practice (Part 2 of 2) | 1.4 | Medium | Not Started | No |  | STUDY
Row  12 (11 cols): 2026-09-04T00:00:00 | Friday | Corporate Governance: Conflicts, Mechanisms, Risks, and Benefits | Describe the principal-agent relationship and conflicts among stakeholder groups | Learn concepts + practice (Part 1 of 2) | 1.4 | Medium | Not Started | No |  | STUDY
Row  13 (11 cols): 2026-09-04T00:00:00 | Friday | Corporate Governance: Conflicts, Mechanisms, Risks, and Benefits | Describe corporate governance and mechanisms to manage stakeholder relationships/risks | Describe risks of poor corporate governance and benefits of effective governance | Learn concepts + practice (Part 2 of 2) | 1.4 | Medium | Not Started | No |  | STUDY
Row  14 (11 cols): 2026-09-05T00:00:00 | Saturday | Working Capital and Liquidity | Explain the cash conversion cycle and compare issuers' cash conversion cycles | Learn concepts + practice (Part 1 of 2) | 1.4 | Medium | Not Started | No |  | STUDY
Row  15 (11 cols): 2026-09-05T00:00:00 | Saturday | Working Capital and Liquidity | Explain liquidity and compare issuers' liquidity levels | Describe issuers' objectives and methods for managing working capital and liquidity | Learn concepts + practice (Part 2 of 2) | 1.4 | Medium | Not Started | No |  | STUDY
Row  16 (11 cols): 2026-09-06T00:00:00 | Sunday | Capital Investments and Capital Allocation | Describe types of capital investments | Describe the capital allocation process; calculate NPV, IRR, ROIC; contrast their use | Learn concepts + practice (Part 1 of 2) | 1.7 | Medium | Not Started | No |  | STUDY
```

## 5. Sheet: `M4 FSA`
- **Dimensions:** 44 rows x 11 columns (Non-empty rows: 43)
- **Merged Cell Ranges (2):** A3:F3, A2:D2

### Row Structure & Sample Data:
```text
Row   1 (1 cols): ← Back to Dashboard
Row   2 (1 cols): Financial Statement Analysis
Row   3 (1 cols): 12 chapters | 53 learning outcomes | CFA 2027 Level I Topic Outlines
Row   5 (11 cols): Date | Day | Chapter / Topic | Subtopic / Learning Outcome(s) | Task | Planned Hours | Priority | Status | Completed | Notes | RowType
Row   6 (11 cols): 2026-08-09T00:00:00 | Sunday | Financial Statement Analysis - Consolidation | Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. | Additional practice questions + weak-area drilling | 1.3 | Medium | Completed | Yes |  | REVIEW
Row   7 (11 cols): 2026-08-24T00:00:00 | Monday | Financial Statement Analysis - Consolidation | Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. | Additional practice questions + weak-area drilling | 1.3 | Medium | Completed | Yes |  | REVIEW
Row   8 (11 cols): 2026-09-11T00:00:00 | Friday | Financial Statement Analysis - Consolidation | Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. | Additional practice questions + weak-area drilling | 1.4 | Medium | Completed | Yes |  | REVIEW
Row   9 (11 cols): 2026-09-12T00:00:00 | Saturday | Introduction to Financial Statement Analysis | Describe the steps in the financial statement analysis framework | Describe the roles of financial statement analysis | Learn concepts + practice (Part 1 of 2) | 2 | High | Completed | Yes |  | STUDY
Row  10 (11 cols): 2026-09-13T00:00:00 | Sunday | Introduction to Financial Statement Analysis | Describe importance of regulatory filings, notes/supplementary info, management commentary, audit reports | Describe implications of alternative financial reporting systems and monitoring developments in standards | Describe information sources analysts use besides annual/interim reports | Learn concepts + practice (Part 2 of 2) | 2 | High | Completed | Yes |  | STUDY
Row  11 (11 cols): 2026-09-14T00:00:00 | Monday | Analyzing Income Statements | Describe revenue recognition principles, applications, and implications for financial analysis | Describe expense recognition principles/applications; contrast capitalized vs expensed costs | Learn concepts + practice (Part 1 of 2) | 2 | High | Completed | Yes |  | STUDY
Row  12 (11 cols): 2026-09-15T00:00:00 | Tuesday | Analyzing Income Statements | Describe reporting treatment/analysis of non-recurring items and changes in accounting policies | Describe EPS calculation; calculate/interpret basic and diluted EPS incl. antidilutive securities | Evaluate financial performance using common-size income statements and ratios | Learn concepts + practice (Part 2 of 2) | 2 | High | Completed | Yes |  | STUDY
Row  13 (11 cols): 2026-09-16T00:00:00 | Wednesday | Analyzing Balance Sheets | Explain financial reporting/disclosures related to intangible assets | Explain financial reporting/disclosures related to goodwill | Learn concepts + practice (Part 1 of 2) | 2 | High | Completed | Yes |  | STUDY
Row  14 (11 cols): 2026-09-17T00:00:00 | Thursday | Analyzing Balance Sheets | Explain financial reporting/disclosures related to financial instruments | Explain financial reporting/disclosures related to non-current liabilities | Calculate and interpret common-size balance sheets and related ratios | Learn concepts + practice (Part 2 of 2) | 2 | High | Completed | Yes |  | STUDY
Row  15 (11 cols): 2026-09-18T00:00:00 | Friday | Analyzing Statements of Cash Flows I | Describe how the cash flow statement links to the income statement and balance sheet | Describe preparation of direct/indirect cash flow statements incl. computation from IS/BS data | Learn concepts + practice (Part 1 of 2) | 1.7 | Medium | Not Started | No |  | STUDY
Row  16 (11 cols): 2026-09-19T00:00:00 | Saturday | Analyzing Statements of Cash Flows I | Demonstrate conversion of cash flows from indirect to direct method | Contrast cash flow statements under IFRS and US GAAP | Learn concepts + practice (Part 2 of 2) | 1.7 | Medium | Not Started | No |  | STUDY
```

## 6. Sheet: `M5 Equities`
- **Dimensions:** 41 rows x 11 columns (Non-empty rows: 40)
- **Merged Cell Ranges (2):** A3:F3, A2:D2

### Row Structure & Sample Data:
```text
Row   1 (1 cols): ← Back to Dashboard
Row   2 (1 cols): Equities
Row   3 (1 cols): 12 chapters | 37 learning outcomes | CFA 2027 Level I Topic Outlines
Row   5 (11 cols): Date | Day | Chapter / Topic | Subtopic / Learning Outcome(s) | Task | Planned Hours | Priority | Status | Completed | Notes | RowType
Row   6 (11 cols): 2026-08-10T00:00:00 | Monday | Equities - Consolidation | Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. | Additional practice questions + weak-area drilling | 1.3 | Medium | Not Started | No |  | REVIEW
Row   7 (11 cols): 2026-08-25T00:00:00 | Tuesday | Equities - Consolidation | Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. | Additional practice questions + weak-area drilling | 1.3 | Medium | Not Started | No |  | REVIEW
Row   8 (11 cols): 2026-09-12T00:00:00 | Saturday | Equities - Consolidation | Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. | Additional practice questions + weak-area drilling | 1 | Medium | Not Started | No |  | REVIEW
Row   9 (11 cols): 2026-09-25T00:00:00 | Friday | Equities - Consolidation | Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. | Additional practice questions + weak-area drilling | 1.3 | Medium | Not Started | No |  | REVIEW
Row  10 (11 cols): 2026-10-04T00:00:00 | Sunday | Equity Instrument Features | Describe basic features and types of equity instruments | Contrast features of publicly listed versus private equity securities | Learn concepts + solve practice questions | 2.2 | High | Not Started | No |  | STUDY
Row  11 (11 cols): 2026-10-05T00:00:00 | Monday | Equity Jurisdictions, Classes, and the Voting Process | Describe differences in economic/voting rights and characteristics among jurisdictions and equity classes | Describe the voting process and roles of management, board, proxy advisors, asset managers, asset owners | Learn concepts + solve practice questions | 2.2 | High | Not Started | No |  | STUDY
Row  12 (11 cols): 2026-10-06T00:00:00 | Tuesday | Equity Issuance and Trading | Describe primary and secondary public equity markets and their functions | Compare exchange, off-exchange, and over-the-counter equities trading | Learn concepts + practice (Part 1 of 2) | 1.7 | Medium | Not Started | No |  | STUDY
Row  13 (11 cols): 2026-10-07T00:00:00 | Wednesday | Equity Issuance and Trading | Describe liquidity measures for a publicly listed security; calculate float and average daily volume | Describe types of equity indexes | Learn concepts + practice (Part 2 of 2) | 1.7 | Medium | Not Started | No |  | STUDY
Row  14 (11 cols): 2026-10-07T00:00:00 | Wednesday | Equities - Consolidation | Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. | Additional practice questions + weak-area drilling | 1.3 | Medium | Not Started | No |  | REVIEW
Row  15 (11 cols): 2026-10-08T00:00:00 | Thursday | Sources of Equity Returns | Describe features/uses of dividends, share repurchases, stock splits, and reverse stock splits | Learn concepts + practice (Part 1 of 2) | 1.4 | Medium | Not Started | No |  | STUDY
Row  16 (11 cols): 2026-10-08T00:00:00 | Thursday | Sources of Equity Returns | Describe dividend payment chronology | Calculate price and total return for equity securities | Learn concepts + practice (Part 2 of 2) | 1.4 | Medium | Not Started | No |  | STUDY
```

## 7. Sheet: `M6 Fixed Income`
- **Dimensions:** 50 rows x 11 columns (Non-empty rows: 49)
- **Merged Cell Ranges (2):** A3:F3, A2:D2

### Row Structure & Sample Data:
```text
Row   1 (1 cols): ← Back to Dashboard
Row   2 (1 cols): Fixed Income
Row   3 (1 cols): 19 chapters | 51 learning outcomes | CFA 2027 Level I Topic Outlines
Row   5 (11 cols): Date | Day | Chapter / Topic | Subtopic / Learning Outcome(s) | Task | Planned Hours | Priority | Status | Completed | Notes | RowType
Row   6 (11 cols): 2026-08-11T00:00:00 | Tuesday | Fixed Income - Consolidation | Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. | Additional practice questions + weak-area drilling | 1.3 | Medium | Not Started | No |  | REVIEW
Row   7 (11 cols): 2026-08-26T00:00:00 | Wednesday | Fixed Income - Consolidation | Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. | Additional practice questions + weak-area drilling | 1.3 | Medium | Not Started | No |  | REVIEW
Row   8 (11 cols): 2026-09-13T00:00:00 | Sunday | Fixed Income - Consolidation | Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. | Additional practice questions + weak-area drilling | 1 | Medium | Not Started | No |  | REVIEW
Row   9 (11 cols): 2026-09-26T00:00:00 | Saturday | Fixed Income - Consolidation | Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. | Additional practice questions + weak-area drilling | 1.1 | Medium | Not Started | No |  | REVIEW
Row  10 (11 cols): 2026-10-10T00:00:00 | Saturday | Fixed Income - Consolidation | Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. | Additional practice questions + weak-area drilling | 1.3 | Medium | Not Started | No |  | REVIEW
Row  11 (11 cols): 2026-10-21T00:00:00 | Wednesday | Fixed-Income Instrument Features | Describe the features of a fixed-income security | Describe the contents of a bond indenture; contrast affirmative and negative covenants | Learn concepts + solve practice questions | 2.2 | High | Not Started | No |  | STUDY
Row  12 (11 cols): 2026-10-22T00:00:00 | Thursday | Fixed-Income Cash Flows and Types | Describe common cash flow structures and contingency provisions benefiting issuers/investors | Describe how legal, regulatory, and tax considerations affect issuance/trading of fixed-income securities | Learn concepts + solve practice questions | 2.2 | High | Not Started | No |  | STUDY
Row  13 (11 cols): 2026-10-23T00:00:00 | Friday | Fixed-Income Issuance and Trading | Describe fixed-income market segments and their issuer/investor participants | Learn concepts + practice (Part 1 of 2) | 1.4 | Medium | Not Started | No |  | STUDY
Row  14 (11 cols): 2026-10-23T00:00:00 | Friday | Fixed-Income Issuance and Trading | Describe types of fixed-income indexes | Compare primary and secondary fixed-income markets to equity markets | Learn concepts + practice (Part 2 of 2) | 1.4 | Medium | Not Started | No |  | STUDY
Row  15 (11 cols): 2026-10-24T00:00:00 | Saturday | Fixed-Income Markets for Corporate Issuers | Compare short-term funding alternatives for corporations and financial institutions | Learn concepts + practice (Part 1 of 2) | 1.4 | Medium | Not Started | No |  | STUDY
Row  16 (11 cols): 2026-10-24T00:00:00 | Saturday | Fixed-Income Markets for Corporate Issuers | Describe repurchase agreements (repos), their uses, benefits and risks | Contrast long-term funding of investment-grade versus high-yield corporate issuers | Learn concepts + practice (Part 2 of 2) | 1.4 | Medium | Not Started | No |  | STUDY
```

## 8. Sheet: `M7 Derivatives`
- **Dimensions:** 31 rows x 11 columns (Non-empty rows: 30)
- **Merged Cell Ranges (2):** A3:F3, A2:D2

### Row Structure & Sample Data:
```text
Row   1 (1 cols): ← Back to Dashboard
Row   2 (1 cols): Derivatives
Row   3 (1 cols): 10 chapters | 22 learning outcomes | CFA 2027 Level I Topic Outlines
Row   5 (11 cols): Date | Day | Chapter / Topic | Subtopic / Learning Outcome(s) | Task | Planned Hours | Priority | Status | Completed | Notes | RowType
Row   6 (11 cols): 2026-08-12T00:00:00 | Wednesday | Derivatives - Consolidation | Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. | Additional practice questions + weak-area drilling | 1.3 | Medium | Not Started | No |  | REVIEW
Row   7 (11 cols): 2026-08-27T00:00:00 | Thursday | Derivatives - Consolidation | Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. | Additional practice questions + weak-area drilling | 0.7 | Medium | Not Started | No |  | REVIEW
Row   8 (11 cols): 2026-09-14T00:00:00 | Monday | Derivatives - Consolidation | Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. | Additional practice questions + weak-area drilling | 1 | Medium | Not Started | No |  | REVIEW
Row   9 (11 cols): 2026-09-27T00:00:00 | Sunday | Derivatives - Consolidation | Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. | Additional practice questions + weak-area drilling | 1.1 | Medium | Not Started | No |  | REVIEW
Row  10 (11 cols): 2026-10-11T00:00:00 | Sunday | Derivatives - Consolidation | Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. | Additional practice questions + weak-area drilling | 1.3 | Medium | Not Started | No |  | REVIEW
Row  11 (11 cols): 2026-11-02T00:00:00 | Monday | Derivatives - Consolidation | Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. | Additional practice questions + weak-area drilling | 1.3 | Medium | Not Started | No |  | REVIEW
Row  12 (11 cols): 2026-11-14T00:00:00 | Saturday | Derivative Instrument and Derivative Market Features | Define a derivative and describe basic features of a derivative instrument | Describe basic features of derivative markets; contrast OTC and exchange-traded markets | Learn concepts + solve practice questions | 2.2 | High | Not Started | No |  | STUDY
Row  13 (11 cols): 2026-11-15T00:00:00 | Sunday | Forward Commitment and Contingent Claim Features and Instruments | Define forward contracts, futures, swaps, options (calls/puts), and credit derivatives; compare characteristics | Learn concepts + practice (Part 1 of 2) | 1.4 | Medium | Not Started | No |  | STUDY
Row  14 (11 cols): 2026-11-15T00:00:00 | Sunday | Forward Commitment and Contingent Claim Features and Instruments | Determine value at expiration and profit from a long/short call or put position | Contrast forward commitments with contingent claims | Learn concepts + practice (Part 2 of 2) | 1.4 | Medium | Not Started | No |  | STUDY
Row  15 (11 cols): 2026-11-16T00:00:00 | Monday | Derivative Benefits, Risks, and Issuer and Investor Uses | Describe benefits and risks of derivative instruments | Compare the use of derivatives among issuers and investors | Learn concepts + solve practice questions | 2.2 | High | Not Started | No |  | STUDY
Row  16 (11 cols): 2026-11-17T00:00:00 | Tuesday | Arbitrage, Replication, and the Cost of Carry in Pricing Derivatives | Explain how arbitrage and replication are used in pricing derivatives | Explain the difference between spot and expected future price and the cost of carry | Learn concepts + solve practice questions | 2.2 | High | Not Started | No |  | STUDY
```

## 9. Sheet: `M8 Alt Investments`
- **Dimensions:** 32 rows x 11 columns (Non-empty rows: 31)
- **Merged Cell Ranges (2):** A3:F3, A2:D2

### Row Structure & Sample Data:
```text
Row   1 (1 cols): ← Back to Dashboard
Row   2 (1 cols): Alternative Investments
Row   3 (1 cols): 7 chapters | 22 learning outcomes | CFA 2027 Level I Topic Outlines
Row   5 (11 cols): Date | Day | Chapter / Topic | Subtopic / Learning Outcome(s) | Task | Planned Hours | Priority | Status | Completed | Notes | RowType
Row   6 (11 cols): 2026-08-16T00:00:00 | Sunday | Alternative Investments - Consolidation | Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. | Additional practice questions + weak-area drilling | 1.3 | Medium | Not Started | No |  | REVIEW
Row   7 (11 cols): 2026-08-28T00:00:00 | Friday | Alternative Investments - Consolidation | Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. | Additional practice questions + weak-area drilling | 0.7 | Medium | Not Started | No |  | REVIEW
Row   8 (11 cols): 2026-09-15T00:00:00 | Tuesday | Alternative Investments - Consolidation | Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. | Additional practice questions + weak-area drilling | 1 | Medium | Not Started | No |  | REVIEW
Row   9 (11 cols): 2026-09-28T00:00:00 | Monday | Alternative Investments - Consolidation | Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. | Additional practice questions + weak-area drilling | 1.1 | Medium | Not Started | No |  | REVIEW
Row  10 (11 cols): 2026-10-12T00:00:00 | Monday | Alternative Investments - Consolidation | Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. | Additional practice questions + weak-area drilling | 1.3 | Medium | Not Started | No |  | REVIEW
Row  11 (11 cols): 2026-11-03T00:00:00 | Tuesday | Alternative Investments - Consolidation | Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. | Additional practice questions + weak-area drilling | 1.3 | Medium | Not Started | No |  | REVIEW
Row  12 (11 cols): 2026-11-18T00:00:00 | Wednesday | Alternative Investments - Consolidation | Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. | Additional practice questions + weak-area drilling | 0.8 | Medium | Not Started | No |  | REVIEW
Row  13 (11 cols): 2026-11-26T00:00:00 | Thursday | Alternative Investment Features, Methods, and Structures | Describe features and categories of alternative investments | Learn concepts + practice (Part 1 of 2) | 1.4 | Medium | Not Started | No |  | STUDY
Row  14 (11 cols): 2026-11-26T00:00:00 | Thursday | Alternative Investment Features, Methods, and Structures | Compare direct investment, co-investment, and fund investment methods | Describe investment ownership and compensation structures commonly used | Learn concepts + practice (Part 2 of 2) | 1.4 | Medium | Not Started | No |  | STUDY
Row  15 (11 cols): 2026-11-27T00:00:00 | Friday | Alternative Investment Performance and Returns | Describe the performance appraisal of alternative investments | Calculate and interpret alternative investment returns before and after fees | Learn concepts + solve practice questions | 2.2 | High | Not Started | No |  | STUDY
Row  16 (11 cols): 2026-11-28T00:00:00 | Saturday | Investments in Private Capital: Equity and Debt | Explain features of private equity and its investment characteristics | Learn concepts + practice (Part 1 of 2) | 1.4 | Medium | Not Started | No |  | STUDY
```

## 10. Sheet: `M9 Portfolio Constr`
- **Dimensions:** 35 rows x 11 columns (Non-empty rows: 34)
- **Merged Cell Ranges (2):** A3:F3, A2:D2

### Row Structure & Sample Data:
```text
Row   1 (1 cols): ← Back to Dashboard
Row   2 (1 cols): Portfolio Construction
Row   3 (1 cols): 6 chapters | 40 learning outcomes | CFA 2027 Level I Topic Outlines
Row   5 (11 cols): Date | Day | Chapter / Topic | Subtopic / Learning Outcome(s) | Task | Planned Hours | Priority | Status | Completed | Notes | RowType
Row   6 (11 cols): 2026-08-17T00:00:00 | Monday | Portfolio Construction - Consolidation | Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. | Additional practice questions + weak-area drilling | 1.3 | Medium | Not Started | No |  | REVIEW
Row   7 (11 cols): 2026-09-01T00:00:00 | Tuesday | Portfolio Construction - Consolidation | Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. | Additional practice questions + weak-area drilling | 1 | Medium | Not Started | No |  | REVIEW
Row   8 (11 cols): 2026-09-16T00:00:00 | Wednesday | Portfolio Construction - Consolidation | Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. | Additional practice questions + weak-area drilling | 1 | Medium | Not Started | No |  | REVIEW
Row   9 (11 cols): 2026-09-29T00:00:00 | Tuesday | Portfolio Construction - Consolidation | Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. | Additional practice questions + weak-area drilling | 0.7 | Medium | Not Started | No |  | REVIEW
Row  10 (11 cols): 2026-10-13T00:00:00 | Tuesday | Portfolio Construction - Consolidation | Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. | Additional practice questions + weak-area drilling | 1.3 | Medium | Not Started | No |  | REVIEW
Row  11 (11 cols): 2026-11-06T00:00:00 | Friday | Portfolio Construction - Consolidation | Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. | Additional practice questions + weak-area drilling | 1.6 | Medium | Not Started | No |  | REVIEW
Row  12 (11 cols): 2026-11-19T00:00:00 | Thursday | Portfolio Construction - Consolidation | Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. | Additional practice questions + weak-area drilling | 0.8 | Medium | Not Started | No |  | REVIEW
Row  13 (11 cols): 2026-12-05T00:00:00 | Saturday | Portfolio Risk and Return: Part I | Describe characteristics of major asset classes considered in forming portfolios | Explain risk aversion and its implications for portfolio selection | Learn concepts + practice (Part 1 of 3) | 1.7 | Medium | Not Started | No |  | STUDY
Row  14 (11 cols): 2026-12-06T00:00:00 | Sunday | Portfolio Risk and Return: Part I | Explain optimal portfolio selection given investor utility (risk aversion) and the capital allocation line | Calculate/interpret mean, variance, and covariance (correlation) of asset returns from historical data | Learn concepts + practice (Part 2 of 3) | 1.7 | Medium | Not Started | No |  | STUDY
Row  15 (11 cols): 2026-12-07T00:00:00 | Monday | Portfolio Risk and Return: Part I | Calculate and interpret portfolio standard deviation | Describe the effect on portfolio risk of investing in assets that are less than perfectly correlated | Describe/interpret the minimum-variance and efficient frontiers and the global minimum-variance portfolio | Learn concepts + practice (Part 3 of 3) | 1.7 | Medium | Not Started | No |  | STUDY
Row  16 (11 cols): 2026-12-08T00:00:00 | Tuesday | Portfolio Risk and Return: Part II | Describe implications of combining a risk-free asset with a portfolio of risky assets | Explain the capital allocation line (CAL) and capital market line (CML) | Explain systematic/nonsystematic risk and why nonsystematic risk earns no additional return | Learn concepts + practice (Part 1 of 3) | 2.1 | High | Not Started | No |  | STUDY
```

## 11. Sheet: `M10 Ethics`
- **Dimensions:** 38 rows x 11 columns (Non-empty rows: 37)
- **Merged Cell Ranges (2):** A3:F3, A2:D2

### Row Structure & Sample Data:
```text
Row   1 (1 cols): ← Back to Dashboard
Row   2 (1 cols): Ethical and Professional Standards
Row   3 (1 cols): 10 chapters | 33 learning outcomes | CFA 2027 Level I Topic Outlines
Row   5 (11 cols): Date | Day | Chapter / Topic | Subtopic / Learning Outcome(s) | Task | Planned Hours | Priority | Status | Completed | Notes | RowType
Row   6 (11 cols): 2026-08-19T00:00:00 | Wednesday | Ethical and Professional Standards - Consolidation | Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. | Additional practice questions + weak-area drilling | 0.6 | Medium | Not Started | No |  | REVIEW
Row   7 (11 cols): 2026-09-06T00:00:00 | Sunday | Ethical and Professional Standards - Consolidation | Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. | Additional practice questions + weak-area drilling | 1.3 | Medium | Not Started | No |  | REVIEW
Row   8 (11 cols): 2026-09-17T00:00:00 | Thursday | Ethical and Professional Standards - Consolidation | Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. | Additional practice questions + weak-area drilling | 1 | Medium | Not Started | No |  | REVIEW
Row   9 (11 cols): 2026-09-30T00:00:00 | Wednesday | Ethical and Professional Standards - Consolidation | Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. | Additional practice questions + weak-area drilling | 0.7 | Medium | Not Started | No |  | REVIEW
Row  10 (11 cols): 2026-10-15T00:00:00 | Thursday | Ethical and Professional Standards - Consolidation | Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. | Additional practice questions + weak-area drilling | 1.3 | Medium | Not Started | No |  | REVIEW
Row  11 (11 cols): 2026-11-07T00:00:00 | Saturday | Ethical and Professional Standards - Consolidation | Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. | Additional practice questions + weak-area drilling | 0.8 | Medium | Not Started | No |  | REVIEW
Row  12 (11 cols): 2026-11-20T00:00:00 | Friday | Ethical and Professional Standards - Consolidation | Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. | Additional practice questions + weak-area drilling | 0.8 | Medium | Not Started | No |  | REVIEW
Row  13 (11 cols): 2026-12-10T00:00:00 | Thursday | Ethical and Professional Standards - Consolidation | Use remaining time before 31 Jan to strengthen this module: solve extra item sets, revisit tricky LOs. | Additional practice questions + weak-area drilling | 0.9 | Medium | Not Started | No |  | REVIEW
Row  14 (11 cols): 2026-12-20T00:00:00 | Sunday | Ethics and Trust in the Investment Profession | Explain ethics | Describe the role of a code of ethics in defining a profession | Learn concepts + practice (Part 1 of 3) | 1.9 | Medium | Not Started | No |  | STUDY
Row  15 (11 cols): 2026-12-21T00:00:00 | Monday | Ethics and Trust in the Investment Profession | Describe professions and how they establish trust | Describe the need for high ethical standards in investment management | Learn concepts + practice (Part 2 of 3) | 1.9 | Medium | Not Started | No |  | STUDY
Row  16 (11 cols): 2026-12-22T00:00:00 | Tuesday | Ethics and Trust in the Investment Profession | Explain professionalism in investment management | Identify challenges to ethical behavior | Compare and contrast ethical standards with legal standards | Describe a framework for ethical decision-making | Learn concepts + practice (Part 3 of 3) | 1.9 | Medium | Not Started | No |  | STUDY
```

## 12. Sheet: `Buffer Day`
- **Dimensions:** 9 rows x 6 columns (Non-empty rows: 4)
- **Merged Cell Ranges (1):** A5:F9

### Row Structure & Sample Data:
```text
Row   1 (1 cols): ← Back to Dashboard
Row   2 (1 cols): BUFFER DAY
Row   3 (1 cols): Date: Saturday, 21 November 2026
Row   5 (1 cols): This day is intentionally left free of new syllabus content. Use it to catch up on any topic that took longer than planned, revisit a difficult concept from the past few weeks, or absorb an unexpected interruption without derailing the rest of the schedule. It sits at roughly the 60% mark of the pre-January-31 schedule (after Fixed Income begins) rather than at the very end, so backlog does not simply pile up until the last day.
```

## 13. Sheet: `Feb Revision`
- **Dimensions:** 33 rows x 10 columns (Non-empty rows: 32)

### Row Structure & Sample Data:
```text
Row   1 (1 cols): ← Back to Dashboard
Row   2 (1 cols): February Revision Plan
Row   3 (1 cols): Revision -> Practice -> Weak Areas -> Mock Tests -> Final Revision
Row   5 (10 cols): Date | Day | Revision Round / Phase | Module | Activity | Planned Hours | Status | Score / Result | Weak Areas Identified | Notes
Row   6 (7 cols): 2027-02-01T00:00:00 | Monday | First Revision | Quantitative Methods | Full re-read of notes/summaries + key formulas | 3 | Not Started
Row   7 (7 cols): 2027-02-02T00:00:00 | Tuesday | First Revision | Economics | Full re-read of notes/summaries + key formulas | 3 | Not Started
Row   8 (7 cols): 2027-02-03T00:00:00 | Wednesday | First Revision | Corporate Finance | Full re-read of notes/summaries + key formulas | 3 | Not Started
Row   9 (7 cols): 2027-02-04T00:00:00 | Thursday | First Revision | Financial Statement Analysis | Full re-read of notes/summaries + key formulas | 3 | Not Started
Row  10 (7 cols): 2027-02-05T00:00:00 | Friday | First Revision | Equities | Full re-read of notes/summaries + key formulas | 3 | Not Started
Row  11 (7 cols): 2027-02-06T00:00:00 | Saturday | First Revision | Fixed Income | Full re-read of notes/summaries + key formulas | 3 | Not Started
Row  12 (7 cols): 2027-02-07T00:00:00 | Sunday | First Revision | Derivatives | Full re-read of notes/summaries + key formulas | 3 | Not Started
Row  13 (7 cols): 2027-02-08T00:00:00 | Monday | Second Revision | Alternative Investments | Practice questions + previous-year-style item sets | 3 | Not Started
Row  14 (7 cols): 2027-02-09T00:00:00 | Tuesday | Second Revision | Portfolio Construction | Practice questions + previous-year-style item sets | 3 | Not Started
Row  15 (7 cols): 2027-02-10T00:00:00 | Wednesday | Second Revision | Ethical and Professional Standards | Practice questions + previous-year-style item sets | 3 | Not Started
Row  16 (7 cols): 2027-02-11T00:00:00 | Thursday | Second Revision | Quantitative Methods | Practice questions + previous-year-style item sets | 3 | Not Started
```
