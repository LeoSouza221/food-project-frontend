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

export async function createProduct(product: Omit<Product, "id">): Promise<Product> {
  const response = await fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Erro ao criar produto");
  }

  return response.json();
}
