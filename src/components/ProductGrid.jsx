import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { products } from "../data/products.js";

const tabs = [
  { label: "Best Sellers", value: "bestseller" },
  { label: "New Arrivals", value: "new" },
  { label: "Sale", value: "sale" },
  { label: "Trending", value: "trending" },
];


export default function ProductGrid() {
  const [activeTab, setActiveTab] = useState("bestseller");

 const filteredProducts = useMemo(() => {
  return products.filter((product) =>
    product.categories.includes(activeTab)
  );
}, [activeTab]);

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black mb-4">
            The Latest & Greatest
          </h2>

          {/* Tabs */}
          <div className="flex flex-wrap bg-[#F5F5F7] p-1.5 rounded-full mt-4">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-6 py-2.5 text-sm font-bold rounded-full ${
                  activeTab === tab.value
                    ? "bg-white text-black shadow-md"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.title} {...product} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 flex justify-center">
          <button className="px-12 py-4 bg-[#F5F5F7] text-black rounded-full text-sm font-bold hover:bg-black hover:text-white transition-all duration-300 shadow-sm">
            View All Collection
          </button>
        </div>
      </div>
    </section>
  );
}
