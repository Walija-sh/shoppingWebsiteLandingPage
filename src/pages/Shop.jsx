import { useContext, useMemo, useState, useRef, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";
import { HiOutlineAdjustmentsHorizontal, HiChevronDown, HiCheck } from "react-icons/hi2";

const Shop = () => {
  const { products } = useContext(AppContext);

  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("default");

  // DRAFT FILTER VALUES
  const [draftCategory, setDraftCategory] = useState("all");
  const [draftMinPrice, setDraftMinPrice] = useState("");
  const [draftMaxPrice, setDraftMaxPrice] = useState("");
  const [draftSort, setDraftSort] = useState("default");

  const [showFilters, setShowFilters] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // dropdown states
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false);
  const [isMobileSortOpen, setIsMobileSortOpen] = useState(false);

  // Refs for dropdowns
  const desktopFiltersRef = useRef(null);
  const mobileFiltersRef = useRef(null);
  const categoryDropdownRef = useRef(null);
  const sortDropdownRef = useRef(null);
  const mobileCategoryDropdownRef = useRef(null);
  const mobileSortDropdownRef = useRef(null);

  // Close dropdowns on outside click - DESKTOP
  useEffect(() => {
    const handleClickOutside = (e) => {
      // Desktop filters panel
      if (desktopFiltersRef.current && !desktopFiltersRef.current.contains(e.target)) {
        setShowFilters(false);
      }
      
      // Desktop category dropdown
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(e.target)) {
        setIsCategoryOpen(false);
      }
      
      // Desktop sort dropdown
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(e.target)) {
        setIsSortOpen(false);
      }
      
      // Mobile filters panel
      if (mobileFiltersRef.current && !mobileFiltersRef.current.contains(e.target)) {
        setShowMobileFilters(false);
      }
      
      // Mobile category dropdown - only check if mobile filters are open
      if (showMobileFilters && mobileCategoryDropdownRef.current && !mobileCategoryDropdownRef.current.contains(e.target)) {
        setIsMobileCategoryOpen(false);
      }
      
      // Mobile sort dropdown - only check if mobile filters are open
      if (showMobileFilters && mobileSortDropdownRef.current && !mobileSortDropdownRef.current.contains(e.target)) {
        setIsMobileSortOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMobileFilters]);

  // Reset draft values when mobile filters close
  useEffect(() => {
    if (!showMobileFilters) {
      setDraftCategory(category);
      setDraftMinPrice(minPrice);
      setDraftMaxPrice(maxPrice);
      setDraftSort(sort);
    }
  }, [showMobileFilters, category, minPrice, maxPrice, sort]);

  const applyFilters = () => {
    setCategory(draftCategory);
    setMinPrice(draftMinPrice);
    setMaxPrice(draftMaxPrice);
    setSort(draftSort);
    setShowFilters(false);
    setShowMobileFilters(false);
    setIsMobileCategoryOpen(false);
    setIsMobileSortOpen(false);
  };

  const cancelMobileFilters = () => {
    setShowMobileFilters(false);
    setIsMobileCategoryOpen(false);
    setIsMobileSortOpen(false);
  };

  // Category options
  const categoryOptions = [
    { value: "all", label: "All Products" },
    { value: "Electronics", label: "Electronics" },
    { value: "Furniture", label: "Furniture" },
    { value: "Clothing", label: "Clothing" },
    { value: "Footwear", label: "Footwear" },
    { value: "Accessories", label: "Accessories" },
  ];

  // Sort options
  const sortOptions = [
    { value: "default", label: "Newest" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "name-az", label: "Name: A–Z" },
    { value: "name-za", label: "Name: Z–A" },
  ];

  // Get current category label
  const getCategoryLabel = () => {
    const option = categoryOptions.find(opt => opt.value === draftCategory);
    return option ? option.label : "Select Category";
  };

  // Get current sort label
  const getSortLabel = () => {
    const option = sortOptions.find(opt => opt.value === draftSort);
    return option ? option.label : "Sort By";
  };

  // FILTERING LOGIC
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    if (minPrice) result = result.filter((p) => p.price >= Number(minPrice));
    if (maxPrice) result = result.filter((p) => p.price <= Number(maxPrice));

    if (sort === "price-low") result.sort((a, b) => a.price - b.price);
    if (sort === "price-high") result.sort((a, b) => b.price - a.price);
    if (sort === "name-az") result.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "name-za") result.sort((a, b) => b.title.localeCompare(a.title));

    return result;
  }, [products, category, minPrice, maxPrice, sort]);

  // Toggle functions for better control
  const toggleDesktopCategory = () => {
    setIsCategoryOpen(!isCategoryOpen);
    if (isSortOpen) setIsSortOpen(false);
  };

  const toggleDesktopSort = () => {
    setIsSortOpen(!isSortOpen);
    if (isCategoryOpen) setIsCategoryOpen(false);
  };

  const toggleMobileCategory = () => {
    setIsMobileCategoryOpen(!isMobileCategoryOpen);
    if (isMobileSortOpen) setIsMobileSortOpen(false);
  };

  const toggleMobileSort = () => {
    setIsMobileSortOpen(!isMobileSortOpen);
    if (isMobileCategoryOpen) setIsMobileCategoryOpen(false);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <header className="mb-14">
          <p className="text-sm text-gray-500 mb-2">All Products</p>
          <h1 className="text-4xl md:text-5xl font-bold">Explore Our Catalog</h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-16">

          {/* DESKTOP FILTER SIDEBAR */}
          <aside 
            ref={desktopFiltersRef}
            className="hidden lg:block bg-[#F8F8F9] p-6 rounded-2xl h-fit shadow-sm border border-gray-200"
          >

            {/* Category Dropdown */}
            <div className="mb-6 relative" ref={categoryDropdownRef}>
              <label className="block text-sm mb-2 font-medium">Category</label>
              <div 
                onClick={toggleDesktopCategory}
                className="w-full bg-white border cursor-pointer border-gray-300 px-4 py-3 rounded-xl flex justify-between items-center hover:border-gray-400 transition-colors"
              >
                <span className="text-gray-800">{getCategoryLabel()}</span>
                <HiChevronDown className={`text-gray-500 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
              </div>
              
              {isCategoryOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
                  {categoryOptions.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => {
                        setDraftCategory(option.value);
                        setIsCategoryOpen(false);
                      }}
                      className={`px-4 py-3 cursor-pointer hover:bg-gray-100 flex items-center justify-between ${
                        draftCategory === option.value ? 'bg-gray-100' : ''
                      }`}
                    >
                      <span className="text-gray-800">{option.label}</span>
                      {draftCategory === option.value && (
                        <HiCheck className="text-black" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Price */}
            <div className="mb-6">
              <label className="block text-sm mb-2 font-medium">Price Range</label>
              <div className="flex flex-col gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={draftMinPrice}
                  onChange={(e) => setDraftMinPrice(e.target.value)}
                  className="bg-white border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={draftMaxPrice}
                  onChange={(e) => setDraftMaxPrice(e.target.value)}
                  className="bg-white border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="mb-6 relative" ref={sortDropdownRef}>
              <label className="block text-sm mb-2 font-medium">Sort By</label>
              <div 
                onClick={toggleDesktopSort}
                className="w-full bg-white border cursor-pointer border-gray-300 px-4 py-3 rounded-xl flex justify-between items-center hover:border-gray-400 transition-colors"
              >
                <span className="text-gray-800">{getSortLabel()}</span>
                <HiChevronDown className={`text-gray-500 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
              </div>
              
              {isSortOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-xl shadow-lg z-10">
                  {sortOptions.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => {
                        setDraftSort(option.value);
                        setIsSortOpen(false);
                      }}
                      className={`px-4 py-3 cursor-pointer hover:bg-gray-100 flex items-center justify-between ${
                        draftSort === option.value ? 'bg-gray-100' : ''
                      }`}
                    >
                      <span className="text-gray-800">{option.label}</span>
                      {draftSort === option.value && (
                        <HiCheck className="text-black" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={applyFilters}
              className="w-full bg-black text-white py-3 cursor-pointer rounded-full font-semibold  transition-colors"
            >
              Apply Filters
            </button>
          </aside>

          {/* PRODUCTS SECTION */}
          <section>
            {/* Mobile Filter Button */}
            <div className="flex justify-between items-center mb-6 lg:hidden relative">
              <p className="text-sm text-gray-500">
                {filteredProducts.length} products
              </p>

              {/* Filter Icon Button */}
              <div className="relative ">

              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="flex items-center gap-2 bg-[#F5F5F7] px-4 py-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <HiOutlineAdjustmentsHorizontal />
                Filters
              </button>
               {showMobileFilters && (
                <div
                  ref={mobileFiltersRef}
                  className="absolute top-full right-0 w-[230px]  rounded-2xl bg-white shadow-lg z-100 overflow-y-auto"
                >
                  <div className="p-5">
                    {/* Header */}
                  

                    {/* Category Dropdown */}
                    <div className="mb-5 relative" ref={mobileCategoryDropdownRef}>
                      <label className="text-sm mb-2 block font-medium">Category</label>
                      <div 
                        onClick={toggleMobileCategory}
                        className="w-full bg-[#F5F5F7] px-4 py-3 rounded-xl flex justify-between items-center cursor-pointer hover:bg-gray-100"
                      >
                        <span className="text-gray-800">{getCategoryLabel()}</span>
                        <HiChevronDown className={`text-gray-500 transition-transform ${isMobileCategoryOpen ? 'rotate-180' : ''}`} />
                      </div>
                      
                      {isMobileCategoryOpen && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-xl shadow-lg z-20 max-h-60 overflow-y-auto">
                          {categoryOptions.map((option) => (
                            <div
                              key={option.value}
                              onClick={() => {
                                setDraftCategory(option.value);
                                setIsMobileCategoryOpen(false);
                              }}
                              className={`px-4 py-3 cursor-pointer hover:bg-gray-100 flex items-center justify-between ${
                                draftCategory === option.value ? 'bg-gray-100' : ''
                              }`}
                            >
                              <span className="text-gray-800">{option.label}</span>
                              {draftCategory === option.value && (
                                <HiCheck className="text-black" />
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Price */}
                    <div className="mb-5">
                      <label className="text-sm mb-2 block font-medium">Price Range</label>
                      <div className="flex flex-col gap-2">
                        <input
                          type="number"
                          placeholder="Min"
                          value={draftMinPrice}
                          onChange={(e) => setDraftMinPrice(e.target.value)}
                          className="bg-[#F5F5F7] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        />
                        <input
                          type="number"
                          placeholder="Max"
                          value={draftMaxPrice}
                          onChange={(e) => setDraftMaxPrice(e.target.value)}
                          className="bg-[#F5F5F7] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* Sort Dropdown */}
                    <div className="mb-5 relative" ref={mobileSortDropdownRef}>
                      <label className="text-sm mb-2 block font-medium">Sort By</label>
                      <div 
                        onClick={toggleMobileSort}
                        className="w-full bg-[#F5F5F7] px-4 py-3 rounded-xl flex justify-between items-center cursor-pointer hover:bg-gray-100"
                      >
                        <span className="text-gray-800">{getSortLabel()}</span>
                        <HiChevronDown className={`text-gray-500 transition-transform ${isMobileSortOpen ? 'rotate-180' : ''}`} />
                      </div>
                      
                      {isMobileSortOpen && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-xl shadow-lg z-20">
                          {sortOptions.map((option) => (
                            <div
                              key={option.value}
                              onClick={() => {
                                setDraftSort(option.value);
                                setIsMobileSortOpen(false);
                              }}
                              className={`px-4 py-3 cursor-pointer hover:bg-gray-100 flex items-center justify-between ${
                                draftSort === option.value ? 'bg-gray-100' : ''
                              }`}
                            >
                              <span className="text-gray-800">{option.label}</span>
                              {draftSort === option.value && (
                                <HiCheck className="text-black" />
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-8">
                      <button
                        onClick={cancelMobileFilters}
                        className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-full font-semibold hover:bg-gray-300 transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={applyFilters}
                        className="flex-1 bg-black text-white py-3 rounded-full font-semibold  transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              )}
              </div>

              {/* MOBILE FILTERS PANEL */}
             
            </div>

            {/* Desktop results count */}
            <p className="hidden lg:block text-sm text-gray-500 mb-8">
              Showing {filteredProducts.length} results
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Shop;