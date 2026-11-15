import { Button } from "@/components/ui/button";
import { ProductList } from "@/features/products/components/products-list";
import Link from "next/link";

export default function ProductsPage() {
  return (
    <section className="space-y-6">
      <div className="flex space-y-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Produtos</h1>

          <p className="text-muted-foreground">Gerencie os produtos do seu restaurante.</p>
        </div>
        <Link className="ml-auto" href="/admin/products/create-product">
          <Button>Adicionar Produto</Button>
        </Link>
      </div>

      <ProductList />
    </section>
  );
}
