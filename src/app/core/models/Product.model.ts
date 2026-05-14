// ===================== CATEGORY =====================

export interface CategoryResponse {
  id: string;
  name: string;
  active: boolean;
  createdAt: string; // ISO 8601
}

export interface CreateCategoryRequest {
  name: string;
}

export interface UpdateCategoryRequest {
  name?: string;
}

// ===================== PRODUCT =====================

export interface ProductResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  categoryName: string;
  imageUrl: string;
  available: boolean;
  active: boolean;
  createdAt: string; // ISO 8601
}

export interface CreateProductRequest {
  name: string;
  description?: string;
  price: number;
  categoryId: string;
  imageUrl?: string;
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  price?: number;
  categoryId?: string;
  imageUrl?: string;
}