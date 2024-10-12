import SplitLayout from "./layout/SplitLayout";
import SelfIntroductionAnimationContent from "@/features/selfintroduction/components/SelfIntroductionAnimationContent";
import SelfIntroductionTextContent from "@/features/selfintroduction/components/SelfIntroductionTextContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SELF-INTRODUCTION",
};

export default function SelfIntroduction() {
  return (
    <SplitLayout
      leftContent={<SelfIntroductionAnimationContent />}
      rightContent={<SelfIntroductionTextContent />}
    />
  );
}
