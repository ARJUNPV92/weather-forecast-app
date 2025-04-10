// src/components/WeatherCard.jsx
import "./WeatherCard.css";

export default function WeatherCard({ data, isForecast }) {
    const temp = data.main.temp.toFixed(1); // Assuming API returns Celsius
    const date = isForecast ? new Date(data.dt_txt).toLocaleString() : "";

    return (
        <div className="weather-card">
            {isForecast && <div className="forecast-date">{date}</div>}
            <h1 className="text-2xl font-bold mb-2">{data.name || "Forecast"}</h1>
            <p className="temp-highlight">🌡️ {temp}°C</p>
            <p>{data.weather[0].main} - {data.weather[0].description}</p>
            <p>💧 Humidity: {data.main.humidity}%</p>
            <p>🌬️ Wind: {data.wind.speed} m/s</p>
        </div>
    );
}
