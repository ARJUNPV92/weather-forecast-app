// src/services/weatherService.ts
import { axiosClient } from '../utils/axiosClient';
import { config } from '../config';
import { LocationQuery } from '../types/weatherType';

const buildParams = (query: LocationQuery) => {
    const { city, lat, lon } = query;
    const params: any = {
        appid: config.openWeatherApiKey,
        units: 'metric'
    };
    if (lat && lon) {
        params.lat = lat;
        params.lon = lon;
    } else if (city) {
        params.q = city;
    }
    return params;
};

export const getCurrentWeather = async (query: LocationQuery) => {
    const response = await axiosClient.get('/weather', {
        params: buildParams(query)
    });
    return response.data;
};

export const getForecast = async (query: LocationQuery) => {
    const response = await axiosClient.get('/forecast', {
        params: buildParams(query)
    });
    return response.data;
};