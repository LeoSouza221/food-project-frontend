"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/products.service";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
}
