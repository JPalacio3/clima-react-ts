import styles from "./App.module.css";
import Form from "./components/form/Form";
import useWeather from "./components/hooks/useWeather";
import WeatherDetail from "./WeatherDetail/WeatherDetail";

function App() {
  const { weather, fetchWeather } = useWeather();
  return (
    <>
      <h1 className={styles.title}>Buscador de clima</h1>

      <div className={styles.container}>
        <Form fetchWeather={fetchWeather} />

        <div className={styles.weather}>
          <WeatherDetail />
        </div>
      </div>
    </>
  );
}

export default App;
