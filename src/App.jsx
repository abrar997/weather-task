import { useEffect, useState } from "react";
import Forecast from "./components/Forecast";
import DailyInfoCountry from "./components/DailyInfoCountry";
import Modal from "./components/Modal";

function App() {
  const [cityName, setCityName] = useState("");
  const [data, setData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
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
    <div className="flex items-center justify-center bg-gradient-to-t from-[#250c25fb] to-[#000000e5] lg:h-screen font-main p-4 lg:px-0">
      <div className="shadow-lg rounded bg-[#32323441] text-white lg:w-[75%]">
        <div className="grid lg:grid-cols-4">
          <div className="relative h-[650px]  col-span-2">
            <img
              src="https://image.lexica.art/full_webp/bd7bdccd-ea86-429f-b2e2-3f6a362fe42c"
              alt=""
              className="rounded w-full h-full object-cover"
            />
            <div className="absolute inset-0  bg-gradient-to-t from-[#863786d1] to-[#000000c2] backdrop-blur-[2px] flex flex-col items-center justify-center">
              <h1 className="text-xl text-slate-100 font-semibold">
                Welcome to
              </h1>
              <h1 className="font-bold px-6 text-5xl capitalize font-secondary">
                Weather app
              </h1>
              <p className="font-secondary text-center text-sm mt-3">
                Your go-to weather companion for accurate and <br /> real-time
                updates.
              </p>
            </div>
          </div>
          <div className="py-12 px-4 font-secondary col-span-2 grid gap-6">
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
                className="bg-[#32323441] border px-2 py-2 placeholder:text-sm rounded border-slate-400 focus:outline-none w-[80%] "
              />
            </form>
            {data && data.main && cityName ? (
              <>
                <DailyInfoCountry data={data} />
                {forecast && (
                  <Forecast forecast={forecast} cityName={cityName} />
                )}
              </>
            ) : (
              <p className="text-center text-sm text-gray-500 font-secondary">
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
