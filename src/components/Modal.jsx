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
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-[#1b1a1a3c]">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full flex flex-col gap-3 capitalize max-w-md rounded-xl p-6 backdrop-blur-3xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <div className="flex flex-col">
              <div>
                <h1 className="text-2xl font-main text-white flex items-center">
                  <IoLocation className="text-lg lg:-ml-2" />
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
                <h1 className="text-3xl font-main text-white flex gap-1 relative">
                  <span className="relative">{Math.floor(item.main.temp)}</span>
                  <span className="text-sm ml-7 -top-1.5 absolute">°</span>C
                </h1>
                <span className="text-[12px] text-gray-300">
                  {item.weather[0].description}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-white text-[16px] items-center text-center grid gap-2 p-2 rounded">
                <h1 className="flex items-center gap-2">
                  <IoSunnySharp className="text-slate-100" />
                  feels like
                </h1>
                <span className="text-slate-50 flex gap-1 relative justify-center">
                  {Math.floor(item.main.feels_like)}
                  <span className="text-sm -top-1 ml-2 absolute">°</span>C{" "}
                </span>
              </div>
              <div className="text-white text-[16px] items-center text-center grid gap-2  p-2 rounded">
                <h1 className="flex items-center">
                  <WiHumidity />
                  humidity
                </h1>
                <span className="text-slate-50">
                  {Math.floor(item.main.humidity)}%
                </span>
              </div>
              <div className="text-white text-[16px] items-center text-center grid gap-2  p-2 rounded">
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