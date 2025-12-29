import { useState } from "react";
import ProductCard from "./ProductCard";

const tabs = [
  { label: "Best Sellers", value: "bestseller" },
  { label: "New Arrivals", value: "new" },
  { label: "Sale", value: "sale" },
  { label: "Trending", value: "trending" },
];


const products = [
  {
    image: "https://images.unsplash.com/photo-1520975916090-3105956dac38",
    title: "Burgundy Wool Double-Breasted Coat",
    price: 289,
    originalPrice: 420,
    isOnSale: true,
    rating: 5,
    categories: ["bestseller", "sale", "trending"],
  },
  {
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    title: "Cream Cable Knit Turtleneck Sweater",
    price: 149,
    isNew: true,
    rating: 4,
    categories: ["new", "trending"],
  },
  {
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446",
    title: "Elegant Black Wrap Midi Dress",
    price: 199,
    originalPrice: 279,
    isOnSale: true,
    rating: 5,
    categories: ["sale", "bestseller"],
  },
  {
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
    title: "Classic Blue Straight-Leg Jeans",
    price: 129,
    rating: 4,
    categories: ["trending"],
  },
  {
    image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475",
    title: "Olive Green Premium Hoodie",
    price: 89,
    isNew: true,
    rating: 4,
    categories: ["new"],
  },
  {
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
    title: "Camel Belted Trench Coat",
    price: 349,
    rating: 5,
    categories: ["bestseller", "trending"],
  },
  {
    image: "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0",
    title: "Navy Double-Breasted Blazer",
    price: 259,
    originalPrice: 340,
    isOnSale: true,
    rating: 4,
    categories: ["sale"],
  },
  {
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf",
    title: "White Oxford Button-Down Shirt",
    price: 79,
    rating: 4,
    categories: ["bestseller"],
  },
];


export default function ProductGrid() {
const [activeTab, setActiveTab] = useState("bestseller");
const filteredProducts = products.filter(product =>
  product.categories.includes(activeTab)
);


  return (
    <section className="bg-[#F2F2F2] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-playfair text-black">
              Trending Products
            </h2>
            <p className="text-[#555] mt-2">
              Discover our most popular pieces
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-6">
  {tabs.map((tab) => (
    <button
      key={tab.value}
      onClick={() => setActiveTab(tab.value)}
      className={`text-sm font-medium pb-1 transition relative whitespace-nowrap ${
        activeTab === tab.value
          ? "text-[#8B2C34] after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[2px] after:bg-[#8B2C34]"
          : "text-[#555] hover:text-black"
      }`}
    >
      {tab.label}
    </button>
  ))}
</div>

        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
         {filteredProducts.map((product) => (
  <ProductCard key={product.title} {...product} />
))}

        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="border border-black px-8 py-4 text-sm md:text-lg font-light hover:bg-black hover:text-white transition cursor-pointer">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
}
