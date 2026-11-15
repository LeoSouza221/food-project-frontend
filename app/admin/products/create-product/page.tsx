import { ProductCreate } from "@/features/products/components/product-create";

export default function CreateProductPage() {
  return (
    <section className="space-y-6">
      <div className="flex space-y-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Criar Produto</h1>

          <p className="text-muted-foreground">Criar um novo produto para o seu restaurante.</p>
        </div>
      </div>
      <ProductCreate />
    </section>
  );
}
