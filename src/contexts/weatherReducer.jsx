export const initialState = {
  city: "",
  units: "metric",
  currentWeather: null,
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
          currentWeather: action.currentWeather,
          forecast: action.forecast,
          error: "",
      };
      case "SET_ERROR":
      return {
          ...state,
          loading: false,
          currentWeather: null,
          forecast: null,
          error: action.error,
      };
      case "SET_CITY":
      return { ...state, city: action.city };
      case "SET_UNITS":
      return { ...state, units: action.units };
      case "SET_LANGUAGE":
      return { ...state, language: action.language };
      default:
      return state;
  }
};
  