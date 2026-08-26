import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePlacementTracker, useAddPlacement, useUpdatePlacement, useDeletePlacement } from './hooks';
import { Plus, Briefcase, Trash2, Building, Calendar, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const STATUSES = ['Applied', 'Shortlisted', 'OA/Test Scheduled', 'Interview Round 1', 'Interview Round 2', 'Offer Received', 'Rejected'];

export default function PlacementPage() {
  const { data: placements = [], isLoading } = usePlacementTracker();
  const addMutation = useAddPlacement();
  const updateMutation = useUpdatePlacement();
  const deleteMutation = useDeletePlacement();

  const [modalOpen, setModalOpen] = useState(false);
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [prepArea, setPrepArea] = useState('Quant / Finance');
  const [status, setStatus] = useState('Applied');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !role.trim()) return;

    await addMutation.mutateAsync({
      company,
      role,
      prep_area: prepArea,
      application_status: status,
      test_interview_date: date || null,
      notes,
    });
    setCompany('');
    setRole('');
    setNotes('');
    setModalOpen(false);
  };

  const getStatusBadge = (st: string) => {
    switch (st) {
      case 'Offer Received':
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Offer Received 🎉</Badge>;
      case 'Rejected':
        return <Badge className="bg-rose-500/20 text-rose-400 border-rose-500/30">Rejected</Badge>;
      case 'Interview Round 1':
      case 'Interview Round 2':
        return <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">{st}</Badge>;
      default:
        return <Badge className="bg-indigo-500/20 text-indigo-400 border-indigo-500/30">{st}</Badge>;
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-6xl mx-auto text-foreground">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Placement Tracker</h1>
            <Badge variant="secondary" className="bg-indigo-900/50 text-indigo-200 border-indigo-700/50 font-semibold px-2.5">
              Career Pipeline
            </Badge>
          </div>
          <p className="text-sm text-zinc-400 mt-1">Track company recruitment drives, interviews, prep areas, and offers.</p>
        </div>

        <Button 
          onClick={() => setModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-600/30 gap-1.5 font-semibold"
        >
          <Plus className="w-4 h-4" /> Add Application
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#111118]/80 p-4 rounded-2xl border border-white/10 backdrop-blur-xl">
          <span className="text-xs text-zinc-400 font-semibold uppercase">Total Applications</span>
          <p className="text-2xl font-black text-white mt-1">{placements.length}</p>
        </div>
        <div className="bg-[#111118]/80 p-4 rounded-2xl border border-white/10 backdrop-blur-xl">
          <span className="text-xs text-zinc-400 font-semibold uppercase">Interviews In Progress</span>
          <p className="text-2xl font-black text-purple-400 mt-1">
            {placements.filter((p: any) => p.application_status?.includes('Interview') || p.application_status?.includes('OA')).length}
          </p>
        </div>
        <div className="bg-[#111118]/80 p-4 rounded-2xl border border-white/10 backdrop-blur-xl">
          <span className="text-xs text-zinc-400 font-semibold uppercase">Offers Received</span>
          <p className="text-2xl font-black text-emerald-400 mt-1">
            {placements.filter((p: any) => p.application_status === 'Offer Received').length}
          </p>
        </div>
      </div>

      <div className="bg-[#111118]/90 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        {isLoading ? (
          <div className="p-8 space-y-3">
            <div className="h-14 bg-white/5 animate-pulse rounded-xl" />
            <div className="h-14 bg-white/5 animate-pulse rounded-xl" />
          </div>
        ) : placements.length === 0 ? (
          <div className="text-center py-16 px-4 space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto shadow-inner">
              <Briefcase className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-white">No placement applications yet</h3>
            <p className="text-sm text-zinc-400 max-w-sm mx-auto">
              Start building your career pipeline by logging the companies and roles you're targeting.
            </p>
            <Button onClick={() => setModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl mt-2">
              <Plus className="w-4 h-4 mr-1.5" /> Add First Application
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-white/5 text-zinc-400 border-b border-white/10 text-xs uppercase font-bold tracking-wider">
                <tr>
                  <th className="px-5 py-4">Company</th>
                  <th className="px-5 py-4">Role</th>
                  <th className="px-5 py-4">Prep Area</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {placements.map((item: any) => (
                  <motion.tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-4 font-bold text-white flex items-center gap-2">
                      <Building className="w-4 h-4 text-indigo-400 shrink-0" />
                      {item.company}
                    </td>
                    <td className="px-5 py-4 text-zinc-300 font-medium">{item.role}</td>
                    <td className="px-5 py-4 text-xs text-zinc-400">{item.prep_area || 'General'}</td>
                    <td className="px-5 py-4">
                      <select
                        value={item.application_status || 'Applied'}
                        onChange={(e) => updateMutation.mutate({ id: item.id, updates: { application_status: e.target.value } })}
                        className="bg-[#181824] border border-white/10 text-white text-xs rounded-lg px-2.5 py-1.5 outline-none cursor-pointer focus:border-indigo-500"
                      >
                        {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td className="px-5 py-4 text-xs text-zinc-400 font-mono">
                      {item.test_interview_date || '—'}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => deleteMutation.mutate(item.id)}
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
            <DialogTitle className="text-xl font-bold text-white">Add Job Application</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleAdd} className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-300 font-semibold uppercase">Company Name</Label>
              <Input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Goldman Sachs, Morgan Stanley, TrueAlpha"
                required
                className="bg-[#1a1a24] border-white/10 text-white rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-300 font-semibold uppercase">Role Title</Label>
              <Input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Equity Research Analyst / Quantitative Strategist"
                required
                className="bg-[#1a1a24] border-white/10 text-white rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs text-zinc-300 font-semibold uppercase">Application Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="bg-[#1a1a24] border-white/10 text-white rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#181824] border-white/10 text-white">
                    {STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs text-zinc-300 font-semibold uppercase">Interview / Test Date</Label>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-[#1a1a24] border-white/10 text-white rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-300 font-semibold uppercase">Notes / Contacts</Label>
              <Input
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Key requirements, referral contacts..."
                className="bg-[#1a1a24] border-white/10 text-white rounded-xl"
              />
            </div>

            <DialogFooter className="pt-3 border-t border-white/10 flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setModalOpen(false)} className="text-zinc-400 hover:text-white rounded-xl">
                Cancel
              </Button>
              <Button type="submit" disabled={addMutation.isPending} className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold px-5">
                {addMutation.isPending ? 'Adding...' : 'Save Application'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
