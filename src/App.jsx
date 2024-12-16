import { useEffect, useState } from "react";
import Forecast from "./components/Forecast";
import DailyInfoCountry from "./components/DailyInfoCountry";
import SearchItem from "./components/SearchItem";

function App() {
  const [cityName, setCityName] = useState("");
  const [data, setData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function FetchApi() {
    try {
      setError(null);
      setLoading(true);

      if (!cityName) return null;

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=95d47e1244fdaf138a0f5f1fecb9942c`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const weatherData = await response.json();
      setData(weatherData);

      // fetch forecast data
      if (weatherData.coord) {
        const { lat, lon } = weatherData.coord;
        const responseForecast = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=95d47e1244fdaf138a0f5f1fecb9942c`
        );
        if (!responseForecast.ok) {
          throw new Error("Failed to fetch forecast data");
        }
        const forecastApiData = await responseForecast.json();
        // select unique days
        const allDays = [];
        const seenDay = new Set();

        forecastApiData.list.forEach((item) => {
          const dayName = new Date(item.dt_txt).toLocaleDateString("en-US", {
            weekday: "long",
          });
          if (!seenDay.has(dayName)) {
            seenDay.add(dayName);
            allDays.push(item);
          }
        });
        setForecast(allDays);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      FetchApi();
    }, 500);

    return () => clearTimeout(timeout);
  }, [cityName]);

  return (
    <div className="flex lg:items-center lg:justify-center lg:h-screen h-full font-main lg:px-0 bg-gradient-to-t  from-[#020102bf] to-[#10020d6f]">
      <div className="shadow-mb lg:rounded lg:bg-[#2c182c6f] text-white lg:w-[75%]">
        <div className="grid lg:grid-cols-4 gap-4">
          <div className="relative  lg:h-[680px] text-center lg:col-span-2">
            <img
              src="https://image.lexica.art/full_webp/bd7bdccd-ea86-429f-b2e2-3f6a362fe42c"
              alt=""
              className="rounded flex w-screen lg:w-full lg:h-full h-screen object-cover"
            />
            <div className="lg:absolute inset-0 hidden pt-12 lg:py-0 bg-gradient-to-t from-[#863786a9] to-[#000000c2] lg:backdrop-blur-[1px] lg:flex flex-col items-center justify-center">
              <h1 className="text-xl text-slate-100 font-semibold">
                Welcome to
              </h1>
              <h1 className="font-bold px-6 lg:text-5xl text-3xl capitalize font-secondary">
                Weather app
              </h1>
              <p className="font-secondary text-center text-sm mt-3">
                Your go-to weather companion for accurate and <br /> real-time
                updates.
              </p>
            </div>
          </div>

          <div className="lg:py-12 pt-6 px-4 bg-[#0f0523e3] lg:bg-transparent font-secondary col-span-2 lg:grid flex flex-col lg:gap-6 absolute inset-0 lg:static">
            <SearchItem
              cityName={cityName}
              setCityName={setCityName}
              error={error}
            />

            {!loading ? (
              <>
                {data && data.main && cityName ? (
                  <div className="flex flex-col gap-3">
                    <DailyInfoCountry data={data} />
                    {forecast && (
                      <Forecast forecast={forecast} cityName={cityName} />
                    )}
                  </div>
                ) : (
                  <p className="text-center m-auto text-sm text-gray-500 font-secondary hidden lg:flex mt-3 lg:mt-0">
                    please enter your country
                  </p>
                )}
              </>
            ) : (
              <p className="text-center text-sm mt-4 lg:mt-0">Loading...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
