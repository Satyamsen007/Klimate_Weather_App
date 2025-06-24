import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { ArrowDown, ArrowUp, Droplets, Wind } from 'lucide-react';

const WeatherForecast = ({ data }) => {

  const dailyForecast = data.list.reduce((acc, item) => {
    const date = format(new Date(item.dt * 1000), 'yyyy-MM-dd');

    if (!acc[date]) {
      acc[date] = {
        date: item.dt,
        temp_min: item.main.temp_min,
        temp_max: item.main.temp_max,
        weather: item.weather[0],
        humidity: item.main.humidity,
        wind: item.wind.speed,
      };
    } else {
      acc[date].temp_min = Math.min(acc[date].temp_min, item.main.temp_min);
      acc[date].temp_max = Math.max(acc[date].temp_max, item.main.temp_max);
    }

    return acc;
  }, {});

  const nextDays = Object.values(dailyForecast).slice(0, 6);

  const formatedTemp = (temp) => {
    return `${Math.round(temp)}°C`;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid gap-4'>
          {
            nextDays.map((day, index) => (
              <div key={index} className='grid grid-cols-3 items-center gap-4 rounded-lg border max-md:grid-cols-2 p-4'>
                <div>
                  <p className='font-medium'>{format(new Date(day.date * 1000), "EEE, MMM d")}</p>
                  <p className='text-sm text-muted-foreground capitalize'>{day.weather.description}</p>
                </div>

                <div className='flex justify-center gap-4'>
                  <span className='flex items-center text-blue-500'>
                    <ArrowDown className='mr-1 size-4' />
                    {formatedTemp(day.temp_min)}
                  </span>
                  <span className='flex items-center text-red-500'>
                    <ArrowUp className='mr-1 size-4' />
                    {formatedTemp(day.temp_max)}
                  </span>
                </div>

                <div className='flex justify-center gap-4'>
                  <span className='flex items-center gap-1'>
                    <Droplets className='size-4 text-blue-500' />
                    <span className='text-sm'>{day.humidity}%</span>
                  </span>
                  <span className='flex items-center gap-1'>
                    <Wind className='size-4 text-blue-500' />
                    <span className='text-sm'>{day.wind}m/s</span>
                  </span>
                </div>

              </div>
            ))
          }
        </div>
      </CardContent>
    </Card>
  )
}

export default WeatherForecast