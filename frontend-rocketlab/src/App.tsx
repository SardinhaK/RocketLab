import { BrowserRouter, Route, Routes } from 'react-router-dom' 
import './App.css'
import Home from './Pages/Home/Home'
import ProductDetail from './Pages/Product/ProductDetail'
import Cart from './Pages/Cart/Cart'
import { CartProvider } from './contexts/CartContext';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produto/:id" element={<ProductDetail />} />
          <Route path="/carrinho" element={<Cart />} />
          <Route path="*" element={<div style={{color: 'red', fontWeight: 'bold'}}>Página não encontrada ou erro de rota</div>} />
        </Routes>
        <div style={{position: 'fixed', bottom: 0, left: 0, background: '#eee', color: '#333', padding: 4, fontSize: 12}}>
          Se você vê este texto, o React está renderizando o App normalmente.
        </div>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
