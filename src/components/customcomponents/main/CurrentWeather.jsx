import { Card, CardContent } from '@/components/ui/card';
import { ArrowDown, ArrowUp, Droplets, Wind } from 'lucide-react';
import React from 'react'

const CurrentWeather = ({ data, locationName }) => {

  const {
    weather: [currentWeather],
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
  } = data?.data || {};


  const formatedTemp = (temp) => {
    return `${Math.round(temp)}°C`;
  }

  return (
    <Card className='overflow-hidden'>
      <CardContent className="p-6">
        <div className='grid gap-6 md:grid-cols-2'>
          <div className='space-y-4'>
            <div className='space-y-2'>
              <div className='flex items-end gap-2'>
                <h2 className='text-2xl font-bold tracking-tighter'>{locationName?.name}</h2>
                {
                  locationName?.state && (
                    <span className='text-muted-foreground'>{locationName?.state}</span>
                  )
                }
              </div>
              <p className='text-sm text-muted-foreground'>{locationName?.country}</p>
            </div>
            <div className='flex items-center gap-4'>
              <p className='text-7xl font-bold tracking-tighter'>{formatedTemp(temp)}</p>

              <div className='space-y-1'>
                <p className='text-sm font-medium text-muted-foreground'>Feels like {formatedTemp(feels_like)}</p>
                <div className='flex gap-2 text-sm font-medium '>
                  <span className='flex items-center gap-1 text-blue-500'>
                    <ArrowDown className='size-3' />
                    {formatedTemp(temp_min)}
                  </span>
                  <span className='flex items-center gap-1 text-red-500'>
                    <ArrowUp className='size-3' />
                    {formatedTemp(temp_max)}
                  </span>
                </div>
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div className='flex items-center gap-2'>
                <Droplets className='size-4 text-blue-500' />
                <div className='space-y-0.5'>
                  <p className='text-sm font-medium'>Humidity</p>
                  <p className='text-sm text-muted-foreground'>{humidity}%</p>
                </div>
              </div>


              <div className='flex items-center gap-2'>
                <Wind className='size-4 text-blue-500' />
                <div className='space-y-0.5'>
                  <p className='text-sm font-medium'>Wind Speed</p>
                  <p className='text-sm text-muted-foreground'>{speed} m/s</p>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <div className='relative flex aspect-square w-full max-w-[200px] items-center'>
              <img src={`http://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`} alt={currentWeather.description} className='w-full h-full object-contain' />
              <div className='absolute bottom-0 text-center'>
                <p className='text-sm font-medium capitalize'>
                  {currentWeather.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CurrentWeather