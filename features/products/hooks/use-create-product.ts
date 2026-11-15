"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../services/products.service";
import type { Product } from "../services/products.service";

type CreateProductInput = Omit<Product, "id">;

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product: CreateProductInput) => createProduct(product),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
}
