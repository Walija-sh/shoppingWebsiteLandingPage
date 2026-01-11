import { useContext, useMemo, useState, useEffect } from "react";
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
      {isMobile && showFilters && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" />
      )}
      
      <div className="max-w-7xl mx-auto px-6 py-16">
        <header className="mb-14">
          <p className="text-sm text-gray-500 mb-2">All Products</p>
          <h1 className="text-4xl md:text-5xl font-bold">Explore Our Catalog</h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-16">
          {/* DESKTOP FILTER SIDEBAR */}
          {!isMobile && (
            <FilterSidebar
              isMobile={false}
              showFilters={true}
              onClose={handleCancelFilters}
              onApply={handleApplyFilters}
              onClear={handleClearFilters}
              draftValues={draftFilters}
              onDraftChange={handleDraftChange}
            />
          )}

          {/* PRODUCTS SECTION */}
          <section>
            {/* Top bar with filter button and results count */}
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm text-gray-500">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </p>

              <div className="flex items-center gap-3">
                {/* View toggle buttons */}
                <div className="flex items-center p-1 bg-gray-100/80 rounded-full">
                  <button
                    onClick={() => setLayout("grid")}
                    className={`p-1.5 rounded-full transition-all cursor-pointer ${
                      layout === "grid" 
                        ? "bg-white shadow-sm text-black border" 
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    title="Grid View"
                  >
                    <HiOutlineSquares2X2 className="text-lg" />
                  </button>
                  
                  <button
                    onClick={() => setLayout("list")}
                    className={`p-1.5 rounded-full transition-all cursor-pointer ${
                      layout === "list" 
                        ? "bg-white shadow-sm text-black border" 
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    title="List View"
                  >
                    <HiOutlineBars4 className="text-lg" />
                  </button>
                </div>

                {/* Mobile Filter Button */}
                {isMobile && (
                  <button
                    onClick={() => setShowFilters(true)}
                    className="flex items-center gap-2 bg-[#F5F5F7] px-4 py-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <HiOutlineAdjustmentsHorizontal />
                    Filters
                  </button>
                )}
              </div>
            </div>

            {/* Products grid/list */}
            <div className={layout === "grid" ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12" : "flex flex-col gap-6"}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} list={layout === "list"} />
              ))}
            </div>
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