import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const LoadingSkeleton = () => {
  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-6 w-40 rounded-md" /> {/* Location title */}
        </div>
        <Skeleton className="h-10 w-10 rounded-full" /> {/* Refresh button */}
      </div>

      <div className="grid gap-6">
        {/* First row: CurrentWeather & HourlyTemprature */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* CurrentWeather card */}
          <div className="flex-1 space-y-4 p-4 bg-muted/70 dark:bg-muted/50 rounded-lg border border-muted-foreground/10 dark:border-muted-foreground/20">
            <Skeleton className="h-8 w-32 mb-2" /> {/* Temperature */}
            <Skeleton className="h-6 w-24 mb-2" /> {/* Weather description */}
            <div className="flex space-x-2">
              <Skeleton className="h-6 w-6 rounded-full" /> {/* Icon */}
              <Skeleton className="h-6 w-16" /> {/* City name */}
            </div>
            <div className="flex space-x-4 mt-4">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
          {/* HourlyTemprature card */}
          <div className="flex-1 flex flex-col space-y-2 p-4 bg-muted/70 dark:bg-muted/50 rounded-lg border border-muted-foreground/10 dark:border-muted-foreground/20">
            <Skeleton className="h-6 w-32 mb-2" />
            <div className="flex space-x-2">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-8 rounded-md" />
              ))}
            </div>
          </div>
        </div>
        {/* Second row: WeatherDetails & WeatherForecast */}
        <div className="grid gap-6 lg:grid-cols-2 items-start">
          {/* WeatherDetails */}
          <div className="space-y-3 p-4 bg-muted/70 dark:bg-muted/50 rounded-lg border border-muted-foreground/10 dark:border-muted-foreground/20">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-32" />
            ))}
          </div>
          {/* WeatherForecast */}
          <div className="space-y-3 p-4 bg-muted/70 dark:bg-muted/50 rounded-lg border border-muted-foreground/10 dark:border-muted-foreground/20">
            <Skeleton className="h-6 w-28 mb-2" />
            <div className="flex space-x-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-14 w-12 rounded-md" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingSkeleton;