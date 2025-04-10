import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCurrentWeather, fetchForecast } from '../services/weatherService';

// Helper function to extract daily forecast
const extractDailyForecast = (data) => {
    const map = new Map();
    data.forEach((entry) => {
        const date = entry.dt_txt.split(" ")[0];
        const time = entry.dt_txt.split(" ")[1];
        if (!map.has(date) || time === "12:00:00") {
            map.set(date, entry);
        }
    });
    return Array.from(map.values()).slice(0, 5);
};

// Async thunk for fetching weather data
export const fetchWeatherData = createAsyncThunk(
    'weather/fetchWeatherData',
    async (city, { rejectWithValue }) => {
        try {
            const currentData = await fetchCurrentWeather(city);
            const forecastData = await fetchForecast(city);
            const dailyForecast = extractDailyForecast(forecastData.list);
            return { currentWeather: currentData, forecast: dailyForecast, city };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Create slice
const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        city: '',
        currentWeather: null,
        forecast: [],
        loading: false,
        error: null,
    },
    reducers: {
        setCity: (state, action) => {
            state.city = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeatherData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWeatherData.fulfilled, (state, action) => {
                state.loading = false;
                state.currentWeather = action.payload.currentWeather;
                state.forecast = action.payload.forecast;
                state.city = action.payload.city;
            })
            .addCase(fetchWeatherData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch weather data';
            });
    },
});

export const { setCity, clearError } = weatherSlice.actions;
export default weatherSlice.reducer;