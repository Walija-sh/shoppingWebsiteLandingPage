import { useState, useRef, useEffect } from "react";
import { HiChevronDown, HiCheck } from "react-icons/hi2";
import { IoCloseOutline } from "react-icons/io5";

const FilterSidebar = ({ 
  isMobile, 
  showFilters, 
  onClose, 
  onApply,
  draftValues,
  onDraftChange
}) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const filtersPanelRef = useRef(null);
  const categoryDropdownRef = useRef(null);
  const sortDropdownRef = useRef(null);

  const MIN_PRICE = 0;
const MAX_PRICE = 2000;

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(e.target)) {
        setIsCategoryOpen(false);
      }
      
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(e.target)) {
        setIsSortOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    const option = categoryOptions.find(opt => opt.value === draftValues.category);
    return option ? option.label : "Select Category";
  };

  // Get current sort label
  const getSortLabel = () => {
    const option = sortOptions.find(opt => opt.value === draftValues.sort);
    return option ? option.label : "Sort By";
  };

  // Toggle dropdowns
  const toggleCategory = () => {
    setIsCategoryOpen(!isCategoryOpen);
    if (isSortOpen) setIsSortOpen(false);
  };

  const toggleSort = () => {
    setIsSortOpen(!isSortOpen);
    if (isCategoryOpen) setIsCategoryOpen(false);
  };

  const handleApply = () => {
    onApply();
    setIsCategoryOpen(false);
    setIsSortOpen(false);
  };

  const handleCancel = () => {
    onClose();
    setIsCategoryOpen(false);
    setIsSortOpen(false);
  };

  return (
    <div 
      ref={filtersPanelRef}
      className={`
        ${isMobile 
          ? `fixed top-0 right-0 h-full w-[300px] max-w-full z-100 bg-white 
             transform transition-transform duration-300 ease-in-out
             ${showFilters ? 'translate-x-0' : 'translate-x-full'} 
             shadow-2xl rounded-l-2xl`
          : 'bg-[#F8F8F9] p-6 rounded-2xl h-fit shadow-sm border border-gray-200'
        }
      `}
    >
      {/* Mobile header */}
      {isMobile && (
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Filters</h3>
          <button
            onClick={handleCancel}
            className="p-2 hover:bg-gray-100 rounded-full cursor-pointer"
          >
            <IoCloseOutline className="text-xl" />
          </button>
        </div>
      )}

      <div className={isMobile ? "p-5" : ""}>
        {/* Category Dropdown */}
        <div className="mb-6 relative" ref={categoryDropdownRef}>
          <label className="block text-sm mb-2 font-medium">Category</label>
          <div 
            onClick={toggleCategory}
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
                    onDraftChange('category', option.value);
                    setIsCategoryOpen(false);
                  }}
                  className={`px-4 py-3 cursor-pointer hover:bg-gray-100 flex items-center justify-between ${
                    draftValues.category === option.value ? 'bg-gray-100' : ''
                  }`}
                >
                  <span className="text-gray-800">{option.label}</span>
                  {draftValues.category === option.value && (
                    <HiCheck className="text-black" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        
       
{/* Price Range */}
<div className="mb-8 px-2">
  <label className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4 block">
    Price Range
  </label>

  <div className="relative h-6 flex items-center">
    {/* Base track */}
    <div className="absolute w-full h-1.5 bg-gray-200 rounded-full top-1/2 -translate-y-1/2" />

    {/* Active range highlight */}
    <div
      className="absolute h-1.5 bg-black rounded-full top-1/2 -translate-y-1/2 transition-all duration-150"
      style={{
        left: `${((draftValues.minPrice || MIN_PRICE) - MIN_PRICE) / (MAX_PRICE - MIN_PRICE) * 100}%`,
        right: `${100 - ((draftValues.maxPrice || MAX_PRICE) - MIN_PRICE) / (MAX_PRICE - MIN_PRICE) * 100}%`
      }}
    />

    {/* Min Range Input */}
    <input
      type="range"
      min={MIN_PRICE}
      max={MAX_PRICE}
      value={draftValues.minPrice || MIN_PRICE}
      onChange={(e) =>
        onDraftChange("minPrice", Math.min(Number(e.target.value), (draftValues.maxPrice || MAX_PRICE) - 10))
      }
      className="range-input absolute w-full h-6 top-0 bg-transparent appearance-none pointer-events-none cursor-pointer z-30"
    />

    {/* Max Range Input */}
    <input
      type="range"
      min={MIN_PRICE}
      max={MAX_PRICE}
      value={draftValues.maxPrice || MAX_PRICE}
      onChange={(e) =>
        onDraftChange("maxPrice", Math.max(Number(e.target.value), (draftValues.minPrice || MIN_PRICE) + 10))
      }
      className="range-input absolute w-full h-6 top-0 bg-transparent appearance-none pointer-events-none cursor-pointer z-40"
    />
  </div>

  {/* Min/Max Labels */}
  <div className="flex justify-between mt-4 text-sm font-medium text-gray-700">
    <span>${draftValues.minPrice || MIN_PRICE}</span>
    <span>${draftValues.maxPrice || MAX_PRICE}</span>
  </div>
</div>



        {/* Sort Dropdown */}
        <div className="mb-6 relative" ref={sortDropdownRef}>
          <label className="block text-sm mb-2 font-medium">Sort By</label>
          <div 
            onClick={toggleSort}
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
                    onDraftChange('sort', option.value);
                    setIsSortOpen(false);
                  }}
                  className={`px-4 py-3 cursor-pointer hover:bg-gray-100 flex items-center justify-between ${
                    draftValues.sort === option.value ? 'bg-gray-100' : ''
                  }`}
                >
                  <span className="text-gray-800">{option.label}</span>
                  {draftValues.sort === option.value && (
                    <HiCheck className="text-black" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className={isMobile ? "flex gap-3 mt-8" : ""}>
          {isMobile && (
            <button
              onClick={handleCancel}
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-full font-semibold hover:bg-gray-300 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          )}
          <button
            onClick={handleApply}
            className={`${
              isMobile ? 'flex-1' : 'w-full'
            } bg-black text-white py-3 cursor-pointer rounded-full font-semibold transition-colors`}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;