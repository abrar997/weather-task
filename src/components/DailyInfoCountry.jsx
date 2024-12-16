const DailyInfoCountry = ({ data }) => {
  return (
    <div className="flex flex-col">
      <div className="grid items-center lg:justify-center text-center lg:gap-2 rounded">
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          className="m-auto rounded"
        />

        <h1 className="text-5xl font-main text-purple-100 relative">
          {Math.floor(data.main.temp)}
          <span className="text-lg ml-1 absolute top-0">°</span> C
        </h1>
        <div>
          <h1 className="text-slate-300 text-[16px] font-main">{data.name}</h1>
          <p className="text-slate-400 text-opacity-70 font-light">
            {data.weather[0].description}
          </p>
        </div>
        <div className="lg:mt-4 mt-2">
          <div className="grid grid-cols-3 lg:gap-6 gap-2 text-sm capitalize">
            <div className="text-slate-300 grid gap-2 lg:bg-conditionBg bg-conditionBgMobile lg:p-2 p-1 rounded">
              <h1>feels like</h1>
              <span className="text-slate-50 flex gap-1 relative justify-center">
                {Math.floor(data.main.feels_like)}
                <span className="text-sm -top-1 ml-4 absolute">°</span>
              </span>
            </div>
            <div className="text-slate-300 grid gap-2 lg:bg-conditionBg bg-conditionBgMobile lg:p-2 p-1 rounded">
              <h1>humidity</h1>
              <span className="text-slate-50">
                {Math.floor(data.main.humidity)}%
              </span>
            </div>
            <div className="text-slate-300 grid gap-2 lg:bg-conditionBg bg-conditionBgMobile lg:p-2 p-1 rounded">
              <h1>pressure</h1>
              <span className="text-slate-50">
                {Math.floor(data.main.pressure)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyInfoCountry;
