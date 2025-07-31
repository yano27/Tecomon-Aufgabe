import { Router } from 'express';
import { getWidgets, createWidget, deleteWidget, getWidgetWithWeather } from '../controllers/widgets';
import { validateWidget } from 'validators/widget';

const router = Router();

router.get('/', getWidgets);
router.get('/:id/weather', getWidgetWithWeather);
router.post('/', validateWidget, createWidget);
router.delete('/:id', deleteWidget);

export default router;
