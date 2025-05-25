// src/components/ProductCard/ProductCard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product as ProductType } from '../../contexts/CartContext'; // Ajuste o caminho
import { useCart } from '../../contexts/CartContext'; // Ajuste o caminho

// Ícones para o card
const MinusIconCard = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"> <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /> </svg>
);
const PlusIconCard = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"> <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /> </svg>
);
const AddToCartIconCard = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4 inline-block ml-1 group-hover:text-orange-200 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"> <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /> </svg>
);
const HeartIconCard = () => ( // Ícone de Favoritar
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-red-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
);


interface ProductCardProps {
    product: ProductType;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const navigate = useNavigate();
    const { cart, addToCart, updateQuantity } = useCart();

    const cartItem = cart.find(item => item.id === product.id);
    const currentQuantity = cartItem ? cartItem.quantity : 0;

    const formatPrice = (price: number) => {
        return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    return (
        <li className="bg-white border border-gray-200 rounded-md shadow group transition-all duration-150 hover:shadow-lg hover:border-blue-400 hover:scale-105 flex flex-col items-center p-1 md:p-2 lg:p-2 min-h-[170px] max-w-[140px] mx-auto aspect-[3/4]">
            {/* Ícone de Favoritar (placeholder) */}
            <button 
                onClick={() => alert(`Favoritar ${product.name} - não implementado`)}
                className="absolute top-2 right-2 p-1.5 bg-white/70 backdrop-blur-sm rounded-full hover:bg-red-100 z-10 focus:outline-none"
                aria-label="Favoritar produto"
            >
                <HeartIconCard />
            </button>
            <div 
                className="relative w-full h-16 sm:h-20 md:h-20 flex items-center justify-center overflow-hidden mb-1 cursor-pointer"
                onClick={() => navigate(`/produto/${product.id}`)}
            >
                <img 
                    src={product.image || 'https://via.placeholder.com/200x150/E0E0E0/BDBDBD?text=Sem+Imagem'}
                    alt={product.name} 
                    className="max-h-full w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                />
            </div>
            <div className="p-1 flex flex-col flex-grow w-full">
                <h2 
                    className="text-[11px] sm:text-xs font-semibold text-blue-700 mb-0.5 group-hover:text-orange-600 transition-colors h-7 overflow-hidden cursor-pointer text-center"
                    title={product.name} 
                    style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
                    onClick={() => navigate(`/produto/${product.id}`)}
                >
                    {product.name}
                </h2>
                <span className="text-xs sm:text-sm font-bold text-orange-500 mb-0.5 text-center">
                    {formatPrice(product.price)}
                </span>
                <div className="mt-1 text-[10px] sm:text-xs w-full">
                    {currentQuantity === 0 ? (
                        <button 
                            className="group w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium py-1 px-1.5 rounded-full shadow hover:shadow-md transition-all duration-150 flex items-center justify-center"
                            onClick={() => addToCart(product)}
                        >
                            Adicionar <AddToCartIconCard />
                        </button>
                    ) : (
                        <div className="flex items-center justify-between bg-gray-100 rounded-full">
                            <button
                                onClick={() => updateQuantity(product.id, currentQuantity - 1)}
                                className="p-1.5 text-orange-600 hover:bg-orange-100 rounded-full transition-colors"
                                aria-label="Diminuir quantidade"
                            >
                                <MinusIconCard />
                            </button>
                            <span className="font-semibold text-gray-700">{currentQuantity}</span>
                            <button
                                onClick={() => updateQuantity(product.id, currentQuantity + 1)}
                                className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                                aria-label="Aumentar quantidade"
                            >
                                <PlusIconCard />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </li>
    );
};