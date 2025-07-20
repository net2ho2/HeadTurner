// src/component/HeadTurner/ProductContext/ProductContext.js
import React, { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [allProduct, setAllProduct] = useState([]);
    const [cartItems, setCartItems] = useState(() => {
        const storedCart = localStorage.getItem("cartItems");
        return storedCart ? JSON.parse(storedCart) : [];
    });

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    const addToCart = (product) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + (product.quantity || 1) } : item));
            } else {
                return [...prev, { ...product, quantity: product.quantity || 1 }];
            }
        });
    };

    const removeFromCart = (id) => {
        setCartItems((prev) => prev.map((item) => (item.id === id ? (item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : null) : item)).filter((item) => item !== null));
    };

    return (
        <ProductContext.Provider
            value={{
                allProduct,
                setAllProduct,
                cartItems,
                addToCart,
                removeFromCart,
                user,
                setUser,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};
