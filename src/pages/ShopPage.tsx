import React, { useState, useMemo } from 'react';
import { Breadcrumb } from '../components/shop/Breadcrumb';
import { FilterSidebar, FilterState } from '../components/shop/FilterSidebar';
import { CategoryProductCard } from '../components/shop/CategoryProductCard';
import { Pagination } from '../components/shop/Pagination';
import { categoryProducts } from '../data/categoryProducts';
import { FiSliders, FiChevronDown } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export const ShopPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('Most Popular');

  const [filters, setFilters] = useState<FilterState>({
    category: '',
    minPrice: 50,
    maxPrice: 200,
    color: '#063AF5', // Blue selected by default matching image
    size: 'Large', // Large selected by default matching image
    dressStyle: 'Casual', // Casual selected matching image
  });

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return categoryProducts.filter((product) => {
      // Category filter
      if (filters.category && product.category !== filters.category) {
        return false;
      }
      // Max price filter
      if (product.price > filters.maxPrice) {
        return false;
      }
      return true;
    });
  }, [filters]);

  const displayProducts = filteredProducts.length > 0 ? filteredProducts : categoryProducts;

  const activeCategoryTitle = filters.category || filters.dressStyle || 'Casual';

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: activeCategoryTitle },
          ]}
        />

        {/* 2-Column Layout: Sidebar Filters + Products Grid */}
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden md:block w-[260px] lg:w-[295px] flex-shrink-0 sticky top-24">
            <FilterSidebar filters={filters} onFilterChange={setFilters} />
          </div>

          {/* Mobile Filter Drawer Overlay */}
          <AnimatePresence>
            {mobileFilterOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex md:hidden"
                onClick={() => setMobileFilterOpen(false)}
              >
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  onClick={(e) => e.stopPropagation()}
                  className="mt-auto w-full max-h-[85vh] overflow-y-auto bg-white rounded-t-[28px] p-5 shadow-2xl"
                >
                  <FilterSidebar
                    filters={filters}
                    onFilterChange={setFilters}
                    onCloseMobile={() => setMobileFilterOpen(false)}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Right Column: Products Area */}
          <main className="flex-1 w-full">
            
            {/* Header: Title, Total count, Sort dropdown, and Mobile filter toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-theme-text-main font-display">
                  {activeCategoryTitle}
                </h1>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 text-xs sm:text-sm text-theme-text-muted">
                <span className="font-normal text-xs sm:text-sm">
                  Showing 1-10 of 100 Products
                </span>

                {/* Sort By Dropdown */}
                <div className="relative inline-flex items-center gap-1 text-theme-text-main font-medium">
                  <span className="text-theme-text-muted hidden sm:inline">Sort by:</span>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-transparent pr-5 py-1 text-xs sm:text-sm font-semibold text-theme-text-main focus:outline-none cursor-pointer"
                    >
                      <option value="Most Popular">Most Popular</option>
                      <option value="Price: Low to High">Price: Low to High</option>
                      <option value="Price: High to Low">Price: High to Low</option>
                      <option value="Newest">Newest</option>
                      <option value="Top Rated">Top Rated</option>
                    </select>
                    <FiChevronDown
                      size={14}
                      className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-theme-text-main"
                    />
                  </div>
                </div>

                {/* Mobile Filter Toggle Button */}
                <button
                  onClick={() => setMobileFilterOpen(true)}
                  className="md:hidden p-2 rounded-full bg-theme-bg-light text-theme-text-main hover:bg-coffee-100 transition-colors cursor-pointer"
                  aria-label="Open filter menu"
                >
                  <FiSliders size={18} className="rotate-90" />
                </button>
              </div>
            </div>

            {/* 3-Column Products Grid (matching Category Page 1.png) */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {displayProducts.map((product, index) => (
                <CategoryProductCard
                  key={product.id}
                  product={product}
                  index={index}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="mt-10">
              <Pagination
                currentPage={currentPage}
                totalPages={10}
                onPageChange={setCurrentPage}
              />
            </div>

          </main>
        </div>

      </div>
    </div>
  );
};
