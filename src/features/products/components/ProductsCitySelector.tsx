import { useWeatherStore } from "@/store/weatherStore";
import { japanMejorCities } from "@/types/cities";

export default function CitySelector() {
  const { selectedCity, setSelectedCity } = useWeatherStore();

  return (
    <select
      value={selectedCity}
      onChange={(e) => setSelectedCity(e.target.value)}
      className="py-pc-[18] pl-pc-[74] mt-pc-[130] w-pc-[385] text-pc-[30] font-notosansjp border rounded-full focus:outline-none focus:ring-0 bg-background border-4 border-illust text-illust"
    >
      {japanMejorCities.map((city) => (
        <option key={city.id} value={city.id}>
          {city.name}
        </option>
      ))}
    </select>
  );
}
