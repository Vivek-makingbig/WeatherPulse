# WeatherPulse – Real-Time Weather Dashboard

WeatherPulse is a modern, responsive weather dashboard built using React.js that provides real-time weather information, hourly forecasts, daily predictions, air quality information, and detailed atmospheric insights for any searched city.

The application presents weather information through an intuitive dashboard with a clean user interface, making it easy to understand current weather conditions and upcoming forecasts.

---

##  Features

- **City-Based Weather Search:** Search for any city to retrieve its latest weather information.
- **Current Weather:** Displays current temperature, weather conditions, and other essential weather details.
- **Weather Highlights:** Provides important atmospheric measurements and weather-related statistics.
- **Hourly Forecast:** Displays upcoming hourly weather predictions.
- **Daily Forecast:** Provides a 5-day weather forecast to help users understand upcoming weather conditions.
- **Air Quality Information:** Displays air quality information alongside other weather statistics.
- **Loading State:** Provides visual feedback while weather information is being fetched.
- **Error Handling:** Handles invalid city names and API request failures gracefully.
- **Responsive Dashboard:** Organizes weather information into a structured dashboard layout.

---

##  Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend UI development |
| JavaScript (ES6+) | Application logic and asynchronous operations |
| HTML5 | Application structure |
| CSS3 | Styling and responsive layouts |
| React Hooks | State management and performance optimization |
| Weather API | Fetching real-time weather and forecast information |
| Vite | Development server and build tooling |

---

##  Project Architecture

WeatherPulse follows a **component-based architecture**. The application is divided into independent, reusable components, each responsible for displaying a specific section of the weather dashboard.

The application also separates API communication from UI components, making the code easier to maintain, test, and extend.

### Architecture Overview

```text
                  USER
                    |
                    v
              SearchBar.jsx
                    |
                    v
               App.jsx
           (Application Controller)
                    |
                    v
             weatherApi.js
           (API Communication)
                    |
                    v
              Weather API
                    |
                    v
             Weather Response
                    |
                    v
              App.jsx
          (State Management)
                    |
          +---------+---------+
          |         |         |
          v         v         v
       Current   Highlights  Hourly
       Weather               Forecast
          |         |         |
          +---------+---------+
                    |
          +---------+---------+
          |                   |
          v                   v
     Daily Forecast        ExtraInfo
          |                   |
          +---------+---------+
                    |
                    v
             Weather Dashboard
```

### Architecture Explanation

**1. App.jsx – Main Application Controller**

`App.jsx` acts as the central controller of the application.

Its responsibilities include:

- Managing application-level states.
- Handling city search requests.
- Calling the weather API utility.
- Managing loading and error conditions.
- Passing the retrieved weather information to individual components.

It uses React Hooks:

- `useState`: Maintains weather data, loading status, and error messages.
- `useCallback`: Memoizes the search handler to avoid unnecessary function recreation.

**2. Components – User Interface Layer**

The application UI is divided into independent React components.

| Component | Responsibility |
|---|---|
| Header | Displays the application header and branding. |
| SearchBar | Accepts city names and initiates weather searches. |
| CurrentWeather | Displays current weather conditions. |
| Highlights | Displays important weather measurements. |
| HourlyForecast | Displays upcoming hourly forecasts. |
| DailyForecast | Displays daily weather predictions. |
| ExtraInfo | Displays additional information, including air quality. |

Each component receives the required information through React props.

This separation improves code reusability and makes individual components easier to maintain.

**3. API Layer – weatherApi.js**

The API utility is responsible for communicating with the external weather service.

Its main function is:

`fetchWeatherData(city)`

It accepts a city name, requests the corresponding weather information, and returns the processed response to the application.

Keeping API communication separate from UI components helps maintain a clean separation of concerns.

**4. State Management**

The application uses React's built-in state management through `useState`.

Three primary states control the application:

- `weatherData`: Stores the retrieved weather information.
- `isLoading`: Tracks whether an API request is currently running.
- `error`: Stores error messages when a request fails.

These states determine which section of the application should be displayed.

---

##  Project Structure

```text
WeatherPulse/
│
├── public/
│
├── src/
│   │
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── SearchBar.jsx
│   │   ├── CurrentWeather.jsx
│   │   ├── Highlights.jsx
│   │   ├── HourlyForecast.jsx
│   │   ├── DailyForecast.jsx
│   │   └── ExtraInfo.jsx
│   │
│   ├── utils/
│   │   └── weatherApi.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

### Directory Description

- `components/`: Contains reusable UI components responsible for different weather dashboard sections.
- `utils/`: Contains utility functions, including API communication.
- `App.jsx`: Main application component and central state manager.
- `App.css`: Contains application-level styling.
- `index.css`: Contains global styling and CSS configurations.
- `main.jsx`: React application entry point.
- `vite.config.js`: Vite development and build configuration.

---

## Application Workflow

The application follows a straightforward request-response workflow.

1. The user enters a city name in the search bar.
2. The SearchBar component triggers the `handleSearch()` function through the `onSearch` prop.
3. The application activates the loading state and clears any previous error.
4. The `fetchWeatherData(city)` function sends a request to the external weather API.
5. The API returns the requested weather information.
6. The application stores the response in `weatherData`.
7. React updates the UI and passes the relevant data to individual dashboard components.
8. If the request fails, the application displays an appropriate error message instead.

### Application State Flow

```text
       User Searches City
               |
               v
       setIsLoading(true)
               |
               v
       fetchWeatherData()
               |
          +----+----+
          |         |
       Success    Failure
          |         |
          v         v
    setWeatherData  setError
          |         |
          v         v
     Show Weather  Show Error
      Dashboard    Message
          |         |
          +----+----+
               |
               v
      setIsLoading(false)
```

---

## Installation and Setup

Follow these steps to run WeatherPulse locally.

### 1. Clone the Repository

```bash
git clone https://github.com/Vivek-makingbig/WeatherPulse.git
```

### 2. Navigate to the Project Directory

```bash
cd WeatherPulse
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure the Weather API

The application requires a weather API to retrieve current weather conditions and forecast information.

Configure your API credentials and endpoint inside:

```text
src/utils/weatherApi.js
```

If your API implementation uses environment variables, create a `.env` file in the project root and configure the required variables.

Never commit private API keys or credentials to a public GitHub repository.

### 5. Start the Development Server

```bash
npm run dev
```

Open the local URL provided by Vite in your browser.

### 6. Create a Production Build

```bash
npm run build
```

The optimized production files will be generated inside the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

---

##  Error and Loading Management

WeatherPulse handles different application states to provide a better user experience.

**Loading State**

While the API request is being processed, a loading spinner and message are displayed.

**Error State**

If the API request fails or the requested city cannot be retrieved, an error message is displayed instead of the dashboard.

**Success State**

When valid weather information is received, the dashboard is rendered with the latest available weather data.

**Welcome State**

Before the user searches for a city, the application displays a welcome screen explaining its functionality.

---

## API Integration and Data Handling

The application retrieves weather information through an external weather API.

The returned response is organized into different data sections:

| Data Object | Information |
|---|---|
| `current` | Current weather conditions and timezone information |
| `hourly` | Hourly weather forecast |
| `daily` | Daily weather forecast |
| `air_quality` | Air quality information |

These objects are passed to their respective components through props, allowing each component to display only the information it requires.

---

##  Deployment

WeatherPulse is live at : 


##  Learning Outcomes

Building WeatherPulse provides practical experience with:

- Component-based frontend architecture.
- React Hooks and functional components.
- State management using `useState`.
- Function memoization using `useCallback`.
- Asynchronous JavaScript and Promises.
- Fetching and handling external API data.
- Passing data between components using props.
- Conditional rendering in React.
- Error handling and loading states.
- Organizing and maintaining a scalable frontend codebase.

---

##  Future Improvements

Potential improvements for future versions include:

- Automatic weather detection using browser geolocation.
- Weather search suggestions and autocomplete.
- Temperature unit conversion (Celsius/Fahrenheit).
- Weather maps and radar visualization.
- Saved cities and search history.
- Weather alerts and notifications.
- Improved accessibility and mobile responsiveness.

---

##  Author

**Vivek Kumar Shaw**

B.Tech – Computer Science and Engineering (IoT)

GitHub: [Vivek-makingbig](https://github.com/Vivek-makingbig)

---

*WeatherPulse – Making weather information simple, accessible, and intuitive.*
