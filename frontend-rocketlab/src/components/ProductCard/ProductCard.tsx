// src/components/ProductCard/ProductCard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product as ProductType } from '../../contexts/CartContext'; // Usando o mesmo tipo Product
import { useCart } from '../../contexts/CartContext';
import { useFavorites } from '../../contexts/FavoritesContext';

// Ícones para o card
const MinusIconCard = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"> <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /> </svg>
);
const PlusIconCard = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"> <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /> </svg>
);
const AddToCartIconCard = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 inline-block ml-1.5 group-hover:text-orange-200 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"> <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /> </svg>
);

// Ícones de Coração Atualizados
const OutlineHeartIcon = () => ( // Antigo HeartIconCard, agora para não favorito
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 group-hover:text-red-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
);
const FilledHeartIcon = () => ( // Novo ícone para favorito
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
    </svg>
);

const StarIcon = ({ className = "h-3.5 w-3.5 sm:h-4 sm:w-4 text-yellow-400 inline-block" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

interface ProductCardProps {
    product: ProductType;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const navigate = useNavigate();
    const { cart, addToCart, updateQuantity } = useCart();
    const { isFavorite, toggleFavorite } = useFavorites();
    const isProductFavorite = isFavorite(product.id);

    const cartItem = cart.find(item => item.id === product.id);
    const currentQuantity = cartItem ? cartItem.quantity : 0;

    const formatPrice = (price: number) => {
        if (typeof price !== 'number' || isNaN(price)) {
            return 'Preço Indisponível';
        }
        return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const formatRating = (rating: number | undefined) => {
        if (typeof rating === 'number' && !isNaN(rating)) {
            return rating.toFixed(1);
        }
        return null;
    };
    const displayRating = formatRating(product.rating);

    const handleToggleFavorite = () => {
        toggleFavorite(product);
    };

    return (
        <li className="bg-white border border-gray-200 rounded-xl shadow group transition-all duration-150 hover:shadow-lg hover:border-blue-400 hover:scale-105 flex flex-col items-center p-3 md:p-4 min-h-[300px] sm:min-h-[320px] w-full max-w-[200px] sm:max-w-[220px] mx-auto relative">
            <button
                onClick={handleToggleFavorite}
                className="absolute top-3 right-3 p-1.5 bg-white/70 backdrop-blur-sm rounded-full hover:bg-red-100 z-10 focus:outline-none focus:ring-2 focus:ring-red-300"
                aria-label={isProductFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            >
                {isProductFavorite ? <FilledHeartIcon /> : <OutlineHeartIcon />}
            </button>
            <div
                className="relative w-full h-28 sm:h-32 md:h-36 flex items-center justify-center overflow-hidden mb-2 cursor-pointer"
                onClick={() => navigate(`/produto/${product.id}`)}
            >
                <img
                    src={product.image || 'https://via.placeholder.com/200x150/E0E0E0/BDBDBD?text=Sem+Imagem'}
                    alt={product.name}
                    className="max-h-full w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                />
            </div>
            <div className="p-1 flex flex-col flex-grow w-full items-center">
                <h2
                    className="text-xs sm:text-sm font-semibold text-blue-700 mb-0.5 group-hover:text-orange-600 transition-colors h-10 sm:h-12 overflow-hidden cursor-pointer text-center"
                    title={product.name}
                    style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
                    onClick={() => navigate(`/produto/${product.id}`)}
                >
                    {product.name}
                </h2>

                {displayRating && (
                    <div className="flex items-center justify-center text-xs text-gray-600 mb-1">
                        <StarIcon />
                        <span className="ml-1 font-medium">{displayRating}</span>
                    </div>
                )}

                <span className="text-sm sm:text-base font-bold text-orange-500 mb-1.5 text-center">
                    {formatPrice(product.price)}
                </span>
                <div className="mt-auto text-xs sm:text-sm w-full pt-1">
                    {currentQuantity === 0 ? (
                        <button
                            className="group w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium py-1.5 sm:py-2 px-2 rounded-full shadow hover:shadow-md transition-all duration-150 flex items-center justify-center text-xs sm:text-sm"
                            onClick={() => addToCart(product)}
                        >
                            Adicionar <AddToCartIconCard />
                        </button>
                    ) : (
                        <div className="flex items-center justify-between bg-gray-100 rounded-full p-0.5">
                            <button
                                onClick={() => updateQuantity(product.id, currentQuantity - 1)}
                                className="p-2 text-orange-600 hover:bg-orange-100 rounded-full transition-colors"
                                aria-label="Diminuir quantidade"
                            >
                                <MinusIconCard />
                            </button>
                            <span className="font-semibold text-gray-700 px-1 text-sm sm:text-base">{currentQuantity}</span>
                            <button
                                onClick={() => updateQuantity(product.id, currentQuantity + 1)}
                                className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
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