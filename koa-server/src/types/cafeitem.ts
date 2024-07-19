export interface CafeItem {
    id?: number;
    title: string;
    description: string;
    type: string;
    tags?: string;
    thumbnail?: string;
    online_purchase_fee?: number;
    stock_quantity?: number;
    price: number;
    is_available?: boolean;
    created_at?: string;
    updated_at?: string;
    ingredients?: string;
    brand?: string;
    expiration_date?: string;
    nutritional_info?: Record<string, any>;
}
