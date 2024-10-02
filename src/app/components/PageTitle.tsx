import { PageInfo } from "../types/pageInfo";

type PageInfoProps = Omit<PageInfo, "path">;

export default function PageTitle({ id, nameJP, name }: PageInfoProps) {
  return (
    <h1>
      <div className="flex items-center mb-sp-[6] md:mb-tablet-[8] lg:mb-pc-[8]">
        <span className="flex justify-center items-center bg-foreground text-background rounded-full mr-sp-[4] w-sp-[22] h-sp-[22] text-sp-[9] md:mr-tablet-[10] md:w-tablet-[34] md:h-tablet-[34] md:text-tablet-[14] lg:mr-pc-[10] lg:w-pc-[36] lg:h-pc-[36] lg:text-pc-[15]">
          {id}
        </span>
        <em className="font-notosansjp font-medium text-sp-[12] md:text-tablet-[18] lg:text-pc-[20]">
          {nameJP}
        </em>
      </div>
      <strong className="leading-none pl-sp-[4] text-sp-[20] md:pl-tablet-[4] md:text-tablet-[38] lg:pl-pc-[4] lg:text-pc-[32]">
        {name}
      </strong>
    </h1>
  );
}
