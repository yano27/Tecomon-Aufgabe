export interface WeatherData {
  temperature: number;
  time: string;
  conditions: string;
}

export interface Widget {
  _id: string;
  location: string;
  createdAt: string;
  weather?: WeatherData;
}