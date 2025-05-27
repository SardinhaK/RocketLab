// src/contexts/FavoritesContext.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// Importando o tipo Product do seu CartContext ou de um arquivo de tipos compartilhado
// Ajuste o caminho se o CartContext.tsx estiver em um local diferente
import type { Product as ProductType } from './CartContext';

export interface FavoritesContextType {
  favorites: ProductType[];
  addToFavorites: (product: ProductType) => void;
  removeFromFavorites: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  getFavoritesCount: () => number;
  toggleFavorite: (product: ProductType) => void; // Função unificada para adicionar/remover
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites deve ser usado dentro de um FavoritesProvider');
  }
  return context;
};

const LOCAL_STORAGE_FAVORITES_KEY = 'meusFavoritosRocketLab'; // Chave única para o localStorage

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<ProductType[]>(() => {
    try {
      const storedFavorites = window.localStorage.getItem(LOCAL_STORAGE_FAVORITES_KEY);
      if (storedFavorites) {
        return JSON.parse(storedFavorites);
      }
    } catch (error) {
      console.error("Erro ao carregar favoritos do localStorage:", error);
    }
    return [];
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(LOCAL_STORAGE_FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error("Erro ao salvar favoritos no localStorage:", error);
    }
  }, [favorites]);

  const addToFavorites = (product: ProductType) => {
    setFavorites((prevFavorites) => {
      // Evitar duplicatas
      if (!prevFavorites.find(item => item.id === product.id)) {
        return [...prevFavorites, product];
      }
      return prevFavorites;
    });
  };

  const removeFromFavorites = (productId: number) => {
    setFavorites((prevFavorites) => prevFavorites.filter(item => item.id !== productId));
  };

  const isFavorite = (productId: number): boolean => {
    return favorites.some(item => item.id === productId);
  };

  const getFavoritesCount = (): number => {
    return favorites.length;
  };

  // Função unificada para adicionar/remover, útil para o botão de toggle
  const toggleFavorite = (product: ProductType) => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        getFavoritesCount,
        toggleFavorite, // Expondo a nova função
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};