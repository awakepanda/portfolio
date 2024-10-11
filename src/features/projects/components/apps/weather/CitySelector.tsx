import { useProjectsStore } from "@/store/projectsStore";
import { japanMejorCities } from "@/types/cities";

export default function CitySelector() {
  const { selectedCity, setSelectedCity } = useProjectsStore();

  return (
    <div className="relative before:content-['▼'] before:absolute before:-translate-y-1/2 before:top-1/2 before:leading-none before:text-illust w-sp-[200] before:r-sp-[30] before:text-sp-[16] md:mt-0 md:w-tablet-[385] md:before:r-tablet-[30] md:before:text-tablet-[24] lg:mt-pc-[129] lg:w-pc-[385] lg:before:r-pc-[30] lg:before:text-pc-[20]">
      <select
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
        className="appearance-none cursor-pointer w-full font-notosansjp border rounded-full focus:outline-none focus:ring-0 bg-background border-4 border-illust text-illust py-sp-[8] pl-sp-[20] text-sp-[18] md:py-tablet-[14] md:pl-tablet-[40] md:text-tablet-[30] lg:py-pc-[18] lg:pl-pc-[60] lg:text-pc-[24]"
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
