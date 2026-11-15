export interface Product {
  id: string;
  name: string;
  price: number;
  category: number;
}

export interface GetProductsResponse {
  products: Product[];
}

export async function getProducts(): Promise<GetProductsResponse> {
  const response = await fetch("/api/products");

  if (!response.ok) {
    throw new Error("Erro ao buscar produtos");
  }

  return response.json();
}
