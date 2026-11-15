export interface Category {
  id: number;
  name: string;
}

export interface GetCategoriesResponse {
  categories: Category[];
}
