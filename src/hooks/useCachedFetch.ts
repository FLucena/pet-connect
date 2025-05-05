import { useState, useEffect, useCallback } from 'react';

interface CacheOptions {
  cacheTime?: number; // Cache duration in milliseconds
  staleTime?: number; // Time after which data is considered stale
}

interface CacheItem<T> {
  data: T;
  timestamp: number;
  isStale: boolean;
}

const cache = new Map<string, CacheItem<unknown>>();

export function useCachedFetch<T>(
  key: string,
  fetchFn: () => Promise<T>,
  options: CacheOptions = {}
): { data: T | null; loading: boolean; error: Error | null; refetch: () => Promise<void> } {
  const { cacheTime = 5 * 60 * 1000, staleTime = 1 * 60 * 1000 } = options;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const cachedItem = cache.get(key) as CacheItem<T> | undefined;
      const now = Date.now();

      if (cachedItem && now - cachedItem.timestamp < cacheTime) {
        setData(cachedItem.data);
        setLoading(false);
        
        // If data is stale, fetch in background
        if (now - cachedItem.timestamp > staleTime) {
          const newData = await fetchFn();
          cache.set(key, {
            data: newData,
            timestamp: now,
            isStale: false
          });
          setData(newData);
        }
        return;
      }

      const newData = await fetchFn();
      cache.set(key, {
        data: newData,
        timestamp: now,
        isStale: false
      });
      setData(newData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
    } finally {
      setLoading(false);
    }
  }, [key, fetchFn, cacheTime, staleTime]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
} 