"use client";

import { useProducts } from "../hooks/use-products";
import { useCategories } from "@/features/categories/hooks/use-categories";
import { useMemo, useState } from "react";
import { ProductSearch } from "./product-search";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

function ProductListSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead>Preço</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {Array.from({ length: 5 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="h-4 w-32" />
            </TableCell>

            <TableCell>
              <Skeleton className="h-4 w-20" />
            </TableCell>

            <TableCell>
              <Skeleton className="h-4 w-16" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function ProductList() {
  const {
    data: productsData,
    isPending: isProductsPending,
    isError: isProductsError,
    error: productsError,
    refetch: refetchProducts,
    isFetching: isProductsFetching,
  } = useProducts();
  const {
    data: categoriesData,
    isPending: isCategoriesPending,
    isError: isCategoriesError,
    error: categoriesError,
    refetch: refetchCategories,
    isFetching: isCategoriesFetching,
  } = useCategories();

  const [search, setSearch] = useState("");
  const normalizedSearch = search.toLowerCase().trim();
  const filteredProducts = productsData
    ? productsData.products.filter((product) =>
        product.name.toLowerCase().includes(normalizedSearch),
      )
    : [];

  const isPending = isProductsPending || isCategoriesPending;
  const isError = isProductsError || isCategoriesError;
  const isFetching = isProductsFetching || isCategoriesFetching;

  const categoriesMap = useMemo(
    () => new Map(categoriesData?.categories.map((category) => [category.id, category.name]) || []),
    [categoriesData],
  );

  const getCategoryName = (categoryId: number) => {
    return categoriesMap.get(categoryId) || "Categoria não encontrada";
  };

  if (isError) {
    return (
      <div className="space-y-3">
        <p>Erro ao carregar produtos: {productsError?.message || categoriesError?.message}</p>

        <Button
          onClick={() => {
            refetchProducts();
            refetchCategories();
          }}
        >
          Tentar novamente
        </Button>
      </div>
    );
  }

  if (isPending) {
    return <ProductListSkeleton />;
  }

  if (productsData?.products.length === 0) {
    return <p>Nenhum produto encontrado.</p>;
  }

  return (
    <div className="space-y-4">
      <ProductSearch value={search} onChange={setSearch} />
      {isFetching && <p className="text-sm text-muted-foreground">Atualizando dados...</p>}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Preço</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{getCategoryName(product.category)}</TableCell>
                <TableCell>
                  {product.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                Nenhum produto corresponde à sua busca.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <p className="text-sm text-muted-foreground">
        {filteredProducts.length} produto(s) encontrado(s).
      </p>
    </div>
  );
}
