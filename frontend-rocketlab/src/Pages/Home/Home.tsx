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
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [minRating, setMinRating] = useState("");
    const [maxRating, setMaxRating] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Todas"); // "Todas" como padrão

    // Tipar explicitamente allProductsData
    const allProducts: ProductType[] = allProductsData as ProductType[];

    const uniqueCategories = useMemo(() => {
        const categories = Array.from(new Set(allProducts.map(p => p.category).filter(Boolean) as string[]));
        return ["Todas", ...categories.sort((a, b) => a.localeCompare(b))];
    }, [allProducts]);

    // 1. CRIAR FUNÇÕES DE CALLBACK PARA OS NOVOS FILTROS
    const handleMinPriceChange = (event: ChangeEvent<HTMLInputElement>) => setMinPrice(event.target.value);
    const handleMaxPriceChange = (event: ChangeEvent<HTMLInputElement>) => setMaxPrice(event.target.value);
    const handleMinRatingChange = (event: ChangeEvent<HTMLInputElement>) => setMinRating(event.target.value);
    const handleMaxRatingChange = (event: ChangeEvent<HTMLInputElement>) => setMaxRating(event.target.value);

    // 2. CRIAR FUNÇÃO PARA LIMPAR TODOS OS FILTROS
    const handleClearFilters = () => {
        setSearchTerm("");
        setSelectedCategory("Todas");
        setMinPrice("");
        setMaxPrice("");
        setMinRating("");
        setMaxRating("");
        // Se tiver outros estados de filtro, resete-os aqui também
    };

    // 3. ATUALIZAR LÓGICA DE FILTRAGEM
    const filteredProducts = useMemo(() => {
        return allProducts.filter(product => {
            const nameMatch = searchTerm === "" || product.name.toLowerCase().includes(searchTerm.toLowerCase());
            const categoryMatch = selectedCategory === "Todas" || product.category === selectedCategory;

            // Lógica para filtro de preço
            const productPrice = product.price; // Assumindo que product.price é um número
            const minPriceFloat = parseFloat(minPrice);
            const maxPriceFloat = parseFloat(maxPrice);

            const minPriceMatch = minPrice === "" || isNaN(minPriceFloat) || productPrice >= minPriceFloat;
            const maxPriceMatch = maxPrice === "" || isNaN(maxPriceFloat) || productPrice <= maxPriceFloat;
            const priceMatch = minPriceMatch && maxPriceMatch;

            // Lógica para filtro de nota (rating)
            // Certifique-se que seus produtos têm a propriedade 'rating' e que ela é um número.
            // Se 'rating' for opcional, trate o caso de ser undefined.
            const productRating = product.rating;
            const minRatingFloat = parseFloat(minRating);
            const maxRatingFloat = parseFloat(maxRating);

            const minRatingMatch = minRating === "" || isNaN(minRatingFloat) || (typeof productRating === 'number' && productRating >= minRatingFloat);
            const maxRatingMatch = maxRating === "" || isNaN(maxRatingFloat) || (typeof productRating === 'number' && productRating <= maxRatingFloat);
            // Se o produto não tiver rating, ele não deve ser filtrado por rating, a menos que um valor específico seja esperado.
            // Uma abordagem é: se o produto não tem rating, ele passa no filtro de rating (a menos que um filtro específico seja definido e não satisfeito).
            // Ou, se productRating for undefined, ele não passaria se minRating ou maxRating estiverem definidos.
            // A lógica abaixo assume que se o produto não tem rating, ele só passa se os filtros de rating não estiverem preenchidos.
            // Se product.rating for opcional, você pode precisar ajustar esta lógica.
            // Para simplificar: se product.rating não existir, não aplicamos o filtro de nota, a menos que o filtro esteja vazio.
            let ratingMatch = true;
            if (typeof productRating === 'number') { // Só filtra se o produto tiver nota
                ratingMatch = minRatingMatch && maxRatingMatch;
            } else {
                // Se o produto não tem nota, ele só "passa" se os filtros de nota não estiverem definidos.
                // Se algum filtro de nota estiver definido, e o produto não tem nota, ele não passa.
                if (minRating !== "" || maxRating !== "") {
                    ratingMatch = false;
                }
            }


            return nameMatch && categoryMatch && priceMatch && ratingMatch;
        });
    }, [allProducts, searchTerm, selectedCategory, minPrice, maxPrice, minRating, maxRating]); // Adicionar novos estados às dependências

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-700 to-orange-700 flex flex-col">
            <Navbar searchTerm={searchTerm} onSearchChange={handleSearchChange} />

            <div className="container mx-auto flex-grow p-4 sm:p-6 lg:p-8 flex flex-col md:flex-row gap-6 lg:gap-8">
                <div className="md:hidden mb-4 text-center">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors flex items-center justify-center w-full"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                        {isSidebarOpen ? "Fechar Filtros" : "Abrir Filtros"}
                    </button>
                </div>

                <div className={`md:block ${isSidebarOpen ? 'block' : 'hidden'} mb-6 md:mb-0`}>
                    {/* 4. PASSAR NOVAS PROPS PARA A SIDEBAR */}
                    <Sidebar
                        uniqueCategories={uniqueCategories}
                        selectedCategory={selectedCategory}
                        onCategoryChange={handleCategoryChange}
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        onMinPriceChange={handleMinPriceChange}
                        onMaxPriceChange={handleMaxPriceChange}
                        minRating={minRating}
                        maxRating={maxRating}
                        onMinRatingChange={handleMinRatingChange}
                        onMaxRatingChange={handleMaxRatingChange}
                        onClearFilters={handleClearFilters} // Passando a função para limpar filtros
                    />
                </div>

                <main className="flex-grow">
                    {filteredProducts.length > 0 ? (
                        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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