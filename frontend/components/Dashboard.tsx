import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';
import { fetchWidgets, createWidget, fetchWeather, deleteWidget } from '../pages/api/api';
import type { Widget } from '../types/types';
import { Alert, AlertDescription } from './ui/alert';
import { AddWidgetForm } from './AddWidgetForm';
import WeatherWidget from './WeatherWidget';

export default function Dashboard() {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    let isMounted = true; // Track component mount state

    const loadData = async () => {
      try {
        const widgetsData = await fetchWidgets();
        if (isMounted) {
          const widgetsWithWeather = await Promise.all(
            widgetsData.map(async (widget) => {
              try {
                const weather = await fetchWeather(widget._id);
                return { ...widget, weather };
              } catch (error) {
                console.error(`Failed to fetch weather for ${widget.location}:`, error);
                return { ...widget };
              }
            })
          );
          setWidgets(widgetsWithWeather);
        }
      } catch (error) {
        if (isMounted) {
          toast.error('Failed to load widgets');
          console.error('Widget data fetch error:', error);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadData();

    // Set up 1-minute refresh
    const interval = setInterval(loadData, 30000);

    // Cleanup
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const handleAddWidget = async (location: string) => {
    setIsAdding(true);
    try {
      const newWidget = await createWidget(location);
      const weather = await fetchWeather(newWidget?._id);
      setWidgets([...widgets, { ...newWidget, weather }]);
      toast.success(`${location} widget added successfully`);
    } catch (error) {
      toast.error('Failed to add widget');
      console.error('Failed to add widget:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteWidget = async (id: string) => {
    try {
      await deleteWidget(id);
      setWidgets(widgets.filter((widget) => widget._id !== id));
      toast.success('Widget deleted successfully');
    } catch (error) {
      toast.error('Failed to delete widget');
      console.error('Failed to delete widget:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Weather Dashboard</h1>
          <AddWidgetForm
            onAdd={handleAddWidget}
            isLoading={isAdding}
            usedLocations={widgets.map((w) => w.location)}
          />
        </div>

        {widgets.length === 0 ? (
          <Alert className="max-w-md mx-auto">
            <AlertDescription>No widgets yet. Add one to get started!</AlertDescription>
          </Alert>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {widgets.map((widget) => (
              <WeatherWidget key={widget._id} widget={widget} onDelete={handleDeleteWidget} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
