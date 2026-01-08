import { useContext, useMemo, useState } from "react";
import { AppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

const Shop = () => {
  const { products } = useContext(AppContext);

  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("default");

  // DRAFT FILTER
  const [draftCategory, setDraftCategory] = useState("all");
  const [draftMinPrice, setDraftMinPrice] = useState("");
  const [draftMaxPrice, setDraftMaxPrice] = useState("");
  const [draftSort, setDraftSort] = useState("default");

  const [showFilters, setShowFilters] = useState(false);

  // Apply
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
      result = result.filter(p => p.category === category);
    }

    if (minPrice) {
      result = result.filter(p => p.price >= Number(minPrice));
    }

    if (maxPrice) {
      result = result.filter(p => p.price <= Number(maxPrice));
    }

    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "name-az") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "name-za") {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }

    return result;
  }, [products, category, minPrice, maxPrice, sort]);

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <header className="mb-14">
          <p className="text-sm text-gray-500 mb-2">All Products</p>
          <h1 className="text-4xl md:text-5xl font-bold">Explore Our Catalog</h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16">

          {/* FILTER SIDEBAR */}
          <aside
            className={`
              fixed inset-0 z-100 bg-white px-6 py-8 overflow-y-auto
              transform transition-transform duration-300
              ${showFilters ? "translate-x-0" : "-translate-x-full"}
              lg:static lg:translate-x-0
            `}
          >
            <div className="flex justify-between items-center mb-10 lg:hidden ">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button onClick={() => setShowFilters(false)} className="text-sm cursor-pointer">
                Close
              </button>
            </div>

            {/* Category */}
            <div className="mb-8">
              <label className="block text-sm mb-3">Category</label>
              <select
                value={draftCategory}
                onChange={(e) => setDraftCategory(e.target.value)}
                className="w-full bg-[#F5F5F7] px-5 py-4 rounded-2xl cursor-pointer"
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
            <div className="mb-8">
              <label className="block text-sm mb-3">Price Range</label>
              <div className="flex flex-col gap-3">
                <input
                  type="number"
                  placeholder="Min"
                  value={draftMinPrice}
                  onChange={(e) => setDraftMinPrice(e.target.value)}
                  className="bg-[#F5F5F7] px-5 py-4 rounded-2xl"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={draftMaxPrice}
                  onChange={(e) => setDraftMaxPrice(e.target.value)}
                  className="bg-[#F5F5F7] px-5 py-4 rounded-2xl"
                />
              </div>
            </div>

            {/* Sort */}
            <div className="mb-10">
              <label className="block text-sm mb-3">Sort By</label>
              <select
                value={draftSort}
                onChange={(e) => setDraftSort(e.target.value)}
                className="w-full bg-[#F5F5F7] px-5 py-4 rounded-2xl cursor-pointer"
              >
                <option value="default">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name-az">Name: A–Z</option>
                <option value="name-za">Name: Z–A</option>
              </select>
            </div>

            {/* APPLY BUTTON */}
            <button
              onClick={applyFilters}
              className="w-full bg-black text-white cursor-pointer py-4 rounded-full font-semibold"
            >
              Apply Filters
            </button>
          </aside>

          {/* PRODUCTS */}
          <section>
            <div className="flex justify-between items-center mb-6 lg:hidden">
              <p className="text-sm text-gray-500">
                {filteredProducts.length} products
              </p>
              <button
                onClick={() => setShowFilters(true)}
                className="flex items-center gap-2 bg-[#F5F5F7] px-4 py-2 rounded-full"
              >
                <HiOutlineAdjustmentsHorizontal />
                Filters
              </button>
            </div>

            <p className="hidden lg:block text-sm text-gray-500 mb-8">
              Showing {filteredProducts.length} results
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
              {filteredProducts.map(product => (
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
