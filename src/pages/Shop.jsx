import { useContext, useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";
import { HiOutlineAdjustmentsHorizontal, HiOutlineSquares2X2, HiOutlineBars4 } from "react-icons/hi2";

const Shop = () => {
  const { products } = useContext(AppContext);
  const MIN_PRICE = 0;
  const MAX_PRICE = 2000;

  const defaultFilters = {
    category: "all",
    minPrice: MIN_PRICE,
    maxPrice: MAX_PRICE,
    sizes: [],
    colors: [],
    tags: [],
    sort: "default"
  };

  const [filters, setFilters] = useState(defaultFilters);
  const [draftFilters, setDraftFilters] = useState(defaultFilters);
  const [showFilters, setShowFilters] = useState(false);
  const [layout, setLayout] = useState("grid");
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Reset draft values when mobile filters close
  useEffect(() => {
    if (isMobile && !showFilters) {
      setDraftFilters(filters);
    }
  }, [isMobile, showFilters, filters]);

  const handleApplyFilters = () => {
    setFilters(draftFilters);
    setShowFilters(false);
  };
 
  const handleClearFilters = () => {
    setDraftFilters(defaultFilters);
    setFilters(defaultFilters);
  };

  const handleCancelFilters = () => {
    setDraftFilters(filters);
    setShowFilters(false);
  };

  const handleDraftChange = (field, value) => {
    setDraftFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // FILTERING LOGIC
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. Category
    if (filters.category !== "all") {
      result = result.filter((p) => p.category === filters.category);
    }

    // 2. Price Range
    if (filters.minPrice !== MIN_PRICE) {
      result = result.filter(p => p.price >= filters.minPrice);
    }

    if (filters.maxPrice !== MAX_PRICE) {
      result = result.filter(p => p.price <= filters.maxPrice);
    }

    // 3. Sizes
    if (filters.sizes && filters.sizes.length > 0) {
      result = result.filter((p) => 
        p.sizes.some(size => filters.sizes.includes(size))
      );
    }

    // 4. Colors 
    if (filters.colors && filters.colors.length > 0) {
      result = result.filter((p) => 
        p.colors.some(color => filters.colors.includes(color))
      );
    }

    // 5. Tags 
    if (filters.tags && filters.tags.length > 0) {
      result = result.filter((p) => 
        p.tags.some(tag => filters.tags.includes(tag))
      );
    }

    // 6. Sorting
    if (filters.sort === "price-low") result.sort((a, b) => a.price - b.price);
    else if (filters.sort === "price-high") result.sort((a, b) => b.price - a.price);
    else if (filters.sort === "name-az") result.sort((a, b) => a.title.localeCompare(b.title));
    else if (filters.sort === "name-za") result.sort((a, b) => b.title.localeCompare(a.title));

    return result;
  }, [products, filters]);

  return (
    <div className="bg-white min-h-screen">
      {/* Mobile filter overlay */}
      <AnimatePresence>
        {isMobile && showFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>
      
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.header 
          className="mb-14"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.p 
            className="text-sm text-gray-500 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            All Products
          </motion.p>
          <motion.h1 
            className="text-4xl md:text-5xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore Our Catalog
          </motion.h1>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-16">
          {/* DESKTOP FILTER SIDEBAR */}
          <AnimatePresence>
            {!isMobile && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <FilterSidebar
                  isMobile={false}
                  showFilters={true}
                  onClose={handleCancelFilters}
                  onApply={handleApplyFilters}
                  onClear={handleClearFilters}
                  draftValues={draftFilters}
                  onDraftChange={handleDraftChange}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* PRODUCTS SECTION */}
          <section>
            {/* Top bar with filter button and results count */}
            <motion.div 
              className="flex items-center justify-between mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.p 
                className="text-sm text-gray-500"
                key={filteredProducts.length}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </motion.p>

              <div className="flex items-center gap-3">
                {/* View toggle buttons */}
                <div className="flex items-center p-1 bg-gray-100/80 rounded-full">
                  <motion.button
                    onClick={() => setLayout("grid")}
                    className={`p-1.5 rounded-full transition-all cursor-pointer ${
                      layout === "grid" 
                        ? "bg-white shadow-sm text-black border" 
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    title="Grid View"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <HiOutlineSquares2X2 className="text-lg" />
                  </motion.button>
                  
                  <motion.button
                    onClick={() => setLayout("list")}
                    className={`p-1.5 rounded-full transition-all cursor-pointer ${
                      layout === "list" 
                        ? "bg-white shadow-sm text-black border" 
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    title="List View"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <HiOutlineBars4 className="text-lg" />
                  </motion.button>
                </div>

                {/* Mobile Filter Button */}
                {isMobile && (
                  <motion.button
                    onClick={() => setShowFilters(true)}
                    className="flex items-center gap-2 bg-[#F5F5F7] px-4 py-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                  >
                    <HiOutlineAdjustmentsHorizontal />
                    Filters
                  </motion.button>
                )}
              </div>
            </motion.div>

            {/* Products grid/list */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${layout}-${filteredProducts.length}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={layout === "grid" ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12" : "flex flex-col gap-6"}
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: Math.min(index * 0.05, 0.5),
                      ease: "easeOut"
                    }}
                    layout
                  >
                    <ProductCard {...product} list={layout === "list"} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Empty state */}
            {filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-20"
              >
                <p className="text-2xl font-bold text-gray-400 mb-2">No products found</p>
                <p className="text-gray-500">Try adjusting your filters</p>
              </motion.div>
            )}
          </section>
        </div>
      </div>

      {/* MOBILE FILTER SIDEBAR */}
      {isMobile && (
        <FilterSidebar
          isMobile={true}
          showFilters={showFilters}
          onClose={handleCancelFilters}
          onApply={handleApplyFilters}
          onClear={handleClearFilters}
          draftValues={draftFilters}
          onDraftChange={handleDraftChange}
        />
      )}
    </div>
  );
};

export default Shop;