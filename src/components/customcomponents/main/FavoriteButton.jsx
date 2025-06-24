import { Button } from '@/components/ui/button';
import { useFavorite } from '@/hooks/use-favorite'
import { Star } from 'lucide-react';
import React from 'react'
import { toast } from 'sonner';

const FavoriteButton = ({ data }) => {
  const { addFavorite, isFavorite, removeFavorite } = useFavorite();

  const isCurrentlyFavorite = isFavorite(data.coord.lat, data.coord.lon);

  const handleToggleFavorite = () => {
    if (isCurrentlyFavorite) {
      removeFavorite.mutate(`${data.coord.lat} - ${data.coord.lon}`);
      toast.error(`Removed ${data.name} from favorites`);
    } else {
      addFavorite.mutate({
        name: data.name,
        lat: data.coord.lat,
        lon: data.coord.lon,
        country: data.sys.country,
      });
      toast.success(`Added ${data.name} to favorites`);
    }
  }
  return (
    <Button variant={isCurrentlyFavorite ? "default" : "outline"} size={"icon"}
      onClick={handleToggleFavorite}
      className={`${isCurrentlyFavorite ? "bg-yellow-500 hover:bg-yellow-600" : ""} cursor-pointer`}
    >
      <Star className={`size-4 ${isCurrentlyFavorite ? "fill-current" : ""}`} />
    </Button>
  )
}

export default FavoriteButton