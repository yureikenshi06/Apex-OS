import { get, set, update } from 'idb-keyval';
import { SupabaseClient } from '@supabase/supabase-js';
import { useEffect, useState, useCallback } from 'react';

const QUEUE_KEY = 'apex-os-offline-queue';

export type QueueEntry = {
  id: string;
  table: string;
  operation: 'insert' | 'update' | 'delete';
  data: Record<string, unknown>;
  timestamp: number;
};

export const enqueue = async (mutation: Omit<QueueEntry, 'id' | 'timestamp'>) => {
  const entry: QueueEntry = {
    ...mutation,
    id: crypto.randomUUID(),
    timestamp: Date.now(),
  };
  await update<QueueEntry[]>(QUEUE_KEY, (queue = []) => [...queue, entry]);
};

export const dequeue = async (): Promise<QueueEntry | undefined> => {
  let entry: QueueEntry | undefined;
  await update<QueueEntry[]>(QUEUE_KEY, (queue = []) => {
    if (queue.length > 0) {
      entry = queue[0];
      return queue.slice(1);
    }
    return queue;
  });
  return entry;
};

export const getQueueSize = async (): Promise<number> => {
  const queue = await get<QueueEntry[]>(QUEUE_KEY);
  return queue?.length || 0;
};

export const flushQueue = async (supabase: SupabaseClient) => {
  let entry = await dequeue();
  while (entry) {
    try {
      const { table, operation, data } = entry;
      if (operation === 'insert') {
        await supabase.from(table).insert(data).throwOnError();
      } else if (operation === 'update') {
        await supabase.from(table).update(data).match({ id: data.id }).throwOnError();
      } else if (operation === 'delete') {
        await supabase.from(table).delete().match({ id: data.id }).throwOnError();
      }
      entry = await dequeue();
    } catch (error) {
      console.error('Failed to flush entry, putting it back:', error);
      await update<QueueEntry[]>(QUEUE_KEY, (queue = []) => [entry!, ...queue]);
      break;
    }
  }
};

export const useOfflineQueue = (supabaseClient: SupabaseClient) => {
  const [queueSize, setQueueSize] = useState(0);
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);

  const updateQueueSize = useCallback(async () => {
    const size = await getQueueSize();
    setQueueSize(size);
  }, []);

  const flush = useCallback(async () => {
    if (isOnline) {
      await flushQueue(supabaseClient);
      await updateQueueSize();
    }
  }, [isOnline, supabaseClient, updateQueueSize]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    updateQueueSize();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [updateQueueSize]);

  useEffect(() => {
    if (isOnline) {
      flush();
    }
  }, [isOnline, flush]);

  return { queueSize, flush, isOnline };
};
