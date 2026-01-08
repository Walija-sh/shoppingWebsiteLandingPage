import { useContext, useMemo, useState } from "react";
import { GoSearch } from "react-icons/go";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Search = ({ searchOpen, setSearchOpen }) => {
  const { products } = useContext(AppContext);
  const [query, setQuery] = useState("");

  // Filter products based on query
  const results = useMemo(() => {
    if (!query.trim()) return [];
    return products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, products]);

  return (
    <div className="relative grow w-full flex items-center justify-end gap-2">
      
      {/* INPUT */}
      <div
        className={`transition-all duration-300 ${
          searchOpen
            ? "w-full sm:max-w-[240px] opacity-100"
            : "w-0 opacity-0 pointer-events-none"
        }`}
      >
        <input
          autoFocus={searchOpen}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full border border-[#ddd] rounded-full px-4 py-2 text-sm focus:outline-none focus:border-black"
        />
      </div>

      {/* SEARCH BUTTON */}
      <button
        className="cursor-pointer"
        onClick={() => {
          setSearchOpen((p) => !p);
          setQuery("");
        }}
      >
        <GoSearch className="text-xl" />
      </button>

      {/* DROPDOWN RESULTS */}
      {searchOpen && query && (
        <div className="absolute top-full right-0 mt-3 w-full sm:w-[320px] bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden">
          
          {results.length === 0 ? (
            <div className="px-4 py-6 text-sm text-gray-400 text-center">
              No products found
            </div>
          ) : (
            <ul className="max-h-[320px] overflow-y-auto">
              {results.map((product) => (
                <li key={product.id}>
                  <Link
                    to={`/product/${product.id}`}
                    onClick={() => {
                      setSearchOpen(false);
                      setQuery("");
                    }}
                    className="flex items-center gap-4 px-4 py-3 hover:bg-[#F5F5F7] transition"
                  >
                    <div className="w-12 h-12 bg-[#F5F5F7] rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-sm font-medium text-black line-clamp-1">
                      {product.title}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
