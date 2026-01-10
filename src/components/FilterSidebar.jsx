import { useState, useRef, useEffect, useContext } from "react";
import { HiChevronDown, HiCheck } from "react-icons/hi2";
import { IoCloseOutline } from "react-icons/io5";
import { AppContext } from "../context/AppContext";

const FilterSidebar = ({ 
  isMobile, 
  showFilters, 
  onClose, 
  onApply,
  onClear,
  draftValues,
  onDraftChange,
 
}) => {
    const { getUniqueColors, 
  getUniqueSizes,  
  getUniqueTags    }=useContext(AppContext);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isTagsOpen, setIsTagsOpen] = useState(false);

  const categoryDropdownRef = useRef(null);
  const sortDropdownRef = useRef(null);
  const tagsDropdownRef = useRef(null);

  const MIN_PRICE = 0;
  const MAX_PRICE = 2000;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(e.target)) setIsCategoryOpen(false);
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(e.target)) setIsSortOpen(false);
      if (tagsDropdownRef.current && !tagsDropdownRef.current.contains(e.target)) setIsTagsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const categoryOptions = [
    { value: "all", label: "All Products" },
    { value: "Electronics", label: "Electronics" },
    { value: "Furniture", label: "Furniture" },
    { value: "Clothing", label: "Clothing" },
    { value: "Footwear", label: "Footwear" },
    { value: "Accessories", label: "Accessories" },
  ];

  const sortOptions = [
    { value: "default", label: "Newest" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "name-az", label: "Name: A–Z" },
    { value: "name-za", label: "Name: Z–A" },
  ];

  const toggleSize = (size) => {
    const currentSizes = draftValues.sizes || [];
    const newSizes = currentSizes.includes(size)
      ? currentSizes.filter(s => s !== size)
      : [...currentSizes, size];
    onDraftChange('sizes', newSizes);
  };

  const toggleColor = (color) => {
    const currentColors = draftValues.colors || [];
    const newColors = currentColors.includes(color)
      ? currentColors.filter(c => c !== color)
      : [...currentColors, color];
    onDraftChange('colors', newColors);
  };

  const handleApply = () => {
    onApply();
    setIsCategoryOpen(false);
    setIsSortOpen(false);
    setIsTagsOpen(false);
  };
const handleClearFilters = () => {
    
  
   onClear();
};

  return (
    <div className={`
        ${isMobile 
          ? `fixed top-0 right-0 h-full w-[300px] z-[100] bg-white transform transition-transform duration-300 ${showFilters ? 'translate-x-0' : 'translate-x-full'} shadow-2xl rounded-l-2xl overflow-y-auto`
          : 'bg-[#F8F8F9] p-6 rounded-2xl h-fit shadow-sm border border-gray-200'}
      `}>
      {isMobile && (
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Filters</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 cursor-pointer rounded-full"><IoCloseOutline className="text-xl" /></button>
        </div>
      )}

      <div className={isMobile ? "p-5" : ""}>
        
        {/* Category */}
        <div className="mb-6 relative" ref={categoryDropdownRef}>
          <label className="block text-sm mb-2 font-bold capitalize tracking-wider text-gray-900">Category</label>
          <div onClick={() => setIsCategoryOpen(!isCategoryOpen)} className="w-full bg-white border cursor-pointer border-gray-300 px-4 py-3 rounded-xl flex justify-between items-center">
            <span>{categoryOptions.find(o => o.value === draftValues.category)?.label || "All"}</span>
            <HiChevronDown className={`transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
          </div>
          {isCategoryOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-xl shadow-lg z-50">
              {categoryOptions.map((opt) => (
                <div key={opt.value} onClick={() => { onDraftChange('category', opt.value); setIsCategoryOpen(false); }} className="px-4 py-3 hover:bg-gray-100 flex justify-between cursor-pointer">
                  {opt.label} {draftValues.category === opt.value && <HiCheck />}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Price Slider */}
        <div className="mb-8 px-2">
          <label className="text-sm font-bold capitalize tracking-wider text-gray-900 mb-4 block">Price Range</label>
          <div className="relative h-6 flex items-center">
            <div className="absolute w-full h-1.5 bg-gray-200 rounded-full" />
            <div className="absolute h-1.5 bg-black rounded-full" style={{
                left: `${((draftValues.minPrice || MIN_PRICE) - MIN_PRICE) / (MAX_PRICE - MIN_PRICE) * 100}%`,
                right: `${100 - ((draftValues.maxPrice || MAX_PRICE) - MIN_PRICE) / (MAX_PRICE - MIN_PRICE) * 100}%`
            }} />
            <input type="range" min={MIN_PRICE} max={MAX_PRICE} value={draftValues.minPrice || MIN_PRICE} 
              onChange={(e) => onDraftChange("minPrice", Math.min(Number(e.target.value), (draftValues.maxPrice || MAX_PRICE) - 10))}
              className="range-input absolute w-full h-6 bg-transparent appearance-none pointer-events-none z-30" />
            <input type="range" min={MIN_PRICE} max={MAX_PRICE} value={draftValues.maxPrice || MAX_PRICE}
              onChange={(e) => onDraftChange("maxPrice", Math.max(Number(e.target.value), (draftValues.minPrice || MIN_PRICE) + 10))}
              className="range-input absolute w-full h-6 bg-transparent appearance-none pointer-events-none z-40" />
          </div>
          <div className="flex justify-between mt-4 text-sm font-medium text-gray-700">
            <span>${draftValues.minPrice || MIN_PRICE}</span>
            <span>${draftValues.maxPrice || MAX_PRICE}</span>
          </div>
        </div>

        {/* Select Size  */}
        <div className="mb-8">
          <label className="text-sm font-bold capitalize tracking-wider text-gray-900 mb-4 block">Select Size</label>
          <div className="flex flex-wrap gap-3">
            {getUniqueSizes.map(size => (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={`w-14 h-14 rounded-full flex items-center justify-center text-sm font-bold transition-all border-2 cursor-pointer
                  ${draftValues.sizes?.includes(size) 
                    ? 'bg-black text-white border-black' 
                    : 'bg-[#F2F4F7] text-gray-500 border-transparent hover:border-gray-300'}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Colors Selector */}
        <div className="mb-8">
          <label className="text-sm font-bold capitalize tracking-wider text-gray-900 mb-4 block">Colors</label>
          <div className="flex flex-wrap gap-3">
            {getUniqueColors.map(color => (
              <button
                key={color}
                onClick={() => toggleColor(color)}
                style={{ backgroundColor: color }}
                className={`w-8 h-8 rounded-full border-1 transition-transform hover:scale-110 flex items-center justify-center cursor-pointer
                  ${draftValues.colors?.includes(color) ? 'border-black scale-110 shadow-md' : 'border-gray-200'}`}
              >
                
              </button>
            ))}
          </div>
        </div>

        {/* Tags Dropdown */}
        <div className="mb-8 relative" ref={tagsDropdownRef}>
          <label className="block text-sm mb-2 font-bold capitalize tracking-wider text-gray-900">Tags</label>
          <div onClick={() => setIsTagsOpen(!isTagsOpen)} className="w-full bg-white border cursor-pointer border-gray-300 px-4 py-3 rounded-xl flex justify-between items-center">
            <span className="truncate">
              {draftValues.tag ? `#${draftValues.tag}` : "Select Tag"}
            </span>
            <HiChevronDown className={`transition-transform ${isTagsOpen ? 'rotate-180' : ''}`} />
          </div>
          {isTagsOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-xl shadow-lg z-50 max-h-48 overflow-y-auto">
              <div onClick={() => { onDraftChange('tag', ''); setIsTagsOpen(false); }} className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-gray-500 italic">Clear Tag</div>
              {getUniqueTags.map((tag) => (
                <div key={tag} onClick={() => { onDraftChange('tag', tag); setIsTagsOpen(false); }} className="px-4 py-3 hover:bg-gray-100 flex justify-between cursor-pointer">
                  #{tag} {draftValues.tag === tag && <HiCheck />}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sort By */}
        <div className="mb-8 relative" ref={sortDropdownRef}>
          <label className="block text-sm mb-2 font-bold uppercase tracking-wider text-gray-900">Sort By</label>
          <div onClick={() => setIsSortOpen(!isSortOpen)} className="w-full bg-white border cursor-pointer border-gray-300 px-4 py-3 rounded-xl flex justify-between items-center">
            <span>{sortOptions.find(o => o.value === draftValues.sort)?.label || "Newest"}</span>
            <HiChevronDown />
          </div>
          {isSortOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
              {sortOptions.map((opt) => (
                <div key={opt.value} onClick={() => { onDraftChange('sort', opt.value); setIsSortOpen(false); }} className="px-4 py-3 hover:bg-gray-100 flex justify-between cursor-pointer">
                  {opt.label} {draftValues.sort === opt.value && <HiCheck />}
                </div>
              ))}
            </div>
          )}
        </div>
<div className="flex flex-col gap-3 mb-4">
  <button
    onClick={handleClearFilters}
    className="flex-1 bg-gray-200 text-black py-4 cursor-pointer rounded-full font-semibold hover:bg-gray-300 transition-colors"
  >
    Clear Filters
  </button>
        {/* Apply Button */}
        <button onClick={handleApply} className="w-full bg-black text-white py-4 cursor-pointer rounded-full font-bold  transition-colors">
          Apply Filters
        </button>
</div>

      </div>
    </div>
  );
};

export default FilterSidebar;