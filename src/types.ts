export interface Product {
    id: number;
    name: string;
    price: number;
}

export interface CartItemType extends Product {
    quantity: number;
}