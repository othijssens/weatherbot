import fetch from "node-fetch";
import { getInput } from "@actions/core";

export default async function getWeather() {
  try {
    const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${getInput("Latitude")}&
    lon=${getInput("Longitude")}&appid=${getInput("OpenWeatherMapSecretKey")}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return (await response.json()) as Weather;
  } catch (error) {
    throw new Error(error);
  }
}

export type Datum = {
  dt: number;
  summary: string;
  icon: string;
  sunrise: number;
  sunset: number;
  moon_phase: number;
  precipAccumulation?: number;
  rain: number;
  rainMax: number;
  precipProbability: number;
  temp: number;
  temperatureMin: number;
  temperatureMinTime: number;
  temperatureMax: number;
  temperatureMaxTime: number;
  apparentTemperatureMin: number;
  apparentTemperatureMinTime: number;
  apparentTemperatureMax: number;
  apparentTemperatureMaxTime: number;
  dew_point: number;
  humidity: number;
  wind_speed: number;
  wind_deg: number;
  visibility: number;
  clouds: number;
  pressure: number;
  ozone: number;
  rainMaxTime?: number;
  precipType: string;
};

export interface Currently extends Datum {
  dt: number;
  summary: string;
  icon: string;
}

export interface Interval {
  summary: string;
  icon: string;
  data: Datum[];
}

export interface Alerts {
  title: string;
  regions: string[];
  severity: string;
  dt: number;
  expires: number;
  description: string;
  uri: string;
}

export type Weather = {
  latitude: number;
  longitude: number;
  timezone: string;
  offset: number;
  currently: Currently;
  minutely: Interval;
  hourly: Interval;
  daily: Interval;
  flags: {
    sources: string[];
    "lamp-stations": string[];
    "isd-stations": string[];
    "madis-stations": string[];
    units: string;
  };
  alerts: Alerts[];
};
