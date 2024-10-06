import ProductsTextContent from "@/features/products/components/ProductsTextContent";
import SplitLayout from "../layout/SplitLayout";
import ProductsAnimationContent from "@/features/products/components/ProductsAnimationContent";

export default function Products() {
  return (
    <SplitLayout
      leftContent={<ProductsAnimationContent />}
      rightContent={<ProductsTextContent />}
    />
  );
}
