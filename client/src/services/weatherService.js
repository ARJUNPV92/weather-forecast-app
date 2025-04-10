// src/services/weatherService.js

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchCurrentWeather = async (city) => {
    const res = await fetch(`${API_BASE_URL}/weather?city=${city}`);
    if (!res.ok) throw new Error("Failed to fetch current weather");
    return res.json();
};

export const fetchForecast = async (city) => {
    const res = await fetch(`${API_BASE_URL}/forecast?city=${city}`);
    if (!res.ok) throw new Error("Failed to fetch forecast");
    return res.json();
};
