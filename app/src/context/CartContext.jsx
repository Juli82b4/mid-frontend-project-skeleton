import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");

        if (savedCart) {
            return JSON.parse(savedCart);
        }

        return [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    function addToCart(event, quantity) {
        setCart((prevCart) => {
            const existingItem = prevCart.find(
                (item) => item.id === event.id
            );

            if (existingItem) {
                return prevCart.map((item) => {
                    if (item.id === event.id) {
                        return {
                            ...item,
                            quantity: item.quantity + quantity,
                        };
                    }

                    return item;
                });
            }

            return [
                ...prevCart,
                {
                    ...event,
                    quantity: quantity,
                },
            ];
        });
    }

    function removeFromCart(id) {
        setCart((prevCart) => {
            return prevCart.filter((item) => item.id !== id);
        });
    }

    function updateQuantity(id, newQuantity) {
        setCart((prevCart) => {
            return prevCart.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        quantity: newQuantity > 0 ? newQuantity : 1,
                    };
                }

                return item;
            });
        });
    }

    function clearCart() {
        setCart([]);
    }

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}