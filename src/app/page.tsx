// import Animation from "@/features/selfintroduction/components/Animation";
// import AnimationGSAP from "@/features/selfintroduction/components/AnimationGSAP";
// import AnimationFramerMotion from "@/features/selfintroduction/components/AnimationFramerMotion";
import AnimationFramerMotion3 from "@/features/selfintroduction/components/AnimationFramerMotion3";
import TwoColumns from "./layout/TwoColumns";
import TextContent from "@/features/selfintroduction/components/TextContent";

export default function SelfIntroduction() {
  return (
    <TwoColumns
      leftContent={<AnimationFramerMotion3 />}
      rightContent={<TextContent />}
    />
  );
}
