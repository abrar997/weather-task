import { Dialog, DialogPanel } from "@headlessui/react";
import { GiPush } from "react-icons/gi";
import { IoIosClose } from "react-icons/io";
import { IoLocation, IoSunnySharp } from "react-icons/io5";
import { WiHumidity } from "react-icons/wi";

export default function Modal({ isOpen, onclose, item, cityName }) {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={onclose}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-[#2c2b2b1e]">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full lg:first-line:shadow-md border border-slate-500 flex flex-col gap-3 capitalize max-w-md rounded-xl lg:p-6 p-4 backdrop-blur-[40px] duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <div className="flex flex-col">
              <h1 className="text-2xl font-main text-white flex items-center">
                <IoLocation className="text-lg lg:-ml-2 -ml-1.5" />
                {cityName && cityName}
              </h1>
              <h1 className="text-[14px] text-slate-300">
                {new Date(item.dt_txt).toLocaleDateString("en-US", {
                  weekday: "long",
                })}
              </h1>
              <h1 className="text-[10px] text-slate-300">{item.dt_txt}</h1>
            </div>
            <div className="items-center flex flex-col">
              <h1 className="lg:text-3xl text-2xl font-main text-white flex gap-1 relative">
                <span className="relative">{Math.floor(item.main.temp)}</span>
                <span className="text-sm ml-7 -top-1.5 absolute">°</span>C
              </h1>
              <span className="text-[12px] text-gray-300">
                {item.weather[0].description}
              </span>
            </div>

            <div className="grid lg:grid-cols-3 lg:gap-6 gap-2">
              <div className="text-white text-[16px] lg:items-center lg:text-center flex justify-between lg:grid gap-2 lg:p-2 rounded">
                <h1 className="flex items-center gap-2">
                  <IoSunnySharp className="text-slate-100" />
                  feels like
                </h1>
                <span className="text-slate-50 flex gap-1 relative lg:justify-center">
                  {Math.floor(item.main.feels_like)}
                  <span className="text-sm -top-1 ml-2 absolute">°</span>C{" "}
                </span>
              </div>
              <div className="text-white text-[16px] lg:items-center lg:text-center flex justify-between lg:grid gap-2 lg:p-2 rounded">
                <h1 className="flex items-center gap-2">
                  <WiHumidity />
                  humidity
                </h1>
                <span className="text-slate-50">
                  {Math.floor(item.main.humidity)}%
                </span>
              </div>
              <div className="text-white text-[16px] lg:items-center lg:text-center flex justify-between lg:grid gap-2 lg:p-2 rounded">
                <h1 className="flex items-center gap-2">
                  <GiPush />
                  pressure
                </h1>
                <span className="text-slate-50">
                  {Math.floor(item.main.pressure)}
                </span>
              </div>
            </div>

            <button
              onClick={onclose}
              className="absolute right-2 text-2xl text-white top-2"
            >
              <IoIosClose />
            </button>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
