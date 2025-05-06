import { useState } from "react";
import { countries } from "../../data/countries";
import styles from "./Form.module.css";
import type { SearchType } from "../../types/index";

export default function Form() {
  const [city, setCity] = useState<SearchType>({
    city: "",
    country: "",
  });

  return (
    <form className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="city">Ciudad</label>
        <input type="text" id="city" name="city" placeholder="Ciudad" />
      </div>

      <div className={styles.field}>
        <label htmlFor="country">País</label>

        <select name="" id="">
          <option value="">-- Seleccione un país --</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <input
        type="submit"
        value={"Consultar Clima"}
        className={styles.submit}
      />
    </form>
  );
}
