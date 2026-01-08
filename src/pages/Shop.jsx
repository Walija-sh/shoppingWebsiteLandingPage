import { useContext, useMemo, useState, useRef, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

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

  // Filter dropdown close on outside click
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowFilters(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const applyFilters = () => {
    setCategory(draftCategory);
    setMinPrice(draftMinPrice);
    setMaxPrice(draftMaxPrice);
    setSort(draftSort);
    setShowFilters(false);
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

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <header className="mb-14">
          <p className="text-sm text-gray-500 mb-2">All Products</p>
          <h1 className="text-4xl md:text-5xl font-bold">Explore Our Catalog</h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-16">

          {/* DESKTOP FILTER SIDEBAR */}
          <aside className="hidden lg:block bg-[#F8F8F9] p-6 rounded-2xl h-fit shadow-sm border border-gray-200">

            {/* Category */}
            <div className="mb-6">
              <label className="block text-sm mb-2 font-medium">Category</label>
              <select
                value={draftCategory}
                onChange={(e) => setDraftCategory(e.target.value)}
                className="w-full bg-white border cursor-pointer border-gray-300 px-4 py-3 rounded-xl"
              >
                <option value="all">All Products</option>
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
                <option value="Clothing">Clothing</option>
                <option value="Footwear">Footwear</option>
                <option value="Accessories">Accessories</option>
              </select>
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
                  className="bg-white border border-gray-300 px-4 py-3 rounded-xl"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={draftMaxPrice}
                  onChange={(e) => setDraftMaxPrice(e.target.value)}
                  className="bg-white border border-gray-300 px-4 py-3 rounded-xl"
                />
              </div>
            </div>

            {/* Sort */}
            <div className="mb-6">
              <label className="block text-sm mb-2 font-medium">Sort By</label>
              <select
                value={draftSort}
                onChange={(e) => setDraftSort(e.target.value)}
                className="w-full bg-white border cursor-pointer border-gray-300 px-4 py-3 rounded-xl"
              >
                <option value="default">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name-az">Name: A–Z</option>
                <option value="name-za">Name: Z–A</option>
              </select>
            </div>

            <button
              onClick={applyFilters}
              className="w-full bg-black text-white py-3 cursor-pointer rounded-full font-semibold"
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
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-[#F5F5F7] px-4 py-2 rounded-full"
              >
                <HiOutlineAdjustmentsHorizontal />
                Filters
              </button>

              {/* MOBILE DROPDOWN FILTER BOX */}
              {showFilters && (
                <div
                  ref={dropdownRef}
                  className="absolute top-12 right-0 w-64 bg-white shadow-xl rounded-2xl p-5 border border-gray-200 z-50"
                >
                  {/* Category */}
                  <div className="mb-5">
                    <label className="text-sm mb-2 block">Category</label>
                    <select
                      value={draftCategory}
                      onChange={(e) => setDraftCategory(e.target.value)}
                      className="w-full bg-[#F5F5F7] px-4 py-2 rounded-xl"
                    >
                      <option value="all">All Products</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Furniture">Furniture</option>
                      <option value="Clothing">Clothing</option>
                      <option value="Footwear">Footwear</option>
                      <option value="Accessories">Accessories</option>
                    </select>
                  </div>

                  {/* Price */}
                  <div className="mb-5">
                    <label className="text-sm mb-2 block">Price Range</label>
                    <div className="flex flex-col gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={draftMinPrice}
                        onChange={(e) => setDraftMinPrice(e.target.value)}
                        className="bg-[#F5F5F7] px-4 py-2 rounded-xl"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={draftMaxPrice}
                        onChange={(e) => setDraftMaxPrice(e.target.value)}
                        className="bg-[#F5F5F7] px-4 py-2 rounded-xl"
                      />
                    </div>
                  </div>

                  {/* Sort */}
                  <div className="mb-5">
                    <label className="text-sm mb-2 block">Sort By</label>
                    <select
                      value={draftSort}
                      onChange={(e) => setDraftSort(e.target.value)}
                      className="w-full bg-[#F5F5F7] px-4 py-2 rounded-xl"
                    >
                      <option value="default">Newest</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="name-az">Name: A–Z</option>
                      <option value="name-za">Name: Z–A</option>
                    </select>
                  </div>

                  <button
                    onClick={applyFilters}
                    className="w-full bg-black text-white py-3 rounded-full mt-3 font-semibold"
                  >
                    Apply Filters
                  </button>
                </div>
              )}
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
