import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../../data/products';
import { useCart } from '../../contexts/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === Number(id));

  if (!product) return <div>Produto não encontrado.</div>;

  return (
    <div className="max-w-md mx-auto p-4 border rounded mt-8">
      <img src={product.image} alt={product.name} className="w-48 h-48 object-cover mx-auto mb-4" />
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="mb-2">{product.description}</p>
      <span className="font-semibold mb-4 block">R$ {product.price.toFixed(2)}</span>
      <button className="bg-green-500 text-white px-4 py-2 rounded mr-2" onClick={() => addToCart(product)}>
        Adicionar ao Carrinho
      </button>
      <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => navigate(-1)}>
        Voltar
      </button>
    </div>
  );
};

export default ProductDetail;
