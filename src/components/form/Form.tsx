import { useState, type ChangeEvent, type FormEvent, useMemo } from "react";
import { countries } from "../../data/countries";
import { citiesByCountry } from "../../data/citiesByCountry";
import styles from "./Form.module.css";
import type { SearchType } from "../../types/index";
import Alert from "../../Alert/Alert";

export default function Form({
  fetchWeather,
}: {
  fetchWeather: (search: SearchType) => Promise<void>;
}) {
  const [search, setSearch] = useState<SearchType>({
    city: "",
    country: "",
  });

  const [alert, setAlert] = useState("");

  const sortedCountries = useMemo(() => {
    return countries.slice().sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const cities = useMemo(() => {
    const list = citiesByCountry[search.country] || [];
    return list.slice().sort((a, b) => a.localeCompare(b));
  }, [search.country]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setSearch((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "country" ? { city: "" } : {}),
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(search).some((value) => value.trim() === "")) {
      setAlert("Todos los campos son obligatorios");
      return;
    }

    setAlert("");
    fetchWeather(search);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {alert && <Alert>{alert}</Alert>}

      <div className={styles.field}>
        <label htmlFor="country">País</label>
        <select
          name="country"
          id="country"
          value={search.country}
          onChange={handleChange}
        >
          <option value="defaulValue" disabled>
            -- Seleccione un país --
          </option>
          {sortedCountries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="city">Ciudad</label>
        <input
          list="city-options"
          type="text"
          id="city"
          name="city"
          placeholder="Ciudad"
          value={search.city}
          onChange={handleChange}
          autoComplete="off"
          disabled={!search.country}
        />
        <datalist id="city-options">
          {cities.map((city) => (
            <option key={city} value={city} />
          ))}
        </datalist>
      </div>

      <input
        type="submit"
        value={"Consultar Clima"}
        className={styles.submit}
        disabled={!search.country || search.city.trim() === ""}
      />
    </form>
  );
}
