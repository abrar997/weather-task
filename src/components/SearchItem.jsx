const SearchItem = ({ cityName, setCityName, error }) => {
  return (
    <div>
      <h1 className="text-2xl text-slate-100 font-semibold text-center py-4 lg:hidden">
        Weather app
      </h1>
      <form
        action=""
        className="w-full flex flex-col gap-2 justify-center items-start"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          placeholder="search a weather of your country ... "
          className="bg-[#32323441] border px-2 py-2 placeholder:text-sm rounded border-slate-400 focus:outline-none w-full"
        />
        {error && <p className="text-blue-200 text-sm text-center">{error}</p>}
      </form>
    </div>
  );
};

export default SearchItem;
