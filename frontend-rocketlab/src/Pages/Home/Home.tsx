// src/pages/Home/Home.tsx
import React, { useState, useMemo, ChangeEvent } from "react";
import { products as allProductsData } from '../../data/products'; // Ajuste o caminho
import type { Product as ProductType } from '../../contexts/CartContext'; // Ajuste o caminho

// Componentes
import { Navbar } from '../../components/Navbar/Navbar'; // Ajuste o caminho
import { Sidebar } from '../../components/Sidebar/Sidebar'; // Ajuste o caminho
import { ProductCard } from '../../components/ProductCard/ProductCard'; // Ajuste o caminho

// Ícone para "nenhum produto"
const NoProductsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 4a1 1 0 10-2 0v.01a1 1 0 102 0V16zm-2-4a1 1 0 00-1-1H9a1 1 0 100 2h1a1 1 0 001-1zm-2-3a1 1 0 00-1-1H7a1 1 0 100 2h1a1 1 0 001-1z" />
    </svg>
);


export const Home = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Todas"); // "Todas" como padrão

    // Tipar explicitamente allProductsData
    const allProducts: ProductType[] = allProductsData as ProductType[];

    const uniqueCategories = useMemo(() => {
        const categories = Array.from(new Set(allProducts.map(p => p.category).filter(Boolean) as string[]));
        return ["Todas", ...categories.sort((a, b) => a.localeCompare(b))];
    }, [allProducts]);

    const filteredProducts = useMemo(() => {
        return allProducts.filter(product => {
            const nameMatch = searchTerm === "" || product.name.toLowerCase().includes(searchTerm.toLowerCase());
            const categoryMatch = selectedCategory === "Todas" || product.category === selectedCategory;
            return nameMatch && categoryMatch;
        });
    }, [allProducts, searchTerm, selectedCategory]);

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };
    
    // Estado para controlar a visibilidade da sidebar em mobile
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Navbar searchTerm={searchTerm} onSearchChange={handleSearchChange} />

            <div className="container mx-auto flex-grow p-4 sm:p-6 lg:p-8 flex flex-col md:flex-row gap-6 lg:gap-8">
                {/* Botão para abrir Sidebar em Telas Pequenas */}
                <div className="md:hidden mb-4 text-center">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors flex items-center justify-center w-full"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                        {isSidebarOpen ? "Fechar Filtros" : "Abrir Filtros"}
                    </button>
                </div>

                {/* Sidebar */}
                {/* Em telas pequenas, a sidebar pode ser condicional ou um modal */}
                <div className={`md:block ${isSidebarOpen ? 'block' : 'hidden'} mb-6 md:mb-0`}>
                    <Sidebar
                        uniqueCategories={uniqueCategories}
                        selectedCategory={selectedCategory}
                        onCategoryChange={handleCategoryChange}
                    />
                </div>

                {/* Conteúdo Principal (Grid de Produtos) */}
                <main className="flex-grow">
                    {filteredProducts.length > 0 ? (
                        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4"> {/* Ajustado para 4 colunas em XL para acomodar sidebar */}
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </ul>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-center py-12 h-full bg-white rounded-lg shadow">
                            <NoProductsIcon />
                            <h3 className="mt-4 text-xl font-semibold text-gray-700">Nenhum produto encontrado</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Tente ajustar seus filtros ou limpar a busca.
                            </p>
                        </div>
                    )}
                </main>
            </div>

            <footer className="bg-gray-200 border-t border-gray-300 mt-auto">
                <div className="container mx-auto py-4 px-4 text-center text-gray-700 text-sm">
                    &copy; {new Date().getFullYear()} Rocket Lab - Tecnologia que impulsiona seus sonhos.
                </div>
            </footer>
        </div>
    );
};

export default Home;