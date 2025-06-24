import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-localStorage";



export function useFavorite() {
  const [favorites, setFavorites] = useLocalStorage('favorites', []);

  const queryClient = useQueryClient();

  const favoritesQuerry = useQuery({
    queryKey: ['favorites'],
    queryFn: () => favorites,
    initialData: favorites,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const addFavorite = useMutation({
    mutationFn: async (city) => {
      const newFavorite = {
        ...city,
        id: `${city.lat} - ${city.lon}`,
        addedAt: Date.now()
      };

      const exists = favorites.some(fav => fav.id === newFavorite.id);

      if (exists) {
        return favorites; // No change if already exists
      }

      const newFavorites = [...favorites, newFavorite].slice(0, 10);
      setFavorites(newFavorites);
      return newFavorites;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['favorites'],
      });
    },
  });

  const removeFavorite = useMutation({
    mutationFn: async (cityId) => {
      const newFavorites = favorites.filter(fav => fav.id !== cityId);
      setFavorites(newFavorites);
      return newFavorites;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['favorites'],
      });
    },
  });

  return {
    favorites: favoritesQuerry.data ?? [],
    addFavorite,
    removeFavorite,
    isFavorite: (lat, lon) => favorites.some(fav => fav.lat === lat && fav.lon === lon),
  };
}