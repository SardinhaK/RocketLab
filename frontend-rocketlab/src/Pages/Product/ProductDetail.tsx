// src/pages/ProductDetail/ProductDetail.tsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products as allProductsData } from '../../data/products'; // Ajuste o caminho se necessário
import type { Product as ProductType } from '../../contexts/CartContext'; // Ajuste o caminho se necessário
import { useCart } from '../../contexts/CartContext'; // Ajuste o caminho se necessário

// Componentes de Layout
import { Navbar } from '../../components/Navbar/Navbar'; // ASSUMINDO ESTE CAMINHO E COMPONENTE
// Se você tiver um componente Footer separado, importe-o aqui.
// import { Footer } from '../../components/Footer/Footer';

// Ícones para os botões
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

// Footer similar ao da Home (pode ser um componente separado)
const PageFooter = () => (
    <footer className="bg-gray-800 border-t border-gray-700 mt-auto text-white"> {/* Ajustado para melhor contraste com fundo gradiente */}
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

  // Para a Navbar, se ela precisar de props como `searchTerm` e `onSearchChange`,
  // você precisará fornecê-las ou torná-las opcionais na definição da Navbar.
  // Exemplo: <Navbar searchTerm="" onSearchChange={() => {}} />
  // Por simplicidade, vou renderizá-la sem essas props específicas aqui.
  // Se a Navbar não tiver barra de busca ou for global, pode não precisar delas.

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-orange-400 flex flex-col">
        <Navbar /> {/* Adicionando Navbar aqui */}
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
        <PageFooter /> {/* Adicionando Footer aqui */}
      </div>
    );
  }

  const cartItem = cart.find(item => item.id === product.id);
  const currentQuantity = cartItem ? cartItem.quantity : 0;

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

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
        <Navbar /> {/* Adicionando Navbar aqui */}

        {/* Conteúdo principal da página de detalhes */}
        <main className="flex-grow container mx-auto max-w-5xl p-4 sm:p-6 lg:p-8 my-8 sm:my-12">
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

                {/* Seção de Detalhes */}
                <div className="md:w-1/2 p-6 sm:p-8 md:p-10 flex flex-col">
                    <button
                    onClick={() => navigate(-1)}
                    className="mb-6 text-sm text-blue-600 hover:text-orange-600 font-medium flex items-center self-start transition-colors duration-150 group"
                    >
                    <ArrowLeftIcon />
                    <span className="group-hover:underline">Voltar</span>
                    </button>

                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-800 mb-2 sm:mb-3 leading-tight">
                    {product.name}
                    </h1>

                    {product.category && (
                        <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                            Categoria: <span className="font-medium text-orange-600">{product.category}</span>
                        </p>
                    )}

                    <p className="text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed flex-grow">
                    {product.description || "Descrição detalhada do produto não disponível no momento."}
                    </p>

                    <span className="text-3xl sm:text-4xl font-bold text-orange-500 mb-6 sm:mb-8 block">
                    {formatPrice(product.price)}
                    </span>

                    <div className="mt-auto">
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
        </main>

        <PageFooter /> {/* Adicionando Footer aqui */}
    </div>
  );
};

export default ProductDetail;