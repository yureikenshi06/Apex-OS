import { useState, useEffect } from 'react';

export interface TimetableTag {
  id: string;
  name: string;
  color: string;
}

export const DEFAULT_TIMETABLE_TAGS: TimetableTag[] = [
  { id: 'deep-work', name: 'Deep Work', color: '#6366f1' },
  { id: 'cfa-study', name: 'CFA Study', color: '#3b82f6' },
  { id: 'placement-prep', name: 'Placement Prep', color: '#8b5cf6' },
  { id: 'classes', name: 'Classes', color: '#06b6d4' },
  { id: 'fitness', name: 'Fitness', color: '#10b981' },
  { id: 'morning-routine', name: 'Morning Routine', color: '#f59e0b' },
  { id: 'meals', name: 'Meals', color: '#64748b' },
  { id: 'personal-brand', name: 'Personal Brand', color: '#ec4899' },
  { id: 'academic', name: 'Academic', color: '#0284c7' },
  { id: 'habit', name: 'Habit', color: '#d97706' },
  { id: 'travel', name: 'Travel', color: '#475569' },
  { id: 'recovery', name: 'Recovery', color: '#6b7280' },
  { id: 'sleep', name: 'Sleep', color: '#1e293b' },
  { id: 'buffer', name: 'Buffer', color: '#334155' },
];

const STORAGE_KEY = 'apex_timetable_tags_v1';

export function getStoredTags(): TimetableTag[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading stored tags:', e);
  }
  return DEFAULT_TIMETABLE_TAGS;
}

export function saveStoredTags(tags: TimetableTag[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tags));
    window.dispatchEvent(new Event('apex_timetable_tags_updated'));
  } catch (e) {
    console.error('Error saving tags:', e);
  }
}

export function useTimetableTags() {
  const [tags, setTags] = useState<TimetableTag[]>(getStoredTags);

  useEffect(() => {
    const handleUpdate = () => {
      setTags(getStoredTags());
    };
    window.addEventListener('apex_timetable_tags_updated', handleUpdate);
    return () => window.removeEventListener('apex_timetable_tags_updated', handleUpdate);
  }, []);

  const addTag = (name: string, color: string = '#6366f1') => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const exists = tags.some(t => t.name.toLowerCase() === trimmed.toLowerCase());
    if (!exists) {
      const newTag: TimetableTag = {
        id: trimmed.toLowerCase().replace(/\s+/g, '-'),
        name: trimmed,
        color,
      };
      const updated = [...tags, newTag];
      saveStoredTags(updated);
      setTags(updated);
    }
  };

  const editTag = (id: string, newName: string, newColor?: string) => {
    const trimmed = newName.trim();
    if (!trimmed) return;
    const updated = tags.map(t => {
      if (t.id === id) {
        return {
          ...t,
          name: trimmed,
          color: newColor || t.color,
        };
      }
      return t;
    });
    saveStoredTags(updated);
    setTags(updated);
  };

  const deleteTag = (id: string) => {
    const updated = tags.filter(t => t.id !== id);
    saveStoredTags(updated);
    setTags(updated);
  };

  const resetTagsToDefaults = () => {
    saveStoredTags(DEFAULT_TIMETABLE_TAGS);
    setTags(DEFAULT_TIMETABLE_TAGS);
  };

  return {
    tags,
    addTag,
    editTag,
    deleteTag,
    resetTagsToDefaults,
  };
}
