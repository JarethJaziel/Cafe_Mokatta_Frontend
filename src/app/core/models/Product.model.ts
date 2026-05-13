export interface Category {
    id: number;
    name: string;
}

export interface Product {
    id: number;
    name: string;
    category: Category;
    categoryId?: number; // Usado para la creación/actualización
    unitPrice: number;
    image: string | File;
    available: boolean;
}