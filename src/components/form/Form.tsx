import { countries } from "../../data/countries";
import styles from "./Form.module.css";

export default function Form() {
  return (
    <form>
      <div className="">
        <label htmlFor="city">Ciudad</label>
        <input type="text" id="city" name="city" placeholder="Ciudad" />
      </div>

      <div className="">
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

      <input type="submit" value={"Consultar Clima"} />
    </form>
  );
}
