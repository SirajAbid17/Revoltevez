import React, { useEffect, useState, useRef } from "react";
import {
  FiX,
  FiImage,
  FiUpload,
  FiPlus,
  FiPackage,
  FiCheck,
  FiSave,
} from "react-icons/fi";
import Field from "./Field";

export default function AddProductModal({
  isOpen,
  onClose,
  onAdd,
  onUpdate,
  editingProduct,
}) {
  const isEdit = Boolean(editingProduct);

  const [form, setForm] = useState({
    name: "",
    tagline: "",
    topSpeed: "",
    range: "",
    battery: "",
    price: "",
    status: "published",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  // Populate on open (edit or add)
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    if (isEdit && editingProduct) {
      setForm({
        name: editingProduct.name || "",
        tagline: editingProduct.tagline || "",
        topSpeed: editingProduct.topSpeed || "",
        range: editingProduct.range || "",
        battery: editingProduct.battery || "",
        price: editingProduct.price || "",
        status: editingProduct.status || "published",
      });
      setImagePreview(editingProduct.image || "");
    } else {
      setForm({
        name: "",
        tagline: "",
        topSpeed: "",
        range: "",
        battery: "",
        price: "",
        status: "published",
      });
      setImagePreview("");
    }

    setImageFile(null);
    setErrors({});
    setSubmitting(false);

    if (fileInputRef.current) fileInputRef.current.value = "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, isEdit, editingProduct]);

  // ESC close
  useEffect(() => {
    const handleEsc = (e) =>
      e.key === "Escape" && isOpen && !submitting && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose, submitting]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((p) => ({ ...p, image: "Only image files allowed" }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((p) => ({ ...p, image: "Image must be under 5MB" }));
      return;
    }

    setImageFile(file);
    setErrors((p) => ({ ...p, image: "" }));

    const reader = new FileReader();
    reader.onload = (event) => setImagePreview(event.target.result);
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    // In edit mode, don't allow removing (unless new file chosen)
    if (isEdit && !imageFile) return;
    setImageFile(null);
    setImagePreview(isEdit ? editingProduct?.image || "" : "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const validate = () => {
    const errs = {};
    // Image required only for ADD (edit already has one)
    if (!isEdit && !imageFile) {
      errs.image = "Image is required";
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();

      // Image only if new one selected
      if (imageFile) formData.append("image", imageFile);

      formData.append("name", form.name || "");
      formData.append("tagline", form.tagline || "");
      formData.append("topSpeed", form.topSpeed || "");
      formData.append("range", form.range || "");
      formData.append("battery", form.battery || "");
      formData.append("price", form.price || "");
      formData.append("status", form.status);

      if (isEdit) {
        await onUpdate({ formData });
      } else {
        await onAdd({ formData });
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert(
        err.response?.data?.error ||
          `Failed to ${isEdit ? "update" : "add"} product`
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xl animate-[fadeIn_0.25s_ease]"
      />

      <div className="relative z-10 w-full max-w-[560px] max-h-[92vh] overflow-y-auto hide-scrollbar bg-white rounded-2xl border border-gray-100 shadow-[0_30px_90px_rgba(0,0,0,0.35)] animate-[popIn_0.35s_cubic-bezier(.2,.9,.3,1.2)]">
        <button
          onClick={onClose}
          disabled={submitting}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-black transition-all disabled:opacity-50"
        >
          <FiX size={16} />
        </button>

        <div className="p-6">
          {/* Header — dynamic title */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center">
              <FiPackage size={18} />
            </div>
            <div>
              <h2 className="text-[19px] font-bold tracking-[-0.02em] text-[#111]">
                {isEdit ? "Edit Product" : "Add New Product"}
              </h2>
              <p className="text-[11.5px] text-gray-500">
                {isEdit
                  ? "Update product details below"
                  : 'Empty fields will default to "N/A"'}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Image */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.1em] text-gray-500 mb-1.5">
                Product Image {!isEdit && "*"}
                {isEdit && (
                  <span className="text-gray-400 font-medium normal-case tracking-normal ml-1">
                    (leave empty to keep current)
                  </span>
                )}
              </label>

              <div className="flex gap-3">
                {/* Preview */}
                <div className="shrink-0 w-20 h-20 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center relative group">
                  {imagePreview ? (
                    <>
                      <img
                        src={imagePreview}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                      {/* Only show remove on non-edit or if new file picked */}
                      {(!isEdit || imageFile) && (
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FiX size={10} />
                        </button>
                      )}
                    </>
                  ) : (
                    <FiImage size={22} className="text-gray-300" />
                  )}
                </div>

                {/* Uploader */}
                <div className="flex-1">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="product-image-upload"
                  />

                  <label
                    htmlFor="product-image-upload"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 border-dashed cursor-pointer transition-all ${
                      errors.image
                        ? "border-red-300 hover:border-red-400"
                        : "border-gray-300 hover:border-black hover:bg-gray-50"
                    }`}
                  >
                    <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                      <FiUpload size={15} className="text-gray-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                      {imageFile ? (
                        <>
                          <p className="text-[12px] font-semibold text-[#111] truncate">
                            {imageFile.name}
                          </p>
                          <p className="flex items-center gap-1 text-[10.5px] text-green-600 font-medium">
                            <FiCheck size={11} />
                            Ready to upload
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-[12px] font-semibold text-[#111]">
                            {isEdit ? "Replace image" : "Choose image"}
                          </p>
                          <p className="text-[10.5px] text-gray-500">
                            PNG, JPG · Max 5MB
                          </p>
                        </>
                      )}
                    </div>
                  </label>

                  {errors.image && (
                    <p className="text-[10.5px] text-red-500 mt-1">
                      {errors.image}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Name + Tagline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field
                label="Product Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="REVOO C35"
              />
              <Field
                label="Tagline"
                name="tagline"
                value={form.tagline}
                onChange={handleChange}
                placeholder="Chalo Aik Sath"
              />
            </div>

            {/* Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Field
                label="Top Speed"
                name="topSpeed"
                value={form.topSpeed}
                onChange={handleChange}
                placeholder="35-60 km/h"
              />
              <Field
                label="Range"
                name="range"
                value={form.range}
                onChange={handleChange}
                placeholder="80-110 km"
              />
              <Field
                label="Battery"
                name="battery"
                value={form.battery}
                onChange={handleChange}
                placeholder="72V 35Ah"
              />
            </div>

            {/* Price + Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field
                label="Price"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="279,000 PKR"
              />

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-[0.1em] text-gray-500 mb-1.5">
                  Status
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-[12.5px] outline-none focus:border-black focus:bg-white transition-all"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-3 mt-1 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                disabled={submitting}
                className="flex-1 py-2.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-[12.5px] font-semibold text-gray-700 transition-all disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 py-2.5 rounded-lg bg-black hover:bg-gray-800 text-white text-[12.5px] font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {isEdit ? "Updating..." : "Uploading..."}
                  </>
                ) : (
                  <>
                    {isEdit ? <FiSave size={14} /> : <FiPlus size={14} />}
                    {isEdit ? "Save Changes" : "Add Product"}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes popIn {
          from { opacity: 0; transform: translateY(20px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .hide-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .hide-scrollbar::-webkit-scrollbar { display: none; width: 0; height: 0; }
      `}</style>
    </div>
  );
}