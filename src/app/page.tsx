import SplitLayout from "./layout/SplitLayout";
import AnimationContent from "@/features/selfintroduction/components/AnimationContent";
import TextContent from "@/features/selfintroduction/components/TextContent";

export default function SelfIntroduction() {
  return (
    <SplitLayout
      leftContent={<AnimationContent />}
      rightContent={<TextContent />}
    />
  );
}
