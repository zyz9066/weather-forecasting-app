const API_BASE = "https://api.openweathermap.org/data/2.5";

const getCurrentWeather = async (city, units, language, apiKey) => {
  const url = `${API_BASE}/weather?q=${encodeURIComponent(
    city
  )}&units=${units}&lang=${language}&appid=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch weather");
  return data;
}

const getForecast = async (city, units, language, apiKey) => {
  const url = `${API_BASE}/forecast?q=${encodeURIComponent(
    city
  )}&units=${units}&lang=${language}&appid=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch forecast");
  return data;
}

export { getCurrentWeather, getForecast };