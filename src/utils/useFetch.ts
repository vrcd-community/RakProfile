import { useEffect, useState } from "react";

export const useFetch = <T>(url: string, options?: RequestInit) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          const err = new Error("Network response was not ok");
          setError(err);
          setLoading(false);
          return;
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [])

  return { loading, data, error }
}