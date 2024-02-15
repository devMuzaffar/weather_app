import Temp from "./components/Temp";
import { WeatherContext } from "./context/weatherContext";
import { useContext, useEffect, useState } from "react";

const App = () => {
  const { weatherBg } = useContext(WeatherContext);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    setIsChanged(true);
  }, [weatherBg]);

  const Video = ({ link }) => (
    <video className={`videoBg ${isChanged && "fade"}`} loop autoPlay muted>
      <source src={`./assets/${link}.mp4`} />
    </video>
  );

  return (
    <div className="mainContainer">
      {weatherBg && <Video link={weatherBg} />}
      <Temp />
    </div>
  );
};

export default App;