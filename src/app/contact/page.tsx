import ContactTextContent from "@/features/contact/components/ContactTextContent";
import SplitLayout from "../layout/SplitLayout";

export default function Contact() {
  return (
    <SplitLayout
      leftContent={<p>Left</p>}
      rightContent={<ContactTextContent />}
    />
  );
}
