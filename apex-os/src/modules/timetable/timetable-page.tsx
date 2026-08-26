import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTimetableBlocks } from './hooks';
import { TimetableBlockModal } from './timetable-block-modal';
import { Plus, Calendar as CalendarIcon, Clock, Sparkles, Edit3 } from 'lucide-react';
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

const HOURS = Array.from({ length: 18 }, (_, i) => i + 6); // 06:00 to 23:00

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

export default function TimetablePage() {
  const { data: blocks = [], isLoading } = useTimetableBlocks();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<TimetableBlock | null>(null);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedHour, setSelectedHour] = useState(9);

  const handleSlotClick = (dayId: number, hour: number) => {
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

  // Helper to calculate total scheduled hours
  const totalHours = blocks.reduce((acc, b) => {
    if (!b.start_time || !b.end_time) return acc;
    const [sh, sm] = b.start_time.split(':').map(Number);
    const [eh, em] = b.end_time.split(':').map(Number);
    const dur = (eh * 60 + em) - (sh * 60 + sm);
    return acc + (dur > 0 ? dur / 60 : 1);
  }, 0);

  const cfaHours = blocks.filter(b => b.category === 'CFA').reduce((acc, b) => {
    if (!b.start_time || !b.end_time) return acc;
    const [sh, sm] = b.start_time.split(':').map(Number);
    const [eh, em] = b.end_time.split(':').map(Number);
    const dur = (eh * 60 + em) - (sh * 60 + sm);
    return acc + (dur > 0 ? dur / 60 : 1);
  }, 0);

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-[1500px] mx-auto text-foreground">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Master Timetable</h1>
            <Badge variant="secondary" className="bg-indigo-900/50 text-indigo-200 border-indigo-700/50 font-semibold px-2.5">
              Weekly Routine
            </Badge>
          </div>
          <p className="text-sm text-zinc-400 mt-1">
            Design your ideal week. Click any cell to add an activity block.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-4 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-300">
            <span><strong className="text-white">{blocks.length}</strong> blocks</span>
            <span>•</span>
            <span><strong className="text-indigo-400">{totalHours.toFixed(1)}h</strong> scheduled</span>
            <span>•</span>
            <span><strong className="text-emerald-400">{cfaHours.toFixed(1)}h</strong> CFA</span>
          </div>

          <Button 
            onClick={() => {
              setSelectedBlock(null);
              setSelectedDay(0);
              setSelectedHour(9);
              setModalOpen(true);
            }}
            className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-600/30 gap-2 font-semibold"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            Add Block
          </Button>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex flex-wrap gap-2 pt-1 pb-2">
        {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
          <span 
            key={cat} 
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/5 text-zinc-300"
          >
            <span className="w-2 h-2 rounded-full shadow-sm" style={{ backgroundColor: color }} />
            {cat}
          </span>
        ))}
      </div>

      {/* Interactive Timetable Grid */}
      <div className="bg-[#111118]/90 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <div className="min-w-[950px]">
            {/* Header Row - Days of Week */}
            <div className="grid grid-cols-[70px_repeat(7,1fr)] border-b border-white/10 bg-white/5">
              <div className="p-3.5 text-center text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center justify-center">
                <Clock className="w-3.5 h-3.5 mr-1" /> Time
              </div>
              {DAYS.map(day => (
                <div key={day.id} className="p-3.5 text-center text-xs font-bold uppercase tracking-wider text-zinc-200 border-l border-white/10 flex items-center justify-center gap-1.5">
                  <span className="hidden sm:inline">{day.name}</span>
                  <span className="sm:hidden">{day.short}</span>
                </div>
              ))}
            </div>

            {/* Time Grid Rows (06:00 to 23:00) */}
            <div className="divide-y divide-white/5">
              {HOURS.map(hour => {
                const hourStr = `${hour.toString().padStart(2, '0')}:00`;
                return (
                  <div key={hour} className="grid grid-cols-[70px_repeat(7,1fr)] min-h-[64px] group">
                    {/* Hour Column */}
                    <div className="p-2 text-center text-xs font-mono font-medium text-zinc-400 bg-white/[0.02] flex items-center justify-center border-r border-white/5">
                      {hourStr}
                    </div>

                    {/* 7 Day Slots for this hour */}
                    {DAYS.map(day => {
                      // Find blocks that occur on this day and start in this hour or span across it
                      const slotBlocks = blocks.filter(b => {
                        if (b.day_of_week !== day.id) return false;
                        if (!b.start_time) return false;
                        const [bStartH] = b.start_time.split(':').map(Number);
                        return bStartH === hour;
                      });

                      return (
                        <div
                          key={`${day.id}-${hour}`}
                          onClick={() => handleSlotClick(day.id, hour)}
                          className="border-l border-white/5 p-1.5 relative transition-colors hover:bg-indigo-500/10 cursor-pointer min-h-[64px] flex flex-col gap-1 group/slot"
                        >
                          {slotBlocks.map(block => {
                            const blockColor = block.color || CATEGORY_COLORS[block.category || ''] || '#6366f1';
                            return (
                              <motion.div
                                key={block.id}
                                onClick={(e) => handleBlockClick(e, block)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="p-2 rounded-xl text-white text-xs font-medium shadow-md transition-all relative overflow-hidden group/block"
                                style={{
                                  backgroundColor: `${blockColor}25`,
                                  borderLeft: `4px solid ${blockColor}`,
                                  borderColor: `${blockColor}50`,
                                }}
                              >
                                <div className="flex items-center justify-between gap-1">
                                  <span className="font-bold truncate text-white">{block.activity}</span>
                                  <Edit3 className="w-3 h-3 opacity-0 group-hover/block:opacity-100 transition-opacity text-zinc-300" />
                                </div>
                                <div className="flex items-center justify-between mt-1 text-[10px] text-zinc-300">
                                  <span>{block.start_time?.slice(0, 5)} - {block.end_time?.slice(0, 5)}</span>
                                  <span className="px-1.5 py-0.5 rounded bg-black/40 text-[9px] font-semibold uppercase">{block.category}</span>
                                </div>
                              </motion.div>
                            );
                          })}

                          {slotBlocks.length === 0 && (
                            <div className="opacity-0 group-hover/slot:opacity-100 transition-opacity absolute inset-0 flex items-center justify-center text-zinc-600 text-xs">
                              <Plus className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <TimetableBlockModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedBlock(null);
        }}
        initialBlock={selectedBlock}
        defaultDay={selectedDay}
        defaultHour={selectedHour}
      />
    </div>
  );
}
