import React from 'react';
import { useNetWorthEntries } from './hooks';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

export default function NetWorthPage() {
  const { data: entries = [], isLoading } = useNetWorthEntries();

  const chartData = [...entries].reverse().map((e: any) => ({
    date: new Date(e.month_date || e.date || new Date()).toLocaleDateString(undefined, { month: 'short', year: '2-digit' }),
    netWorth: (Number(e.total_assets) || 0) - (Number(e.total_liabilities) || 0)
  }));

  const latest = entries[0] || { total_assets: 0, total_liabilities: 0 };
  const totalAssets = Number(latest.total_assets) || 0;
  const totalLiabilities = Number(latest.total_liabilities) || 0;
  const currentNW = totalAssets - totalLiabilities;

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto text-foreground">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Net Worth</h1>
          <p className="text-muted-foreground text-sm">Track your overall wealth and liabilities over time.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <p className="text-sm font-medium text-muted-foreground">Total Assets</p>
            <p className="text-3xl font-bold text-emerald-400 mt-2">{formatCurrency(totalAssets)}</p>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <p className="text-sm font-medium text-muted-foreground">Total Liabilities</p>
            <p className="text-3xl font-bold text-destructive mt-2">{formatCurrency(totalLiabilities)}</p>
          </CardContent>
        </Card>
        <Card className="border-primary/40 bg-primary/5">
          <CardContent className="pt-6">
            <p className="text-sm font-medium text-primary">Net Worth</p>
            <p className="text-3xl font-bold mt-2">{formatCurrency(currentNW)}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Net Worth Trajectory</CardTitle>
        </CardHeader>
        <CardContent className="h-[350px]">
          {chartData.length === 0 ? (
            <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
              No net worth history yet. Add your first monthly snapshot!
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="netWorthGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="date" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val/1000}k`} />
                <RechartsTooltip contentStyle={{ backgroundColor: '#111118', borderColor: '#27272a', color: '#f4f4f5' }} />
                <Area type="monotone" dataKey="netWorth" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#netWorthGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
