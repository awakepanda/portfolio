import ContactTextContent from "@/features/contact/components/ContactTextContent";
import SplitLayout from "../layout/SplitLayout";
import ContactAniamtionContent from "@/features/contact/components/ContactAnimationContent";

export default function Contact() {
  return (
    <SplitLayout
      leftContent={<ContactAniamtionContent />}
      rightContent={<ContactTextContent />}
    />
  );
}
