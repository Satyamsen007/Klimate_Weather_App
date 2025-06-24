import { weatherAPI } from "@/lib/api/weather";
import { useQuery } from "@tanstack/react-query";

export const WEATHER_KEYS = {
  weather: (coords) => ["weather", coords],
  forecast: (coords) => ["forecast", coords],
  location: (coords) => ["location", coords],
  search: (query) => ["location-search", query],
}
export function useWeatherQuery(coordinates) {
  return useQuery({
    queryKey: WEATHER_KEYS.weather(coordinates ?? {
      lat: 0,
      lon: 0,
    }),
    queryFn: () => coordinates ? weatherAPI.getCurrentWeather(coordinates) : null,
    enabled: !!coordinates,

  })
}


export function useForecastQuery(coordinates) {
  return useQuery({
    queryKey: WEATHER_KEYS.forecast(coordinates ?? {
      lat: 0,
      lon: 0,
    }),
    queryFn: () => coordinates ? weatherAPI.getWeatherForecast(coordinates) : null,
    enabled: !!coordinates,

  })
}

export function useReverseGeoCodeQuery(coordinates) {
  return useQuery({
    queryKey: WEATHER_KEYS.location(coordinates ?? {
      lat: 0,
      lon: 0,
    }),
    queryFn: () => coordinates ? weatherAPI.reverseGeocode(coordinates) : null,
    enabled: !!coordinates,

  })
}


export function useLocationSearch(query) {
  return useQuery({
    queryKey: WEATHER_KEYS.search(query),
    queryFn: () => weatherAPI.searcheLocations(query),
    enabled: query.length >= 3,
  })
}