import React, { useState } from 'react';
import { useTimetableTags } from './timetable-tag-store';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Edit2, Check, X, RotateCcw, Tag, Palette } from 'lucide-react';

interface TimetableTagManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const COLOR_SWATCHES = [
  '#3B6EF6', '#3B6EF6', '#8b5cf6', '#06b6d4', 
  '#22C55E', '#F5A524', '#ec4899', '#f43f5e', 
  '#6F7C99', '#56627D', '#14b8a6', '#84cc16'
];

export function TimetableTagManagerModal({ isOpen, onClose }: TimetableTagManagerModalProps) {
  const { tags, addTag, editTag, deleteTag, resetTagsToDefaults } = useTimetableTags();
  
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState('#3B6EF6');
  const [editingTagId, setEditingTagId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editColor, setEditColor] = useState('#3B6EF6');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTagName.trim()) return;
    addTag(newTagName, newTagColor);
    setNewTagName('');
  };

  const handleStartEdit = (t: { id: string; name: string; color: string }) => {
    setEditingTagId(t.id);
    setEditName(t.name);
    setEditColor(t.color);
  };

  const handleSaveEdit = (id: string) => {
    if (editName.trim()) {
      editTag(id, editName, editColor);
    }
    setEditingTagId(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-surface-1 border-blue-500/30 text-white rounded-[20px] overflow-hidden max-h-[85vh] flex flex-col">
        <DialogHeader className="pb-2 border-b border-line">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-black text-white flex items-center gap-2">
              <Tag className="w-5 h-5 text-blue-400" />
              Manage Timetable Tags
            </DialogTitle>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                if (confirm('Reset timetable tags to default list?')) {
                  resetTagsToDefaults();
                }
              }}
              className="text-zinc-500 hover:text-amber-400 text-xs h-7 gap-1 px-2 rounded-lg"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-2 flex-1 overflow-y-auto pr-1">
          {/* Add New Tag Form */}
          <form onSubmit={handleAdd} className="space-y-2 p-3 bg-surface-2 rounded-2xl border border-line">
            <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider">Add New Tag</Label>
            <div className="flex gap-2">
              <Input
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                placeholder="e.g. Deep Work, Revision..."
                className="bg-surface-3 border-line text-white rounded-xl h-8 text-xs flex-1 placeholder:text-zinc-500"
              />
              <div className="flex items-center gap-1">
                {COLOR_SWATCHES.slice(0, 5).map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setNewTagColor(c)}
                    className={`w-5 h-5 rounded-full transition-transform ${newTagColor === c ? 'scale-125 ring-2 ring-white' : 'opacity-70'}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
              <Button type="submit" size="sm" className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs h-8 px-3 font-bold">
                <Plus className="w-3.5 h-3.5 mr-1" /> Add
              </Button>
            </div>
          </form>

          {/* Tag List */}
          <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-1">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block px-1">
              Active Tags ({tags.length})
            </span>
            {tags.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-surface-2/70 border border-line/70 hover:border-white/15 transition-all text-xs group"
              >
                {editingTagId === t.id ? (
                  <div className="flex items-center gap-2 flex-1 mr-2">
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="h-7 text-xs bg-surface-3 border-blue-500/50 rounded-lg text-white"
                      autoFocus
                    />
                    <div className="flex items-center gap-1">
                      {COLOR_SWATCHES.slice(0, 4).map(c => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setEditColor(c)}
                          className={`w-4 h-4 rounded-full ${editColor === c ? 'ring-2 ring-white' : 'opacity-60'}`}
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSaveEdit(t.id)}
                      className="p-1 rounded bg-emerald-600 text-white hover:bg-emerald-500"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingTagId(null)}
                      className="p-1 rounded bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: t.color }} />
                      <span className="font-semibold text-white">{t.name}</span>
                    </div>
                    <div className="flex items-center gap-1 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() => handleStartEdit(t)}
                        className="p-1 rounded hover:bg-blue-500/20 text-zinc-400 hover:text-blue-400 transition-colors"
                        title="Edit tag"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteTag(t.id)}
                        className="p-1 rounded hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-colors"
                        title="Delete tag"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        <DialogFooter className="pt-3 border-t border-line flex justify-end">
          <Button
            type="button"
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl px-5 h-8"
          >
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
