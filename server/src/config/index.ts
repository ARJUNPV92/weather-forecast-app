// File: src/config/index.ts
import dotenv from 'dotenv';
dotenv.config();

export const config = {
  openWeatherApiKey: process.env.OPENWEATHER_API_KEY,
  openWeatherBaseUrl: 'https://api.openweathermap.org/data/2.5'
};