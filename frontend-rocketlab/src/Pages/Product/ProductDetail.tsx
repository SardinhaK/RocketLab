// src/pages/ProductDetail/ProductDetail.tsx
import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products as allProductsData } from '../../data/products'; // Ajuste o caminho se necessário
import type { Product as ProductType } from '../../contexts/CartContext'; // Ajuste o caminho se necessário
import { useCart } from '../../contexts/CartContext'; // Ajuste o caminho se necessário

// Componentes de Layout e Card
import { Navbar } from '../../components/Navbar/Navbar';
import { ProductCard } from '../../components/ProductCard/ProductCard';

// Ícones
const AddToCartIconDetail = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 inline-block ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);
const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);
const MinusIconDetail = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"> <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /> </svg>
);
const PlusIconDetail = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"> <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /> </svg>
);
const StarIcon = ({ className = "h-5 w-5 text-yellow-400" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const PageFooter = () => (
    <footer className="bg-gray-800 border-t border-gray-700 mt-auto text-white">
        <div className="container mx-auto py-4 px-4 text-center text-sm">
            &copy; {new Date().getFullYear()} Rocket Lab - Tecnologia que impulsiona seus sonhos.
        </div>
    </footer>
);


const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { cart, addToCart, updateQuantity } = useCart();

  const products: ProductType[] = allProductsData as ProductType[];
  const product = products.find((p) => p.id === Number(id));

  const suggestedProducts = useMemo(() => {
    if (!product || !product.category) return [];
    return allProductsData
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 3);
  }, [product, allProductsData]);


  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-orange-400 flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto flex flex-col items-center justify-center text-center p-6">
            <div className="bg-white p-8 sm:p-12 rounded-xl shadow-2xl max-w-md w-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-orange-500 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 4a1 1 0 10-2 0v.01a1 1 0 102 0V16zm-2-4a1 1 0 00-1-1H9a1 1 0 100 2h1a1 1 0 001-1zm-2-3a1 1 0 00-1-1H7a1 1 0 100 2h1a1 1 0 001-1z" />
            </svg>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-700 mb-3">Produto não encontrado</h1>
            <p className="text-gray-500 mb-8 text-sm sm:text-base">O produto que você está procurando não existe ou foi removido.</p>
            <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 flex items-center justify-center mx-auto text-sm sm:text-base"
                onClick={() => navigate('/')}
            >
                <ArrowLeftIcon />
                Voltar para a Loja
            </button>
            </div>
        </main>
        <PageFooter />
      </div>
    );
  }

  const cartItem = cart.find(item => item.id === product.id);
  const currentQuantity = cartItem ? cartItem.quantity : 0;

  const formatPrice = (price: number | undefined) => {
    if (typeof price !== 'number' || isNaN(price)) {
        return 'Preço indisponível';
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

  const handleAddToCart = () => {
    addToCart(product);
  };
  const handleIncreaseQuantity = () => {
    updateQuantity(product.id, currentQuantity + 1);
  };
  const handleDecreaseQuantity = () => {
    updateQuantity(product.id, currentQuantity - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-orange-400 flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto max-w-5xl p-4 sm:p-6 lg:p-8 my-8 sm:my-12">
            {/* Card Principal do Produto */}
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                <div className="md:flex">
                    {/* Seção da Imagem */}
                    <div className="md:w-1/2 p-4 sm:p-6 md:p-8 flex justify-center items-center bg-gray-50 md:rounded-l-xl">
                        <img
                            src={product.image || 'https://via.placeholder.com/400x400/E0E0E0/BDBDBD?text=Sem+Imagem'}
                            alt={product.name}
                            className="w-full max-w-md h-auto max-h-[400px] sm:max-h-[500px] object-contain rounded-lg"
                        />
                    </div>

                    {/* Seção de Detalhes (sem as sugestões aqui) */}
                    <div className="md:w-1/2 p-6 sm:p-8 md:p-10 flex flex-col">
                        <button
                            onClick={() => navigate(-1)}
                            className="mb-6 text-sm text-blue-600 hover:text-orange-600 font-medium flex items-center self-start transition-colors duration-150 group"
                        >
                            <ArrowLeftIcon />
                            <span className="group-hover:underline">Voltar</span>
                        </button>

                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-800 mb-1 sm:mb-2 leading-tight">
                            {product.name}
                        </h1>

                        {product.category && (
                            <p className="text-xs sm:text-sm text-gray-500 mb-1">
                                Categoria: <span className="font-medium text-orange-600">{product.category}</span>
                            </p>
                        )}

                        {displayRating && (
                            <div className="flex items-center mb-3 sm:mb-4">
                                <StarIcon />
                                <span className="ml-1.5 text-sm sm:text-base text-gray-700 font-semibold">{displayRating}</span>
                            </div>
                        )}

                        <p className="text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed flex-grow"> {/* flex-grow aqui */}
                            {product.description || "Descrição detalhada do produto não disponível no momento."}
                        </p>
                        {/* A seção de sugestões foi MOVIDA para FORA desta div de detalhes */}

                        <span className="text-3xl sm:text-4xl font-bold text-orange-500 mb-6 sm:mb-8 block mt-auto">
                            {formatPrice(product.price)}
                        </span>

                        <div className="mt-auto"> {/* Div para os botões ficarem sempre na base */}
                            {currentQuantity === 0 ? (
                                <button
                                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 sm:py-3.5 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 text-base sm:text-lg flex items-center justify-center"
                                    onClick={handleAddToCart}
                                >
                                    Adicionar ao Carrinho
                                    <AddToCartIconDetail />
                                </button>
                            ) : (
                                <div className="flex flex-col items-center space-y-3">
                                    <div className="flex items-center justify-between bg-gray-100 rounded-full p-1 w-full max-w-xs shadow-sm">
                                        <button
                                            onClick={handleDecreaseQuantity}
                                            className="p-2.5 sm:p-3 text-orange-600 hover:bg-orange-100 rounded-full transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-orange-300"
                                            aria-label="Diminuir quantidade"
                                        >
                                            <MinusIconDetail />
                                        </button>
                                        <span className="font-semibold text-gray-800 text-base sm:text-lg px-4">{currentQuantity}</span>
                                        <button
                                            onClick={handleIncreaseQuantity}
                                            className="p-2.5 sm:p-3 text-blue-600 hover:bg-blue-100 rounded-full transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                            aria-label="Aumentar quantidade"
                                        >
                                            <PlusIconDetail />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => navigate('/carrinho')}
                                        className="text-sm text-blue-600 hover:text-orange-600 font-medium hover:underline transition-colors duration-150"
                                    >
                                        Ver Carrinho
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* NOVA POSIÇÃO: Seção de Sugestões de Compra (Abaixo do card principal) */}
            {suggestedProducts.length > 0 && (
                <section className="mt-12 pt-8 border-t border-gray-200"> {/* Usando <section> e ajuste de margem/padding */}
                    <h3 className="text-2xl font-semibold text-orange-50 mb-6 text-center sm:text-3xl">
                        Você também pode gostar
                    </h3>
                    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                        {/* Como ProductCard tem max-w, 3 colunas devem funcionar bem no container max-w-5xl */}
                        {suggestedProducts.map(p => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </ul>
                </section>
            )}
        </main>
        <PageFooter />
    </div>
  );
};

export default ProductDetail;