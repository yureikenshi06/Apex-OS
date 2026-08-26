export const DEFAULT_SETTINGS = {
  // Timetable
  target_wake_time: '06:00',
  target_sleep_time: '22:30',
  target_sleep_hours: 7.5,
  gym_sessions_per_week: 4,
  cfa_hours_per_week: 12,
  placement_hours_per_week: 10,
  reading_min_per_day: 30,
  travel_buffer_min: 30,
  
  // Category weights for daily score
  category_weights: {
    CFA: { weight: 3, priority_tier: 'P1', color: '#6366f1' },
    Placement: { weight: 3, priority_tier: 'P1', color: '#8b5cf6' },
    Academic: { weight: 2, priority_tier: 'P2', color: '#06b6d4' },
    Fitness: { weight: 1.5, priority_tier: 'P2', color: '#22c55e' },
    Reading: { weight: 0.5, priority_tier: 'P3', color: '#f59e0b' },
    'Personal Brand': { weight: 1, priority_tier: 'P3', color: '#ec4899' },
    'Personal Care': { weight: 0, priority_tier: 'P0', color: '#64748b' },
    Meal: { weight: 0, priority_tier: 'P0', color: '#64748b' },
    Travel: { weight: 0, priority_tier: 'P0', color: '#64748b' },
    Class: { weight: 0, priority_tier: 'P0', color: '#3b82f6' },
  },

  // Finance
  currency_symbol: '₹',
  near_limit_threshold: 0.8,
  savings_rate_target: 0.2,
  finance_categories: ['Food', 'Transport', 'Education', 'Health', 'Housing', 'Entertainment', 'Shopping', 'Finance', 'Travel', 'Personal'],
  finance_subcategories: {
    Food: ['Groceries', 'Restaurants', 'Cafes', 'Ordering In', 'Snacks'],
    Transport: ['Public Transport', 'Fuel', 'Taxi', 'Parking', 'Maintenance'],
    Education: ['Tuition', 'Books', 'Courses', 'Stationery'],
    Health: ['Medicine', 'Gym', 'Wellness', 'Doctor'],
    Housing: ['Rent', 'Electricity', 'Internet', 'Water', 'Maintenance'],
    Entertainment: ['Movies', 'Streaming', 'Games', 'Events'],
    Shopping: ['Clothing', 'Electronics', 'Household', 'Gifts'],
    Finance: ['Bank Fees', 'Insurance', 'Investment', 'EMI'],
    Travel: ['Flights', 'Hotels', 'Local Transport', 'Food (Travel)'],
    Personal: ['Gifts', 'Grooming', 'Laundry', 'Miscellaneous'],
  },
  payment_methods: ['UPI', 'Credit Card', 'Bank Transfer', 'Net Banking', 'Cash'],
  accounts: ['Bank Account', 'Credit Card', 'UPI', 'Cash'],

  // Fitness
  height_cm: 165,
  starting_weight_kg: 83,
  target_weight_kg: 75,
  age: 25,
  sex: 'Male' as const,
  activity_level: 'Moderately Active' as const,
  calorie_target: 2199,
  protein_target_g: 149,
  water_target_glasses: 8,
  sleep_target_hrs: 7.5,
  steps_target: 8000,
  
  // Fitness habit weights
  fitness_habit_weights: {
    workout_completed: 20,
    steps_completed: 10,
    calories_within_target: 15,
    protein_target_hit: 15,
    water_target_hit: 5,
    sleep_target_hit: 10,
    fruits_veg_consumed: 5,
    no_junk_food: 10,
    mobility_stretching: 10,
  },

  // CFA
  cfa_start_date: '2026-08-05',
  cfa_deadline: '2027-01-31',
  cfa_revision_month: '2027-02',

  // UI
  theme: 'dark' as const,
};

export type AppSettings = typeof DEFAULT_SETTINGS;
