"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { useCreateProduct } from "../hooks/use-create-product";
import { useCategories } from "@/features/categories/hooks/use-categories";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function ProductCreate() {
  const { data: categoriesData } = useCategories();
  const createProductMutation = useCreateProduct();
  const [product, setProduct] = useState({
    name: "",
    category: 1,
    price: 0,
  });
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createProductMutation.mutate(
      {
        name: product.name,
        category: product.category,
        price: product.price,
      },
      {
        onSuccess: () => {
          toast.success("Produto criado com sucesso!");
          router.push("/admin/products");
        },
        onError: () => {
          toast.error("Erro ao criar produto.");
        },
      },
    );
  };

  return (
    <Card>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label>Nome</label>
            <Input
              type="text"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
            />
          </div>
          <div className="flex space-x-2">
            <label>Categoria</label>
            <select
              value={product.category}
              onChange={(e) => setProduct({ ...product, category: Number(e.target.value) })}
            >
              {categoriesData?.categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Preço</label>
            <Input
              type="number"
              value={product.price}
              onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
            />
          </div>
          <Button type="submit" disabled={createProductMutation.isPending}>
            {createProductMutation.isPending ? "Criando..." : "Criar Produto"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
