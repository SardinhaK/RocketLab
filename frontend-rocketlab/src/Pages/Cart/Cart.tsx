import { useCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, clearCart, getTotal } = useCart();
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto p-4 mt-8">
      <h1 className="text-2xl font-bold mb-4">Carrinho de Compras</h1>
      {cart.length === 0 ? (
        <div>
          <p>Seu carrinho está vazio.</p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={() => navigate('/')}>Voltar para Home</button>
        </div>
      ) : (
        <>
          <ul className="divide-y mb-4">
            {cart.map((item) => (
              <li key={item.id} className="flex items-center justify-between py-2">
                <div>
                  <span className="font-semibold">{item.name}</span> x{item.quantity}
                  <span className="ml-2 text-gray-500">R$ {item.price.toFixed(2)}</span>
                </div>
                <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => removeFromCart(item.id)}>
                  Remover
                </button>
              </li>
            ))}
          </ul>
          <div className="font-bold text-lg mb-4">Total: R$ {getTotal().toFixed(2)}</div>
          <button className="bg-green-600 text-white px-4 py-2 rounded mr-2" onClick={() => {clearCart();alert('Compra finalizada!')}}>
            Finalizar Compra
          </button>
          <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => navigate('/')}>Continuar Comprando</button>
        </>
      )}
    </div>
  );
};

export default Cart;
