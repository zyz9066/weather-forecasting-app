# Weather Forecasting App

A dynamic and visually appealing Weather Forecasting web app built with React and Material UI that fetches weather data from the free OpenWeatherMap API. Features include city search, unit toggling (°C/°F), multilingual support (English/French), light/dark theme toggle, geolocation-based weather, 5-day forecast display, and smooth user experience enhancements.

## Features

* Real-time weather data for any city using OpenWeatherMap's free API
* 5-day weather forecast with daily high/low temperatures and icons
* Toggle temperature units between Celsius and Fahrenheit
* Multilingual user interface (English / French)
* Geolocation support to fetch weather for current location
* Debounced search input to reduce API calls
* Responsive and accessible user interface with Material UI components
* Persistent user settings stored in localStorag
* Error handling with user-friendly error messages
* Clean and modular code using React Context, useReducer, and custom hooks

## Getting Started

### Prerequisites
* Node.js
* npm

### Installation

1. Clone the repository:
```
git clone https://github.com/your-username/weather-forecast-app.git
cd weather-forecast-app
```

2. Install dependencies:
```
npm install
```

3. Create a .env file in the root folder and add your OpenWeatherMap API key:
```
VITE_WEATHER_API_KEY=your_openweathermap_api_key
```
You can register for a free API key at https://openweathermap.org/api.

### Running the App
Start the development server:
```
npm run dev
```
Open http://localhost:5173/ in your browser to see the app.

## External Libraries and Frameworks

* React - Frontend framework for building UI components
* Material UI (MUI) - React component library implementing Google's Material Design with prebuilt components and theming
* @emotion/react & @emotion/styled - Styling solution used by MUI for the sx prop and styled components
* OpenWeatherMap API - Free API for current weather and 5-day forecast data
* React Context & useReducer - State management for global app state (weather data, units, language, theme)
* React Hooks - Including custom hooks for debounced searches and weather fetching

## Code Organization

```
src/
├── api/
│   └── weatherApi.js           # API fetch helpers for OpenWeatherMap endpoints
├── components/
│   ├── CurrentWeatherCard.jsx  # Displays current weather info with icons
│   ├── ErrorBanner.jsx         # Shows user-friendly error alerts
│   ├── ForecastCard.jsx        # Displays daily forecast card
│   ├── ForecastGrid.jsx        # Grid layout for the 5-day forecast
│   ├── LanguageToggle.jsx      # Toggle between English and French locales
│   ├── SearchBar.jsx           # Search input with debounced typing and geolocation 
│   └── UnitToggle.jsx          # Toggle between Celsius and Fahrenheit units
├── contexts/
│   ├── WeatherContext.jsx      # Context and provider for global weather state
│   ├── weatherActions.js       # Centralized action creators for state changes and API 
│   ├── weatherReducer.jsx      # Reducer logic for the weather context
│   └── weatherTranslations.jsx # Multilingual UI strings dictionary
├── hooks/
│   └── useWeatherSearch.js     # Custom hook for debounced city search and geolocation 
├── App.jsx                     # Main app component composing layout and orchestrating 
└── main.jsx                    # React app entry rendering providers and theme
```

## Notes

* The app saves user preferences (city, language, units) in localStorage so the app remembers settings on reload.
* API error handling distinguishes common cases like city not found, invalid API key, and rate limits.
* This project uses only the free OpenWeatherMap API tier and React ecosystem libraries, no paid dependencies.