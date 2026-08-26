import React, { useState } from 'react';
import { useFinanceCategories } from './category-store';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Edit2, Check, X, RotateCcw, Tag, Layers, FolderPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CategoryManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: 'Expense' | 'Income' | 'Transfer';
  defaultCategory?: string;
}

export default function CategoryManagerModal({
  isOpen,
  onClose,
  defaultType = 'Expense',
  defaultCategory,
}: CategoryManagerModalProps) {
  const {
    categories,
    addSubcategory,
    editSubcategory,
    deleteSubcategory,
    addCategory,
    deleteCategory,
    resetToDefaults,
  } = useFinanceCategories();

  const [activeType, setActiveType] = useState<'Expense' | 'Income' | 'Transfer'>(defaultType);
  const currentCategories = Object.keys(categories[activeType] || {});
  const [selectedCategory, setSelectedCategory] = useState<string>(
    defaultCategory && currentCategories.includes(defaultCategory)
      ? defaultCategory
      : currentCategories[0] || ''
  );

  // Subcategory Add & Edit states
  const [newSubcatName, setNewSubcatName] = useState('');
  const [editingSubcat, setEditingSubcat] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  // Category Add state
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCatName, setNewCatName] = useState('');

  // Synchronize selectedCategory if activeType changes
  const subcategories = (categories[activeType] && selectedCategory && categories[activeType][selectedCategory]) || [];

  const handleTypeChange = (t: 'Expense' | 'Income' | 'Transfer') => {
    setActiveType(t);
    const catList = Object.keys(categories[t] || {});
    setSelectedCategory(catList[0] || '');
    setEditingSubcat(null);
  };

  const handleAddSubcat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubcatName.trim() || !selectedCategory) return;
    addSubcategory(activeType, selectedCategory, newSubcatName);
    setNewSubcatName('');
  };

  const handleStartEdit = (subcat: string) => {
    setEditingSubcat(subcat);
    setEditValue(subcat);
  };

  const handleSaveEdit = (oldSubcat: string) => {
    if (editValue.trim()) {
      editSubcategory(activeType, selectedCategory, oldSubcat, editValue);
    }
    setEditingSubcat(null);
  };

  const handleAddCat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    addCategory(activeType, newCatName);
    setSelectedCategory(newCatName.trim());
    setNewCatName('');
    setIsAddingCategory(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl bg-[#0b0f19] border-blue-500/30 text-white rounded-3xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
        <DialogHeader className="pb-2 border-b border-white/10">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-black text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-400" />
              Manage Categories & Subcategories
            </DialogTitle>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                if (confirm('Reset all categories & subcategories to original defaults?')) {
                  resetToDefaults();
                }
              }}
              className="text-zinc-500 hover:text-amber-400 text-xs h-7 gap-1 px-2 rounded-lg"
            >
              <RotateCcw className="w-3 h-3" /> Reset Defaults
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-2 flex-1 overflow-y-auto pr-1">
          {/* Type Tabs */}
          <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
            {(['Expense', 'Income', 'Transfer'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => handleTypeChange(t)}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  activeType === t
                    ? t === 'Expense'
                      ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                      : t === 'Income'
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                      : 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {t} Categories
              </button>
            ))}
          </div>

          {/* Two-Column Layout: Left Category Selector, Right Subcategories Manager */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Left: Category List */}
            <div className="md:col-span-5 space-y-2 bg-[#111827]/60 border border-white/5 p-3 rounded-2xl">
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                  {activeType} Categories ({currentCategories.length})
                </span>
                <button
                  type="button"
                  onClick={() => setIsAddingCategory(!isAddingCategory)}
                  className="text-xs text-blue-400 hover:text-blue-300 font-bold flex items-center gap-0.5"
                >
                  <Plus className="w-3 h-3" /> New
                </button>
              </div>

              {isAddingCategory && (
                <form onSubmit={handleAddCat} className="flex gap-1.5 pt-1">
                  <Input
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    placeholder="Category name..."
                    className="h-7 text-xs bg-[#1f293d] border-blue-500/40 rounded-lg text-white"
                    autoFocus
                  />
                  <Button type="submit" size="sm" className="h-7 px-2 bg-blue-600 text-white rounded-lg text-xs">
                    <Check className="w-3 h-3" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsAddingCategory(false)}
                    className="h-7 px-2 text-zinc-400 rounded-lg text-xs"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </form>
              )}

              <div className="space-y-1 max-h-[300px] overflow-y-auto pr-1">
                {currentCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat);
                      setEditingSubcat(null);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                      selectedCategory === cat
                        ? 'bg-blue-600/20 text-blue-300 border border-blue-500/40 shadow-sm'
                        : 'text-zinc-300 hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <span className="truncate">{cat}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/10 text-zinc-400 font-mono">
                      {(categories[activeType][cat] || []).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Subcategories Manager */}
            <div className="md:col-span-7 space-y-3 bg-[#111827]/60 border border-white/5 p-3 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-blue-400" />
                    Subcategories for <strong className="text-blue-400">{selectedCategory}</strong>
                  </span>
                  <span className="text-[11px] text-zinc-400 font-mono">
                    {subcategories.length} subcategories
                  </span>
                </div>

                {/* Add Subcategory Input */}
                <form onSubmit={handleAddSubcat} className="flex gap-2 my-3">
                  <Input
                    value={newSubcatName}
                    onChange={(e) => setNewSubcatName(e.target.value)}
                    placeholder={`Add subcategory for ${selectedCategory}...`}
                    className="h-8 text-xs bg-[#1f293d] border-white/10 rounded-xl text-white placeholder:text-zinc-500"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    className="h-8 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold px-3 shrink-0 shadow-md shadow-blue-600/30"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" /> Add
                  </Button>
                </form>

                {/* Subcategory List */}
                <div className="space-y-1.5 max-h-[240px] overflow-y-auto pr-1">
                  {subcategories.length === 0 ? (
                    <div className="text-center py-8 text-zinc-500 text-xs">
                      No subcategories in this category yet. Add one above!
                    </div>
                  ) : (
                    subcategories.map((subcat) => (
                      <div
                        key={subcat}
                        className="flex items-center justify-between p-2 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/15 transition-all text-xs group"
                      >
                        {editingSubcat === subcat ? (
                          <div className="flex items-center gap-1.5 flex-1 mr-2">
                            <Input
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="h-7 text-xs bg-[#1f293d] border-blue-500/50 rounded-lg text-white"
                              autoFocus
                            />
                            <button
                              type="button"
                              onClick={() => handleSaveEdit(subcat)}
                              className="p-1 rounded bg-emerald-600 text-white hover:bg-emerald-500"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingSubcat(null)}
                              className="p-1 rounded bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <>
                            <span className="text-zinc-200 font-medium">{subcat}</span>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                type="button"
                                onClick={() => handleStartEdit(subcat)}
                                className="p-1 rounded hover:bg-blue-500/20 text-zinc-400 hover:text-blue-400 transition-colors"
                                title="Edit subcategory name"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => deleteSubcategory(activeType, selectedCategory, subcat)}
                                className="p-1 rounded hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-colors"
                                title="Delete subcategory"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="pt-3 border-t border-white/10 flex justify-end">
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
