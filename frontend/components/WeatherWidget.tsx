import { useState } from 'react';
import { Widget } from '../types/types';

interface Props {
  widget: Widget;
  onDelete: (id: string) => Promise<void>;
}

export default function WeatherWidget({ widget, onDelete }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(widget._id);
    } catch (error) {
      console.error('Failed to delete widget:', error);
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col">
      {isDeleting && (
        <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}

      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold capitalize">{widget.location}</h3>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className={`text-red-500 hover:text-red-700 ${isDeleting ? 'opacity-50' : ''}`}
          aria-label="Delete widget"
        >
          ✕
        </button>
      </div>

      {widget.weather ? (
        <div className="mt-4">
          <p className="text-4xl font-bold">{widget.weather.temperature}°C</p>
          <p className="text-gray-500">{widget.weather.conditions}</p>
          <p className="text-sm text-gray-400 mt-2">
            Updated: {new Date(widget.weather.time).toLocaleTimeString()}
          </p>
        </div>
      ) : (
        <p className="text-gray-500 mt-4">Loading weather...</p>
      )}
    </div>
  );
}
