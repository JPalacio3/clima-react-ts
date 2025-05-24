import axios from "axios";
// import { z } from "zod";
import { object, string, number, array, optional, parse } from "valibot";
import type { InferOutput } from "valibot";
import type { SearchType } from "../types";
import { useMemo, useState } from "react";

//  Type Guard o Assertion
// function isWeatherReesponse(weather: unknown): weather is Weather {
//   return (
//     Boolean(weather) &&
//     typeof weather === "object" &&
//     typeof (weather as Weather).name === "string" &&
//     typeof (weather as Weather).main.temp === "number" &&
//     typeof (weather as Weather).main.temp_min === "number" &&
//     typeof (weather as Weather).main.temp_max === "number"
//   );
// }

// ZOD para el tipado de la respusta
// const WeatherSchema = z.object({
//   weather: z.array(
//     z.object({
//       icon: z.string(),
//       description: z.string().optional(), // Puedes añadir más campos si los usas
//       main: z.string().optional(),
//     })
//   ),
//   name: z.string(),
//   main: z.object({
//     temp: z.number(),
//     temp_min: z.number(),
//     temp_max: z.number(),
//   }),
// });

// type Weather = z.infer<typeof WeatherSchema>;

// Valibot para el tipado de la respuesta
const WeatherSchema = object({
  weather: array(
    object({
      icon: string(),
      description: optional(string()),
      main: optional(string()),
    })
  ),
  name: string(),
  main: object({
    temp: number(),
    temp_min: number(),
    temp_max: number(),
  }),
});

export type Weather = InferOutput<typeof WeatherSchema>;

export default function useWeather() {
  const [weather, setWeather] = useState<Weather>({
    weather: [
      {
        icon: "",
        description: "",
        main: "",
      },
    ],
    name: "",
    main: {
      temp: 0,
      temp_min: 0,
      temp_max: 0,
    },
  });

  // spiner de carga
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (search: SearchType) => {
    const appId = import.meta.env.VITE_API_KEY;
    setLoading(true);

    try {
      const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`;

      const { data } = await axios.get(geoUrl);

      const lat = data[0].lat;
      const lon = data[0].lon;

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;

      // Type Guards
      //   const { data: weatherResult } = await axios.get(weatherUrl);
      //   const result = isWeatherReesponse(weatherResult);

      //   if (result) {
      //     console.log(weatherResult.name);
      //   } else {
      //     console.error("Invalid weather data format");
      //   }

      // ZOD para un tipado más eficiente
      // const { data: weatherResult } = await axios.get(weatherUrl);
      // const result = WeatherSchema.safeParse(weatherResult);

      // if (result.success) {
      //   const weather = result.data;
      //   console.log(weather.name);
      //   console.log(weather.main.temp);
      //   console.log(weather.weather[0].icon);
      // }

      // Valibot para un tipado más eficiente
      const { data: weatherResult } = await axios.get(weatherUrl);

      const result = parse(WeatherSchema, weatherResult);

      if (result) {
        setWeather(result);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  const hasWeatherData = useMemo(() => weather.name, [weather]);

  return {
    weather,
    fetchWeather,
    hasWeatherData,
  };
}
