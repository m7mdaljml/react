export type TAppConfig = {
  baseUrl: string;
};

export type THashMap = {
  en: string;
  ar: string;
};

export type TAppRoute = {
  path?: string;
  index?: boolean;
  handle?: { label?: THashMap };
  children?: TAppRoute[];
};

export type TTask = {
  text: string;
  date: string;
  done: boolean;
};

export type TTodoFilter = {
  sort: string;
  taskText: string;
  done: string;
  taskDate: string;
};

export type TWeatherData = {
  name: string;
  sys: { country: string; sunrise: number; sunset: number };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    temp_min: number;
    temp_max: number;
  };
  weather: { id: number; main: string; description: string; icon: string }[];
  wind: { speed: number; deg: number };
  visibility: number;
  dt: number;
  timezone: number;
};
