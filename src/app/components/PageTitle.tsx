import { PageInfo } from "../types/pageInfo";

type PageInfoProps = Omit<PageInfo, "path">;

export default function PageTitle({ id, nameJP, name }: PageInfoProps) {
  return (
    <h1>
      <div className="flex items-center mb-pc-[8]">
        <span className="flex justify-center items-center mr-pc-[10] w-pc-[36] h-pc-[36] bg-foreground text-background rounded-full text-[calc((100vw*15)/1728)]">
          {id}
        </span>
        <em className="font-notosansjp text-[calc((100vw*20)/1728)] font-medium">
          {nameJP}
        </em>
      </div>
      <strong className="pl-pc-[4] text-[calc((100vw*42)/1728)]">{name}</strong>
    </h1>
  );
}
