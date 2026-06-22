import { notFound } from "next/navigation";

import { ProductForm } from "@/components/admin/product-form";
import { getAdminProductById } from "@/lib/mock-store";

type EditProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminEditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;

  const product = getAdminProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">Modifier {product.name}</h1>
      <ProductForm product={{ ...product, categoryName: product.category.name }} />
    </div>
  );
}
