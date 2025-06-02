import React from "react";
import './CartSummary.css';

interface CartSummaryProps {
    subtotal: number;
    threshold: number;
    freeGiftName: string;
}

const CartSummary: React.FC<CartSummaryProps> = ({ subtotal, threshold, freeGiftName }) => {
    const amountNeeded = threshold - subtotal;
    const progressPercentage = (subtotal >= threshold) ? 100 : ((subtotal / threshold) * 100);

    return (
        <div className="cart-summary-card">
            <div className="subtotal-line">
                <span>Subtotal</span>
                <span className="text-currency">₹{subtotal}</span>
            </div>

            <div className="free-gift-info">
                {subtotal < threshold && amountNeeded > 0 && (
                    <>
                        <p>Add ₹{amountNeeded} more to get a FREE {freeGiftName}</p>
                        <div className="progress-bar-container">
                            <div 
                                className="progress-bar-filled"
                                style={{ width: `${progressPercentage}%` }}
                                aria-valuenow={progressPercentage}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                role="progressbar"
                            ></div>
                        </div>
                    </>
                )}

                {subtotal >= threshold && (
                    <p className="unlocked-message">You got a free {freeGiftName}</p>
                )}
            </div>
        </div>
    );
};

export default CartSummary;