export function formatDailyForecast(forecastList) {
    const grouped = {};

    forecastList.forEach((entry) => {
        const date = entry.dt_txt.split(" ")[0];
        if (!grouped[date]) grouped[date] = [];
        grouped[date].push(entry);
    });

    const daily = Object.entries(grouped).map(([date, entries]) => {
        // Prefer 12:00 PM entry if available, else pick middle one
        const noonEntry = entries.find(e => e.dt_txt.includes("12:00:00"));
        const fallbackEntry = entries[Math.floor(entries.length / 2)];
        return {
            date,
            entry: noonEntry || fallbackEntry
        };
    });

    return daily.slice(0, 5); // Limit to 5 days
}
