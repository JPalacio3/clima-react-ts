import Alert from "./Alert/Alert";
import styles from "./App.module.css";
import Form from "./components/form/Form";
import Spinner from "./components/Spinner/Spinner";
import useWeather from "./hooks/useWeather";
import WeatherDetail from "./WeatherDetail/WeatherDetail";

function App() {
  const { weather, loading, notFount, fetchWeather, hasWeatherData } =
    useWeather();
  return (
    <>
      <h1 className={styles.title}>Buscador de clima</h1>

      <div className={styles.container}>
        <Form fetchWeather={fetchWeather} />
        {loading && <Spinner />}

        {hasWeatherData && <WeatherDetail weather={weather} />}

        {notFount && <Alert>Ciudad no encontrada</Alert>}
      </div>
    </>
  );
}

export default App;
