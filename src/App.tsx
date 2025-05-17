import styles from "./App.module.css";
import Form from "./components/form/Form";
import useWeather from "./components/hooks/useWeather";

function App() {
  const { fetchWeather } = useWeather();
  return (
    <>
      <h1 className={styles.title}>Buscador de clima</h1>

      <div className={styles.container}>
        <Form fetchWeather={fetchWeather} />

        <p>Información del clima</p>
      </div>
    </>
  );
}

export default App;
