import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useFavorite } from '@/hooks/use-favorite'
import { useWeatherQuery } from '@/hooks/use-weather';
import { Loader, Loader2, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

const FavoriteCities = () => {
  const { favorites, removeFavorite } = useFavorite();

  if (!favorites || favorites.length === 0) {
    return null
  }

  return (
    <>
      <h1 className='text-xl font-bold tracking-tight'>Favorites</h1>
      <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
        <div className="flex w-max gap-4">
          <AnimatePresence initial={false}>
            {favorites.map((city) => (
              <FavoriteCityTablet
                key={city.id}
                {...city}
                onRemove={() => removeFavorite.mutate(city.id)}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}

function FavoriteCityTablet({ id, name, lat, lon, onRemove }) {
  const router = useRouter();
  const { data: weather, isLoading } = useWeatherQuery({ lat, lon });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, x: -50 }}
      transition={{ duration: 0.2 }}
      onClick={() => router.push(`/city/${name}?lat=${lat}&lon=${lon}`)}
      role='button'
      tabIndex={0}
      className='relative flex min-w-[250px] cursor-pointer items-center gap-3 rounded-lg border bg-card p-4 pr-8 shadow-sm transition-all hover:shadow-md'
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute cursor-pointer right-1 top-1 size-6 rounded-full p-0 hover:text-destructive-foreground group-hover:opacity-100"
        onClick={(e) => {
          e.stopPropagation()
          onRemove(id)
          toast.error(`Removed ${name} from Favorites`)
        }}
      >
        <X className=' size-4' />
      </Button>
      {
        isLoading ? (
          <div className='flex size-8 items-center justify-center'>
            <Loader2 className='size-4 animate-spin' />
          </div>
        ) : weather ? (
          <>
            <div className='flex items-center gap-2'>
              <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="" className='size-8' />
              <div>
                <p className='font-medium'>{name}</p>
                <p className='text-xs text-muted-foreground'>{weather.sys.country}</p>
              </div>
            </div>
            <div className='ml-auto text-right'>
              <p className='text-xl font-bold'>
                {Math.round(weather.main.temp)}°C
              </p>
              <p className='text-xs capitalize text-muted-foreground'>
                {weather.weather[0].description}
              </p>
            </div>
          </>
        ) : null
      }
    </motion.div>
  )
}

export default FavoriteCities