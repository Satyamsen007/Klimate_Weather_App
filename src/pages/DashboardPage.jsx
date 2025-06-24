'use client';

import CurrentWeather from '@/components/customcomponents/main/CurrentWeather';
import FavoriteCities from '@/components/customcomponents/main/FavoriteCities';
import HourlyTemprature from '@/components/customcomponents/main/HourlyTemprature';
import WeatherDetails from '@/components/customcomponents/main/WeatherDetails';
import WeatherForecast from '@/components/customcomponents/main/WeatherForecast';
import LoadingSkeleton from '@/components/customcomponents/skeletons/LoadingSkeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button'
import { useGeolocation } from '@/hooks/use-geolocation'
import { useForecastQuery, useReverseGeoCodeQuery, useWeatherQuery } from '@/hooks/use-weather';
import { AlertTriangle, MapPin, RefreshCw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren"
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

const DashboardPage = () => {
  const { coordinates, error: locationError, getLocation, isLoading: locationLoading } = useGeolocation();

  const weatherQuerry = useWeatherQuery(coordinates);
  const locationQuerry = useReverseGeoCodeQuery(coordinates);
  const forecastQuerry = useForecastQuery(coordinates);


  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      weatherQuerry.refetch();
      locationQuerry.refetch();
      forecastQuerry.refetch();
    }
  }

  if (locationLoading) {
    return <LoadingSkeleton />
  }

  if (locationError) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Alert>
          <AlertTriangle />
          <AlertTitle>Location Error</AlertTitle>
          <AlertDescription className="flex flex-col space-y-2">
            <p>{locationError}</p>
            <Button onClick={getLocation} variant={'outline'} className="w-fit cursor-pointer">
              <MapPin className='mr-2 h-4 w-4' />
              Enable Location
            </Button>
          </AlertDescription>
        </Alert>
      </motion.div>
    )
  }

  if (!coordinates) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Alert variant='destructive'>
          <AlertTriangle />
          <AlertTitle>Location Required</AlertTitle>
          <AlertDescription className="flex flex-col space-y-2">
            <p>Please enable location access to see your local weather.</p>
            <Button onClick={getLocation} variant={'outline'} className="w-fit cursor-pointer">
              <MapPin className='mr-2 h-4 w-4' />
              Enable Location
            </Button>
          </AlertDescription>
        </Alert>
      </motion.div>
    )
  }

  const locationName = locationQuerry.data?.[0] || 'Unknown Location';

  if (weatherQuerry.error || forecastQuerry.error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Alert>
          <AlertTriangle />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription className="flex flex-col space-y-2">
            <p>Failed to fetch weather data. Please try again.</p>
            <Button onClick={handleRefresh} variant={'outline'} className="w-fit cursor-pointer">
              <RefreshCw className='mr-2 h-4 w-4' />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </motion.div>
    )
  }

  if (!weatherQuerry.data || !forecastQuerry.data) {
    return <LoadingSkeleton />
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className='space-y-4'>
      <motion.div variants={itemVariants}>
        <FavoriteCities />
      </motion.div>

      <motion.div variants={itemVariants} className='flex items-center justify-between mb-4'>
        <h1 className='text-xl font-bold tracking-tight'>My Location</h1>
        <Button variant={'outline'} size={'icon'} className='cursor-pointer'
          onClick={handleRefresh}
          disabled={weatherQuerry.isFetching || forecastQuerry.isFetching}
        >
          <RefreshCw className={`size-4 ${weatherQuerry.isFetching ? 'animate-spin' : ''}`} />
        </Button>
      </motion.div>

      <motion.div variants={containerVariants} className='grid gap-6'>
        <motion.div variants={itemVariants} className='flex flex-col lg:flex-row gap-4'>
          <CurrentWeather data={weatherQuerry} locationName={locationName} />
          <HourlyTemprature data={forecastQuerry.data} />
        </motion.div>
        <motion.div variants={itemVariants} className='grid gap-6 lg:grid-cols-2 items-start'>
          <WeatherDetails data={weatherQuerry.data} />
          <WeatherForecast data={forecastQuerry.data} />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default DashboardPage;