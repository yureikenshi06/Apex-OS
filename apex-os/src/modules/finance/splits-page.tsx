import React from 'react';
import { usePeopleSplits, useUpdateSplit } from './hooks';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Users, Plus, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import type { PeopleSplit } from '@/api/types';

export default function SplitsPage() {
  const { data: splits = [], isLoading } = usePeopleSplits();
  const updateSplitMutation = useUpdateSplit();

  const owedToMe = (splits as PeopleSplit[]).filter((s) => s.direction === 'owed_to_me' && !s.settled);
  const iOwe = (splits as PeopleSplit[]).filter((s) => s.direction === 'i_owe' && !s.settled);

  const handleSettle = (id: string) => {
    updateSplitMutation.mutate({ id, data: { settled: true, outstanding: 0 } });
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto text-foreground">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Splits & Debts</h1>
          <p className="text-muted-foreground text-sm">Keep track of shared expenses and reimbursements.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-emerald-400 flex items-center gap-2 text-lg">
              <Users className="w-5 h-5" /> Owed to Me
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {owedToMe.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-4">No one owes you anything right now.</p>
            ) : (
              owedToMe.map((split) => (
                <div key={split.id} className="flex justify-between items-center p-4 bg-secondary/40 rounded-xl border border-border/50">
                  <div>
                    <p className="font-medium text-foreground">{split.person_name}</p>
                    <p className="text-xs text-muted-foreground">{split.description || 'Split expense'}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-emerald-400">{formatCurrency(split.amount)}</span>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="text-muted-foreground hover:text-emerald-400 h-8 w-8"
                      onClick={() => handleSettle(split.id)}
                      title="Mark as settled"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center gap-2 text-lg">
              <Users className="w-5 h-5" /> I Owe Others
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {iOwe.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-4">You are debt free!</p>
            ) : (
              iOwe.map((split) => (
                <div key={split.id} className="flex justify-between items-center p-4 bg-secondary/40 rounded-xl border border-border/50">
                  <div>
                    <p className="font-medium text-foreground">{split.person_name}</p>
                    <p className="text-xs text-muted-foreground">{split.description || 'Borrowed / share'}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-destructive">{formatCurrency(split.amount)}</span>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="text-muted-foreground hover:text-destructive h-8 w-8"
                      onClick={() => handleSettle(split.id)}
                      title="Mark as settled"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
