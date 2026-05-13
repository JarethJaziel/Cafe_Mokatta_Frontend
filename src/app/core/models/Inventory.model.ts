export interface InventoryItem {
    id?: number;
    name: string;
    unit: string;
    quantityInStock: number;
    reorderLevel: number;
}