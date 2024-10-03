import SkillsTextContent from "@/features/skills/components/SkillsTextContent";
import SplitLayout from "../layout/SplitLayout";

export default function Skills() {
  return (
    <SplitLayout
      leftContent={<p>Left</p>}
      rightContent={<SkillsTextContent />}
    />
  );
}
