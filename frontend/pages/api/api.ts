import { WeatherData, Widget } from '@/types/types';

export const fetchWidgets = async (): Promise<Widget[]> => {
  const res = await fetch('/api/widgets');
  return await res.json();
};

export const createWidget = async (location: string): Promise<Widget> => {
  const res = await fetch('/api/widgets', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ location }),
  });
  return await res.json();
};

export const fetchWeather = async (widgetId: string): Promise<WeatherData> => {
  const res = await fetch(`/api/widgets/${widgetId}/weather`);
  return await res.json();
};

export const deleteWidget = async (id: string): Promise<void> => {
  await fetch(`/api/widgets/${id}`, {
    method: 'DELETE'
  });
};
