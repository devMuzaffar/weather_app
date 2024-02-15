import { createContext, useState } from "react";

export const WeatherContext = createContext();

const WeatherContextProvider = ({ children }) => {
  // This Context is used to change the background based on weather mood
  const [weatherBg, setWeatherBg] = useState("");

  return (
    <WeatherContext.Provider value={{ weatherBg, setWeatherBg }}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherContextProvider;
