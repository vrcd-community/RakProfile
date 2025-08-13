import { useFetch } from "@/utils/useFetch";

export const useMFA = () => {
  const { data, error, loading, refetch } = useFetch("/api/user/me/mfa");

  return {
    data,
    error,
    loading,
    refetch
  };
}