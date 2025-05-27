// src/App.tsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

// Pages
import Home from './Pages/Home/Home';
import ProductDetail from './Pages/Product/ProductDetail';
import Cart from './Pages/Cart/Cart';
import Fav from './Pages/Favorites/Favorites'; // Você nomeou o componente da página de favoritos como 'Fav'

// Providers
import { CartProvider } from './contexts/CartContext';
import { FavoritesProvider } from './contexts/FavoritesContext'; // 1. IMPORTAR O FAVORITESPROVIDER

function App() {
  return (
    // 2. ENVOLVER COM OS PROVIDERS
    // A ordem aqui (CartProvider dentro ou fora de FavoritesProvider)
    // geralmente não importa se eles não dependem um do outro.
    // Manterei o CartProvider mais externo como no seu original,
    // e adicionarei o FavoritesProvider englobando o BrowserRouter.
    <CartProvider>
      <FavoritesProvider> {/* <<<< ADICIONADO AQUI */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produto/:id" element={<ProductDetail />} />
            <Route path="/carrinho" element={<Cart />} />
            <Route path="/favoritos" element={<Fav />} /> {/* Sua rota para favoritos */}
            <Route path="*" element={<div style={{color: 'red', fontWeight: 'bold', textAlign: 'center', marginTop: '50px', fontSize: '24px'}}>Página não encontrada</div>} /> {/* Estilizei um pouco a página de erro */}
          </Routes>
        </BrowserRouter>
      </FavoritesProvider> {/* <<<< FECHADO AQUI */}
    </CartProvider>
  );
}

export default App;