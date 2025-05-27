// src/pages/Cart/Cart.tsx
import React from 'react';
import { useCart } from '../../contexts/CartContext'; // Ajuste o caminho se necessário
import { useNavigate } from 'react-router-dom';

// Componentes de Layout
import { Navbar } from '../../components/Navbar/Navbar'; // ASSUMINDO ESTE CAMINHO E COMPONENTE
// Se você tiver um componente Footer separado, importe-o aqui.
// import { Footer } from '../../components/Footer/Footer';

// Ícones (exemplos)
const EmptyCartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-orange-400 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const MinusIconDetail = () => ( // Nome pode ser genérico como MinusIcon se preferir
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
  </svg>
);

const PlusIconDetail = () => ( // Nome pode ser genérico como PlusIcon se preferir
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

const CheckoutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
);


// Footer similar ao da Home (pode ser um componente separado)
const PageFooter = () => (
    <footer className="bg-gray-800 border-t border-gray-700 mt-auto text-white">
        <div className="container mx-auto py-4 px-4 text-center text-sm">
            &copy; {new Date().getFullYear()} Rocket Lab - Tecnologia que impulsiona seus sonhos.
        </div>
    </footer>
);

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotal } = useCart(); // Adicionado updateQuantity
  const navigate = useNavigate();

  // Dentro do seu componente Cart.tsx

const formatPrice = (price: number | undefined): string => {
  if (typeof price !== 'number' || isNaN(price)) {
    // Você pode logar um erro aqui para ajudar na depuração, se quiser
    // console.error("Tentativa de formatar preço inválido:", price);
    return 'Preço Indisponível'; // Ou 'R$ 0,00' ou como preferir tratar
  }
  return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const calculateItemSubtotal = (price: number | undefined, quantity: number | undefined): number => {
  if (typeof price !== 'number' || isNaN(price) || typeof quantity !== 'number' || isNaN(quantity)) {
    return 0; // Retorna 0 se os dados forem inválidos para o cálculo
  }
  return price * quantity;
};

  // Funções para aumentar/diminuir quantidade (similares ao ProductDetail/ProductCard)
  const handleIncreaseQuantity = (productId: number) => {
    const item = cart.find(p => p.id === productId);
    if (item) {
      updateQuantity(productId, item.quantity + 1);
    }
  };

  const handleDecreaseQuantity = (productId: number) => {
    const item = cart.find(p => p.id === productId);
    if (item) {
      updateQuantity(productId, item.quantity - 1); // useCart deve lidar com a remoção se item.quantity <= 1
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-orange-400 flex flex-col">
      <Navbar /> {/* Assumindo que a Navbar não precisa de props específicas de busca aqui */}

      <main className="flex-grow container mx-auto max-w-4xl p-4 sm:p-6 lg:p-8 my-8 sm:my-12">
        <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-800 mb-6 sm:mb-8 text-center">
            Carrinho de Compras
          </h1>

          {cart.length === 0 ? (
            <div className="text-center py-10 sm:py-16">
              <EmptyCartIcon />
              <p className="text-xl text-gray-600 mb-8">Seu carrinho está vazio.</p>
              <button
                className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 text-base flex items-center justify-center mx-auto"
                onClick={() => navigate('/')}
              >
                <ArrowLeftIcon />
                Continuar Comprando
              </button>
            </div>
          ) : (
            <>
              <ul className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <li key={item.id} className="flex flex-col sm:flex-row items-center py-4 sm:py-6">
                    {/* Imagem do Produto - Assumindo item.image existe */}
                    <img
                      src={item.image || 'https://via.placeholder.com/100x100/E0E0E0/BDBDBD?text=Sem+Imagem'}
                      alt={item.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md mr-0 sm:mr-6 mb-3 sm:mb-0 shadow-sm"
                    />
                    <div className="flex-grow text-center sm:text-left">
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 hover:text-orange-600 cursor-pointer" onClick={() => navigate(`/produto/${item.id}`)}>
                        {item.name}
                      </h2>
                      <p className="text-sm text-gray-500">{formatPrice(item.price)} cada</p>
                    </div>

                    {/* Controles de Quantidade */}
                    <div className="flex items-center my-3 sm:my-0 sm:mx-6 bg-gray-100 rounded-full p-1 shadow-sm">
                        <button
                            onClick={() => handleDecreaseQuantity(item.id)}
                            className="p-2 text-orange-600 hover:bg-orange-100 rounded-full transition-colors duration-150 focus:outline-none"
                            aria-label="Diminuir quantidade"
                        >
                            <MinusIconDetail /> {/* Reutilizando ícone de ProductDetail */}
                        </button>
                        <span className="font-semibold text-gray-700 text-md px-3">{item.quantity}</span>
                        <button
                            onClick={() => handleIncreaseQuantity(item.id)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors duration-150 focus:outline-none"
                            aria-label="Aumentar quantidade"
                        >
                            <PlusIconDetail /> {/* Reutilizando ícone de ProductDetail */}
                        </button>
                    </div>

                    <div className="text-center sm:text-right">
                        <p className="text-md sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-1">
                            {formatPrice(item.price * item.quantity)}
                        </p>
                        <button
                        className="bg-red-500 hover:bg-red-600 text-white font-medium text-xs py-1.5 px-3 rounded-md shadow-sm hover:shadow-md transition-all duration-150 flex items-center"
                        onClick={() => removeFromCart(item.id)}
                        >
                        <TrashIcon />
                        Remover
                        </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-gray-300">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg sm:text-xl font-semibold text-gray-700">Subtotal:</span>
                  <span className="text-xl sm:text-2xl font-bold text-orange-600">{formatPrice(getTotal())}</span>
                </div>
                {/* Você pode adicionar mais informações aqui, como frete, descontos, etc. */}
                <div className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 flex justify-between items-center">
                    <span>Total:</span>
                    <span className="text-orange-600">{formatPrice(getTotal())}</span>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
                  <button
                    className="w-full sm:w-auto order-2 sm:order-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-150 text-base flex items-center justify-center"
                    onClick={() => navigate('/')}
                  >
                    <ArrowLeftIcon />
                    Continuar Comprando
                  </button>
                  <button
                    className="w-full sm:w-auto order-1 sm:order-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 text-base flex items-center justify-center"
                    onClick={() => {
                      // Lógica de checkout aqui
                      alert('Compra finalizada! (simulação)');
                      clearCart();
                      navigate('/'); // Opcional: redirecionar para home após finalizar
                    }}
                  >
                    Finalizar Compra
                    <CheckoutIcon />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <PageFooter />
    </div>
  );
};

export default Cart;