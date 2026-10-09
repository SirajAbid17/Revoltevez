import React, { useEffect, useRef, useState } from "react";
import {
  FiX,
  FiImage,
  FiUpload,
  FiPlus,
  FiBookOpen,
  FiCheck,
  FiSave,
} from "react-icons/fi";
import { useAppDispatch } from "../../store/hooks";
import { createStory, updateStory } from "../../store/slices/storySlice";
import Field from "./Field";
import Loader from "../common/Loader";
import { toastError, toastSuccess, getErrMsg } from "../../utils/toast";

export default function AddStoryModal({ isOpen, onClose, editingStory }) {
  const dispatch = useAppDispatch();
  const isEdit = Boolean(editingStory);

  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    content: "",
    featured: false,
    status: "published",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";

    if (isEdit && editingStory) {
      setForm({
        title: editingStory.title || "",
        category: editingStory.category || "",
        description: editingStory.description || "",
        content: editingStory.content || "",
        featured: !!editingStory.featured,
        status: editingStory.status || "published",
      });
      setImagePreview(editingStory.image || "");
    } else {
      setForm({
        title: "",
        category: "",
        description: "",
        content: "",
        featured: false,
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
  }, [isOpen, isEdit, editingStory]);

  useEffect(() => {
    const onEsc = (e) =>
      e.key === "Escape" && isOpen && !submitting && onClose();
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [isOpen, onClose, submitting]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((p) => ({ ...p, image: "Only image files allowed" }));
      toastError("Only image files are allowed");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((p) => ({ ...p, image: "Image must be under 5MB" }));
      toastError("Image must be under 5MB");
      return;
    }

    setImageFile(file);
    setErrors((p) => ({ ...p, image: "" }));

    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    if (isEdit && !imageFile) return;
    setImageFile(null);
    setImagePreview(isEdit ? editingStory?.image || "" : "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = "Title is required";
    if (!form.category.trim()) errs.category = "Category is required";
    if (!form.description.trim()) errs.description = "Description is required";
    if (!isEdit && !imageFile) errs.image = "Cover image is required";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      toastError("Please fix the errors first");
      return;
    }

    setSubmitting(true);
    try {
      const fd = new FormData();
      if (imageFile) fd.append("image", imageFile);
      fd.append("title", form.title);
      fd.append("category", form.category);
      fd.append("description", form.description);
      fd.append("content", form.content || "");
      fd.append("featured", String(form.featured));
      fd.append("status", form.status);

      if (isEdit) {
        await dispatch(
          updateStory({ id: editingStory._id, formData: fd })
        ).unwrap();
        toastSuccess("Story updated successfully");
      } else {
        await dispatch(createStory({ formData: fd })).unwrap();
        toastSuccess("Story published successfully");
      }
      onClose();
    } catch (err) {
      toastError(getErrMsg(err, "Failed to save story"));
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

      <div className="relative z-10 w-full max-w-[640px] max-h-[92vh] overflow-y-auto hide-scrollbar bg-white rounded-2xl border border-gray-100 shadow-[0_30px_90px_rgba(0,0,0,0.35)] animate-[popIn_0.35s_cubic-bezier(.2,.9,.3,1.2)]">
        <button
          onClick={onClose}
          disabled={submitting}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-black transition-all disabled:opacity-50"
        >
          <FiX size={16} />
        </button>

        <div className="p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center">
              <FiBookOpen size={18} />
            </div>
            <div>
              <h2 className="text-[19px] font-bold tracking-[-0.02em] text-[#111]">
                {isEdit ? "Edit Story" : "Add New Story"}
              </h2>
              <p className="text-[11.5px] text-gray-500">
                {isEdit
                  ? "Update the story details below"
                  : "Publish a new story for your readers"}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
          
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.1em] text-gray-500 mb-1.5">
                Cover Image {!isEdit && "*"}
                {isEdit && (
                  <span className="text-gray-400 font-medium normal-case tracking-normal ml-1">
                    (leave empty to keep current)
                  </span>
                )}
              </label>

              <div className="flex gap-3">
                <div className="shrink-0 w-20 h-20 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center relative group">
                  {imagePreview ? (
                    <>
                      <img
                        src={imagePreview}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
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

                <div className="flex-1">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFile}
                    className="hidden"
                    id="story-image-upload"
                  />

                  <label
                    htmlFor="story-image-upload"
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
                            <FiCheck size={11} /> Ready to upload
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

            <Field
              label="Title *"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="The Future of Electric Mobility"
              error={errors.title}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field
                label="Category *"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="EV INSIGHTS"
                error={errors.category}
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

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.1em] text-gray-500 mb-1.5">
                Short Description *
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                placeholder="A short preview shown on the story card..."
                className={`w-full px-3 py-2.5 rounded-lg bg-gray-50 border text-[12.5px] outline-none transition-all resize-none ${
                  errors.description
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-200 focus:border-black focus:bg-white"
                }`}
              />
              {errors.description && (
                <p className="text-[10.5px] text-red-500 mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.1em] text-gray-500 mb-1.5">
                Full Content
              </label>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                rows={7}
                placeholder="Write the full story here..."
                className="w-full px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-[12.5px] outline-none transition-all resize-none focus:border-black focus:bg-white"
              />
            </div>

            <label className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 cursor-pointer hover:border-gray-300 transition-all">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
                className="w-4 h-4 rounded accent-black"
              />
              <div>
                <p className="text-[12.5px] font-semibold text-[#111]">
                  Feature this story
                </p>
                <p className="text-[11px] text-gray-500">
                  Featured story appears as the main highlight on homepage
                </p>
              </div>
            </label>

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
                    <Loader inline size="xs" color="white" />
                    {isEdit ? "Updating..." : "Publishing..."}
                  </>
                ) : (
                  <>
                    {isEdit ? <FiSave size={14} /> : <FiPlus size={14} />}
                    {isEdit ? "Save Changes" : "Publish Story"}
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