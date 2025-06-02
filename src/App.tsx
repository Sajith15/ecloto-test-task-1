import { useState, useEffect, useMemo } from 'react'
import type { Product as ProductType, CartItemType } from './types';
import { PRODUCTS_DATA, FREE_GIFT_PRODUCT, FREE_GIFT_THRESHOLD } from './constants';
import ProductList from './components/ProductList/ProductList';
import CartSummary from './components/CartSummary/CartSummary';
import CartItemsDisplay from './components/CartItemsDisplay/CartItemsDisplay';

function App() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  const handleAddToCart = (product: ProductType) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if(existingItem) {
        return prevItems.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    if(productId === FREE_GIFT_PRODUCT.id) return;

    setCartItems(prevItems => {
      if(newQuantity <= 0) {
        return prevItems.filter(item => item.id !== productId);
      }
      return prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  }

  const subtotal = useMemo(() => {
    return cartItems.filter(item => item.id !== FREE_GIFT_PRODUCT.id)
                    .reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  useEffect(() => {
    const hasFreeGift = cartItems.some(item => item.id === FREE_GIFT_PRODUCT.id);

    if(subtotal >= FREE_GIFT_THRESHOLD && !hasFreeGift) {
      setCartItems(prevItems => {
        if(prevItems.some(item => item.id === FREE_GIFT_PRODUCT.id)) return prevItems;
        return [...prevItems, { ...FREE_GIFT_PRODUCT, quantity: 1 }];
      })
    } else if(subtotal < FREE_GIFT_THRESHOLD && hasFreeGift) {
      setCartItems(prevItems => prevItems.filter(item => item.id !== FREE_GIFT_PRODUCT.id));
    }
  }, [subtotal, cartItems]);

  return (
    <div className='shopping-cart-app'>
      <h1 className='app-title'>Shopping Cart</h1>

      <div className='main-content-width'>
        <h2 className='section-title'>Products</h2>
        <ProductList products={PRODUCTS_DATA} onAddToCart={handleAddToCart} />
      </div>

      <div className='main-content-width'>
        <h2 className='section-title'>Cart Summary</h2>
        <CartSummary subtotal={subtotal} threshold={FREE_GIFT_THRESHOLD} freeGiftName={FREE_GIFT_PRODUCT.name} />
      </div>

      <div className='main-content-width'>
        <h2 className='section-title'>Cart Items</h2>
        <CartItemsDisplay cartItems={cartItems} onUpdateQuantity={handleUpdateQuantity} freeGiftId={FREE_GIFT_PRODUCT.id} />
      </div>
    </div>
  );
}

export default App;
