import Animation from "@/features/selfintroduction/components/Animation";
import TwoColumns from "./layout/TwoColumns";
import TextContent from "@/features/selfintroduction/components/TextContent";

export default function SelfIntroduction() {
  return (
    <TwoColumns leftContent={<Animation />} rightContent={<TextContent />} />
  );
}
