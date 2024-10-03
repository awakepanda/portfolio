import ProductsTextContent from "@/features/products/components/ProductsTextContent";
import SplitLayout from "../layout/SplitLayout";

export default function Products() {
  return (
    <SplitLayout
      leftContent={<p>Left</p>}
      rightContent={<ProductsTextContent />}
    />
  );
}
