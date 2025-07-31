import { Request, Response } from 'express';
import { Widget } from '../models/Widget';
import * as widgetService from '../services/weather';

// Get all widgets
export const getWidgets = async (_req: Request, res: Response) => {
  try {
    const widgets = await widgetService.getWidgets();
    res.status(200).json(widgets);
  } catch (err) {
    res.status(500).json({
      message: 'Failed to fetch widgets',
      error: err instanceof Error ? err.message : 'Unknown error',
    });
  }
};

// Create a new widget
export const createWidget = async (req: Request, res: Response) => {
  const { location } = req.body;

  if (!location || typeof location !== 'string') {
    return res.status(400).json({ message: 'Location must be a string' });
  }

  try {
    const savedWidget = await widgetService.createWidget(location);
    res.status(201).json(savedWidget);
  } catch (err) {
    res.status(500).json({
      message: 'Failed to create widget',
      error: err instanceof Error ? err.message : 'Unknown error',
    });
  }
};

export const deleteWidget = async (req: Request, res: Response) => {
  try {
    const deletedWidget = await widgetService.deleteWidget(req.params.id);
    if (!deletedWidget) {
      return res.status(404).json({ message: 'Widget not found' });
    }
    res.status(200).json({ message: 'Widget deleted successfully' });
  } catch (err) {
    res.status(500).json({
      message: 'Failed to delete widget',
      error: err instanceof Error ? err.message : 'Unknown error',
    });
  }
};

export const getWidgetWithWeather = async (req: Request, res: Response) => {
  try {
    const widget = await Widget.findById(req.params.id);
    if (!widget) return res.status(404).json({ message: 'Widget not found' });

    const weather = await widgetService.getWeather(widget.location);
    res.json({ ...widget.toObject(), ...weather });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching weather data' });
  }
};
