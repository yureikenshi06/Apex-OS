import React, { useState, useEffect } from 'react';
import { useSettings, useUpdateSettings, useExportAllData, useExportTableCSV } from './hooks';
import { useAuth } from '@/hooks/use-auth';
import { LogOut, Save, Download, Upload, Monitor, Moon, Sun, DollarSign, Dumbbell, BookOpen, Clock, Activity, Keyboard } from 'lucide-react';

export default function SettingsPage() {
  const { data: settings, isLoading } = useSettings();
  const updateSettings = useUpdateSettings();
  const { user, signOut } = useAuth();
  const exportAll = useExportAllData();
  const exportCsv = useExportTableCSV();

  const [activeTab, setActiveTab] = useState('profile');
  const [localSettings, setLocalSettings] = useState<any>(null);

  useEffect(() => {
    if (settings) {
      setLocalSettings(settings);
    }
  }, [settings]);

  if (isLoading || !localSettings) {
    return <div className="flex items-center justify-center min-h-screen text-white/50">Loading settings...</div>;
  }

  const handleSave = () => {
    updateSettings.mutate(localSettings);
  };

  const handleChange = (section: string, key: string, value: any) => {
    setLocalSettings((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: Activity },
    { id: 'theme', label: 'Theme', icon: Monitor },
    { id: 'timetable', label: 'Timetable', icon: Clock },
    { id: 'finance', label: 'Finance', icon: DollarSign },
    { id: 'fitness', label: 'Fitness', icon: Dumbbell },
    { id: 'cfa', label: 'CFA', icon: BookOpen },
    { id: 'data', label: 'Data', icon: Download },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 pt-20 pb-24">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-white/60">Manage your Apex OS preferences</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={updateSettings.isPending}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-medium transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {updateSettings.isPending ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 space-y-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === tab.id 
                  ? 'bg-indigo-500/10 text-indigo-400' 
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 min-w-0">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Account</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white/60 mb-1">Email</label>
                      <input 
                        type="text" 
                        value={user?.email || ''} 
                        readOnly 
                        className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-xl text-white/60 cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>
                <div className="pt-6 border-t border-white/10">
                  <button 
                    onClick={() => signOut()}
                    className="flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'theme' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Appearance</h3>
                  <div className="flex items-center justify-between p-4 bg-black/20 border border-white/10 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
                        <Moon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-white font-medium">Dark Theme</div>
                        <div className="text-sm text-white/50">Recommended for Apex OS</div>
                      </div>
                    </div>
                    <div className="w-12 h-6 bg-indigo-500 rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'timetable' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-white mb-4">Daily Targets</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-1">Wake Time</label>
                    <input 
                      type="time" 
                      value={localSettings.timetable.wakeTime}
                      onChange={(e) => handleChange('timetable', 'wakeTime', e.target.value)}
                      className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-1">Sleep Time</label>
                    <input 
                      type="time" 
                      value={localSettings.timetable.sleepTime}
                      onChange={(e) => handleChange('timetable', 'sleepTime', e.target.value)}
                      className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-1">Sleep Target (hrs)</label>
                    <input 
                      type="number" step="0.5"
                      value={localSettings.timetable.sleepTarget}
                      onChange={(e) => handleChange('timetable', 'sleepTarget', Number(e.target.value))}
                      className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-1">Gym Sessions / Week</label>
                    <input 
                      type="number" 
                      value={localSettings.timetable.gymSessionsTarget}
                      onChange={(e) => handleChange('timetable', 'gymSessionsTarget', Number(e.target.value))}
                      className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-1">CFA Hours / Week</label>
                    <input 
                      type="number" 
                      value={localSettings.timetable.cfaHoursTarget}
                      onChange={(e) => handleChange('timetable', 'cfaHoursTarget', Number(e.target.value))}
                      className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-1">Placement Hours / Week</label>
                    <input 
                      type="number" 
                      value={localSettings.timetable.placementHoursTarget}
                      onChange={(e) => handleChange('timetable', 'placementHoursTarget', Number(e.target.value))}
                      className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-xl text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'finance' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-white mb-4">Finance Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-1">Currency Symbol</label>
                    <input 
                      type="text" 
                      value={localSettings.finance.currencySymbol}
                      onChange={(e) => handleChange('finance', 'currencySymbol', e.target.value)}
                      className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-1">Savings Rate Target (%)</label>
                    <input 
                      type="number" 
                      value={localSettings.finance.savingsRateTarget}
                      onChange={(e) => handleChange('finance', 'savingsRateTarget', Number(e.target.value))}
                      className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-xl text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'fitness' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-white mb-4">Body Profile</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-1">Height (cm)</label>
                    <input 
                      type="number" 
                      value={localSettings.fitness.height}
                      onChange={(e) => handleChange('fitness', 'height', Number(e.target.value))}
                      className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-1">Current Weight (kg)</label>
                    <input 
                      type="number" 
                      value={localSettings.fitness.startingWeight}
                      onChange={(e) => handleChange('fitness', 'startingWeight', Number(e.target.value))}
                      className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-1">Target Weight (kg)</label>
                    <input 
                      type="number" 
                      value={localSettings.fitness.targetWeight}
                      onChange={(e) => handleChange('fitness', 'targetWeight', Number(e.target.value))}
                      className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-xl text-white"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'cfa' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-white mb-4">CFA Prep</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-1">Target Exam Date</label>
                    <input 
                      type="date" 
                      value={localSettings.cfa.deadlineDate ? new Date(localSettings.cfa.deadlineDate).toISOString().split('T')[0] : ''}
                      onChange={(e) => handleChange('cfa', 'deadlineDate', new Date(e.target.value).toISOString())}
                      className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-xl text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'data' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-white mb-4">Data Management</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-white">Export All Data</div>
                        <div className="text-sm text-white/60">Download a complete JSON backup of your data</div>
                      </div>
                      <button 
                        onClick={() => exportAll()}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Export JSON
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-white">Export Tasks (CSV)</div>
                        <div className="text-sm text-white/60">Download tasks as CSV</div>
                      </div>
                      <button 
                        onClick={() => exportCsv('tasks')}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Export Tasks
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
