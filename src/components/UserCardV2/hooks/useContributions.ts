import * as React from 'react'

export interface ActiveItem {
  resource_id: string;
  date: string;
  message: string;
  type: string; // "create" | "edit"
  url: string;
}

export interface ContributionItem {
  date: string,
  count: number,
  type: string
}

interface PaginationInfo {
  current_page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

interface Contributions {
  contributions: ContributionItem[],
  activities: ActiveItem[],
  pagination: PaginationInfo
}

export const useContributions = (uid: string) => {
  const [page, setPage] = React.useState(1);
  const [pageSize] = React.useState(5);
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<Contributions | null>(null);
  const [error, setError] = React.useState<Error | null>(null);

  const fetchData = React.useCallback(async (currentPage: number) => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        page_size: pageSize.toString()
      });
      const response = await fetch(`/api/user/${uid}/contributions?${queryParams}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result.data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [uid, pageSize]);

  React.useEffect(() => {
    fetchData(page);
  }, [fetchData, page]);

  const refresh = React.useCallback((newPage?: number) => {
    if (newPage !== undefined) {
      setPage(newPage);
    } else {
      fetchData(page);
    }
  }, [fetchData, page]);

  return {
    loading,
    data,
    error,
    currentPage: page,
    refresh
  }
}