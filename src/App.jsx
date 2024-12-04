import { useEffect, useState } from "react";
import Forecast from "./components/Forecast";
import DailyInfoCountry from "./components/DailyInfoCountry";
import Modal from "./components/Modal";

function App() {
  const [cityName, setCityName] = useState("");
  const [data, setData] = useState(null);
  const [forecast, setForecast] = useState([]);

  async function FetchApi() {
    try {
      if (!cityName) return null;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=95d47e1244fdaf138a0f5f1fecb9942c`
      );

      const weatherData = await response.json();
      setData(weatherData);

      if (weatherData.coord) {
        const { lat, lon } = data.coord;
        const responseForecast = await fetch(
          `https://pro.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=95d47e1244fdaf138a0f5f1fecb9942c`
        );
        const forecastApiData = await responseForecast.json();
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
      console.log(error);
    }
  }

  useEffect(() => {
    FetchApi();
  }, [cityName]);

  return (
    <div className="flex lg:items-center lg:justify-center lg:h-screen h-full font-main lg:px-0 bg-gradient-to-t  from-[#020102bf] to-[#10020d6f]">
      <div className="shadow-lg lg:rounded lg:bg-[#32323441] text-white lg:w-[75%]">
        <div className="grid lg:grid-cols-4 gap-4">
          <div className="relative lg:h-[680px] text-center col-span-2">
            <img
              src="https://image.lexica.art/full_webp/bd7bdccd-ea86-429f-b2e2-3f6a362fe42c"
              alt=""
              className="rounded w-full lg:h-full h-screen object-cover"
            />
            <div className="lg:absolute inset-0 hidden pt-12 lg:py-0 bg-gradient-to-t from-[#863786d1] to-[#000000c2] lg:backdrop-blur-[1px] lg:flex flex-col items-center justify-center">
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
            <h1 className="text-2xl text-slate-100 font-semibold text-center py-4 lg:hidden">
              Weather app
            </h1>

            <form
              action=""
              className="w-full flex justify-center items-start"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                placeholder="search a weather of your country ... "
                className="bg-[#32323441] border px-2 py-2 placeholder:text-sm rounded border-slate-400 focus:outline-none lg:w-[80%] w-full"
              />
            </form>
            {data && data.main && cityName ? (
              <div className="flex flex-col gap-3">
                <DailyInfoCountry data={data} />
                {forecast && (
                  <Forecast forecast={forecast} cityName={cityName} />
                )}
              </div>
            ) : (
              <p className="text-center text-sm text-gray-500 font-secondary hidden lg:flex mt-3 lg:mt-0">
                please enter your country
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
