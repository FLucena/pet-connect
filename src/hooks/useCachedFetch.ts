import { useState, useEffect, useCallback } from 'react';

interface CacheOptions {
  cacheTime?: number; // Time in milliseconds to cache the data
  staleTime?: number; // Time in milliseconds after which data is considered stale
}

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

const cache = new Map<string, CacheItem<unknown>>();

export function useCachedFetch<T>(
  url: string,
  options: RequestInit = {},
  cacheOptions: CacheOptions = {}
): { data: T | null; loading: boolean; error: Error | null; refetch: () => Promise<void> } {
  const { cacheTime = 5 * 60 * 1000, staleTime = 1 * 60 * 1000 } = cacheOptions;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const cachedItem = cache.get(url);
      const now = Date.now();

      if (cachedItem && now - cachedItem.timestamp < cacheTime) {
        setData(cachedItem.data as T);
        setLoading(false);
        
        // If data is stale, refetch in background
        if (now - cachedItem.timestamp > staleTime) {
          fetch(url, options)
            .then(response => response.json())
            .then(newData => {
              cache.set(url, { data: newData, timestamp: now });
              setData(newData as T);
            })
            .catch(() => {
              // Silently fail background refresh
            });
        }
        return;
      }

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const newData = await response.json();
      
      cache.set(url, { data: newData, timestamp: now });
      setData(newData as T);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
    } finally {
      setLoading(false);
    }
  }, [url, options, cacheTime, staleTime]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
} 