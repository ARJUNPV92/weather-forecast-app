import { useState } from "react";
import { Input } from "./components/ui/Input";
import { Button } from "./components/ui/Button";
import WeatherCard from "./components/WeatherCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherData, setCity, clearError } from "./store/weatherSlice";

const App = () => {
  const [localCity, setLocalCity] = useState("");
  const dispatch = useDispatch();
  const weatherState = useSelector((state) => state.weather);
  const { city, currentWeather, forecast, loading, error } = weatherState;

  const handleFetchWeather = () => {
    if (!localCity.trim()) return;
    dispatch(setCity(localCity));
    dispatch(fetchWeatherData(localCity));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleFetchWeather();
    }
  };

  const getDayLabel = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";

    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-blue-100 to-blue-200 text-gray-800">
      <div className="max-w-xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center">Weather Forecast App</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <span className="block sm:inline">{error}</span>
            <button
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
              onClick={() => dispatch(clearError())}
            >
              ×
            </button>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Enter city name"
            value={localCity}
            onChange={(e) => setLocalCity(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button
            onClick={handleFetchWeather}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Search'}
          </Button>
        </div>

        {currentWeather && (
          <div className="flex gap-4 overflow-x-auto pb-2">
            <WeatherCard
              title="Current Weather"
              data={currentWeather}
              isCurrent
            />
          </div>
        )}

        {forecast.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-1">
              5-Day Forecast
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Upcoming weather trend for <span className="font-medium">{city}</span>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {forecast.map((entry) => {
                const label = getDayLabel(entry.dt_txt);
                return (
                  <div
                    key={entry.dt}
                    className="bg-white rounded-2xl shadow-md p-4 text-center"
                  >
                    <div className="text-md font-semibold text-gray-700 mb-1">
                      {label}
                    </div>
                    <img
                      src={`http://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png`}
                      alt={entry.weather[0].description}
                      className="mx-auto w-14 h-14"
                    />
                    <div className="text-xl font-bold text-blue-600">
                      {Math.round(entry.main.temp)}°C
                    </div>
                    <div className="text-sm text-gray-500 capitalize">
                      {entry.weather[0].description}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;