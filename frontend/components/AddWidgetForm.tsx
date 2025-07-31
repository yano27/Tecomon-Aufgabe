'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { Loader2, Plus } from 'lucide-react';

const LOCATIONS = [
  'berlin',
  'hamburg',
  'paris',
  'jakarta',
  'tokyo',
  'new_york',
  'karlsruhe',
  'pforzheim',
  'korntal-muenchingen',
];

interface AddWidgetFormProps {
  onAdd: (location: string) => void;
  isLoading?: boolean;
  usedLocations: string[];
}

export function AddWidgetForm({ onAdd, isLoading, usedLocations }: AddWidgetFormProps) {
  const [location, setLocation] = useState('');
  const [open, setOpen] = useState(false);
  const availableLocations = LOCATIONS.filter((loc) => !usedLocations.includes(loc));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location) {
      onAdd(location);
      setLocation('');
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Widget
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Weather Widget</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">
              Location
            </Label>
            <Select value={location} onValueChange={setLocation} required>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a location" />
              </SelectTrigger>
              <SelectContent>
                {availableLocations.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc.charAt(0).toUpperCase() + loc.slice(1)}
                  </SelectItem>
                ))}
                {availableLocations.length === 0 && (
                  <p className="col-span-3 text-sm text-muted-foreground">All locations added.</p>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !location}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                'Add Widget'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
