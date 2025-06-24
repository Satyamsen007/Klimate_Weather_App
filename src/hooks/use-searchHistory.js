import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-localStorage";



export function useSearchHistory() {
  const [history, setHistory] = useLocalStorage('searchHistory', []);

  const queryClient = useQueryClient();

  const historyQuerry = useQuery({
    queryKey: ['searchHistory'],
    queryFn: () => history,
    initialData: history,
    refetchOnWindowFocus: false,
  });

  const addToHistory = useMutation({
    mutationFn: async (search) => {
      const newSearch = {
        ...search,
        id: `${search.lat}-${search.lon}-${Date.now()}`,
        searchedAt: Date.now()
      };

      // Convert lat/lon to numbers and compare with a small epsilon to handle floating point precision
      const filteredHistory = history.filter(item => {
        const latDiff = Math.abs(Number(item.lat) - Number(search.lat));
        const lonDiff = Math.abs(Number(item.lon) - Number(search.lon));
        return !(latDiff < 0.0001 && lonDiff < 0.0001);
      });

      // Keep only the 10 most recent searches
      const newHistory = [newSearch, ...filteredHistory].slice(0, 10);
      setHistory(newHistory);
      return newHistory;
    },
    onSuccess: (newHistory) => {
      queryClient.setQueryData(['searchHistory'], newHistory);
    },
  });

  const clearHistory = useMutation({
    mutationFn: async () => {
      setHistory([]);
      return [];
    },
    onSuccess: () => {
      queryClient.setQueryData(['searchHistory'], []);
    },
  });

  return {
    history: Array.isArray(historyQuerry.data) ? historyQuerry.data : [],
    addToHistory,
    clearHistory,
  };
}