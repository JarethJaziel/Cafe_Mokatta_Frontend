// ===================== INGREDIENT RESPONSE =====================

export interface IngredientResponse {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  minStock: number;
  active: boolean;
  lowStock: boolean;
  updatedAt: string; // ISO 8601
}

// ===================== REQUESTS =====================

export interface CreateIngredientRequest {
  name: string;
  quantity: number;
  unit: string;
  minStock: number;
}

export interface UpdateIngredientRequest {
  name?: string;
  unit?: string;
  minStock?: number;
}

export interface AdjustStockRequest {
  amount: number;
  type: 'ADD' | 'SUBTRACT';
}