'use client';

import CurrentWeather from '@/components/customcomponents/main/CurrentWeather';
import FavoriteButton from '@/components/customcomponents/main/FavoriteButton';
import HourlyTemprature from '@/components/customcomponents/main/HourlyTemprature';
import WeatherDetails from '@/components/customcomponents/main/WeatherDetails';
import WeatherForecast from '@/components/customcomponents/main/WeatherForecast';
import LoadingSkeleton from '@/components/customcomponents/skeletons/LoadingSkeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useForecastQuery, useWeatherQuery } from '@/hooks/use-weather';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import React from 'react';
import dynamic from 'next/dynamic';

// Animation variants
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
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const CityPage = ({ cityName }) => {
  const searchParams = useSearchParams();
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  const coordinates = { lat, lon };

  const weatherQuerry = useWeatherQuery(coordinates);
  const forecastQuerry = useForecastQuery(coordinates);

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
          </AlertDescription>
        </Alert>
      </motion.div>
    )
  }

  if (!weatherQuerry.data || !forecastQuerry.data || !cityName) {
    return <LoadingSkeleton />
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className='space-y-4'
    >
      <motion.div variants={itemVariants} className='flex items-center justify-between mb-4'>
        <h1 className='text-xl font-bold tracking-tight'>{cityName}, {weatherQuerry.data.sys.country}</h1>
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FavoriteButton data={{ ...weatherQuerry.data, name: cityName }} />
        </motion.div>
      </motion.div>

      <motion.div variants={containerVariants} className='grid gap-6'>
        <motion.div variants={itemVariants} className='flex flex-col gap-4'>
          <CurrentWeather data={weatherQuerry} />
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

export default dynamic(() => Promise.resolve(CityPage), { ssr: false });