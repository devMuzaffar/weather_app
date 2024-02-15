import { useEffect, useState, useContext } from "react";
import { WeatherContext } from "../context/weatherContext";

const WeatherCard = ({ tempInfo }) => {
  const [weatherState, setWeatherState] = useState("");
  const [isAnimated, setIsAnimated] = useState(false);
  const { setWeatherBg } = useContext(WeatherContext);

  const {
    temp,
    humidity,
    pressure,
    weathermood,
    name,
    speed,
    country,
    sunset,
  } = tempInfo;

  useEffect(() => {
    // Change the weather Icon
    if (weathermood) {
      switch (weathermood) {
        case "Clouds":
          setWeatherState("wi-day-cloudy");
          break;
        case "Haze":
          setWeatherState("wi-fog");
          break;
        case "Clear":
          setWeatherState("wi-day-sunny");
          break;
        case "Smoke":
          setWeatherState("wi-smoke");
          break;
        case "Rain":
          setWeatherState("wi-rain");
          break;
        default:
          setWeatherState("wi-day-sunny");
          break;
      }
      setWeatherBg(weathermood);
    }
  }, [weathermood]);

  // Trigger animation on every Data Change
  useEffect(() => {
    setIsAnimated(true);
    setTimeout(() => {
      setIsAnimated(false);
    }, 3000);
  }, [tempInfo]);

  // Convert Unix Timestamp into 12 Hour Format
  function convertTime(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const timeString = `${formattedHours}:${formattedMinutes} ${period}`;
    return timeString;
  }

  const currentTime = () => {
    const dateOptions = { year: "numeric", month: "numeric", day: "numeric" };
    const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };
    const formattedDateTime = new Date().toLocaleString(undefined, {
      ...dateOptions,
      ...timeOptions,
    });
    return formattedDateTime;
  };

  return (
    <>
      <article className={`widget ${isAnimated && "animation"}`}>
        <div className="weatherIcon">
          <i className={`wi ${weatherState}`}></i>
        </div>

        <div className="weatherInfo">
          <div className="temperature">
            <span>{Math.trunc(temp)}&deg;c</span>
          </div>

          <div className="description">
            <div className="weatherCondition">{weathermood}</div>
            <div className="place">
              {name}, {country}
            </div>
          </div>
        </div>

        <div className="date">{currentTime()}</div>

        {/* our 4 Column Section */}
        <div className="extra-temp">
          <div className="temp-info-minmax">
            <div className="two-sided-section">
              <p>
                <i className="wi wi-sunset"></i>
              </p>
              <p className="extra-info-leftside">
                {convertTime(sunset)} <br /> Sunset
              </p>
            </div>

            <div className="two-sided-section">
              <p>
                <i className="wi wi-humidity"></i>
              </p>
              <p className="extra-info-leftside">
                {humidity} <br /> Humidity
              </p>
            </div>
          </div>

          <div className="weather-extra-info">
            <div className="two-sided-section">
              <p>
                <i className="wi wi-rain"></i>
              </p>
              <p className="extra-info-leftside">
                {pressure} <br /> Pressure
              </p>
            </div>

            <div className="two-sided-section">
              <p>
                <i className="wi wi-strong-wind"></i>
              </p>
              <p className="extra-info-leftside">
                {speed} <br /> Speed
              </p>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default WeatherCard;
