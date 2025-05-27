// src/pages/Favorites/Favorites.tsx
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../../contexts/FavoritesContext';

// Componentes
import { Navbar } from '../../components/Navbar/Navbar';
import { ProductCard } from '../../components/ProductCard/ProductCard';
// import { PageFooter } from './ProductDetail'; // Se o PageFooter for reutilizável

// Ícones
const EmptyFavoritesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-orange-400 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
);

const TrashIconRed = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);
const ExploreIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);


// Footer (reutilizando a definição, caso não seja um componente global)
const PageFooter = () => (
    <footer className="bg-gray-800 border-t border-gray-700 mt-auto text-white">
        <div className="container mx-auto py-4 px-4 text-center text-sm">
            &copy; {new Date().getFullYear()} Rocket Lab - Tecnologia que impulsiona seus sonhos.
        </div>
    </footer>
);


const FavoritesPage = () => {
    const navigate = useNavigate();
    const { favorites, removeFromFavorites } = useFavorites();


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-orange-400 flex flex-col">
            <Navbar />
            <main className="flex-grow container mx-auto max-w-6xl p-4 sm:p-6 lg:p-8 my-8 sm:my-12">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 sm:mb-10 text-center shadow-sm">
                    Meus Favoritos
                </h1>
                {favorites.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-2xl p-8 sm:p-12 text-center flex flex-col items-center">
                        <EmptyFavoritesIcon />
                        <p className="text-xl sm:text-2xl text-gray-700 font-semibold mb-4">Sua lista de favoritos está vazia.</p>
                        <p className="text-gray-500 mb-8">Adicione produtos que você ama para vê-los aqui!</p>
                        <button
                            className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 text-base flex items-center justify-center"
                            onClick={() => navigate('/')}
                        >
                            <ExploreIcon />
                            Explorar Produtos
                        </button>
                    </div>
                ) : (
                    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {favorites.map((product) => (
                            <li key={product.id} className="flex flex-col items-center">
                                <ProductCard product={product} />
                                <button
                                    onClick={() => removeFromFavorites(product.id)}
                                    className="mt-3 bg-red-100 text-red-700 hover:bg-red-200 font-medium py-2 px-4 rounded-lg text-xs sm:text-sm flex items-center justify-center transition-colors duration-150 shadow-sm"
                                    aria-label={`Remover ${product.name} dos favoritos`}
                                >
                                    <TrashIconRed />
                                    Remover
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </main>
            <PageFooter />
        </div>
    );
};

export default FavoritesPage;