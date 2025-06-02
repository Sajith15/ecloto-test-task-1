import React from "react";
import type { CartItemType } from "../../types";
import CartItem from "../CartItem/CartItem";
import './CartItemsDisplay.css';

interface CartItemsDisplayProps {
    cartItems: CartItemType[];
    onUpdateQuantity: (productId: number, newQuantity: number) => void;
    freeGiftId: number;
}

const CartItemsDisplay: React.FC<CartItemsDisplayProps> = ({ cartItems, onUpdateQuantity, freeGiftId }) => {
    const regularItems = cartItems.filter(item => item.id !== freeGiftId);
    const giftItem = cartItems.find(item => item.id === freeGiftId);

    if(regularItems.length === 0 && !giftItem) {
        return (
            <div className="cart-empty-state card">
                <p>Your cart is empty</p>
                <p className="empty-card-subtext">Add some products to see them here!</p>
            </div>
        );
    }

    return (
        <div className="cart-items-container card">
            {regularItems.map(item => (
                <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={onUpdateQuantity}
                    isFreeGift={false}
                />
            ))}
            {giftItem && (
                <CartItem
                    key={giftItem.id}
                    item={giftItem}
                    onUpdateQuantity={onUpdateQuantity}
                    isFreeGift={true}
                />
            )}
        </div>
    );
};

export default CartItemsDisplay;