# 🌦️ Weather Forecast Web Application

A full-stack weather forecast web application that allows users to search for a city and view both the current weather and a 5-day forecast. Built using **React**, **Redux Toolkit**, **Node.js**, and **Express**, this app integrates with the **OpenWeatherMap API** for real-time weather data.

---

## 📁 Project Structure

weather-forecast-app/ ├── client/ # Frontend (React + Redux Toolkit + Tailwind CSS) └── server/ # Backend (Node.js + Express)


---

## 🔧 Tech Stack & Tools

**Frontend:**
- React
- Redux Toolkit (for state management)
- Axios or Fetch API (for API communication)
- Tailwind CSS (for styling)

**Backend:**
- Node.js
- Express.js

**Third-Party API:**
- OpenWeatherMap API → https://openweathermap.org/api

---

## 🚀 Features

### Frontend (React):
- 🔍 Search bar to enter a city name.
- 🌡️ Display current weather including temperature, humidity, etc.
- 📅 Show 5-day weather forecast.
- 🎛️ Use Redux Toolkit to manage API data.
- ⚠️ Error handling for invalid or empty city inputs.

### Backend (Node.js & Express):
- 📡 Endpoints:
  - `GET /weather?city={cityName}` – Fetch current weather.
  - `GET /forecast?city={cityName}` – Fetch 5-day forecast.
- 🛠️ Graceful error handling for city not found or API errors.

---

## 🧪 Getting Started

### 📦 Prerequisites:
- Node.js installed
- npm (or yarn)

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/weather-forecast-app.git
cd weather-forecast-app
