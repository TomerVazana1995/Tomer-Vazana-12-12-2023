export interface CityType {
  Version: number;
  Key: string;
  Type: string;
  Rank: number;
  LocalizedName: string;
  Country: {
    ID: string;
    LocalizedName: string;
  };
  AdministrativeArea: {
    ID: string;
    LocalizedName: string;
  };
}

export interface City {
  label: string;
  id: string;
}

type DailyWeather = {
  day: string;
  dayWeatherDescription: string;
  minTemp: number;
  maxTemp: number;
};

export type CityWeekWeather = {
  weatherDescription?: string | undefined;
  city?: string | undefined;
  cityKey?: string | undefined;
  days?: DailyWeather[] | undefined;
};
