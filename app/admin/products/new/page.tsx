import { ProductForm } from "@/components/admin/product-form";

export const metadata = {
  title: "Nouveau produit",
};

export default function AdminNewProductPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">Creer un produit</h1>
      <ProductForm />
    </div>
  );
}
