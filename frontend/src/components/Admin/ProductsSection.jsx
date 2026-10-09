import React from "react";
import {
  FiPlus,
  FiPackage,
  FiEdit2,
  FiTrash2,
  FiZap,
  FiActivity,
  FiBatteryCharging,
} from "react-icons/fi";
import SpecPill from "./SpecPill";

export default function ProductsSection({
  products,
  loading,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
}) {
  return (
    <div className="space-y-5">
      
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-7 h-px bg-black" />
            <span className="text-[10px] font-bold tracking-[0.3em] text-gray-500">
              PRODUCTS
            </span>
          </div>
          <h1 className="text-[26px] sm:text-[32px] font-semibold tracking-[-0.04em] leading-[0.98] text-[#111]">
            Manage Products
          </h1>
          <p className="text-[13px] text-gray-500 mt-2">
            {loading
              ? "Loading..."
              : `${products.length} product${products.length !== 1 ? "s" : ""} in catalog`}
          </p>
        </div>

        <button
          onClick={onAddProduct}
          className="px-5 py-2.5 rounded-full bg-black text-white text-[12.5px] font-semibold hover:bg-gray-800 transition-all flex items-center gap-2 w-fit"
        >
          <FiPlus size={14} />
          Add Product
        </button>
      </div>

     
      {loading ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <div className="w-10 h-10 border-3 border-gray-200 border-t-black rounded-full animate-spin mx-auto" />
          <p className="text-[13px] text-gray-500 mt-4">Loading products...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <FiPackage size={22} className="text-gray-400" />
          </div>
          <h2 className="text-[16px] font-semibold text-[#111]">
            No products yet
          </h2>
          <p className="text-[13px] text-gray-500 mt-1">
            Add your first product to get started
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onEdit={onEditProduct}
              onDelete={onDeleteProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
}


function ProductCard({ product, onEdit, onDelete }) {
  return (
    <article className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-gray-200 hover:shadow-[0_15px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500">
     
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute top-3 left-3">
          {product.status === "published" ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/95 text-white text-[9.5px] font-bold uppercase tracking-wider backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Published
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-700/95 text-white text-[9.5px] font-bold uppercase tracking-wider backdrop-blur-sm">
              Draft
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[9.5px] font-semibold">
          {product.views || 0} views
        </div>

        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

        <div className="absolute bottom-3 left-3 text-white">
          <p className="text-[9.5px] uppercase tracking-[0.15em] font-semibold text-white/70">
            Price
          </p>
          <p className="text-[15px] font-bold">{product.price}</p>
        </div>
      </div>

     
      <div className="p-4">
        <div className="mb-3">
          <h3 className="text-[15px] font-bold text-[#111] tracking-tight">
            {product.name}
          </h3>
          <p className="text-[11.5px] text-gray-500 italic">
            {product.tagline}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-1.5 mb-4">
          <SpecPill
            label="Top Speed"
            value={product.topSpeed}
            icon={<FiZap size={14} />}
          />
          <SpecPill
            label="Range"
            value={product.range}
            icon={<FiActivity size={14} />}
          />
          <SpecPill
            label="Battery"
            value={product.battery}
            icon={<FiBatteryCharging size={14} />}
          />
        </div>

        <div className="flex items-center gap-1.5 pt-3 border-t border-gray-100">
         
          <button
            onClick={() => onEdit(product)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg bg-gray-50 hover:bg-black hover:text-white text-[11.5px] font-semibold text-gray-700 transition-all"
          >
            <FiEdit2 size={11} />
            Edit
          </button>
          <button
            onClick={() => onDelete(product._id)}
            className="w-8 h-8 inline-flex items-center justify-center rounded-lg bg-gray-50 hover:bg-red-50 hover:text-red-600 text-gray-400 transition-all"
          >
            <FiTrash2 size={12} />
          </button>
        </div>
      </div>
    </article>
  );
}