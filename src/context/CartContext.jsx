import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  addToCart as addCartItem,
  getTotal as getCartTotal,
  removeFromCart as removeCartItem,
  updateQuantity as updateCartItemQuantity,
} from "../data/cart";

const CART_STORAGE_KEY = "craftcommerce_cart";

const CartContext = createContext(null);

const loadCartFromStorage = () => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const rawCart = window.localStorage.getItem(CART_STORAGE_KEY);

    if (!rawCart) {
      return [];
    }

    const parsedCart = JSON.parse(rawCart);
    return Array.isArray(parsedCart) ? parsedCart : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(loadCartFromStorage);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((product, customizationData = {}) => {
    setCart((currentCart) => addCartItem(currentCart, product, customizationData));
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((currentCart) => removeCartItem(currentCart, id));
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    setCart((currentCart) => updateCartItemQuantity(currentCart, id, quantity));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const getTotal = useCallback(() => getCartTotal(cart), [cart]);

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotal,
    }),
    [cart, addToCart, removeFromCart, updateQuantity, clearCart, getTotal],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};
