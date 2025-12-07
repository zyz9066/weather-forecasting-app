export const initialState = {
  city: "",
  units: "metric",
  weather: null,
  forecast: null,
  loading: false,
  error: "",
  language: "en",
};
  
export const weatherReducer = (state, action) => {
  switch (action.type) {
      case "SET_LOADING":
        return { ...state, loading: true, error: "" };
      case "SET_WEATHER":
        return {
          ...state,
          loading: false,
          weather: action.payload.weather,
          forecast: action.payload.forecast,
          error: "",
        };
      case "SET_ERROR":
        return {
          ...state,
          loading: false,
          weather: null,
          forecast: null,
          error: action.payload,
        };
      case "SET_CITY":
        return { ...state, city: action.payload };
      case "SET_UNITS":
        return { ...state, units: action.payload };
      case "SET_LANGUAGE":
        return { ...state, language: action.payload };
      default:
        return state;
  }
};
  