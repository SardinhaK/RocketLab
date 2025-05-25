// src/components/Sidebar/Sidebar.tsx
import React, { ChangeEvent } from 'react';

interface SidebarProps {
    uniqueCategories: string[];
    selectedCategory: string;
    onCategoryChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    // Adicione aqui props para outros filtros (preço, avaliação, etc.)
}

export const Sidebar: React.FC<SidebarProps> = ({
    uniqueCategories,
    selectedCategory,
    onCategoryChange,
}) => {
    return (
        <aside className="w-full md:w-64 lg:w-72 bg-white p-4 sm:p-5 shadow-lg rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-blue-700 mb-4 border-b pb-2">Filtros</h3>
            
            {/* Filtro de Categoria */}
            <div>
                <label htmlFor="category-sidebar" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Categorias
                </label>
                <select
                    id="category-sidebar"
                    value={selectedCategory}
                    onChange={onCategoryChange}
                    className="w-full p-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm appearance-none"
                >
                    {uniqueCategories.map(category => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            {/* Placeholder para outros filtros */}
            <div className="mt-6 pt-4 border-t">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Outros Filtros</h4>
                <p className="text-xs text-gray-500">
                    (Ex: Faixa de preço, Avaliação, Marcas - a serem implementados)
                </p>
            </div>
        </aside>
    );
};