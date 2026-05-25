import { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import {
  FaSearch,
  FaWind,
  FaTint,
  FaCompress,
  FaEye,
  FaThermometerHalf,
  FaSun,
  FaMoon,
} from "react-icons/fa";

import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
  WiDayCloudy,
} from "react-icons/wi";

import "../../../assets/style/weather.css";
import type { TWeatherData } from "../../../domain/meta/i-types";

const getWeatherIcon = (weatherId: number) => {
  if (weatherId >= 200 && weatherId < 300)
    return <WiThunderstorm style={{ fontSize: "80px" }} />;
  if (weatherId >= 300 && weatherId < 600)
    return <WiRain style={{ fontSize: "80px" }} />;
  if (weatherId >= 600 && weatherId < 700)
    return <WiSnow style={{ fontSize: "80px" }} />;
  if (weatherId >= 700 && weatherId < 800)
    return <WiFog style={{ fontSize: "80px" }} />;
  if (weatherId == 800) return <WiDaySunny style={{ fontSize: "80px" }} />;
  if (weatherId == 801) return <WiDayCloudy style={{ fontSize: "80px" }} />;
  return <WiCloudy style={{ fontSize: "80px" }} />;
};

const getBackgroundClass = (weatherId: number) => {
  if (weatherId >= 200 && weatherId < 300) return "weather-bg-storm";
  if (weatherId >= 300 && weatherId < 600) return "weather-bg-rain";
  if (weatherId >= 600 && weatherId < 700) return "weather-bg-snow";
  if (weatherId >= 700 && weatherId < 800) return "weather-bg-fog";
  if (weatherId == 800) return "weather-bg-clear";

  return "weather-bg-clouds";
};

const WeatherApp = () => {
  const { t } = useTranslation();

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<TWeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const fetchWeather = async () => {
    const trimmed = city.trim();

    if (!trimmed) return;

    setLoading(true);
    setError("");
    setSearched(true);

    try {
      const { data } = await axios.get<TWeatherData>(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            q: trimmed,
            appid: "bd5e378503939ddaee76f12ad7a97608",
            units: "metric",
          },
        },
      );

      setWeather(data);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status == 404)
        setError(t("weather.cityNotFound"));
      else setError(t("weather.fetchError"));

      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeather();
  };

  const formatTime = (timestamp: number, timezoneOffset: number) => {
    const date = new Date((timestamp + timezoneOffset) * 1000);

    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    });
  };

  const bgClass = weather ? getBackgroundClass(weather.weather[0].id) : "";

  return (
    <div className="container py-4">
      <div className="mx-auto" style={{ maxWidth: 900 }}>
        <h1 className="fw-bold text-center mb-2 d-flex align-items-center justify-content-center gap-2">
          <FaThermometerHalf />
          {t("weather.title")}
        </h1>

        <p className="text-center text-secondary mb-4">
          {t("weather.subtitle")}
        </p>

        <form
          onSubmit={handleSubmit}
          className="d-flex gap-2 mx-auto mb-4"
          style={{ maxWidth: 500 }}
        >
          <input
            className="form-control"
            type="search"
            placeholder={t("weather.searchPlaceholder")}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <button
            className="btn btn-dark"
            disabled={!city.trim() || loading}
            type="submit"
          >
            <FaSearch />
          </button>
        </form>

        {error && (
          <div className="alert alert-warning text-center">{error}</div>
        )}

        {!loading && weather && (
          <div className={`text-white p-4 border rounded-4  ${bgClass}`}>
            <div className="d-flex align-items-center gap-3 mb-4 flex-wrap">
              {getWeatherIcon(weather.weather[0].id)}

              <div>
                <h2 className="fw-bold mb-1">
                  {weather.name}, {weather.sys.country}
                </h2>

                <p className="mb-0 text-capitalize opacity-75">
                  {weather.weather[0].description}
                </p>
              </div>
            </div>

            <div
              className="rounded-4 d-flex align-items-center gap-3 mb-4 p-4"
              style={{ background: "rgba(255, 255, 255, 0.12)" }}
            >
              <div className="fw-bold" style={{ fontSize: "40px" }}>
                {Math.round(weather.main.temp)}°C
              </div>

              <div className="d-flex flex-column">
                <span>
                  {t("weather.feelsLike")} {Math.round(weather.main.feels_like)}
                  °C
                </span>

                <span>
                  ↓ {Math.round(weather.main.temp_min)}° &nbsp;&nbsp; ↑{" "}
                  {Math.round(weather.main.temp_max)}°
                </span>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-6 col-md-4">
                <div
                  className="d-flex flex-column align-items-center p-4 text-center gap-2 rounded-4"
                  style={{ background: "rgba(255, 255, 255, 0.12)" }}
                >
                  <FaTint style={{ fontSize: "25px" }} />
                  <small>{t("weather.humidity")}</small>
                  <strong>{weather.main.humidity}%</strong>
                </div>
              </div>

              <div className="col-6 col-md-4">
                <div
                  className="d-flex flex-column align-items-center p-4 text-center gap-2 rounded-4"
                  style={{ background: "rgba(255, 255, 255, 0.12)" }}
                >
                  <FaWind style={{ fontSize: "25px" }} />
                  <small>{t("weather.wind")}</small>
                  <strong>{weather.wind.speed} m/s</strong>
                </div>
              </div>

              <div className="col-6 col-md-4">
                <div
                  className="d-flex flex-column align-items-center p-4 text-center gap-2 rounded-4"
                  style={{ background: "rgba(255, 255, 255, 0.12)" }}
                >
                  <FaCompress style={{ fontSize: "25px" }} />
                  <small>{t("weather.pressure")}</small>
                  <strong>{weather.main.pressure} hPa</strong>
                </div>
              </div>

              <div className="col-6 col-md-4">
                <div
                  className="d-flex flex-column align-items-center p-4 text-center gap-2 rounded-4"
                  style={{ background: "rgba(255, 255, 255, 0.12)" }}
                >
                  <FaEye style={{ fontSize: "25px" }} />
                  <small>{t("weather.visibility")}</small>
                  <strong>{(weather.visibility / 1000).toFixed(1)} km</strong>
                </div>
              </div>

              <div className="col-6 col-md-4">
                <div
                  className="d-flex flex-column align-items-center p-4 text-center gap-2 rounded-4"
                  style={{ background: "rgba(255, 255, 255, 0.12)" }}
                >
                  <FaSun style={{ fontSize: "25px" }} />
                  <small>{t("weather.sunrise")}</small>
                  <strong>
                    {formatTime(weather.sys.sunrise, weather.timezone)}
                  </strong>
                </div>
              </div>

              <div className="col-6 col-md-4">
                <div
                  className="d-flex flex-column align-items-center p-4 text-center gap-2 rounded-4"
                  style={{ background: "rgba(255, 255, 255, 0.12)" }}
                >
                  <FaMoon style={{ fontSize: "25px" }} />
                  <small>{t("weather.sunset")}</small>
                  <strong>
                    {formatTime(weather.sys.sunset, weather.timezone)}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {!loading && !weather && !error && !searched && (
          <div className="text-center text-secondary py-5">
            <p>{t("weather.emptyState")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
