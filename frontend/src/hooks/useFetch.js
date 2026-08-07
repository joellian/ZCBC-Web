import { useState, useEffect, useRef } from 'react';

/**
 * Generic data-fetching hook.
 * @param {() => Promise<T>} fetchFn — async function that returns the shaped data
 * @returns {{ data: T | null, loading: boolean, error: string | null }}
 */
export default function useFetch(fetchFn) {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    const run = async () => {
      try {
        setLoading(true);
        const result = await fetchFn();
        if (mountedRef.current) {
          setData(result);
        }
      } catch (err) {
        console.error('useFetch error:', err);
        if (mountedRef.current) {
          setError(err.message || 'Something went wrong');
        }
      } finally {
        if (mountedRef.current) {
          setLoading(false);
        }
      }
    };

    run();

    return () => {
      mountedRef.current = false;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, error };
}
