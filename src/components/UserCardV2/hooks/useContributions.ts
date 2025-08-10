import { useFetch } from '@/utils/useFetch'

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

interface Contributions {
  contributions: ContributionItem[],
  activities: ActiveItem[]
}

export const useContributions = (uid: string) => {
  const { loading, data, error } = useFetch<{ data: Contributions }>(`/api/user/${uid}/contributions`)

  return {
    loading,
    data: data?.data ?? null,
    error
  }
}