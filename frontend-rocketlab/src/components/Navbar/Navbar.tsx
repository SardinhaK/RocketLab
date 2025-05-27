// src/components/Navbar/Navbar.tsx
import React, { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext'; // Ajuste o caminho se necessário

const logoUrl = "https://static.wixstatic.com/media/17abf2_d761be71b6264685adf250c96d2adbda~mv2.png/v1/fill/w_214,h_74,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Logo%20Rocket%20Lab-03.png";

// Ícones (placeholders, substitua por SVGs reais ou de uma biblioteca)
const SearchIconNav = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);
const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white hover:text-orange-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);
const HeartIconNav = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white hover:text-orange-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
);


interface NavbarProps {
    searchTerm: string;
    onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
    // Você pode adicionar onSearchSubmit se quiser uma ação ao pressionar Enter
}

export const Navbar: React.FC<NavbarProps> = ({ searchTerm, onSearchChange }) => {
    const navigate = useNavigate();
    const { getItemCount } = useCart();
    const itemCountOnIcon = getItemCount();

    return (
        <nav className="bg-blue-700 shadow-md sticky top-0 z-50 py-2.5">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                {/* Logo */}
                <img
                    src={logoUrl}
                    alt="Logo Rocket Lab"
                    className="h-10 md:h-12 cursor-pointer transition-transform hover:scale-105"
                    onClick={() => navigate('/')}
                    style={{ backgroundColor: 'white' }}
                />

                {/* Barra de Pesquisa Centralizada */}
                <div className="flex-grow max-w-xl mx-4 relative">
                    <input
                        type="text"
                        placeholder="O que você está procurando?"
                        value={searchTerm}
                        onChange={onSearchChange}
                        className="w-full py-2.5 px-4 pl-10 text-sm text-gray-800 bg-white rounded-full border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none shadow-sm"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <SearchIconNav />
                    </div>
                </div>

                {/* Ícones à Direita */}
                <div className="flex items-center space-x-4 md:space-x-6">
                    <button onClick={() => alert('Funcionalidade de Login/Usuário não implementada')} aria-label="Minha conta" className="hidden sm:block">
                        <UserIcon />
                    </button>
                    <button onClick={() => alert('Funcionalidade de Favoritos não implementada')} aria-label="Favoritos" className="hidden sm:block">
                        <HeartIconNav />
                    </button>
                    <button
                        onClick={() => navigate('/carrinho')}
                        className="relative text-white hover:text-orange-300 transition-colors"
                        aria-label="Carrinho de compras"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {itemCountOnIcon > 0 && (
                            <span className="absolute -top-2 -right-2.5 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center leading-none animate-bounce">
                                {itemCountOnIcon}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
};