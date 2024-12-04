import { useState } from "react";
import { MdExpandMore } from "react-icons/md";
import Modal from "./Modal";

const Forecast = ({ forecast, cityName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const openModal = (item) => {
    setSelectedItem(item);
    setIsOpen(true);
  };
  const closeModal = () => {
    setSelectedItem(null);
    setIsOpen(false);
  };
  return (
    <div className="lg:bg-transparent bg-conditionBg px-2 lg:px-0">
      <h1 className="lg:hidden capitalize text-center mt-4 pt-4 rounded">
        forecast
      </h1>
      <div className="grid lg:grid-cols-5 lg:gap-4 gap-3">
        {forecast.slice(0, 5).map((item, index) => {
          const dayName = new Date(item.dt_txt).toLocaleDateString("en-US", {
            weekday: "long",
          });
          return (
            <div key={index}>
              <div
                className={`group lg:grid flex justify-between items-center w-full ${
                  index === 4
                    ? ""
                    : "lg:border-0 border-b border-slate-500 border-opacity-30"
                }`}
              >
                <div className="lg:grid flex items-center">
                  <img
                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                    className="w-10 h-10 lg:m-auto"
                  />
                  <h1 className="text-[12px] lg:hidden">{dayName}</h1>
                </div>
                <div className="flex gap-2 lg:flex-col lg:items-center lg:text-center lg:justify-center lg:gap-1">
                  <h1 className="text-[12px] hidden lg:flex">{dayName}</h1>
                  <h1 className="text-[12px] flex relative gap-1">
                    {Math.floor(item.main.temp)}
                    <span className="text-sm -top-1 ml-4 absolute">°</span>
                  </h1>
                  <button
                    onClick={() => openModal(item)}
                    className="opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <MdExpandMore />
                  </button>
                </div>
              </div>
              {selectedItem && (
                <Modal
                  isOpen={isOpen}
                  onclose={closeModal}
                  item={selectedItem}
                  cityName={cityName}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Forecast;
