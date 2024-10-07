import { useWeatherStore } from "@/store/weatherStore";
import { japanMejorCities } from "@/types/cities";

export default function ProjectsCitySelector() {
  const { selectedCity, setSelectedCity } = useWeatherStore();

  return (
    <div className="relative mt-pc-[129] w-pc-[385] before:content-['▼'] before:absolute before:-translate-y-1/2 before:top-1/2 before:r-pc-[30] before:leading-none before:text-illust before:text-pc-[20]">
      <select
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
        className="appearance-none cursor-pointer w-full font-notosansjp border rounded-full focus:outline-none focus:ring-0 bg-background border-4 border-illust text-illust py-pc-[18] pl-pc-[74] text-pc-[24]"
      >
        {japanMejorCities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  );
}
