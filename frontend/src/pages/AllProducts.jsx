import React, { useEffect, useMemo, useState } from "react";
import { FiSearch, FiPackage, FiX } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchPublicProducts } from "../store/slices/productsSlice";
import ProductsToolbar from "../components/Products/ProductsToolbar";
import ProductCard from "../components/Products/ProductCard";
import Loader from "../components/common/Loader";


const parsePrice = (priceStr) => {
  if (!priceStr || priceStr === "N/A") return 0;
  const num = String(priceStr).replace(/[^0-9.]/g, "");
  return parseFloat(num) || 0;
};

export default function AllProducts() {
  const dispatch = useAppDispatch();
  const {
    publicProducts: products,
    publicLoading: loading,
    publicError: error,
  } = useAppSelector((s) => s.products);

 
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [priceFilter, setPriceFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

 
  useEffect(() => {
    dispatch(fetchPublicProducts());
  }, [dispatch]);

 
  const filtered = useMemo(() => {
    let list = [...products];

    
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          (p.name || "").toLowerCase().includes(q) ||
          (p.tagline || "").toLowerCase().includes(q) ||
          (p.battery || "").toLowerCase().includes(q)
      );
    }

   
    if (statusFilter === "available") {
      list = list.filter((p) => p.status === "published");
    }

    
    if (priceFilter !== "all") {
      list = list.filter((p) => {
        const price = parsePrice(p.price);
        if (priceFilter === "1-3") return price >= 100000 && price <= 300000;
        if (priceFilter === "above-3") return price > 300000;
        return true;
      });
    }

    
    list.sort((a, b) => {
      if (sortBy === "newest") {
        return (
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime()
        );
      }
      if (sortBy === "name-asc") {
        return (a.name || "").localeCompare(b.name || "");
      }
      if (sortBy === "price-asc") {
        return parsePrice(a.price) - parsePrice(b.price);
      }
      if (sortBy === "price-desc") {
        return parsePrice(b.price) - parsePrice(a.price);
      }
      return 0;
    });

    return list;
  }, [products, searchQuery, sortBy, priceFilter, statusFilter]);

  
  const activeFiltersCount =
    (priceFilter !== "all" ? 1 : 0) + (statusFilter !== "all" ? 1 : 0);

  const clearAllFilters = () => {
    setPriceFilter("all");
    setStatusFilter("all");
  };

  
  if (loading) {
    return <Loader fullPage size="lg" text="Loading products..." />;
  }

 
  if (error) {
    return (
      <div className="min-h-screen bg-[#f7f7f5] pt-2">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <FiPackage size={26} className="text-gray-400" />
          </div>
          <h2 className="text-[20px] font-semibold text-[#111] mb-2">
            Something went wrong
          </h2>
          <p className="text-[13px] text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f5] pt-2 pb-16">
     
      <div className="bg-[#f7f7f5] border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-black" />
            <span className="text-[10px] font-bold tracking-[0.3em] text-gray-500">
              OUR COLLECTION
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1 className="text-[36px] sm:text-[48px] lg:text-[58px] font-semibold tracking-[-0.045em] leading-[0.95] text-[#111]">
                All
                <span className="text-gray-400"> Products.</span>
              </h1>
              <p className="mt-4 text-[13.5px] sm:text-[14.5px] text-gray-500 max-w-2xl leading-relaxed">
                Discover our complete lineup of electric motorcycles —
                engineered for performance, efficiency, and everyday
                adventures.
              </p>
            </div>

            <div className="flex items-center gap-2 text-[12px] text-gray-500">
              <span className="font-semibold text-[#111]">
                {products.length}
              </span>
              <span>products available</span>
            </div>
          </div>
        </div>
      </div>

     
      <ProductsToolbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        activeFiltersCount={activeFiltersCount}
        onClearFilters={clearAllFilters}
      />

     
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {filtered.length === 0 ? (
         
          <div className="bg-white rounded-3xl border border-gray-100 py-20 px-6 text-center">
            <div className="w-20 h-20 rounded-3xl bg-gray-100 flex items-center justify-center mx-auto mb-5">
              <FiSearch size={30} className="text-gray-400" />
            </div>
            <h2 className="text-[22px] font-semibold text-[#111] mb-2">
              No products found
            </h2>
            <p className="text-[13.5px] text-gray-500 max-w-md mx-auto mb-6">
              {searchQuery
                ? `No products match "${searchQuery}". Try different keywords.`
                : "No products match your current filters. Try adjusting them."}
            </p>
            {(searchQuery || activeFiltersCount > 0) && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  clearAllFilters();
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white text-[13px] font-semibold hover:bg-gray-800 transition-all"
              >
                <FiX size={14} />
                Clear all filters
              </button>
            )}
          </div>
        ) : (
         
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

    
        {filtered.length > 0 && (
          <div className="mt-10 text-center text-[12px] text-gray-400 tracking-wider uppercase">
            Showing {filtered.length} of {products.length} products
          </div>
        )}
      </div>
    </div>
  );
}