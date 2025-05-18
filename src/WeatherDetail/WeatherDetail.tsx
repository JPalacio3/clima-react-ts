import { celsius } from "../helpers";
import type { Weather } from "../hooks/useWeather";
import styles from "./WeatherDetail.module.css";

type WeaterDetailProps = {
  weather: Weather;
};

export default function WeatherDetail({ weather }: WeaterDetailProps) {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
          alt={weather.weather[0].description}
        />
      </div>

      <h2 className={styles.name}> {weather.name}</h2>
      <p className={styles.current}>{celsius(weather.main.temp)} &deg;C</p>

      <div className={styles.temperatures}>
        <p>
          Mínima: <span>{celsius(weather.main.temp_min)} &deg;C</span>
        </p>

        <p>
          Máxima: <span>{celsius(weather.main.temp_max)} &deg;C</span>
        </p>
      </div>
    </div>
  );
}
