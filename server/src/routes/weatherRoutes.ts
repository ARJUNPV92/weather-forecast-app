// src/routes/weatherRoutes.ts
import express from 'express';
import { fetchCurrentWeather, fetchForecast } from '../controllers/weatherController';
import { asyncHandler } from '../utils/asyncHandler';

const router = express.Router();

router.get('/weather', asyncHandler(fetchCurrentWeather));
router.get('/forecast', asyncHandler(fetchForecast));

export default router;
