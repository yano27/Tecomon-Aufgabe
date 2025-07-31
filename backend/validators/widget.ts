import { NextFunction, Request, Response } from 'express';

export const validateWidget = (req: Request, res: Response, next: NextFunction) => {
  const { location } = req.body;

  if (!location || typeof location !== 'string') {
    return res.status(400).json({ message: 'Invalid location' });
  }

  const validLocations = ['berlin', 'hamburg', 'paris'];
  if (!validLocations.includes(location.toLowerCase())) {
    return res.status(400).json({
      message: 'Unsupported location',
      validLocations,
    });
  }

  next();
};
