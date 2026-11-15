import type { GetCategoriesResponse } from "../types/category";

export async function getCategories(): Promise<GetCategoriesResponse> {
  const response = await fetch("/api/categories");

  if (!response.ok) {
    throw new Error("Erro ao buscar categorias");
  }

  return response.json();
}
