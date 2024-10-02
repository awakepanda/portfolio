import TextContent from "@/features/skills/component/TextContent";
import SplitLayout from "../layout/SplitLayout";

export default function Skills() {
  return (
    <SplitLayout leftContent={<p>Left</p>} rightContent={<TextContent />} />
  );
}
