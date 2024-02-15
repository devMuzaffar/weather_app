import WeatherCard from "./WeatherCard";
import { useState } from "react";
import "./style.css";

const Temp = () => {
  const [searchValue, setSearchValue] = useState("");
  const [tempInfo, setTempInfo] = useState({});
  const [isSearched, setIsSearched] = useState(false);

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=f812f8a1a2e2556ae5e203837346bfd8`;

      const res = await fetch(url);
      const data = await res.json();
      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };
      setTempInfo(myNewWeatherInfo);
      setIsSearched(true);
      setSearchValue("");
    } catch (error) {
      alert("Invalid Input!");
    }
  };

  return (
    <>
      <div className="wrap">

        {/* Logo */}
        <div
          className="weatherLogo"
          style={{
            display: isSearched && "none",
          }}
        >
          <img
            src="https://icons.iconarchive.com/icons/dtafalonso/win-10x/512/Weather-icon.png" width={'100%'} height={'100%'}
            alt="Logo"
          />
        </div>

        <div className="search">
          <input
            type="text"
            placeholder="Search ..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />

          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            Search
          </button>
        </div>

        {/* Our Temp Card */}
        {isSearched && <WeatherCard tempInfo={tempInfo} />}
      </div>
    </>
  );
};

export default Temp;
