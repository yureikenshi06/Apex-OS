export interface MasterSeedBlock {
  day_of_week: number; // 0=Mon, 1=Tue, 2=Wed, 3=Thu, 4=Fri, 5=Sat, 6=Sun
  start_time: string;
  end_time: string;
  activity: string;
  category: string;
  color: string;
  tag?: string;
  notes?: string;
}

export const MASTER_TIMETABLE_SEED: MasterSeedBlock[] = [
  // ==========================================
  // MONDAY (day_of_week = 0)
  // ==========================================
  { day_of_week: 0, start_time: '05:00', end_time: '05:30', activity: 'Freshen Up', category: 'Personal Care', color: '#64748b', tag: 'Morning Routine' },
  { day_of_week: 0, start_time: '05:30', end_time: '06:30', activity: 'Gym (Session 1/5 — Morning)', category: 'Fitness', color: '#10b981', tag: 'Fitness' },
  { day_of_week: 0, start_time: '06:30', end_time: '06:45', activity: 'Shower / Change', category: 'Personal Care', color: '#64748b', tag: 'Morning Routine' },
  { day_of_week: 0, start_time: '06:45', end_time: '07:30', activity: 'Novel Reading', category: 'Reading', color: '#f59e0b', tag: 'Habit' },
  { day_of_week: 0, start_time: '07:30', end_time: '08:30', activity: 'CFA — Concept Study (Deep Work)', category: 'CFA', color: '#6366f1', tag: 'Deep Work' },
  { day_of_week: 0, start_time: '08:30', end_time: '09:00', activity: 'Breakfast', category: 'Meal', color: '#64748b', tag: 'Meals' },
  { day_of_week: 0, start_time: '09:00', end_time: '10:30', activity: 'Placement — Technical/Quant (Deep Work)', category: 'Placement', color: '#8b5cf6', tag: 'Deep Work' },
  { day_of_week: 0, start_time: '10:30', end_time: '11:00', activity: 'Free / Buffer', category: 'Personal Care', color: '#475569', tag: 'Buffer' },
  { day_of_week: 0, start_time: '11:00', end_time: '11:30', activity: 'Travel to Class', category: 'Travel', color: '#475569', tag: 'Travel' },
  { day_of_week: 0, start_time: '11:30', end_time: '12:30', activity: 'BB627 Class', category: 'Class', color: '#3b82f6', tag: 'Classes' },
  { day_of_week: 0, start_time: '12:30', end_time: '13:00', activity: 'Travel to Hostel', category: 'Travel', color: '#475569', tag: 'Travel' },
  { day_of_week: 0, start_time: '13:00', end_time: '13:45', activity: 'Lunch', category: 'Meal', color: '#64748b', tag: 'Meals' },
  { day_of_week: 0, start_time: '13:45', end_time: '15:00', activity: 'Academic Revision / Assignments', category: 'Academic', color: '#06b6d4', tag: 'Academic' },
  { day_of_week: 0, start_time: '15:00', end_time: '15:30', activity: 'Travel to Class', category: 'Travel', color: '#475569', tag: 'Travel' },
  { day_of_week: 0, start_time: '15:30', end_time: '16:30', activity: 'AE641 Class', category: 'Class', color: '#3b82f6', tag: 'Classes' },
  { day_of_week: 0, start_time: '16:30', end_time: '17:00', activity: 'Snack Break', category: 'Meal', color: '#64748b', tag: 'Meals' },
  { day_of_week: 0, start_time: '17:00', end_time: '18:00', activity: 'HS449 Class', category: 'Class', color: '#3b82f6', tag: 'Classes' },
  { day_of_week: 0, start_time: '18:00', end_time: '18:30', activity: 'Travel to Hostel', category: 'Travel', color: '#475569', tag: 'Travel' },
  { day_of_week: 0, start_time: '18:30', end_time: '19:15', activity: 'Placement / Career Flex Block', category: 'Placement', color: '#8b5cf6', tag: 'Placement Prep' },
  { day_of_week: 0, start_time: '19:15', end_time: '19:45', activity: 'Dinner', category: 'Meal', color: '#64748b', tag: 'Meals' },
  { day_of_week: 0, start_time: '19:45', end_time: '20:45', activity: 'CFA — Practice Questions', category: 'CFA', color: '#6366f1', tag: 'CFA Study' },
  { day_of_week: 0, start_time: '20:45', end_time: '21:15', activity: 'X/Twitter — Content & Engagement', category: 'Personal Brand', color: '#ec4899', tag: 'Personal Brand' },
  { day_of_week: 0, start_time: '21:15', end_time: '22:00', activity: 'Free / Recovery', category: 'Personal Care', color: '#64748b', tag: 'Recovery' },
  { day_of_week: 0, start_time: '22:30', end_time: '23:59', activity: 'Sleep', category: 'Personal Care', color: '#1e293b', tag: 'Sleep' },

  // ==========================================
  // TUESDAY (day_of_week = 1)
  // ==========================================
  { day_of_week: 1, start_time: '05:00', end_time: '05:30', activity: 'Freshen Up', category: 'Personal Care', color: '#64748b', tag: 'Morning Routine' },
  { day_of_week: 1, start_time: '05:30', end_time: '06:30', activity: 'Gym (Session 2/5 — Morning)', category: 'Fitness', color: '#10b981', tag: 'Fitness' },
  { day_of_week: 1, start_time: '06:30', end_time: '06:45', activity: 'Shower / Change', category: 'Personal Care', color: '#64748b', tag: 'Morning Routine' },
  { day_of_week: 1, start_time: '06:45', end_time: '07:30', activity: 'Novel Reading', category: 'Reading', color: '#f59e0b', tag: 'Habit' },
  { day_of_week: 1, start_time: '07:30', end_time: '08:30', activity: 'CFA — Concept Study (Deep Work)', category: 'CFA', color: '#6366f1', tag: 'Deep Work' },
  { day_of_week: 1, start_time: '08:30', end_time: '09:00', activity: 'Breakfast', category: 'Meal', color: '#64748b', tag: 'Meals' },
  { day_of_week: 1, start_time: '09:00', end_time: '10:30', activity: 'Placement — Finance/Behavioral Prep', category: 'Placement', color: '#8b5cf6', tag: 'Placement Prep' },
  { day_of_week: 1, start_time: '10:30', end_time: '11:00', activity: 'Free / Buffer', category: 'Personal Care', color: '#475569', tag: 'Buffer' },
  { day_of_week: 1, start_time: '11:00', end_time: '11:30', activity: 'Travel to Class', category: 'Travel', color: '#475569', tag: 'Travel' },
  { day_of_week: 1, start_time: '11:30', end_time: '12:30', activity: 'BB627 Class', category: 'Class', color: '#3b82f6', tag: 'Classes' },
  { day_of_week: 1, start_time: '12:30', end_time: '13:00', activity: 'Quick Lunch (on campus)', category: 'Meal', color: '#64748b', tag: 'Meals' },
  { day_of_week: 1, start_time: '13:00', end_time: '15:00', activity: 'DE 343 Class (NEW)', category: 'Class', color: '#3b82f6', tag: 'Classes' },
  { day_of_week: 1, start_time: '15:00', end_time: '15:30', activity: 'Break / Snack (on campus)', category: 'Meal', color: '#64748b', tag: 'Meals' },
  { day_of_week: 1, start_time: '15:30', end_time: '16:30', activity: 'PS643 Class', category: 'Class', color: '#3b82f6', tag: 'Classes' },
  { day_of_week: 1, start_time: '16:30', end_time: '17:00', activity: 'Break (on campus)', category: 'Personal Care', color: '#475569', tag: 'Buffer' },
  { day_of_week: 1, start_time: '17:00', end_time: '18:00', activity: 'HS449 Class', category: 'Class', color: '#3b82f6', tag: 'Classes' },
  { day_of_week: 1, start_time: '18:00', end_time: '18:30', activity: 'Travel to Hostel', category: 'Travel', color: '#475569', tag: 'Travel' },
  { day_of_week: 1, start_time: '18:30', end_time: '19:00', activity: 'Rest / Change', category: 'Personal Care', color: '#64748b', tag: 'Recovery' },
  { day_of_week: 1, start_time: '19:00', end_time: '19:30', activity: 'Dinner', category: 'Meal', color: '#64748b', tag: 'Meals' },
  { day_of_week: 1, start_time: '19:30', end_time: '20:30', activity: 'Academic Revision / Assignments', category: 'Academic', color: '#06b6d4', tag: 'Academic' },
  { day_of_week: 1, start_time: '20:30', end_time: '21:15', activity: 'CFA — Practice / Error-Log Review', category: 'CFA', color: '#6366f1', tag: 'CFA Study' },
  { day_of_week: 1, start_time: '21:15', end_time: '21:45', activity: 'Substack — Research/Writing', category: 'Personal Brand', color: '#ec4899', tag: 'Personal Brand' },
  { day_of_week: 1, start_time: '21:45', end_time: '22:15', activity: 'Free / Recovery', category: 'Personal Care', color: '#64748b', tag: 'Recovery' },
  { day_of_week: 1, start_time: '22:30', end_time: '23:59', activity: 'Sleep', category: 'Personal Care', color: '#1e293b', tag: 'Sleep' },

  // ==========================================
  // WEDNESDAY (day_of_week = 2)
  // ==========================================
  { day_of_week: 2, start_time: '05:00', end_time: '05:30', activity: 'Freshen Up', category: 'Personal Care', color: '#64748b', tag: 'Morning Routine' },
  { day_of_week: 2, start_time: '05:30', end_time: '06:30', activity: 'Gym (Session 3/5 — Morning)', category: 'Fitness', color: '#10b981', tag: 'Fitness' },
  { day_of_week: 2, start_time: '06:30', end_time: '06:45', activity: 'Shower / Change', category: 'Personal Care', color: '#64748b', tag: 'Morning Routine' },
  { day_of_week: 2, start_time: '06:45', end_time: '07:30', activity: 'Novel Reading', category: 'Reading', color: '#f59e0b', tag: 'Habit' },
  { day_of_week: 2, start_time: '07:30', end_time: '08:00', activity: 'Travel to Class', category: 'Travel', color: '#475569', tag: 'Travel' },
  { day_of_week: 2, start_time: '08:00', end_time: '09:00', activity: 'CE725 Class', category: 'Class', color: '#3b82f6', tag: 'Classes' },
  { day_of_week: 2, start_time: '09:00', end_time: '09:30', activity: 'Breakfast (on campus)', category: 'Meal', color: '#64748b', tag: 'Meals' },
  { day_of_week: 2, start_time: '09:30', end_time: '10:30', activity: 'EC457 Class', category: 'Class', color: '#3b82f6', tag: 'Classes' },
  { day_of_week: 2, start_time: '10:30', end_time: '11:00', activity: 'Travel to Hostel', category: 'Travel', color: '#475569', tag: 'Travel' },
  { day_of_week: 2, start_time: '11:00', end_time: '12:30', activity: 'CFA — Concept Study (Deep Work)', category: 'CFA', color: '#6366f1', tag: 'Deep Work' },
  { day_of_week: 2, start_time: '12:30', end_time: '13:15', activity: 'Lunch', category: 'Meal', color: '#64748b', tag: 'Meals' },
  { day_of_week: 2, start_time: '13:15', end_time: '14:45', activity: 'Placement — Technical/Case Prep (Deep Work)', category: 'Placement', color: '#8b5cf6', tag: 'Deep Work' },
  { day_of_week: 2, start_time: '14:45', end_time: '15:15', activity: 'Free / Buffer', category: 'Personal Care', color: '#475569', tag: 'Buffer' },
  { day_of_week: 2, start_time: '15:15', end_time: '16:00', activity: 'Placement / Academic Flex Block', category: 'Placement', color: '#8b5cf6', tag: 'Placement Prep' },
  { day_of_week: 2, start_time: '16:00', end_time: '16:45', activity: 'Academic Revision / Backlog', category: 'Academic', color: '#06b6d4', tag: 'Academic' },
  { day_of_week: 2, start_time: '16:45', end_time: '17:15', activity: 'Free / Snack', category: 'Meal', color: '#64748b', tag: 'Meals' },
  { day_of_week: 2, start_time: '17:15', end_time: '18:15', activity: 'Placement — Interview/HR Prep', category: 'Placement', color: '#8b5cf6', tag: 'Placement Prep' },
  { day_of_week: 2, start_time: '18:15', end_time: '18:45', activity: 'Dinner', category: 'Meal', color: '#64748b', tag: 'Meals' },
  { day_of_week: 2, start_time: '18:45', end_time: '19:45', activity: 'CFA — Practice Questions', category: 'CFA', color: '#6366f1', tag: 'CFA Study' },
  { day_of_week: 2, start_time: '19:45', end_time: '20:15', activity: 'X/Twitter — Content & Engagement', category: 'Personal Brand', color: '#ec4899', tag: 'Personal Brand' },
  { day_of_week: 2, start_time: '20:15', end_time: '21:15', activity: 'Free / Recovery / Social', category: 'Personal Care', color: '#64748b', tag: 'Recovery' },
  { day_of_week: 2, start_time: '22:30', end_time: '23:59', activity: 'Sleep', category: 'Personal Care', color: '#1e293b', tag: 'Sleep' },

  // ==========================================
  // THURSDAY (day_of_week = 3)
  // ==========================================
  { day_of_week: 3, start_time: '06:00', end_time: '06:20', activity: 'Wake + Hydration/Hygiene', category: 'Personal Care', color: '#64748b', tag: 'Morning Routine' },
  { day_of_week: 3, start_time: '06:20', end_time: '06:50', activity: 'Light Movement / Stretch', category: 'Fitness', color: '#10b981', tag: 'Fitness' },
  { day_of_week: 3, start_time: '06:50', end_time: '07:20', activity: 'Novel Reading', category: 'Reading', color: '#f59e0b', tag: 'Habit' },
  { day_of_week: 3, start_time: '07:20', end_time: '08:30', activity: 'CFA — Concept Study (Deep Work)', category: 'CFA', color: '#6366f1', tag: 'Deep Work' },
  { day_of_week: 3, start_time: '08:30', end_time: '09:00', activity: 'Breakfast', category: 'Meal', color: '#64748b', tag: 'Meals' },
  { day_of_week: 3, start_time: '09:00', end_time: '10:30', activity: 'Placement — Aptitude/Case Prep (Deep Work)', category: 'Placement', color: '#8b5cf6', tag: 'Deep Work' },
  { day_of_week: 3, start_time: '10:30', end_time: '11:00', activity: 'Free / Buffer', category: 'Personal Care', color: '#475569', tag: 'Buffer' },
  { day_of_week: 3, start_time: '11:00', end_time: '11:30', activity: 'Travel to Class', category: 'Travel', color: '#475569', tag: 'Travel' },
  { day_of_week: 3, start_time: '11:30', end_time: '12:30', activity: 'BB627 Class', category: 'Class', color: '#3b82f6', tag: 'Classes' },
  { day_of_week: 3, start_time: '12:30', end_time: '13:00', activity: 'Travel to Hostel', category: 'Travel', color: '#475569', tag: 'Travel' },
  { day_of_week: 3, start_time: '13:00', end_time: '13:45', activity: 'Lunch', category: 'Meal', color: '#64748b', tag: 'Meals' },
  { day_of_week: 3, start_time: '13:45', end_time: '15:00', activity: 'Academic — Problem Sets / Lab Work', category: 'Academic', color: '#06b6d4', tag: 'Academic' },
  { day_of_week: 3, start_time: '15:00', end_time: '15:30', activity: 'Travel to Class', category: 'Travel', color: '#475569', tag: 'Travel' },
  { day_of_week: 3, start_time: '15:30', end_time: '16:30', activity: 'AE641 Class', category: 'Class', color: '#3b82f6', tag: 'Classes' },
  { day_of_week: 3, start_time: '16:30', end_time: '17:00', activity: 'Snack Break', category: 'Meal', color: '#64748b', tag: 'Meals' },
  { day_of_week: 3, start_time: '17:00', end_time: '18:00', activity: 'HS449 Class', category: 'Class', color: '#3b82f6', tag: 'Classes' },
  { day_of_week: 3, start_time: '18:00', end_time: '18:30', activity: 'Travel to Hostel', category: 'Travel', color: '#475569', tag: 'Travel' },
  { day_of_week: 3, start_time: '18:30', end_time: '19:15', activity: 'Placement / Career Flex Block', category: 'Placement', color: '#8b5cf6', tag: 'Placement Prep' },
  { day_of_week: 3, start_time: '19:15', end_time: '19:45', activity: 'Dinner', category: 'Meal', color: '#64748b', tag: 'Meals' },
  { day_of_week: 3, start_time: '19:45', end_time: '20:45', activity: 'CFA — Formula Review / Spaced Repetition', category: 'CFA', color: '#6366f1', tag: 'CFA Study' },
  { day_of_week: 3, start_time: '20:45', end_time: '21:15', activity: 'Reading / Free', category: 'Reading', color: '#f59e0b', tag: 'Habit' },
  { day_of_week: 3, start_time: '21:15', end_time: '22:00', activity: 'Free / Recovery', category: 'Personal Care', color: '#64748b', tag: 'Recovery' },
  { day_of_week: 3, start_time: '22:30', end_time: '23:59', activity: 'Sleep', category: 'Personal Care', color: '#1e293b', tag: 'Sleep' },

  // ==========================================
  // FRIDAY (day_of_week = 4)
  // ==========================================
  { day_of_week: 4, start_time: '05:00', end_time: '05:30', activity: 'Freshen Up', category: 'Personal Care', color: '#64748b', tag: 'Morning Routine' },
  { day_of_week: 4, start_time: '05:30', end_time: '06:30', activity: 'Gym (Session 4/5 — Morning)', category: 'Fitness', color: '#10b981', tag: 'Fitness' },
  { day_of_week: 4, start_time: '06:30', end_time: '06:45', activity: 'Shower / Change', category: 'Personal Care', color: '#64748b', tag: 'Morning Routine' },
  { day_of_week: 4, start_time: '06:45', end_time: '07:30', activity: 'Novel Reading', category: 'Reading', color: '#f59e0b', tag: 'Habit' },
  { day_of_week: 4, start_time: '07:30', end_time: '08:00', activity: 'Travel to Class', category: 'Travel', color: '#475569', tag: 'Travel' },
  { day_of_week: 4, start_time: '08:00', end_time: '09:00', activity: 'CE725 Class', category: 'Class', color: '#3b82f6', tag: 'Classes' },
  { day_of_week: 4, start_time: '09:00', end_time: '09:30', activity: 'Breakfast (on campus)', category: 'Meal', color: '#64748b', tag: 'Meals' },
  { day_of_week: 4, start_time: '09:30', end_time: '10:30', activity: 'EC457 Class', category: 'Class', color: '#3b82f6', tag: 'Classes' },
  { day_of_week: 4, start_time: '10:30', end_time: '11:00', activity: 'Travel to Hostel', category: 'Travel', color: '#475569', tag: 'Travel' },
  { day_of_week: 4, start_time: '11:00', end_time: '12:30', activity: 'CFA — Concept Study / Mock Prep', category: 'CFA', color: '#6366f1', tag: 'Deep Work' },
  { day_of_week: 4, start_time: '12:30', end_time: '13:15', activity: 'Lunch', category: 'Meal', color: '#64748b', tag: 'Meals' },
  { day_of_week: 4, start_time: '13:15', end_time: '14:45', activity: 'Placement / Career Flex Block (mock interviews, apps)', category: 'Placement', color: '#8b5cf6', tag: 'Placement Prep' },
  { day_of_week: 4, start_time: '14:45', end_time: '15:00', activity: 'Buffer', category: 'Personal Care', color: '#475569', tag: 'Buffer' },
  { day_of_week: 4, start_time: '15:00', end_time: '15:30', activity: 'Travel to Class', category: 'Travel', color: '#475569', tag: 'Travel' },
  { day_of_week: 4, start_time: '15:30', end_time: '16:30', activity: 'PS643 Class', category: 'Class', color: '#3b82f6', tag: 'Classes' },
  { day_of_week: 4, start_time: '16:30', end_time: '17:00', activity: 'Travel to Hostel', category: 'Travel', color: '#475569', tag: 'Travel' },
  { day_of_week: 4, start_time: '17:00', end_time: '18:00', activity: 'Substack — Deep Writing Session', category: 'Personal Brand', color: '#ec4899', tag: 'Deep Work' },
  { day_of_week: 4, start_time: '18:00', end_time: '18:30', activity: 'Dinner', category: 'Meal', color: '#64748b', tag: 'Meals' },
  { day_of_week: 4, start_time: '18:30', end_time: '19:00', activity: 'Weekly Content / Personal Brand Review', category: 'Personal Brand', color: '#ec4899', tag: 'Personal Brand' },
  { day_of_week: 4, start_time: '19:00', end_time: '20:30', activity: 'Free / Recovery / Social', category: 'Personal Care', color: '#64748b', tag: 'Recovery' },
  { day_of_week: 4, start_time: '20:30', end_time: '21:30', activity: 'Free', category: 'Personal Care', color: '#64748b', tag: 'Recovery' },
  { day_of_week: 4, start_time: '22:30', end_time: '23:59', activity: 'Sleep', category: 'Personal Care', color: '#1e293b', tag: 'Sleep' },

  // ==========================================
  // SATURDAY (day_of_week = 5)
  // ==========================================
  { day_of_week: 5, start_time: '07:00', end_time: '07:30', activity: 'Hygiene / Hydration', category: 'Personal Care', color: '#64748b', tag: 'Morning Routine' },
  { day_of_week: 5, start_time: '07:30', end_time: '08:00', activity: 'Novel Reading (extended)', category: 'Reading', color: '#f59e0b', tag: 'Habit' },
  { day_of_week: 5, start_time: '08:00', end_time: '08:30', activity: 'Breakfast', category: 'Meal', color: '#64748b', tag: 'Meals' },
  { day_of_week: 5, start_time: '08:30', end_time: '10:30', activity: 'CFA — Deep Work / Mock Test Section', category: 'CFA', color: '#6366f1', tag: 'Deep Work' },
  { day_of_week: 5, start_time: '10:30', end_time: '11:00', activity: 'Break', category: 'Personal Care', color: '#475569', tag: 'Buffer' },
  { day_of_week: 5, start_time: '11:00', end_time: '12:30', activity: 'Placement — Technical + Aptitude (Deep Work)', category: 'Placement', color: '#8b5cf6', tag: 'Deep Work' },
  { day_of_week: 5, start_time: '12:30', end_time: '13:30', activity: 'Lunch', category: 'Meal', color: '#64748b', tag: 'Meals' },
  { day_of_week: 5, start_time: '13:30', end_time: '14:30', activity: 'Gym (Session 5/5)', category: 'Fitness', color: '#10b981', tag: 'Fitness' },
  { day_of_week: 5, start_time: '14:30', end_time: '15:00', activity: 'Shower / Change', category: 'Personal Care', color: '#64748b', tag: 'Morning Routine' },
  { day_of_week: 5, start_time: '15:00', end_time: '16:00', activity: 'Academic Backlog / Project Work', category: 'Academic', color: '#06b6d4', tag: 'Academic' },
  { day_of_week: 5, start_time: '16:00', end_time: '17:00', activity: 'Free / Social', category: 'Personal Care', color: '#64748b', tag: 'Recovery' },
  { day_of_week: 5, start_time: '17:00', end_time: '18:00', activity: 'Substack — Deep Writing / CFA Mock cont.', category: 'Personal Brand', color: '#ec4899', tag: 'Deep Work' },
  { day_of_week: 5, start_time: '18:00', end_time: '18:30', activity: 'Snack', category: 'Meal', color: '#64748b', tag: 'Meals' },
  { day_of_week: 5, start_time: '18:30', end_time: '19:30', activity: 'Free / Recovery', category: 'Personal Care', color: '#64748b', tag: 'Recovery' },
  { day_of_week: 5, start_time: '19:30', end_time: '20:00', activity: 'Dinner', category: 'Meal', color: '#64748b', tag: 'Meals' },
  { day_of_week: 5, start_time: '20:00', end_time: '21:00', activity: 'Weekly Planning Session', category: 'Personal Care', color: '#6366f1', tag: 'Habit' },
  { day_of_week: 5, start_time: '21:00', end_time: '23:00', activity: 'Free / Social / Recovery', category: 'Personal Care', color: '#64748b', tag: 'Recovery' },
  { day_of_week: 5, start_time: '23:00', end_time: '23:59', activity: 'Sleep', category: 'Personal Care', color: '#1e293b', tag: 'Sleep' },

  // ==========================================
  // SUNDAY (day_of_week = 6)
  // ==========================================
  { day_of_week: 6, start_time: '07:30', end_time: '08:00', activity: 'Hygiene / Hydration', category: 'Personal Care', color: '#64748b', tag: 'Morning Routine' },
  { day_of_week: 6, start_time: '08:00', end_time: '08:30', activity: 'Novel Reading (extended)', category: 'Reading', color: '#f59e0b', tag: 'Habit' },
  { day_of_week: 6, start_time: '08:30', end_time: '09:00', activity: 'Breakfast', category: 'Meal', color: '#64748b', tag: 'Meals' },
  { day_of_week: 6, start_time: '09:00', end_time: '10:30', activity: 'CFA — Full-Length Mock / Practice', category: 'CFA', color: '#6366f1', tag: 'Deep Work' },
  { day_of_week: 6, start_time: '10:30', end_time: '11:00', activity: 'Break', category: 'Personal Care', color: '#475569', tag: 'Buffer' },
  { day_of_week: 6, start_time: '11:00', end_time: '12:00', activity: 'Academic Revision / Catch-up', category: 'Academic', color: '#06b6d4', tag: 'Academic' },
  { day_of_week: 6, start_time: '12:00', end_time: '13:00', activity: 'Lunch', category: 'Meal', color: '#64748b', tag: 'Meals' },
  { day_of_week: 6, start_time: '13:00', end_time: '14:00', activity: 'Free / Social', category: 'Personal Care', color: '#64748b', tag: 'Recovery' },
  { day_of_week: 6, start_time: '14:00', end_time: '15:00', activity: 'Gym (Optional) / Free', category: 'Fitness', color: '#10b981', tag: 'Fitness' },
  { day_of_week: 6, start_time: '15:00', end_time: '16:00', activity: 'Placement — Resume/Networking/Applications', category: 'Placement', color: '#8b5cf6', tag: 'Placement Prep' },
  { day_of_week: 6, start_time: '16:00', end_time: '17:00', activity: 'Free / Recovery', category: 'Personal Care', color: '#64748b', tag: 'Recovery' },
  { day_of_week: 6, start_time: '17:00', end_time: '17:30', activity: 'Novel Reading', category: 'Reading', color: '#f59e0b', tag: 'Habit' },
  { day_of_week: 6, start_time: '17:30', end_time: '18:00', activity: 'X/Twitter + Substack — Plan Week Ahead', category: 'Personal Brand', color: '#ec4899', tag: 'Personal Brand' },
  { day_of_week: 6, start_time: '18:00', end_time: '19:00', activity: 'Free / Social', category: 'Personal Care', color: '#64748b', tag: 'Recovery' },
  { day_of_week: 6, start_time: '19:00', end_time: '19:30', activity: 'Dinner', category: 'Meal', color: '#64748b', tag: 'Meals' },
  { day_of_week: 6, start_time: '19:30', end_time: '20:30', activity: 'Free / Recovery', category: 'Personal Care', color: '#64748b', tag: 'Recovery' },
  { day_of_week: 6, start_time: '20:30', end_time: '21:00', activity: 'Light Admin — Prep for Monday', category: 'Personal Care', color: '#64748b', tag: 'Habit' },
  { day_of_week: 6, start_time: '21:00', end_time: '22:00', activity: 'Free', category: 'Personal Care', color: '#64748b', tag: 'Recovery' },
  { day_of_week: 6, start_time: '22:30', end_time: '23:59', activity: 'Sleep', category: 'Personal Care', color: '#1e293b', tag: 'Sleep' },
];
