import { useState, useEffect } from 'react';
import { fetchWidgets, createWidget, fetchWeather, deleteWidget } from '../utils/api';
import type { Widget } from '../types/types';
import WeatherWidget from '../components/WeatherWidget';
import AddWidgetForm from '../components/AddWidgetForm';

export default function Dashboard() {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const widgetsData = await fetchWidgets();
        const widgetsWithWeather = await Promise.all(
          widgetsData.map(async (widget) => ({
            ...widget,
            weather: await fetchWeather(widget._id),
          }))
        );
        setWidgets(widgetsWithWeather);
      } catch (error) {
        console.error('Failed to load widgets:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
    const interval = setInterval(loadData, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const handleAddWidget = async (location: string) => {
    const newWidget = await createWidget(location);
    const weather = await fetchWeather(newWidget._id);
    setWidgets([...widgets, { ...newWidget, weather }]);
  };

  const handleDeleteWidget = async (id: string) => {
    try {
      await deleteWidget(id);
      setWidgets(widgets.filter((widget) => widget._id !== id));
    } catch (error) {
      console.error('Failed to delete widget:', error);
    }
  };

  if (loading) return <div className="p-8">Loading dashboard...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Weather Dashboard</h1>

        <AddWidgetForm onAdd={handleAddWidget} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {widgets.map((widget) => (
            <WeatherWidget key={widget._id} widget={widget} onDelete={handleDeleteWidget} />
          ))}
        </div>

        {widgets.length === 0 && (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500">No widgets yet. Add one to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}
