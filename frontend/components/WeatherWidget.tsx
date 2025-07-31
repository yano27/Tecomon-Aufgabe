import { JSX, useState } from 'react';
import {
  Loader2,
  Trash2,
  Sun,
  CloudSun,
  Cloud,
  Cloudy,
  CloudRain,
  CloudSnow,
  CloudFog,
  Bolt,
  Snowflake,
  Umbrella,
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import type { Widget } from '../types/types';

const WeatherIcon = ({ condition }: { condition?: string }) => {
  const iconMap: Record<string, JSX.Element> = {
    Clear: <Sun className="h-8 w-8 text-yellow-400" />,
    'Partly cloudy': <CloudSun className="h-8 w-8 text-yellow-300" />,
    Cloudy: <Cloud className="h-8 w-8 text-gray-400" />,
    Fog: <CloudFog className="h-8 w-8 text-gray-300" />,
    'Light drizzle': <CloudRain className="h-8 w-8 text-blue-300" />,
    'Moderate drizzle': <CloudRain className="h-8 w-8 text-blue-400" />,
    'Dense drizzle': <CloudRain className="h-8 w-8 text-blue-500" />,
    'Freezing drizzle': <CloudSnow className="h-8 w-8 text-blue-200" />,
    'Light rain': <Umbrella className="h-8 w-8 text-blue-400" />,
    'Moderate rain': <Umbrella className="h-8 w-8 text-blue-500" />,
    'Heavy rain': <Umbrella className="h-8 w-8 text-blue-600" />,
    'Light snow': <Snowflake className="h-8 w-8 text-blue-200" />,
    'Moderate snow': <Snowflake className="h-8 w-8 text-blue-300" />,
    'Heavy snow': <Snowflake className="h-8 w-8 text-blue-400" />,
    'Snow grains': <Snowflake className="h-8 w-8 text-blue-200" />,
    'Rain showers': <CloudRain className="h-8 w-8 text-blue-400" />,
    Thunderstorm: <Bolt className="h-8 w-8 text-yellow-500" />,
    'Thunderstorm with hail': <Bolt className="h-8 w-8 text-yellow-600" />,
  };

  return condition ? iconMap[condition] : <Cloudy className="h-8 w-8 text-gray-400" />;
};

export default function WeatherWidget({
  widget,
  onDelete,
}: {
  widget: Widget;
  onDelete: (id: string) => void;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(widget._id);
    } finally {
      setIsDeleting(false);
    }
  };

  // To FormatTime correctly based on each city timezone
  // OpenMateoAPI - time deliver -2hour diff -- `timezone: auto`
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Berlin',
    });
  };

  return (
    <Card className="relative">
      <CardHeader className="flex flex-row justify-between items-center pb-2">
        <CardTitle className="capitalize flex items-center gap-2">
          <WeatherIcon condition={widget.weather?.conditions} />
          {widget.location}
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDelete}
          disabled={isDeleting}
          className="hover:bg-destructive/10"
        >
          {isDeleting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Trash2 className="w-4 h-4 text-destructive" />
          )}
        </Button>
      </CardHeader>

      <CardContent className="pt-0">
        {widget.weather ? (
          <div className="space-y-3">
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold">{widget.weather.temperature}°C</span>
              <span className="text-muted-foreground pb-1">{widget.weather.conditions}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Updated: {formatTime(widget.weather.time)}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Loading weather...</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
