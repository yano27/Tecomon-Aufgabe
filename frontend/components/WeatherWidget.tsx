import { Widget } from '../types/types';
import { Loader2, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

export default function WeatherWidget({
  widget,
  onDelete,
}: {
  widget: Widget;
  onDelete: (id: string) => void;
}) {
  console.log(widget)
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(widget._id);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="capitalize">{widget.location}</CardTitle>
        <Button variant="ghost" size="icon" onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Trash2 className="w-4 h-4 text-destructive" />
          )}
        </Button>
      </CardHeader>
      <CardContent>
        {widget.weather ? (
          <div className="space-y-2">
            <div className="text-4xl font-bold">{widget.weather.temperature}°C</div>
            <div className="text-muted-foreground">{widget.weather.conditions}</div>
            <div className="text-sm text-muted-foreground">
              Updated: {new Date(widget.weather.time).toLocaleTimeString()}
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
