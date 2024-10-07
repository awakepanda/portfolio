import ProjectsTextContent from "@/features/projects/components/ProjectsTextContent";
import SplitLayout from "../layout/SplitLayout";
import ProjectsAnimationContent from "@/features/projects/components/ProjectsAnimationContent";

export default function projects() {
  return (
    <SplitLayout
      leftContent={<ProjectsAnimationContent />}
      rightContent={<ProjectsTextContent />}
    />
  );
}
