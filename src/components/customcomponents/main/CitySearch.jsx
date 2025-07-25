'use client';

import { Button } from '@/components/ui/button';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command';
import { useFavorite } from '@/hooks/use-favorite';
import { useSearchHistory } from '@/hooks/use-searchHistory';
import { useLocationSearch } from '@/hooks/use-weather';
import { format } from 'date-fns';
import { Clock, Loader2, Search, Star, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const CitySearch = () => {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('');
  const { favorites } = useFavorite()
  const router = useRouter();

  const { data: locations, isLoading } = useLocationSearch(query);
  const { history, clearHistory, addToHistory } = useSearchHistory();

  const handleSelect = (cityData) => {
    const [lat, lon, name, country] = cityData.split('|');

    addToHistory.mutate({
      query,
      name,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      country
    });

    setOpen(false);
    setQuery('');
    router.push(`/city/${name}?lat=${lat}&lon=${lon}`);
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="outline" className="relative w-full cursor-pointer justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64">
        <Search className='mr-2 size-4' />
        Search cities...
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search cities..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {
            query.length > 2 && !isLoading && (
              <CommandEmpty>No cities found.</CommandEmpty>
            )
          }

          {favorites && favorites.length > 0 && (
            <CommandGroup heading="Favorites">
              {favorites.map((location) => (
                <CommandItem key={`${location.id}`}
                  value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                  onSelect={handleSelect}
                  className='cursor-pointer'
                >
                  <span className='flex items-center'>
                    <Star className='mr-2 size-4 text-yellow-500' />
                    {location.name}
                  </span>
                  {
                    location.state && (
                      <span className='text-sm text-muted-foreground'>
                        , {location.state}
                      </span>
                    )
                  }
                  <span className='text-sm text-muted-foreground'>
                    , {location.country}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}


          {history && history.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup>
                <div className='flex items-center justify-between px-2 my-2'>
                  <p className='text-xs text-muted-foreground'>Recent Searches</p>
                  <Button onClick={() => clearHistory.mutate()} variant='ghost' size='sm' className="cursor-pointer">
                    <XCircle className='size-4' />
                    Clear
                  </Button>
                </div>

                {history.map((location) => (
                  <CommandItem key={`${location.lat}-${location.lon}`}
                    value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                    onSelect={handleSelect}
                    className='cursor-pointer'
                  >
                    <span className='flex items-center'>
                      <Clock className='mr-2 size-4 text-muted-foreground' />
                      {location.name}
                    </span>
                    {
                      location.state && (
                        <span className='text-sm text-muted-foreground'>
                          , {location.state}
                        </span>
                      )
                    }
                    <span className='text-sm text-muted-foreground'>
                      , {location.country}
                    </span>
                    <span className='ml-auto text-xs text-muted-foreground'>
                      {format(location.searchedAt, 'MMM dd, yyyy HH:mm')}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}

          <CommandSeparator />

          {
            locations && locations.length > 0 && (
              <CommandGroup heading="Suggestions">
                {
                  isLoading && (
                    <div className=' flex items-center justify-center p-4'>
                      <Loader2 className='h-4 w-4 animate-spin' />
                    </div>
                  )
                }

                {
                  locations.map((location) => (
                    <CommandItem key={`${location.lat}-${location.lon}`}
                      value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                      onSelect={handleSelect}
                      className='cursor-pointer'
                    >
                      <span className='flex items-center'>
                        <Search className='mr-2 size-4' />
                        {location.name}
                      </span>
                      {
                        location.state && (
                          <span className='text-sm text-muted-foreground'>
                            , {location.state}
                          </span>
                        )
                      }
                      <span className='text-sm text-muted-foreground'>
                        , {location.country}
                      </span>
                    </CommandItem>
                  ))
                }

              </CommandGroup>
            )
          }
        </CommandList>
      </CommandDialog>
    </>
  )
}

export default CitySearch;