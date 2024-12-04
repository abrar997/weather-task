import { useState } from "react";
import { MdExpandMore } from "react-icons/md";
import Modal from "./Modal";

const Forecast = ({ forecast, cityName }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="grid grid-cols-5 gap-4">
        {forecast.slice(0, 5).map((item, index) => {
          const dayName = new Date(item.dt_txt).toLocaleDateString("en-US", {
            weekday: "long",
          });
          return (
            <div key={index}>
              <div className="group">
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  className="w-10 h-10 m-auto"
                />
                <div className="flex flex-col items-center text-center justify-center gap-1">
                  <h1 className="text-[12px]">{dayName}</h1>
                  <h1 className="text-[12px] flex relative gap-1">
                    {Math.floor(item.main.temp)}{" "}
                    <span className="text-sm -top-1 ml-4 absolute">°</span>
                  </h1>
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <MdExpandMore />
                  </button>
                </div>
              </div>
              <Modal
                isOpen={isOpen}
                onclose={() => setIsOpen(false)}
                item={item}
                cityName={cityName}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Forecast;
