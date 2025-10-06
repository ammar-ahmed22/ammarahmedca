import { useCallback, useState } from "react";

type URLParam = string | URL | globalThis.Request;

export function useLazyFetch<R>(url: URLParam, init?: RequestInit) {
  const [data, setData] = useState<R | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (urlOverride?: URLParam, initOverride?: RequestInit) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          urlOverride ?? url,
          initOverride ?? init,
        );

        if (!response.ok) {
          setError(
            `Error: ${response.status} ${response.statusText}`,
          );
          setLoading(false);
          return;
        }

        const result = (await response.json()) as R;
        setData(result);
      } catch (err) {
        setError((err as Error).message);
      }
      setLoading(false);
    },
    [init, url],
  );

  return [fetchData, { data, loading, error }] as const;
}
