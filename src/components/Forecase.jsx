const Forecast = ({ forecast }) => {
  return (
    <div className="grid grid-cols-5 gap-6 text-sm">
      {forecast.slice(0, 5).map((item, index) => (
        <div className="flex flex-col justify-between items-center" key={index}>
          <img
            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
            className="w-10 h-10"
          />
          <h1>
            {new Date(item.dt_txt).toLocaleDateString("en-US", {
              weekday: "long",
            })}
          </h1>
          <div>
            <span> {item.weather[0].description}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Forecast;
