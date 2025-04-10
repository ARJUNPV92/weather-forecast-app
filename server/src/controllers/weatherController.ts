import { Request, Response } from 'express';
import { getCurrentWeather, getForecast } from '../services/weatherService';
import { LocationQuery } from '../types/weatherType';

const validateQuery = (req: Request): LocationQuery | null => {
    const { city, lat, lon } = req.query;
    if ((lat && lon) || city) {
        return { city: city as string, lat: lat as string, lon: lon as string };
    }
    return null;
};

export const fetchCurrentWeather = async (req: Request, res: Response) => {
    const query = validateQuery(req);
    if (!query) return res.status(400).json({ error: 'Provide city or lat & lon parameters' });

    try {
        const data = await getCurrentWeather(query);

        // Handle invalid city responses
        if (!data || data.cod === '404' || data.message === 'city not found') {
            return res.status(404).json({ error: 'Location not found' });
        }

        res.json(data);
    } catch (error: any) {
        const status = error?.response?.status || 500;
        const message = status === 404 ? 'Location not found' : 'Failed to fetch weather';
        res.status(status).json({ error: message });
    }
};

export const fetchForecast = async (req: Request, res: Response) => {
    const query = validateQuery(req);
    if (!query) return res.status(400).json({ error: 'Provide city or lat & lon parameters' });

    try {
        const data = await getForecast(query);

        // Handle invalid city responses
        if (!data || data.cod === '404' || data.message === 'city not found') {
            return res.status(404).json({ error: 'Location not found' });
        }

        res.json(data);
    } catch (error: any) {
        const status = error?.response?.status || 500;
        const message = status === 404 ? 'Location not found' : 'Failed to fetch forecast';
        res.status(status).json({ error: message });
    }
};
