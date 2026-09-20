import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTimetableBlocks, usePopulateMasterTimetable } from './hooks';
import { TimetableBlockModal } from './timetable-block-modal';
import { TimetableTagManagerModal } from './timetable-tag-manager-modal';
import { useTimetableTags } from './timetable-tag-store';
import { MASTER_TIMETABLE_SEED } from './master-timetable-seed';
import { 
  Plus, Calendar as CalendarIcon, CheckCircle2, Circle, 
  Settings, Tag, RotateCcw, Sparkles, 
  ChevronDown, ChevronRight, Filter,
  Eye, Trophy, Zap, BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { TimetableBlock } from '@/api/types';

const DAYS = [
  { id: 0, name: 'Monday',    short: 'Mon' },
  { id: 1, name: 'Tuesday',   short: 'Tue' },
  { id: 2, name: 'Wednesday', short: 'Wed' },
  { id: 3, name: 'Thursday',  short: 'Thu' },
  { id: 4, name: 'Friday',    short: 'Fri' },
  { id: 5, name: 'Saturday',  short: 'Sat' },
  { id: 6, name: 'Sunday',    short: 'Sun' },
];

// Map JS getDay() (0=Sun) → our day id (0=Mon)
const jsToApex = (jsDay: number) => (jsDay + 6) % 7;

const CATEGORY_COLORS: Record<string, string> = {
  CFA: '#3B6EF6',
  Placement: '#8b5cf6',
  Academic: '#06b6d4',
  Fitness: '#22C55E',
  Reading: '#F5A524',
  'Personal Brand': '#ec4899',
  Class: '#3B6EF6',
  Meal: '#6F7C99',
  Travel: '#56627D',
  'Personal Care': '#8A93A6',
};

// localStorage helpers — keyed per block per date
const checkKey = (blockId: string, date: string) => `apex_check_${blockId}_${date}`;

function getChecked(blockId: string, date: string): boolean {
  try { return localStorage.getItem(checkKey(blockId, date)) === '1'; } catch { return false; }
}
function setChecked(blockId: string, date: string, val: boolean) {
  try {
    if (val) localStorage.setItem(checkKey(blockId, date), '1');
    else localStorage.removeItem(checkKey(blockId, date));
  } catch {}
}

// Progress ring SVG component
function ProgressRing({ pct, size = 64, stroke = 5 }: { pct: number; size?: number; stroke?: number }) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  const color = pct >= 80 ? '#22C55E' : pct >= 50 ? '#3B6EF6' : pct > 0 ? '#F5A524' : '#374151';
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={r} stroke="#1A2030" strokeWidth={stroke} fill="none" />
      <circle
        cx={size / 2} cy={size / 2} r={r}
        stroke={color} strokeWidth={stroke} fill="none"
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.5s ease' }}
      />
    </svg>
  );
}

// ─── Checklist Item Component ─────────────────────────────────────────────────
function ChecklistItem({
  block,
  date,
  onEdit,
  dimmed,
  highlighted,
}: {
  block: TimetableBlock;
  date: string;
  onEdit: (block: TimetableBlock) => void;
  dimmed?: boolean;
  highlighted?: boolean;
}) {
  const [done, setDone] = useState(() => getChecked(block.id, date));

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !done;
    setDone(next);
    setChecked(block.id, date, next);
  };

  const color = block.color || CATEGORY_COLORS[block.category || ''] || '#3B6EF6';

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: dimmed ? 0.25 : 1 }}
      className={`group flex items-center gap-3 p-3.5 rounded-2xl border transition-all cursor-pointer ${
        done
          ? 'bg-emerald-500/5 border-emerald-500/20'
          : 'bg-white/[0.02] border-line/70 hover:border-white/15 hover:bg-white/[0.04]'
      } ${highlighted ? 'ring-2 ring-blue-400/60' : ''}`}
      onClick={() => onEdit(block)}
    >
      {/* Check toggle */}
      <button
        onClick={toggle}
        className="shrink-0 transition-transform active:scale-90"
        aria-label={done ? 'Mark incomplete' : 'Mark complete'}
      >
        {done ? (
          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
        ) : (
          <Circle className="w-6 h-6 text-zinc-500 group-hover:text-zinc-400 transition-colors" />
        )}
      </button>

      {/* Color accent dot */}
      <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />

      {/* Activity info */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold leading-tight ${done ? 'line-through text-zinc-500' : 'text-white'}`}>
          {block.activity}
        </p>
      </div>

      {/* Category badge */}
      <span
        className="text-[11px] font-semibold px-2 py-0.5 rounded-lg shrink-0"
        style={{ backgroundColor: `${color}25`, color: color }}
      >
        {block.category}
      </span>

      {/* Edit hint */}
      <ChevronRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-400 transition-colors shrink-0" />
    </motion.div>
  );
}
// ─────────────────────────────────────────────────────────────────────────────

export default function TimetablePage() {
  const { data: dbBlocks = [], isLoading } = useTimetableBlocks();
  const populateMutation = usePopulateMasterTimetable();
  const { tags } = useTimetableTags();

  const [modalOpen, setModalOpen] = useState(false);
  const [tagModalOpen, setTagModalOpen] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<TimetableBlock | null>(null);
  const [selectedDay, setSelectedDay] = useState(0);
  const [activeDayTab, setActiveDayTab] = useState(() => jsToApex(new Date().getDay()));
  const [highlightedTag, setHighlightedTag] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'today' | 'week'>('today');

  // Today's date string
  const todayStr = new Date().toISOString().split('T')[0];

  // Derive date string for the active day tab (offset from today's week Monday)
  const activeDayDate = useMemo(() => {
    const now = new Date();
    const jsDay = now.getDay();
    const mondayOffset = (jsDay + 6) % 7; // days since Monday
    const monday = new Date(now);
    monday.setDate(now.getDate() - mondayOffset);
    const target = new Date(monday);
    target.setDate(monday.getDate() + activeDayTab);
    return target.toISOString().split('T')[0];
  }, [activeDayTab]);

  const todayApexDay = jsToApex(new Date().getDay());

  // Blocks — DB or seed fallback
  const blocks: TimetableBlock[] = useMemo(() => {
    if (dbBlocks.length > 0) return dbBlocks;
    return MASTER_TIMETABLE_SEED.map((s, idx) => ({
      id: `seed-${idx}`,
      owner_id: 'default',
      day_of_week: s.day_of_week,
      start_time: s.start_time,
      end_time: s.end_time,
      activity: s.activity,
      category: s.category,
      color: s.color,
    }));
  }, [dbBlocks]);

  // Tag matching
  const isBlockMatchingTag = useCallback((block: TimetableBlock, tagText: string | null) => {
    if (!tagText) return true;
    const act = (block.activity || '').toLowerCase();
    const cat = (block.category || '').toLowerCase();
    const tagLower = tagText.toLowerCase();
    if (tagLower === 'deep work') return act.includes('deep work') || act.includes('concept study') || act.includes('mock');
    if (tagLower === 'cfa study') return cat === 'cfa' || act.includes('cfa');
    if (tagLower === 'placement prep') return cat === 'placement' || act.includes('placement');
    if (tagLower === 'classes') return cat === 'class' || act.includes('class');
    if (tagLower === 'fitness') return cat === 'fitness' || act.includes('gym') || act.includes('movement');
    if (tagLower === 'morning routine') return act.includes('freshen') || act.includes('shower') || act.includes('wake') || act.includes('hygiene');
    if (tagLower === 'meals') return cat === 'meal' || act.includes('breakfast') || act.includes('lunch') || act.includes('dinner') || act.includes('snack');
    if (tagLower === 'personal brand') return cat === 'personal brand' || act.includes('substack') || act.includes('twitter');
    if (tagLower === 'academic') return cat === 'academic' || act.includes('academic') || act.includes('assignment');
    if (tagLower === 'habit') return cat === 'reading' || act.includes('novel') || act.includes('planning') || act.includes('admin');
    if (tagLower === 'travel') return cat === 'travel' || act.includes('travel');
    if (tagLower === 'recovery') return act.includes('recovery') || act.includes('free') || act.includes('rest') || act.includes('break');
    if (tagLower === 'sleep') return act.includes('sleep');
    if (tagLower === 'buffer') return act.includes('buffer') || act.includes('break');
    return act.includes(tagLower) || cat.includes(tagLower);
  }, []);

  const handleBlockClick = (block: TimetableBlock) => {
    setSelectedBlock(block);
    setModalOpen(true);
  };

  const handleAddBlock = (dayId?: number) => {
    setSelectedBlock(null);
    setSelectedDay(dayId ?? activeDayTab);
    setModalOpen(true);
  };

  const handlePopulateMaster = async () => {
    if (confirm('Load/Reset your timetable to the Master Routine? This will populate all 7 days with your exact schedule.')) {
      const payload = MASTER_TIMETABLE_SEED.map(s => ({
        day_of_week: s.day_of_week,
        start_time: s.start_time,
        end_time: s.end_time,
        activity: s.activity,
        category: s.category,
        color: s.color,
      }));
      await populateMutation.mutateAsync(payload);
    }
  };

  // Today's checklist data
  const todayBlocks = useMemo(() =>
    blocks
      .filter(b => b.day_of_week === activeDayTab)
      .sort((a, b) => (a.start_time || '').localeCompare(b.start_time || '')),
    [blocks, activeDayTab]
  );

  // Live completion count — re-computes when localStorage changes via a tick
  const [tick, setTick] = useState(0);
  const refreshTick = useCallback(() => setTick(t => t + 1), []);

  const completedToday = useMemo(() => {
    return todayBlocks.filter(b => getChecked(b.id, activeDayDate)).length;
  }, [todayBlocks, activeDayDate, tick]);

  const totalToday = todayBlocks.length;
  const completionPct = totalToday > 0 ? Math.round((completedToday / totalToday) * 100) : 0;

  // Weekly completion board data — per block per day
  const weeklyData = useMemo(() => {
    return DAYS.map(day => {
      const dayBlocks = blocks.filter(b => b.day_of_week === day.id)
        .sort((a, b) => (a.start_time || '').localeCompare(b.start_time || ''));
      // compute date for that day in current week
      const now = new Date();
      const jsDay = now.getDay();
      const mondayOffset = (jsDay + 6) % 7;
      const monday = new Date(now);
      monday.setDate(now.getDate() - mondayOffset);
      const target = new Date(monday);
      target.setDate(monday.getDate() + day.id);
      const dateStr = target.toISOString().split('T')[0];
      const done = dayBlocks.filter(b => getChecked(b.id, dateStr)).length;
      return { ...day, dayBlocks, dateStr, done, total: dayBlocks.length, pct: dayBlocks.length > 0 ? Math.round((done / dayBlocks.length) * 100) : 0 };
    });
  }, [blocks, tick]);

  // Category groups for Today's view
  const todayGrouped = useMemo(() => {
    const filtered = highlightedTag
      ? todayBlocks.filter(b => isBlockMatchingTag(b, highlightedTag))
      : todayBlocks;
    const map: Record<string, TimetableBlock[]> = {};
    filtered.forEach(b => {
      const cat = b.category || 'Other';
      if (!map[cat]) map[cat] = [];
      map[cat].push(b);
    });
    return Object.entries(map).sort((a, b) => a[0].localeCompare(b[0]));
  }, [todayBlocks, highlightedTag, isBlockMatchingTag]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto text-foreground font-sans">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-[22px] font-extrabold tracking-tight md:text-3xl">Routine Checklist</h1>
            <Badge variant="secondary" className="bg-blue-900/50 text-blue-200 border-blue-700/50 font-bold px-2.5">
              Event-Driven
            </Badge>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Mark your activities as done — no time pressure, just completion tracking.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setTagModalOpen(true)}
            className="bg-surface-2 border-line hover:border-blue-500/40 text-zinc-300 hover:text-white rounded-xl text-xs h-9 px-3 gap-1.5"
          >
            <Tag className="w-3.5 h-3.5 text-blue-400" /> Manage Tags
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handlePopulateMaster}
            disabled={populateMutation.isPending}
            className="bg-surface-2 border-line hover:border-emerald-500/40 text-zinc-300 hover:text-emerald-300 rounded-xl text-xs h-9 px-3 gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5 text-emerald-400" /> Reset Schedule
          </Button>

          <Button 
            onClick={() => handleAddBlock()}
            className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl gap-1.5 font-bold h-9 text-xs px-4"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" /> Add Block
          </Button>
        </div>
      </div>

      {/* ── Day Tab Selector ── */}
      <div className="flex overflow-x-auto gap-1.5 p-1.5 bg-surface-1 rounded-2xl border border-line no-scrollbar">
        {DAYS.map((d) => {
          const count = blocks.filter(b => b.day_of_week === d.id).length;
          const isToday = d.id === todayApexDay;
          const isActive = d.id === activeDayTab;
          return (
            <button
              key={d.id}
              onClick={() => setActiveDayTab(d.id)}
              className={`flex-1 min-w-[52px] py-2.5 px-2 rounded-xl text-xs font-bold transition-all shrink-0 flex flex-col items-center gap-0.5 ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{d.short}</span>
              {isToday && <span className="text-[11px] font-black uppercase tracking-widest opacity-80">today</span>}
              <span className="text-[11px] font-mono opacity-70">{count}</span>
            </button>
          );
        })}
      </div>

      {/* ── Progress Summary for Active Day ── */}
      <div className="flex items-center gap-5 p-5 bg-surface-1 border border-line rounded-[20px]">
        {/* Progress ring */}
        <div className="relative shrink-0" onClick={refreshTick}>
          <ProgressRing pct={completionPct} size={72} stroke={6} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-black text-white">{completionPct}%</span>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-base font-black text-white">{DAYS[activeDayTab]?.name}</span>
            {completionPct === 100 && totalToday > 0 && (
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2 py-0.5 rounded-full">
                <Trophy className="w-3 h-3" /> All done!
              </span>
            )}
          </div>
          <p className="text-sm text-zinc-400">
            <strong className="text-white">{completedToday}</strong> of{' '}
            <strong className="text-white">{totalToday}</strong> activities completed
            {completedToday < totalToday && totalToday > 0 && (
              <span className="text-zinc-500"> — {totalToday - completedToday} remaining</span>
            )}
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center p-1 bg-surface-2 rounded-xl border border-line shrink-0">
          <button
            onClick={() => setViewMode('today')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'today' ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Day
          </button>
          <button
            onClick={() => setViewMode('week')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'week' ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Week
          </button>
        </div>
      </div>

      {/* ── Tag Filter Bar ── */}
      <div className="bg-surface-1 border border-line rounded-2xl p-3.5">
        <div className="flex items-center gap-2 mb-2.5">
          <Eye className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-xs font-bold text-zinc-300">Filter by tag</span>
          {highlightedTag && (
            <button
              onClick={() => setHighlightedTag(null)}
              className="ml-auto text-xs text-blue-400 hover:text-blue-300 font-bold underline"
            >
              Clear
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setHighlightedTag(null)}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all border ${
              highlightedTag === null
                ? 'bg-blue-600 text-white border-blue-400'
                : 'bg-surface-2 border-line text-zinc-400 hover:text-white'
            }`}
          >
            All ({todayBlocks.length})
          </button>
          {tags.map((t) => {
            const isSelected = highlightedTag === t.name;
            const matchCount = todayBlocks.filter(b => isBlockMatchingTag(b, t.name)).length;
            if (matchCount === 0) return null;
            return (
              <button
                key={t.id}
                onClick={() => setHighlightedTag(isSelected ? null : t.name)}
                className={`px-2.5 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all border ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-400 scale-105'
                    : 'bg-surface-2 border-line/70 text-zinc-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: t.color }} />
                {t.name}
                <span className="text-[11px] opacity-70 font-mono">({matchCount})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════ */}
      {/* VIEW: TODAY'S CHECKLIST                              */}
      {/* ══════════════════════════════════════════════════════ */}
      <AnimatePresence mode="wait">
        {viewMode === 'today' ? (
          <motion.div
            key="today-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-5"
          >
            {todayGrouped.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center bg-surface-1/60 border border-line/70 rounded-[20px]">
                <CalendarIcon className="w-10 h-10 text-zinc-700 mb-3" />
                <p className="text-sm font-bold text-zinc-400">No activities scheduled for {DAYS[activeDayTab]?.name}</p>
                <p className="text-xs text-zinc-500 mt-1 mb-4">Add blocks to start tracking completion</p>
                <Button
                  size="sm"
                  onClick={() => handleAddBlock(activeDayTab)}
                  className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Activity
                </Button>
              </div>
            ) : (
              todayGrouped.map(([category, catBlocks]) => {
                const color = CATEGORY_COLORS[category] || '#3B6EF6';
                const catDone = catBlocks.filter(b => getChecked(b.id, activeDayDate)).length;
                return (
                  <div key={category} className="space-y-2">
                    {/* Category header */}
                    <div className="flex items-center gap-2.5 px-1">
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                      <span className="text-xs font-black uppercase tracking-wider text-zinc-300">{category}</span>
                      <span className="text-[11px] text-zinc-500 font-mono">{catDone}/{catBlocks.length}</span>
                      <div className="flex-1 h-px bg-white/5" />
                    </div>

                    {/* Blocks */}
                    <div className="space-y-1.5" onClick={refreshTick}>
                      {catBlocks.map(block => (
                        <ChecklistItem
                          key={block.id}
                          block={block}
                          date={activeDayDate}
                          onEdit={handleBlockClick}
                          dimmed={highlightedTag !== null && !isBlockMatchingTag(block, highlightedTag)}
                          highlighted={!!highlightedTag && isBlockMatchingTag(block, highlightedTag)}
                        />
                      ))}
                    </div>
                  </div>
                );
              })
            )}

            {/* Add block CTA at bottom */}
            <button
              onClick={() => handleAddBlock(activeDayTab)}
              className="w-full py-3 rounded-2xl border border-dashed border-white/8 hover:border-blue-500/40 text-zinc-500 hover:text-blue-400 text-xs font-semibold transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-3.5 h-3.5" /> Add activity to {DAYS[activeDayTab]?.name}
            </button>
          </motion.div>
        ) : (
          /* ════════════════════════════════════════════════════ */
          /* VIEW: WEEKLY COMPLETION BOARD                       */
          /* ════════════════════════════════════════════════════ */
          <motion.div
            key="week-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
            onClick={refreshTick}
          >
            {weeklyData.map(day => {
              const isToday = day.id === todayApexDay;
              const isActive = day.id === activeDayTab;
              return (
                <div
                  key={day.id}
                  className={`bg-surface-1 border rounded-2xl overflow-hidden transition-all ${
                    isToday ? 'border-blue-500/40' : 'border-white/8'
                  }`}
                >
                  {/* Day header */}
                  <button
                    className="w-full flex items-center gap-4 p-4 text-left"
                    onClick={() => { setActiveDayTab(day.id); setViewMode('today'); }}
                  >
                    <div className="relative shrink-0">
                      <ProgressRing pct={day.pct} size={44} stroke={4} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[11px] font-black text-white">{day.pct}%</span>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-white">{day.name}</span>
                        {isToday && <Badge className="bg-blue-600 text-white text-[11px] px-1.5 py-0 font-black">TODAY</Badge>}
                        {day.pct === 100 && day.total > 0 && <Trophy className="w-3.5 h-3.5 text-emerald-400" />}
                      </div>
                      <p className="text-xs text-zinc-500 font-mono">
                        {day.done}/{day.total} done
                        {day.total > day.done && day.pct > 0 && ` · ${day.total - day.done} left`}
                      </p>
                    </div>

                    {/* Progress bar */}
                    <div className="hidden sm:block w-32 shrink-0">
                      <div className="w-full bg-white/5 rounded-full h-1.5">
                        <div
                          className="h-1.5 rounded-full transition-all duration-700"
                          style={{
                            width: `${day.pct}%`,
                            backgroundColor: day.pct >= 80 ? '#22C55E' : day.pct >= 50 ? '#3B6EF6' : '#F5A524',
                          }}
                        />
                      </div>
                    </div>

                    <ChevronRight className="w-4 h-4 text-zinc-500 shrink-0" />
                  </button>

                  {/* Quick checklist preview (first 5 items) */}
                  {day.dayBlocks.length > 0 && (
                    <div className="px-4 pb-4 space-y-1.5">
                      {day.dayBlocks.slice(0, 5).map(block => {
                        const isDone = getChecked(block.id, day.dateStr);
                        const color = block.color || CATEGORY_COLORS[block.category || ''] || '#3B6EF6';
                        return (
                          <div
                            key={block.id}
                            className={`flex items-center gap-2.5 py-1.5 px-3 rounded-xl text-xs transition-all ${
                              isDone ? 'bg-emerald-500/5' : 'bg-white/[0.02]'
                            }`}
                          >
                            {isDone
                              ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              : <Circle className="w-3.5 h-3.5 text-zinc-500 shrink-0" />}
                            <span className={`flex-1 truncate ${isDone ? 'line-through text-zinc-500' : 'text-zinc-300'}`}>
                              {block.activity}
                            </span>
                            <span className="text-[11px] font-mono" style={{ color }}>{block.category}</span>
                          </div>
                        );
                      })}
                      {day.dayBlocks.length > 5 && (
                        <p className="text-[11px] text-zinc-500 px-3">
                          +{day.dayBlocks.length - 5} more — tap to open
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Modals ── */}
      <TimetableBlockModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialBlock={selectedBlock}
        defaultDay={selectedDay}
        defaultHour={9}
      />
      <TimetableTagManagerModal
        isOpen={tagModalOpen}
        onClose={() => setTagModalOpen(false)}
      />
    </div>
  );
}
