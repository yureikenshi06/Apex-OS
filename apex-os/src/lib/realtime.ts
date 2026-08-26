import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from './supabase';
import { RealtimeChannel } from '@supabase/supabase-js';

const subscriptions: Map<string, RealtimeChannel> = new Map();

export const subscribeToTable = (
  tableName: string,
  ownerId: string | null,
  onInsert?: (payload: any) => void,
  onUpdate?: (payload: any) => void,
  onDelete?: (payload: any) => void
) => {
  if (!ownerId) return null;

  const channelName = `realtime:${tableName}:${ownerId}`;
  
  if (subscriptions.has(channelName)) {
    return subscriptions.get(channelName);
  }

  const channel = supabase
    .channel(channelName)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: tableName,
        filter: `owner_id=eq.${ownerId}`,
      },
      (payload) => onInsert?.(payload)
    )
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: tableName,
        filter: `owner_id=eq.${ownerId}`,
      },
      (payload) => onUpdate?.(payload)
    )
    .on(
      'postgres_changes',
      {
        event: 'DELETE',
        schema: 'public',
        table: tableName,
        filter: `owner_id=eq.${ownerId}`,
      },
      (payload) => onDelete?.(payload)
    )
    .subscribe();

  subscriptions.set(channelName, channel);
  return channel;
};

export const unsubscribeAll = () => {
  subscriptions.forEach((channel) => {
    supabase.removeChannel(channel);
  });
  subscriptions.clear();
};

export const useRealtimeSync = (tableName: string, queryKey: unknown[], ownerId: string | null) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!ownerId) return;

    const handleRealtimeChange = () => {
      queryClient.invalidateQueries({ queryKey });
    };

    const channel = subscribeToTable(
      tableName,
      ownerId,
      handleRealtimeChange,
      handleRealtimeChange,
      handleRealtimeChange
    );

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
        subscriptions.delete(`realtime:${tableName}:${ownerId}`);
      }
    };
  }, [tableName, queryClient, ownerId, queryKey]);
};
