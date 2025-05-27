// src/components/Sidebar/Sidebar.tsx
import React, { ChangeEvent } from 'react';

interface SidebarProps {
    uniqueCategories: string[];
    selectedCategory: string;
    onCategoryChange: (event: ChangeEvent<HTMLSelectElement>) => void;

    // Props para filtro de preço
    minPrice: string; // Usar string para inputs, converter para número no Home
    maxPrice: string;
    onMinPriceChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onMaxPriceChange: (event: ChangeEvent<HTMLInputElement>) => void;

    // Props para filtro de nota (rating)
    minRating: string; // Usar string para inputs
    maxRating: string;
    onMinRatingChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onMaxRatingChange: (event: ChangeEvent<HTMLInputElement>) => void;

    // Prop para limpar todos os filtros (opcional, mas útil)
    onClearFilters?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
    uniqueCategories,
    selectedCategory,
    onCategoryChange,
    minPrice,
    maxPrice,
    onMinPriceChange,
    onMaxPriceChange,
    minRating,
    maxRating,
    onMinRatingChange,
    onMaxRatingChange,
    onClearFilters
}) => {
    const inputBaseClasses = "w-full p-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm";
    const labelBaseClasses = "block text-xs font-medium text-gray-600 mb-1";

    return (
        <aside className="w-full md:w-64 lg:w-72 bg-white p-4 sm:p-5 shadow-lg rounded-xl border border-gray-200 flex flex-col gap-y-5">
            <div className="flex justify-between items-center border-b pb-2">
                <h3 className="text-lg font-semibold text-blue-700">Filtros</h3>
                {onClearFilters && (
                    <button
                        onClick={onClearFilters}
                        className="text-xs text-blue-600 hover:text-orange-600 hover:underline transition-colors"
                        title="Limpar todos os filtros"
                    >
                        Limpar Tudo
                    </button>
                )}
            </div>

            {/* Filtro de Categoria */}
            <div>
                <label htmlFor="category-sidebar" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Categorias
                </label>
                <select
                    id="category-sidebar"
                    value={selectedCategory}
                    onChange={onCategoryChange}
                    className={`${inputBaseClasses} appearance-none`} // appearance-none para customizar a seta se necessário
                >
                    {uniqueCategories.map(category => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            {/* Filtro de Faixa de Preço */}
            <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Faixa de Preço (R$)</h4>
                <div className="flex flex-col gap-y-2">
                    <div>
                        <label htmlFor="min-price" className={labelBaseClasses}>Mínimo</label>
                        <input
                            type="number"
                            id="min-price"
                            value={minPrice}
                            onChange={onMinPriceChange}
                            placeholder="Ex: 10"
                            min="0"
                            className={inputBaseClasses}
                        />
                    </div>
                    <div>
                        <label htmlFor="max-price" className={labelBaseClasses}>Máximo</label>
                        <input
                            type="number"
                            id="max-price"
                            value={maxPrice}
                            onChange={onMaxPriceChange}
                            placeholder="Ex: 500"
                            min="0"
                            className={inputBaseClasses}
                        />
                    </div>
                </div>
            </div>

            {/* Filtro de Faixa de Nota (Rating) */}
            <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Faixa de Nota (0-5)</h4>
                <div className="flex flex-col gap-y-2">
                    <div>
                        <label htmlFor="min-rating" className={labelBaseClasses}>Mínima</label>
                        <input
                            type="number"
                            id="min-rating"
                            value={minRating}
                            onChange={onMinRatingChange}
                            placeholder="Ex: 1"
                            min="0"
                            max="5"
                            step="0.1" // Permite notas decimais como 4.5
                            className={inputBaseClasses}
                        />
                    </div>
                    <div>
                        <label htmlFor="max-rating" className={labelBaseClasses}>Máxima</label>
                        <input
                            type="number"
                            id="max-rating"
                            value={maxRating}
                            onChange={onMaxRatingChange}
                            placeholder="Ex: 5"
                            min="0"
                            max="5"
                            step="0.1"
                            className={inputBaseClasses}
                        />
                    </div>
                </div>
            </div>

            {/* Você pode adicionar mais filtros aqui seguindo o mesmo padrão */}

        </aside>
    );
};