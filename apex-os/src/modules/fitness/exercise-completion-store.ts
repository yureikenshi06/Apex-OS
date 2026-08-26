import { useState, useEffect } from 'react';
import { format } from 'date-fns';

const STORAGE_KEY = 'apex_completed_exercises_v1';

export function getCompletedExercises(dateStr?: string): Record<string, boolean> {
  const dateKey = dateStr || format(new Date(), 'yyyy-MM-dd');
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY}_${dateKey}`);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading completed exercises:', e);
  }
  return {};
}

export function setExerciseCompleted(exerciseName: string, isCompleted: boolean, dateStr?: string) {
  const dateKey = dateStr || format(new Date(), 'yyyy-MM-dd');
  const current = getCompletedExercises(dateKey);
  const updated = { ...current, [exerciseName]: isCompleted };
  try {
    localStorage.setItem(`${STORAGE_KEY}_${dateKey}`, JSON.stringify(updated));
    window.dispatchEvent(new Event('apex_completed_exercises_updated'));
  } catch (e) {
    console.error('Error saving completed exercises:', e);
  }
}

export function resetAllCompletedExercises(dateStr?: string) {
  const dateKey = dateStr || format(new Date(), 'yyyy-MM-dd');
  try {
    localStorage.removeItem(`${STORAGE_KEY}_${dateKey}`);
    window.dispatchEvent(new Event('apex_completed_exercises_updated'));
  } catch (e) {
    console.error('Error resetting completed exercises:', e);
  }
}

export function useExerciseCompletion(dateStr?: string) {
  const dateKey = dateStr || format(new Date(), 'yyyy-MM-dd');
  const [completedMap, setCompletedMap] = useState<Record<string, boolean>>(() => getCompletedExercises(dateKey));

  useEffect(() => {
    const handleUpdate = () => {
      setCompletedMap(getCompletedExercises(dateKey));
    };
    window.addEventListener('apex_completed_exercises_updated', handleUpdate);
    return () => window.removeEventListener('apex_completed_exercises_updated', handleUpdate);
  }, [dateKey]);

  const toggleExercise = (exerciseName: string) => {
    const nextState = !completedMap[exerciseName];
    setExerciseCompleted(exerciseName, nextState, dateKey);
    setCompletedMap(prev => ({ ...prev, [exerciseName]: nextState }));
  };

  const resetToday = () => {
    resetAllCompletedExercises(dateKey);
    setCompletedMap({});
  };

  return {
    completedMap,
    toggleExercise,
    resetToday,
  };
}
