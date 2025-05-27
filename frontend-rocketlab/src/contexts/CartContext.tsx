// src/contexts/CartContext.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'; // Adicionado useEffect e ReactNode explicitamente

// Seus tipos (estão corretos)
export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  rating?: number;
};
export type CartItem = Product & { quantity: number };

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void; // Ajustei a lógica desta na implementação
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart deve ser usado dentro de um CartProvider');
  return context;
};

// Chave para o localStorage
const LOCAL_STORAGE_CART_KEY = 'meuCarrinhoRocketLab'; // Você pode escolher o nome que quiser

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // 1. CARREGAR ESTADO INICIAL DO LOCALSTORAGE
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const storedCart = window.localStorage.getItem(LOCAL_STORAGE_CART_KEY);
      if (storedCart) {
        return JSON.parse(storedCart);
      }
    } catch (error) {
      console.error("Erro ao carregar o carrinho do localStorage:", error);
      // Em caso de erro (ex: JSON inválido), retorna um carrinho vazio
    }
    return []; // Retorna um array vazio se não houver nada ou em caso de erro
  });

  // 2. SALVAR NO LOCALSTORAGE QUANDO O CARRINHO MUDAR
  useEffect(() => {
    try {
      window.localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("Erro ao salvar o carrinho no localStorage:", error);
    }
  }, [cart]); // Este efeito é executado sempre que o estado 'cart' muda

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Garante que o preço é um número
      if (typeof product.price !== 'number' || isNaN(product.price)) {
        console.error("Tentativa de adicionar produto com preço inválido:", product);
        return prevCart; // Não modifica o carrinho se o preço for inválido
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // A função removeFromCart no seu código original decrementava.
  // Se a intenção é remover completamente, o filter é mais direto.
  // Se a intenção era decrementar e remover se chegasse a zero,
  // a função updateQuantity já cobre isso.
  // Vou assumir que removeFromCart remove o item independentemente da quantidade.
  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      // Se a quantidade for 0 ou menor, remove o item do carrinho
      setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === productId ? { ...item, quantity: quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCart([]); // Isso vai disparar o useEffect que limpa o localStorage também
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => {
      const price = typeof item.price === 'number' && !isNaN(item.price) ? item.price : 0;
      const quantity = typeof item.quantity === 'number' && !isNaN(item.quantity) ? item.quantity : 0;
      return sum + price * quantity;
    }, 0);
  };

  const getItemCount = () => {
    return cart.reduce((sum, item) => {
      const quantity = typeof item.quantity === 'number' && !isNaN(item.quantity) ? item.quantity : 0;
      return sum + quantity;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};