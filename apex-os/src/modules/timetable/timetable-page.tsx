import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTimetableBlocks, usePopulateMasterTimetable, useDeleteTimetableBlock } from './hooks';
import { TimetableBlockModal } from './timetable-block-modal';
import { TimetableTagManagerModal } from './timetable-tag-manager-modal';
import { useTimetableTags } from './timetable-tag-store';
import { MASTER_TIMETABLE_SEED } from './master-timetable-seed';
import { 
  Plus, Calendar as CalendarIcon, Clock, Sparkles, 
  Settings, Tag, Layers, RotateCcw, CheckCircle2, 
  BookOpen, Dumbbell, Briefcase, GraduationCap, 
  Coffee, Moon, Filter, Eye, ChevronRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { TimetableBlock } from '@/api/types';

const DAYS = [
  { id: 0, name: 'Monday', short: 'Mon' },
  { id: 1, name: 'Tuesday', short: 'Tue' },
  { id: 2, name: 'Wednesday', short: 'Wed' },
  { id: 3, name: 'Thursday', short: 'Thu' },
  { id: 4, name: 'Friday', short: 'Fri' },
  { id: 5, name: 'Saturday', short: 'Sat' },
  { id: 6, name: 'Sunday', short: 'Sun' },
];

const CATEGORY_COLORS: Record<string, string> = {
  CFA: '#6366f1',
  Placement: '#8b5cf6',
  Academic: '#06b6d4',
  Fitness: '#10b981',
  Reading: '#f59e0b',
  'Personal Brand': '#ec4899',
  Class: '#3b82f6',
  Meal: '#64748b',
  Travel: '#475569',
  'Personal Care': '#64748b',
};

// Time slots from 05:00 to 23:00
const TIME_SLOTS = [
  '05:00', '05:30', '06:00', '06:30', '07:00', '07:30',
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
  '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00'
];

export default function TimetablePage() {
  const { data: dbBlocks = [], isLoading } = useTimetableBlocks();
  const populateMutation = usePopulateMasterTimetable();
  const { tags } = useTimetableTags();

  const [modalOpen, setModalOpen] = useState(false);
  const [tagModalOpen, setTagModalOpen] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<TimetableBlock | null>(null);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedHour, setSelectedHour] = useState(9);
  
  const [viewMode, setViewMode] = useState<'week' | 'day'>('week');
  const [activeDayTab, setActiveDayTab] = useState(0);
  const [highlightedTag, setHighlightedTag] = useState<string | null>(null);

  // Use database blocks if present; otherwise use the Master Seed routine as initial editable fallback
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

  // Auto-seed into DB if database is empty on first load
  const handlePopulateMaster = async () => {
    if (confirm('Load/Reset your timetable to the Master Routine extracted from your Excel/PDF? This will populate all 7 days with your exact morning routine, CFA, classes, gym, placement, and reading schedule.')) {
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

  const handleSlotClick = (dayId: number, timeStr: string) => {
    const hour = parseInt(timeStr.split(':')[0], 10);
    setSelectedBlock(null);
    setSelectedDay(dayId);
    setSelectedHour(hour);
    setModalOpen(true);
  };

  const handleBlockClick = (e: React.MouseEvent, block: TimetableBlock) => {
    e.stopPropagation();
    setSelectedBlock(block);
    setModalOpen(true);
  };

  // Helper to determine if a block matches the highlighted tag
  const isBlockMatchingTag = (block: TimetableBlock, tagText: string | null) => {
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
  };

  // Highlighted tag metrics
  const highlightedMetrics = useMemo(() => {
    if (!highlightedTag) return null;
    const matchingBlocks = blocks.filter(b => isBlockMatchingTag(b, highlightedTag));
    const totalMins = matchingBlocks.reduce((sum, b) => {
      if (!b.start_time || !b.end_time) return sum + 60;
      const [sh, sm] = b.start_time.split(':').map(Number);
      const [eh, em] = b.end_time.split(':').map(Number);
      return sum + Math.max(0, (eh * 60 + em) - (sh * 60 + sm));
    }, 0);
    const daySet = new Set(matchingBlocks.map(b => DAYS[b.day_of_week]?.short || 'Day'));
    return {
      count: matchingBlocks.length,
      hours: (totalMins / 60).toFixed(1),
      days: Array.from(daySet).join(', '),
    };
  }, [highlightedTag, blocks]);

  // Overall metrics
  const totalScheduledHours = useMemo(() => {
    return blocks.reduce((acc, b) => {
      if (!b.start_time || !b.end_time) return acc;
      const [sh, sm] = b.start_time.split(':').map(Number);
      const [eh, em] = b.end_time.split(':').map(Number);
      const dur = (eh * 60 + em) - (sh * 60 + sm);
      return acc + (dur > 0 ? dur / 60 : 1);
    }, 0);
  }, [blocks]);

  const cfaHours = useMemo(() => {
    return blocks.filter(b => b.category === 'CFA').reduce((acc, b) => {
      if (!b.start_time || !b.end_time) return acc;
      const [sh, sm] = b.start_time.split(':').map(Number);
      const [eh, em] = b.end_time.split(':').map(Number);
      const dur = (eh * 60 + em) - (sh * 60 + sm);
      return acc + (dur > 0 ? dur / 60 : 1);
    }, 0);
  }, [blocks]);

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-[1600px] mx-auto text-foreground font-sans">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black text-white tracking-tight">Master Timetable</h1>
            <Badge variant="secondary" className="bg-blue-900/50 text-blue-200 border-blue-700/50 font-bold px-2.5">
              Ideal Recurring Routine
            </Badge>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Populated with your uploaded master routine. Click any cell or block to edit time, activity, or category.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setTagModalOpen(true)}
            className="bg-[#111827] border-white/10 hover:border-blue-500/40 text-zinc-300 hover:text-white rounded-xl text-xs h-9 px-3 gap-1.5"
          >
            <Tag className="w-3.5 h-3.5 text-blue-400" /> Manage Tags
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handlePopulateMaster}
            disabled={populateMutation.isPending}
            className="bg-[#111827] border-white/10 hover:border-emerald-500/40 text-zinc-300 hover:text-emerald-300 rounded-xl text-xs h-9 px-3 gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5 text-emerald-400" /> Reset to Master Schedule
          </Button>

          <Button 
            onClick={() => {
              setSelectedBlock(null);
              setSelectedDay(0);
              setSelectedHour(9);
              setModalOpen(true);
            }}
            className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-600/30 gap-1.5 font-bold h-9 text-xs px-4"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" /> Add Block
          </Button>
        </div>
      </div>

      {/* Interactive Tag Bar & Highlighting System */}
      <div className="bg-[#0b0f19]/90 border border-blue-500/25 rounded-3xl p-4 shadow-2xl backdrop-blur-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-blue-400" /> Tag Placement Inspector
            </span>
            <span className="text-[11px] text-zinc-400">
              (Click any tag to illuminate where it is scheduled in your week)
            </span>
          </div>

          {highlightedTag && (
            <button
              onClick={() => setHighlightedTag(null)}
              className="text-xs text-blue-400 hover:text-blue-300 font-bold underline text-left"
            >
              Clear Highlight Filter
            </button>
          )}
        </div>

        {/* Tag Pills */}
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setHighlightedTag(null)}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all border ${
              highlightedTag === null
                ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-600/30'
                : 'bg-[#111827] border-white/10 text-zinc-400 hover:text-white'
            }`}
          >
            All Blocks ({blocks.length})
          </button>

          {tags.map((t) => {
            const isSelected = highlightedTag === t.name;
            const matchCount = blocks.filter(b => isBlockMatchingTag(b, t.name)).length;

            return (
              <button
                key={t.id}
                onClick={() => setHighlightedTag(isSelected ? null : t.name)}
                className={`px-2.5 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all border ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-600/40 ring-2 ring-white/30 scale-105'
                    : 'bg-[#111827] border-white/5 text-zinc-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: t.color }} />
                <span>{t.name}</span>
                <span className="text-[10px] opacity-70 font-mono">({matchCount})</span>
              </button>
            );
          })}
        </div>

        {/* Highlight Summary Info Pill */}
        {highlightedMetrics && (
          <div className="p-3 rounded-2xl bg-blue-950/40 border border-blue-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
            <span className="font-semibold text-blue-200 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-400" />
              Showing <strong>{highlightedMetrics.count} blocks</strong> for tag <strong className="text-white">"{highlightedTag}"</strong>
            </span>
            <div className="flex items-center gap-3 font-mono text-zinc-300">
              <span><strong>{highlightedMetrics.hours} hrs/week</strong></span>
              <span>•</span>
              <span className="text-blue-300">Days: {highlightedMetrics.days || 'None'}</span>
            </div>
          </div>
        )}
      </div>

      {/* View Mode Switcher (Week Matrix vs Day Timeline) */}
      <div className="flex items-center justify-between">
        <div className="flex items-center p-1 bg-[#111827] rounded-2xl border border-white/10">
          <button
            onClick={() => setViewMode('week')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'week' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Weekly Grid Matrix
          </button>
          <button
            onClick={() => setViewMode('day')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'day' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Day Timeline View
          </button>
        </div>

        {/* Summary Stat Chips */}
        <div className="hidden md:flex items-center gap-3 text-xs text-zinc-400 font-mono">
          <span>Total: <strong className="text-white">{blocks.length} blocks</strong></span>
          <span>•</span>
          <span>Week Load: <strong className="text-blue-400">{totalScheduledHours.toFixed(1)}h</strong></span>
          <span>•</span>
          <span>CFA Study: <strong className="text-emerald-400">{cfaHours.toFixed(1)}h</strong></span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. WEEKLY MATRIX GRID VIEW                                                */}
      {/* ========================================================================= */}
      {viewMode === 'week' ? (
        <div className="bg-[#0b0f19]/90 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <div className="min-w-[1100px]">
              {/* Header Row - Days of Week */}
              <div className="grid grid-cols-[80px_repeat(7,1fr)] border-b border-white/10 bg-[#0e1424]">
                <div className="p-3.5 text-center text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center justify-center">
                  <Clock className="w-3.5 h-3.5 mr-1 text-blue-400" /> Time
                </div>
                {DAYS.map((day) => {
                  const dayBlockCount = blocks.filter(b => b.day_of_week === day.id).length;
                  return (
                    <div key={day.id} className="p-3 text-center border-l border-white/10">
                      <span className="text-xs font-bold uppercase tracking-wider text-white block">{day.name}</span>
                      <span className="text-[10px] text-zinc-400 font-mono font-normal">{dayBlockCount} items</span>
                    </div>
                  );
                })}
              </div>

              {/* Day Columns Matrix */}
              <div className="grid grid-cols-[80px_repeat(7,1fr)] min-h-[700px] divide-x divide-white/5">
                {/* Time Indicator Rail */}
                <div className="bg-[#0b0f19]/60 p-2 flex flex-col justify-between py-4 text-center font-mono text-[11px] text-zinc-500 select-none">
                  {['05:00', '07:00', '09:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00', '23:00'].map(t => (
                    <div key={t} className="py-2.5">{t}</div>
                  ))}
                </div>

                {/* 7 Day Columns */}
                {DAYS.map((day) => {
                  const dayBlocks = blocks
                    .filter(b => b.day_of_week === day.id)
                    .sort((a, b) => (a.start_time || '').localeCompare(b.start_time || ''));

                  return (
                    <div 
                      key={day.id} 
                      className="p-2 space-y-1.5 hover:bg-white/[0.01] transition-colors relative flex flex-col"
                    >
                      {dayBlocks.map((block) => {
                        const isHighlighted = isBlockMatchingTag(block, highlightedTag);
                        const isDimmed = highlightedTag !== null && !isHighlighted;

                        return (
                          <motion.div
                            key={block.id}
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ 
                              opacity: isDimmed ? 0.2 : 1, 
                              scale: isHighlighted && highlightedTag ? 1.02 : 1 
                            }}
                            onClick={(e) => handleBlockClick(e, block)}
                            className={`p-2.5 rounded-2xl border transition-all cursor-pointer group shadow-sm text-left relative overflow-hidden ${
                              isHighlighted && highlightedTag 
                                ? 'ring-2 ring-blue-400 shadow-lg shadow-blue-500/20 z-10' 
                                : ''
                            }`}
                            style={{
                              backgroundColor: `${block.color || '#6366f1'}15`,
                              borderColor: `${block.color || '#6366f1'}40`,
                            }}
                          >
                            {/* Color Accent Indicator Bar */}
                            <div 
                              className="absolute left-0 top-0 bottom-0 w-1 rounded-l" 
                              style={{ backgroundColor: block.color || '#6366f1' }} 
                            />

                            <div className="pl-1">
                              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-300 mb-0.5">
                                <span className="font-bold">
                                  {block.start_time?.slice(0, 5)} - {block.end_time?.slice(0, 5)}
                                </span>
                              </div>

                              <div className="text-xs font-bold text-white leading-tight truncate group-hover:text-blue-300 transition-colors" title={block.activity}>
                                {block.activity}
                              </div>

                              <div className="flex items-center gap-1 mt-1">
                                <span 
                                  className="text-[9px] px-1.5 py-0.2 rounded font-semibold text-zinc-300"
                                  style={{ backgroundColor: `${block.color || '#6366f1'}30` }}
                                >
                                  {block.category}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}

                      {/* Add Slot Quick Button at bottom of each day */}
                      <button
                        onClick={() => handleSlotClick(day.id, '09:00')}
                        className="w-full py-2 rounded-xl border border-dashed border-white/5 hover:border-blue-500/40 text-zinc-600 hover:text-blue-400 text-xs font-medium transition-all flex items-center justify-center gap-1 mt-auto"
                      >
                        <Plus className="w-3 h-3" /> Add Block
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* 2. DAY TIMELINE VIEW                                                      */
        /* ========================================================================= */
        <div className="space-y-4">
          {/* Day Tabs */}
          <div className="flex overflow-x-auto gap-2 p-1 bg-[#111827] rounded-2xl border border-white/10">
            {DAYS.map((d) => {
              const count = blocks.filter(b => b.day_of_week === d.id).length;
              return (
                <button
                  key={d.id}
                  onClick={() => setActiveDayTab(d.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 ${
                    activeDayTab === d.id
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <span>{d.name}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/15 font-mono">{count}</span>
                </button>
              );
            })}
          </div>

          {/* Chronological List of Blocks for Active Day */}
          <div className="bg-[#0b0f19]/90 border border-white/10 rounded-3xl p-6 shadow-2xl space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-blue-400" />
                Schedule for {DAYS[activeDayTab]?.name}
              </h3>
              <Button
                size="sm"
                onClick={() => handleSlotClick(activeDayTab, '09:00')}
                className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs h-8 px-3 font-bold"
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Block for {DAYS[activeDayTab]?.name}
              </Button>
            </div>

            <div className="space-y-2.5">
              {blocks
                .filter(b => b.day_of_week === activeDayTab)
                .sort((a, b) => (a.start_time || '').localeCompare(b.start_time || ''))
                .map((block) => {
                  const isHighlighted = isBlockMatchingTag(block, highlightedTag);
                  const isDimmed = highlightedTag !== null && !isHighlighted;

                  return (
                    <motion.div
                      key={block.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: isDimmed ? 0.25 : 1 }}
                      onClick={(e) => handleBlockClick(e, block)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group ${
                        isHighlighted && highlightedTag ? 'ring-2 ring-blue-400' : ''
                      }`}
                      style={{
                        backgroundColor: `${block.color || '#6366f1'}15`,
                        borderColor: `${block.color || '#6366f1'}40`,
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-20 text-center py-2 px-2.5 rounded-xl font-mono text-xs font-bold text-white shrink-0"
                          style={{ backgroundColor: `${block.color || '#6366f1'}40` }}
                        >
                          {block.start_time?.slice(0, 5)} - {block.end_time?.slice(0, 5)}
                        </div>

                        <div>
                          <h4 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                            {block.activity}
                          </h4>
                          <span className="text-xs text-zinc-400 mt-0.5 block">
                            Category: <strong className="text-zinc-200">{block.category}</strong>
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <span 
                          className="text-xs font-semibold px-2.5 py-1 rounded-xl"
                          style={{ 
                            backgroundColor: `${block.color || '#6366f1'}30`,
                            color: block.color || '#fff' 
                          }}
                        >
                          {block.category}
                        </span>
                        <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Block Modal */}
      <TimetableBlockModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialBlock={selectedBlock}
        defaultDay={selectedDay}
        defaultHour={selectedHour}
      />

      {/* Tag Manager Modal */}
      <TimetableTagManagerModal
        isOpen={tagModalOpen}
        onClose={() => setTagModalOpen(false)}
      />
    </div>
  );
}
