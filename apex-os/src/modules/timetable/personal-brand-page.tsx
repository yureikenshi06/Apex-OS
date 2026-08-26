import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePersonalBrand, useAddPersonalBrand, useUpdatePersonalBrand, useDeletePersonalBrand } from './hooks';
import { Plus, Share2, Trash2, TrendingUp, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const PLATFORMS = ['LinkedIn', 'Twitter / X', 'Substack / Newsletter', 'YouTube', 'TrueAlpha Capital'];
const STAGES = ['Idea', 'Drafting', 'In Review', 'Published', 'Archived'];

export default function PersonalBrandPage() {
  const { data: items = [], isLoading } = usePersonalBrand();
  const addMutation = useAddPersonalBrand();
  const updateMutation = useUpdatePersonalBrand();
  const deleteMutation = useDeletePersonalBrand();

  const [modalOpen, setModalOpen] = useState(false);
  const [platform, setPlatform] = useState('LinkedIn');
  const [contentIdea, setContentIdea] = useState('');
  const [stage, setStage] = useState('Idea');
  const [notes, setNotes] = useState('');

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contentIdea.trim()) return;

    await addMutation.mutateAsync({
      platform,
      content_idea: contentIdea,
      stage,
      notes,
      date_drafted: new Date().toISOString().split('T')[0],
    });
    setContentIdea('');
    setNotes('');
    setModalOpen(false);
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-6xl mx-auto text-foreground">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Personal Brand Tracker</h1>
            <Badge variant="secondary" className="bg-pink-900/50 text-pink-200 border-pink-700/50 font-semibold px-2.5">
              TrueAlpha Capital
            </Badge>
          </div>
          <p className="text-sm text-zinc-400 mt-1">Track financial insights, equity research articles, market threads, and audience growth.</p>
        </div>

        <Button 
          onClick={() => setModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-600/30 gap-1.5 font-semibold"
        >
          <Plus className="w-4 h-4" /> New Content Piece
        </Button>
      </div>

      <div className="bg-[#111118]/90 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        {isLoading ? (
          <div className="p-8 space-y-3">
            <div className="h-14 bg-white/5 animate-pulse rounded-xl" />
            <div className="h-14 bg-white/5 animate-pulse rounded-xl" />
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16 px-4 space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center mx-auto shadow-inner">
              <Share2 className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-white">No content pieces in pipeline</h3>
            <p className="text-sm text-zinc-400 max-w-sm mx-auto">
              Draft your next market analysis thread or TrueAlpha Capital research piece.
            </p>
            <Button onClick={() => setModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl mt-2">
              <Plus className="w-4 h-4 mr-1.5" /> Draft First Idea
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-white/5 text-zinc-400 border-b border-white/10 text-xs uppercase font-bold tracking-wider">
                <tr>
                  <th className="px-5 py-4">Platform</th>
                  <th className="px-5 py-4">Content / Thesis Idea</th>
                  <th className="px-5 py-4">Pipeline Stage</th>
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {items.map((row: any) => (
                  <motion.tr key={row.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-4 font-bold text-white">
                      <Badge variant="outline" className="text-xs bg-pink-500/10 border-pink-500/30 text-pink-300">
                        {row.platform}
                      </Badge>
                    </td>
                    <td className="px-5 py-4 text-zinc-200 font-medium">{row.content_idea}</td>
                    <td className="px-5 py-4">
                      <select
                        value={row.stage || 'Idea'}
                        onChange={(e) => updateMutation.mutate({ id: row.id, updates: { stage: e.target.value } })}
                        className="bg-[#181824] border border-white/10 text-white text-xs rounded-lg px-2.5 py-1.5 outline-none cursor-pointer focus:border-indigo-500"
                      >
                        {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td className="px-5 py-4 text-xs text-zinc-400 font-mono">
                      {row.date_published || row.date_drafted || '—'}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => deleteMutation.mutate(row.id)}
                        className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md bg-[#111118] border-white/10 text-white rounded-2xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">New Brand Content Idea</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleAdd} className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs text-zinc-300 font-semibold uppercase">Platform</Label>
                <Select value={platform} onValueChange={setPlatform}>
                  <SelectTrigger className="bg-[#1a1a24] border-white/10 text-white rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#181824] border-white/10 text-white">
                    {PLATFORMS.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs text-zinc-300 font-semibold uppercase">Pipeline Stage</Label>
                <Select value={stage} onValueChange={setStage}>
                  <SelectTrigger className="bg-[#1a1a24] border-white/10 text-white rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#181824] border-white/10 text-white">
                    {STAGES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-300 font-semibold uppercase">Content / Thesis Idea</Label>
              <Input
                value={contentIdea}
                onChange={(e) => setContentIdea(e.target.value)}
                placeholder="e.g. Breaking down Q2 bank earnings & NIM margins"
                required
                className="bg-[#1a1a24] border-white/10 text-white rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-300 font-semibold uppercase">Notes / Key Data Points</Label>
              <Input
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Charts to include, sources, references..."
                className="bg-[#1a1a24] border-white/10 text-white rounded-xl"
              />
            </div>

            <DialogFooter className="pt-3 border-t border-white/10 flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setModalOpen(false)} className="text-zinc-400 hover:text-white rounded-xl">
                Cancel
              </Button>
              <Button type="submit" disabled={addMutation.isPending} className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold px-5">
                {addMutation.isPending ? 'Saving...' : 'Add Idea'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
