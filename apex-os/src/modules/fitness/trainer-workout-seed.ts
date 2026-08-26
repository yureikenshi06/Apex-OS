export interface TrainerExercise {
  day_of_week: number; // 0=Mon, 1=Tue, 2=Wed, 3=Thu, 4=Fri, 5=Sat, 6=Sun
  day_name: string;
  focus: string;
  warmup: string;
  cooldown: string;
  cardio?: string;
  exercises: {
    name: string;
    muscle_group: string;
    sets: number;
    reps: string;
    rest_sec: number;
    notes?: string;
  }[];
}

export const TRAINER_WORKOUT_PLAN: TrainerExercise[] = [
  // ==========================================
  // MONDAY: UPPER BODY A (Push Emphasis) + Cardio
  // ==========================================
  {
    day_of_week: 0,
    day_name: 'Monday',
    focus: 'Upper Body A (Push Emphasis) + Cardio',
    warmup: '5 min: Arm circles, band pull-aparts, 3 min incline treadmill walk',
    cardio: 'Treadmill incline walk/jog, moderate pace, incline 4-6% — 10 min',
    cooldown: 'Chest, shoulder, back stretch — 5 min',
    exercises: [
      { name: 'Barbell Bench Press', muscle_group: 'Chest', sets: 4, reps: '8-10 reps', rest_sec: 90 },
      { name: 'Lat Pulldown (wide grip)', muscle_group: 'Back', sets: 3, reps: '10-12 reps', rest_sec: 75 },
      { name: 'Seated Dumbbell Shoulder Press', muscle_group: 'Shoulders', sets: 3, reps: '10-12 reps', rest_sec: 75 },
      { name: 'Seated Cable Row', muscle_group: 'Back', sets: 3, reps: '10-12 reps', rest_sec: 75 },
      { name: 'Cable Tricep Pushdown', muscle_group: 'Triceps', sets: 3, reps: '12-15 reps', rest_sec: 60 },
      { name: 'Dumbbell Bicep Curl', muscle_group: 'Biceps', sets: 3, reps: '12-15 reps', rest_sec: 60 },
      { name: 'Plank', muscle_group: 'Core', sets: 3, reps: '40-45 sec hold', rest_sec: 45 },
    ],
  },

  // ==========================================
  // TUESDAY: LOWER BODY A + Core
  // ==========================================
  {
    day_of_week: 1,
    day_name: 'Tuesday',
    focus: 'Lower Body A + Core',
    warmup: '5 min: Bodyweight squats, leg swings, 3 min stationary bike',
    cardio: 'None (Leg Strength & Hypertrophy Day)',
    cooldown: 'Hips, hamstrings, lower back stretch — 5 min',
    exercises: [
      { name: 'Barbell Back Squat', muscle_group: 'Quads/Glutes', sets: 4, reps: '8-10 reps', rest_sec: 120 },
      { name: 'Romanian Deadlift (Barbell)', muscle_group: 'Hamstrings/Glutes', sets: 3, reps: '10-12 reps', rest_sec: 90 },
      { name: 'Leg Press Machine', muscle_group: 'Quads', sets: 3, reps: '12-15 reps', rest_sec: 90 },
      { name: 'Leg Curl Machine', muscle_group: 'Hamstrings', sets: 3, reps: '12-15 reps', rest_sec: 60 },
      { name: 'Standing Calf Raise', muscle_group: 'Calves', sets: 3, reps: '15-20 reps', rest_sec: 45 },
      { name: 'Cable Crunch / Hanging Leg Raise', muscle_group: 'Core', sets: 3, reps: '12-15 reps', rest_sec: 45 },
      { name: 'Russian Twists', muscle_group: 'Core (Obliques)', sets: 3, reps: '20 total', rest_sec: 45 },
    ],
  },

  // ==========================================
  // WEDNESDAY: UPPER BODY B (Pull Emphasis) + Cardio
  // ==========================================
  {
    day_of_week: 2,
    day_name: 'Wednesday',
    focus: 'Upper Body B (Pull Emphasis) + Cardio',
    warmup: '5 min: Band pull-aparts, shoulder rolls, easy rowing machine',
    cardio: 'Rowing machine, steady pace — 10 min',
    cooldown: 'Back, biceps, shoulder stretch — 5 min',
    exercises: [
      { name: 'Barbell Bent-Over Row', muscle_group: 'Back', sets: 4, reps: '8-10 reps', rest_sec: 90 },
      { name: 'Incline Dumbbell Press', muscle_group: 'Chest', sets: 3, reps: '10-12 reps', rest_sec: 75 },
      { name: 'Lat Pulldown (close grip)', muscle_group: 'Back', sets: 3, reps: '10-12 reps', rest_sec: 75 },
      { name: 'Dumbbell Lateral Raise', muscle_group: 'Shoulders', sets: 3, reps: '12-15 reps', rest_sec: 60 },
      { name: 'EZ-Bar Bicep Curl', muscle_group: 'Biceps', sets: 3, reps: '12-15 reps', rest_sec: 60 },
      { name: 'Overhead Cable Tricep Extension', muscle_group: 'Triceps', sets: 3, reps: '12-15 reps', rest_sec: 60 },
      { name: 'Cable Woodchopper', muscle_group: 'Core', sets: 3, reps: '12/side', rest_sec: 45 },
    ],
  },

  // ==========================================
  // THURSDAY: LOWER BODY B + Core
  // ==========================================
  {
    day_of_week: 3,
    day_name: 'Thursday',
    focus: 'Lower Body B + Core',
    warmup: '5 min: Hip circles, glute bridges, 3 min bike',
    cardio: 'None (Posterior Chain Day)',
    cooldown: 'Full lower body stretch — 5 min',
    exercises: [
      { name: 'Barbell Deadlift (Conventional)', muscle_group: 'Full Posterior Chain', sets: 4, reps: '6-8 reps', rest_sec: 120 },
      { name: 'Bulgarian Split Squat (Dumbbell)', muscle_group: 'Quads/Glutes', sets: 3, reps: '10/side', rest_sec: 75 },
      { name: 'Leg Extension Machine', muscle_group: 'Quads', sets: 3, reps: '12-15 reps', rest_sec: 60 },
      { name: 'Seated Leg Curl Machine', muscle_group: 'Hamstrings', sets: 3, reps: '12-15 reps', rest_sec: 60 },
      { name: 'Barbell Hip Thrust', muscle_group: 'Glutes', sets: 3, reps: '12-15 reps', rest_sec: 75 },
      { name: 'Seated Calf Raise', muscle_group: 'Calves', sets: 3, reps: '15-20 reps', rest_sec: 45 },
      { name: 'Weighted Plank / Ab Wheel Rollout', muscle_group: 'Core', sets: 3, reps: '45 sec / 10 reps', rest_sec: 45 },
    ],
  },

  // ==========================================
  // FRIDAY: FULL BODY A + Conditioning
  // ==========================================
  {
    day_of_week: 4,
    day_name: 'Friday',
    focus: 'Full Body A + Conditioning',
    warmup: '5 min: Dynamic full-body movement prep',
    cardio: 'Conditioning: Kettlebell swings / rowing intervals, moderate-high intensity — 10 min',
    cooldown: 'Full body stretch — 5 min',
    exercises: [
      { name: 'Goblet Squat (Dumbbell)', muscle_group: 'Quads/Glutes', sets: 3, reps: '10-12 reps', rest_sec: 75 },
      { name: 'Pull-Up (assisted machine if needed)', muscle_group: 'Back', sets: 3, reps: '8-10 reps', rest_sec: 90 },
      { name: 'Dumbbell Shoulder Press', muscle_group: 'Shoulders', sets: 3, reps: '10-12 reps', rest_sec: 75 },
      { name: 'Dumbbell Romanian Deadlift', muscle_group: 'Hamstrings', sets: 3, reps: '10-12 reps', rest_sec: 75 },
      { name: 'Cable Chest Fly', muscle_group: 'Chest', sets: 3, reps: '12-15 reps', rest_sec: 60 },
      { name: 'Farmer’s Carry (Dumbbells)', muscle_group: 'Full Body/Grip', sets: 3, reps: '30-40m', rest_sec: 60 },
    ],
  },

  // ==========================================
  // SATURDAY: FULL BODY B + Core (Week Finisher)
  // ==========================================
  {
    day_of_week: 5,
    day_name: 'Saturday',
    focus: 'Full Body B + Core (Week Finisher)',
    warmup: '5 min: Dynamic full-body movement prep',
    cardio: 'Treadmill or cycling, steady pace — 10-12 min',
    cooldown: 'Full body stretch — 5 min',
    exercises: [
      { name: 'Barbell Overhead Press', muscle_group: 'Shoulders', sets: 3, reps: '8-10 reps', rest_sec: 90 },
      { name: 'Dumbbell Romanian Deadlift', muscle_group: 'Hamstrings/Glutes', sets: 3, reps: '10-12 reps', rest_sec: 75 },
      { name: 'Chest Press Machine', muscle_group: 'Chest', sets: 3, reps: '10-12 reps', rest_sec: 75 },
      { name: 'Seated Row Machine', muscle_group: 'Back', sets: 3, reps: '10-12 reps', rest_sec: 75 },
      { name: 'Walking Lunges (Dumbbell)', muscle_group: 'Legs/Glutes', sets: 3, reps: '12/leg', rest_sec: 60 },
      { name: 'Cable Crunch', muscle_group: 'Core', sets: 3, reps: '15 reps', rest_sec: 45 },
      { name: 'Side Plank', muscle_group: 'Core (Obliques)', sets: 3, reps: '30 sec/side', rest_sec: 45 },
    ],
  },

  // ==========================================
  // SUNDAY: REST DAY (SUNDAY ONLY - No gym session)
  // ==========================================
  {
    day_of_week: 6,
    day_name: 'Sunday',
    focus: 'Rest & Active Recovery (Sunday Only)',
    warmup: 'None',
    cardio: 'Optional 20-30 min easy walk or foam rolling',
    cooldown: 'Full body stretch & relaxation',
    exercises: [],
  },
];
