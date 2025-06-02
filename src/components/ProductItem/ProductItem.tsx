import React from "react";
import type { Product } from "../../types";
import './ProductItem.css';

interface ProductItemProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onAddToCart }) => {
    return (
        <div className="product-item-card">
            <h3>{product.name}</h3>
            <p className="product-price">₹{product.price}</p>
            <button className="button add-to-cart-button" onClick={() => onAddToCart(product)}>
                Add to Cart
            </button>
        </div>
    );
};

export default ProductItem;