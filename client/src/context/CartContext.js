import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Add to Cart Function
    const addToCart = (product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item._id === product._id);
            if (existing) {
                return prev.map((item) =>
                    item._id === product._id ? { ...item, qty: item.qty + 1 } : item
                );
            }
            return [...prev, { ...product, qty: 1 }];
        });
    };

    // Remove from Cart Function
    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((item) => item._id !== id));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, setCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);