import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { Compass, Gauge, Sunrise, Sunset } from 'lucide-react';

const WeatherDetails = ({ data }) => {
  const { wind, main, sys } = data;

  const getWindDirection = (deg) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(((deg %= 360) < 0 ? deg + 360 : deg) / 45) % 8;
    return directions[index];
  }

  const formatTime = (timestamp) => {
    return format(new Date(timestamp * 1000), 'hh:mm a');
  }

  const details = [
    {
      title: "Sunrise",
      value: formatTime(sys.sunrise),
      icon: Sunrise,
      color: "text-orange-500"
    },
    {
      title: "Sunset",
      value: formatTime(sys.sunset),
      icon: Sunset,
      color: "text-blue-500"
    },
    {
      title: "Wind Direction",
      value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
      icon: Compass,
      color: "text-green-500"
    },
    {
      title: "Pressure",
      value: `${main.pressure} hpa`,
      icon: Gauge,
      color: "text-purple-500"
    }
  ]
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid gap-6 sm:grid-cols-2'>
          {details.map((detail, index) => (
            <div key={index} className='flex items-center gap-3 rounded-lg border p-4'>
              <detail.icon className={`size-5 ${detail.color}`} />
              <div>
                <p className='text-sm font-medium leading-none'>{detail.title}</p>
                <p className='text-sm text-muted-foreground'>{detail.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default WeatherDetails;