import axios from 'axios';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 300 }); // 5-minute cache

interface WeatherData {
  temperature: number;
  time: string;
  conditions: string;
}

export async function getWeather(location: string): Promise<WeatherData> {
  const cached = cache.get<WeatherData>(location);
  if (cached) return cached;

  // Use Open-Meteo API (no key required)
  const response = await axios.get(`https://api.open-meteo.com/v1/forecast`, {
    params: {
      latitude: getCoordinates(location).lat,
      longitude: getCoordinates(location).lon,
      current_weather: true,
    },
  });

  const weatherData: WeatherData = {
    temperature: response.data.current_weather.temperature,
    time: response.data.current_weather.time,
    conditions: parseWeatherCode(response.data.current_weather.weathercode),
  };

  cache.set(location, weatherData);
  return weatherData;
}

// Helper functions
function getCoordinates(location: string) {
  const locations: Record<string, { lat: number; lon: number }> = {
    berlin: { lat: 52.52, lon: 13.41 },
    hamburg: { lat: 53.55, lon: 9.99 },
    paris: { lat: 48.85, lon: 2.35 },
  };
  return locations[location.toLowerCase()] || locations.berlin;
}

function parseWeatherCode(code: number): string {
  const codes: Record<number, string> = {
    0: 'Clear',
    1: 'Partly cloudy',
  };
  return codes[code] || 'Unknown';
}
