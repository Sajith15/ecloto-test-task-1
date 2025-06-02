import React from "react";
import type { CartItemType } from "../../types";
import './CartItem.css';

interface CartItemProps {
    item: CartItemType;
    onUpdateQuantity: (productId: number, newQuantity: number) => void;
    isFreeGift: boolean;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, isFreeGift }) => {
    return (
        <div className="cart-item-row">
            <div className="item-info">
                <h4>{item.name}</h4>
                <p className="item-price-calc">₹{item.price} x {item.quantity} = <span className="text-currency">₹{item.price * item.quantity}</span></p>
            </div>

            {isFreeGift ? (
                <div className="free-gift-tag">FREE GIFT</div>
            ) : (
                <div className="quantity-controls">
                    <button
                        className="quantity-button minus"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        aria-label={`Decrease quantity of ${item.name}`}
                    >
                        -
                    </button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button
                        className="quantity-button plus"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        aria-label={`Increase quantity of ${item.name}`}
                    >
                        +
                    </button>
                </div>
            )}
        </div>
    );
};

export default CartItem;