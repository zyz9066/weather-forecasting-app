const API_BASE = "https://api.openweathermap.org/data/2.5";

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) {
    const error = new Error(data.message || "Request failed");
    error.status = res.status;
    throw error;
  }
  return data;
};

const getWeatherByCity = async (city, units, language, apiKey) => {
  const url = `${API_BASE}/weather?q=${encodeURIComponent(city)}&units=${units}&lang=${language}&appid=${apiKey}`;
  const res = await fetch(url);
  return handleResponse(res);
}

const getForecastByCity = async (city, units, language, apiKey) => {
  const url = `${API_BASE}/forecast?q=${encodeURIComponent(city)}&units=${units}&lang=${language}&appid=${apiKey}`;
  const res = await fetch(url);
  return handleResponse(res);
}

const getWeatherByCoords = async (lat, lon, units, language, apiKey) => {
  const url = `${API_BASE}/weather?lat=${lat}&lon=${lon}&units=${units}&lang=${language}&appid=${apiKey}`;
  const res = await fetch(url);
  return handleResponse(res);
}

const getForecastByCoords = async (lat, lon, units, language, apiKey) => {
  const url = `${API_BASE}/forecast?lat=${lat}&lon=${lon}&units=${units}&lang=${language}&appid=${apiKey}`;
  const res = await fetch(url);
  return handleResponse(res);
}

export { getWeatherByCity, getForecastByCity, getWeatherByCoords, getForecastByCoords };