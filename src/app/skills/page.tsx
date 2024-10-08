import SkillsTextContent from "@/features/skills/components/SkillsTextContent";
import SplitLayout from "../layout/SplitLayout";
import SkillsAnimationContent from "@/features/skills/components/SkillsAnimationContent";

export default function Skills() {
  return (
    <SplitLayout
      leftContent={<SkillsAnimationContent />}
      rightContent={<SkillsTextContent />}
    />
  );
}
