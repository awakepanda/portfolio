import Arrow from "@/app/components/Arrow";
import PageTitle from "@/app/components/PageTitle";
import ProjectsButtonContent from "./ProjectsButtonContent";

export default function ProjectsTextContent() {
  return (
    <div className="w-full h-full relative overflow-hidden pt-sp-[36] px-sp-[24] md:pt-tablet-[40] md:px-tablet-[50] lg:pt-pc-[60] lg:px-pc-[104]">
      <Arrow />
      <div className="flex flex-col justify-between h-[calc(100%-calc((100vw*40)/640))] md:h-[calc(100%-calc((100vw*40)/1024))] lg:h-[calc(100%-calc((100vw*190)/1728))]">
        <PageTitle />
        <div className="relative flex-grow bg-white rounded-3xl overflow-hidden mt-sp-[20] py-sp-[42] px-sp-[30] before:h-sp-[46] after:h-sp-[46] md:mt-tablet-[38] md:py-tablet-[42] md:px-tablet-[38] md:before:h-tablet-[50] md:after:h-tablet-[50] lg:mt-pc-[50] lg:py-pc-[70] lg:px-pc-[52] lg:before:h-pc-[78] lg:after:h-pc-[70]">
          <ProjectsButtonContent />
        </div>
      </div>
    </div>
  );
}
