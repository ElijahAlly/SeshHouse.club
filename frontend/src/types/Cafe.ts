export interface CafeItemType {
    id: number;
    title: string;
    description: string;
    item_type: string;
    tags: string[];
    item_image: string;
    online_purchase_fee?: number;
    stock_quantity?: number;
    price: number;
    isAvailable: boolean;
    createdAt: Date;
    updatedAt: Date;
    ingredients?: string[]; // For food/drink items
    nutritional_info?: NutritionalInfo; // For food/drink items
    size_options?: string[]; // For items with different sizes
    customizations?: CustomizationOptions; // For customizable items
    brand?: string; // For merchandise items
    expiration_date?: Date; // For perishable items
}

export interface NutritionalInfo {
    calories: number;
    fat: number;
    protein: number;
    carbohydrates: number;
    [key: string]: number; // Allow additional nutritional fields
}

export interface CustomizationOptions {
    [optionName: string]: string[]; // e.g., "size": ["small", "medium", "large"], "milk": ["whole", "skim", "soy"]
}