import axios from 'axios';
import { clearLocationCache, weatherCache } from '../cache/weatherCache';
import { Widget } from '../models/Widget';

interface WeatherData {
  temperature: number;
  time: string;
  conditions: string;
}

const CACHE_TTL = 300;

export async function getWeather(location: string): Promise<WeatherData> {
  const cacheKey = location.toLowerCase();
  const cachedData = weatherCache.get<WeatherData>(cacheKey);
  if (cachedData) {
    console.log('Returning cached data for', location);
    return cachedData;
  }
  try {
    const { lat, lon } = getCoordinates(location);

    const response = await axios.get(`https://api.open-meteo.com/v1/forecast`, {
      params: {
        latitude: lat,
        longitude: lon,
        current_weather: true,
        timezone: 'auto',
      },
    });

    const weatherData: WeatherData = {
      temperature: response.data.current_weather.temperature,
      time: response.data.current_weather.time,
      conditions: parseWeatherCode(response.data.current_weather.weathercode),
    };

    weatherCache.set(location, weatherData, CACHE_TTL);
    console.log('Cached fresh data for', location);
    return weatherData;
  } catch (error) {
    console.error('Weather API error:', error);
    weatherCache.set(location, { error: 'Service unavailable' }, 60);
    throw error;
  }
}

export async function getWidgets() {
  return Widget.find().sort({ createdAt: -1 });
}

export async function createWidget(location: string) {
  const widget = new Widget({ location });
  return await widget.save();
}

export async function deleteWidget(id: string) {
  const widget = await Widget.findById(id);
  if (!widget) return null;

  clearLocationCache(widget.location);
  return Widget.findByIdAndDelete(id);
}

// Helper functions
function getCoordinates(location: string) {
  const locations: Record<string, { lat: number; lon: number }> = {
    berlin: { lat: 52.52, lon: 13.41 },
    hamburg: { lat: 53.55, lon: 9.99 },
    paris: { lat: 48.85, lon: 2.35 },
    jakarta: { lat: -6.21, lon: 106.85 },
    tokyo: { lat: 35.68, lon: 139.76 },
    new_york: { lat: 40.71, lon: -74.01 },
    karlsruhe: { lat: 49.01, lon: 8.4 },
    pforzheim: { lat: 48.89, lon: 8.7 },
    'korntal-muenchingen': { lat: 48.83, lon: 9.1 },
  };
  return locations[location.toLowerCase()] || locations.berlin;
}

function parseWeatherCode(code: number): string {
  const codes: Record<number, string> = {
    0: 'Clear',
    1: 'Partly cloudy',
    2: 'Partly cloudy',
    3: 'Partly cloudy',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    56: 'Light freezing drizzle',
    57: 'Dense freezing drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Light freezing rain',
    67: 'Heavy freezing rain',
    71: 'Slight snowfall',
    73: 'Moderate snowfall',
    75: 'Heavy snowfall',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm: Slight or moderate',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail',
  };
  return codes[code] || 'Unknown';
}
