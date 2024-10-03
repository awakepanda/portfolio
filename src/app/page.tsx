import SplitLayout from "./layout/SplitLayout";
import AnimationContent from "@/features/selfintroduction/components/AnimationContent";
import SelfIntroductionTextContent from "@/features/selfintroduction/components/SelfIntroductionTextContent";

export default function SelfIntroduction() {
  return (
    <SplitLayout
      leftContent={<AnimationContent />}
      rightContent={<SelfIntroductionTextContent />}
    />
  );
}
