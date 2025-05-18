export type SearchType = {
  city: string;
  country: string;
};

export type Country = {
  code: string;
  name: string;
};

export type WeatherCondition = {
  icon: string;
  description?: string;
  main?: string;
};

export type Weather = {
  weather: WeatherCondition[]; // Array porque la API devuelve un array de condiciones
  name: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
};
