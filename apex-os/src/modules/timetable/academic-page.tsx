import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAcademicTracker, useAddAcademic, useUpdateAcademic, useDeleteAcademic } from './hooks';
import { Plus, BookOpen, Trash2, GraduationCap, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const STATUSES = ['Pending', 'In Progress', 'Submitted', 'Graded'];

export default function AcademicPage() {
  const { data: academics = [], isLoading } = useAcademicTracker();
  const addMutation = useAddAcademic();
  const updateMutation = useUpdateAcademic();
  const deleteMutation = useDeleteAcademic();

  const [modalOpen, setModalOpen] = useState(false);
  const [courseCode, setCourseCode] = useState('');
  const [courseName, setCourseName] = useState('');
  const [item, setItem] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('High');

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseCode.trim() || !item.trim()) return;

    await addMutation.mutateAsync({
      course_code: courseCode,
      course_name: courseName,
      item,
      deadline: deadline || null,
      priority,
      status: 'In Progress',
    });
    setCourseCode('');
    setCourseName('');
    setItem('');
    setModalOpen(false);
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-6xl mx-auto text-foreground">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Academic Tracker</h1>
            <Badge variant="secondary" className="bg-cyan-900/50 text-cyan-200 border-cyan-700/50 font-semibold px-2.5">
              IIT Bombay
            </Badge>
          </div>
          <p className="text-sm text-zinc-400 mt-1">Track semester coursework, midterms, lab assignments, and project deadlines.</p>
        </div>

        <Button 
          onClick={() => setModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-600/30 gap-1.5 font-semibold"
        >
          <Plus className="w-4 h-4" /> Add Academic Item
        </Button>
      </div>

      <div className="bg-[#111118]/90 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        {isLoading ? (
          <div className="p-8 space-y-3">
            <div className="h-14 bg-white/5 animate-pulse rounded-xl" />
            <div className="h-14 bg-white/5 animate-pulse rounded-xl" />
          </div>
        ) : academics.length === 0 ? (
          <div className="text-center py-16 px-4 space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto shadow-inner">
              <GraduationCap className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-white">No academic items logged</h3>
            <p className="text-sm text-zinc-400 max-w-sm mx-auto">
              Add your current semester courses, assignment submissions, and exam dates.
            </p>
            <Button onClick={() => setModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl mt-2">
              <Plus className="w-4 h-4 mr-1.5" /> Add Course Item
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-white/5 text-zinc-400 border-b border-white/10 text-xs uppercase font-bold tracking-wider">
                <tr>
                  <th className="px-5 py-4">Course</th>
                  <th className="px-5 py-4">Deliverable / Topic</th>
                  <th className="px-5 py-4">Priority</th>
                  <th className="px-5 py-4">Deadline</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {academics.map((row: any) => (
                  <motion.tr key={row.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-4 font-bold text-white flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-cyan-400 shrink-0" />
                      {row.course_code}
                    </td>
                    <td className="px-5 py-4 text-zinc-200 font-medium">{row.item}</td>
                    <td className="px-5 py-4">
                      <Badge variant="outline" className="text-[10px] bg-cyan-500/10 border-cyan-500/30 text-cyan-300">
                        {row.priority || 'Medium'}
                      </Badge>
                    </td>
                    <td className="px-5 py-4 text-xs text-zinc-400 font-mono">{row.deadline || '—'}</td>
                    <td className="px-5 py-4">
                      <select
                        value={row.status || 'In Progress'}
                        onChange={(e) => updateMutation.mutate({ id: row.id, updates: { status: e.target.value } })}
                        className="bg-[#181824] border border-white/10 text-white text-xs rounded-lg px-2.5 py-1.5 outline-none cursor-pointer focus:border-indigo-500"
                      >
                        {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
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
            <DialogTitle className="text-xl font-bold text-white">Add Academic Item</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleAdd} className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs text-zinc-300 font-semibold uppercase">Course Code</Label>
                <Input
                  value={courseCode}
                  onChange={(e) => setCourseCode(e.target.value)}
                  placeholder="e.g. CS101, IE603"
                  required
                  className="bg-[#1a1a24] border-white/10 text-white rounded-xl"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-zinc-300 font-semibold uppercase">Course Name</Label>
                <Input
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  placeholder="e.g. Optimization Models"
                  className="bg-[#1a1a24] border-white/10 text-white rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-300 font-semibold uppercase">Assignment / Exam Item</Label>
              <Input
                value={item}
                onChange={(e) => setItem(e.target.value)}
                placeholder="e.g. Midterm Examination / Problem Set 4"
                required
                className="bg-[#1a1a24] border-white/10 text-white rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs text-zinc-300 font-semibold uppercase">Deadline</Label>
                <Input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="bg-[#1a1a24] border-white/10 text-white rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs text-zinc-300 font-semibold uppercase">Priority</Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger className="bg-[#1a1a24] border-white/10 text-white rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#181824] border-white/10 text-white">
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter className="pt-3 border-t border-white/10 flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setModalOpen(false)} className="text-zinc-400 hover:text-white rounded-xl">
                Cancel
              </Button>
              <Button type="submit" disabled={addMutation.isPending} className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold px-5">
                {addMutation.isPending ? 'Saving...' : 'Save Item'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
