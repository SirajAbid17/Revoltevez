import React, { useEffect, useState } from "react";
import { FiX, FiCheck, FiUser, FiPhone, FiMapPin, FiSend, FiMessageCircle, FiPhoneCall } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { createBooking, resetBookingState } from "../../store/slices/bookingSlice";

export default function BookingModal({ isOpen, onClose, product }) {
  const dispatch = useAppDispatch();
  const { submitting, submitSuccess, submitError } = useAppSelector(
    (s) => s.booking
  );

  const [form, setForm] = useState({
    userName: "",
    whatsapp: "",
    location: "",
  });
  const [errors, setErrors] = useState({});


  useEffect(() => {
    if (isOpen) {
      dispatch(resetBookingState());
      setForm({ userName: "", whatsapp: "", location: "" });
      setErrors({});
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, dispatch]);

  
  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && !submitting && onClose();
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose, submitting]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.userName.trim()) errs.userName = "Name is required";
    if (!form.whatsapp.trim()) errs.whatsapp = "WhatsApp number is required";
    else if (!/^[\d+\-\s()]{7,}$/.test(form.whatsapp.trim()))
      errs.whatsapp = "Enter a valid phone number";
    if (!form.location.trim()) errs.location = "Location is required";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    await dispatch(
      createBooking({
        productId: product._id,
        userName: form.userName.trim(),
        whatsapp: form.whatsapp.trim(),
        location: form.location.trim(),
      })
    );
  };

  const fields = [
    {
      name: "userName",
      label: "Your Name",
      placeholder: "e.g. Ahmed Khan",
      icon: <FiUser size={15} />,
      type: "text",
    },
    {
      name: "whatsapp",
      label: "WhatsApp Number",
      placeholder: "e.g. 0328 7303593",
      icon: <FiPhone size={15} />,
      type: "tel",
    },
    {
      name: "location",
      label: "Location / City",
      placeholder: "e.g. Lahore, DHA Phase 5",
      icon: <FiMapPin size={15} />,
      type: "text",
    },
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 overflow-hidden">
     
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xl animate-[fadeIn_0.25s_ease]"
      />

      
      <div className="relative z-10 w-full max-w-[440px] max-h-[92vh] overflow-y-auto hide-scrollbar bg-white rounded-2xl border border-gray-100 shadow-[0_30px_90px_rgba(0,0,0,0.4)] animate-[popIn_0.35s_cubic-bezier(.2,.9,.3,1.2)]">
       
        <button
          onClick={onClose}
          disabled={submitting}
          aria-label="Close"
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-black transition-all disabled:opacity-50"
        >
          <FiX size={16} />
        </button>

        <div className="p-6 sm:p-7">
          
          {submitSuccess ? (
            <div className="text-center">
              
              <div className="relative mx-auto mb-5 w-16 h-16">
                <span className="absolute inset-0 rounded-full bg-green-500/20 animate-[pulse_2s_ease-in-out_infinite]" />
                <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-[0_10px_30px_rgba(34,197,94,0.35)]">
                  <FiCheck className="text-white" size={30} strokeWidth={3} />
                </div>
              </div>

             
              <h2 className="text-[22px] font-bold tracking-tight text-[#111] mb-1.5">
                Booking Received!
              </h2>

             
              <p className="text-[13px] text-gray-500 leading-relaxed max-w-[280px] mx-auto mb-4">
                Thanks! You've booked the{" "}
                <strong className="text-[#111] font-semibold">
                  {product?.name}
                </strong>
                .
              </p>

             
              <div className="mb-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-2.5">
                  We'll contact you via
                </p>
                <div className="flex items-center justify-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 border border-green-100 text-[11.5px] font-semibold text-green-700">
                    <FiMessageCircle size={11} />
                    WhatsApp
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[11.5px] font-semibold text-blue-700">
                    <FiPhoneCall size={11} />
                    Phone Call
                  </span>
                </div>
              </div>

             
              <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-4" />

            
              <p className="text-[11px] text-gray-400 mb-5">
                We typically respond within a few hours.
              </p>

            
              <button
                onClick={onClose}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-black text-white text-[13px] font-semibold hover:bg-gray-800 active:scale-[0.98] transition-all"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-xl bg-black text-white flex items-center justify-center shrink-0">
                  <FiSend size={18} />
                </div>
                <div>
                  <h2 className="text-[18px] font-bold tracking-[-0.02em] text-[#111]">
                    Book {product?.name}
                  </h2>
                  <p className="text-[11.5px] text-gray-500 mt-0.5">
                    Fill your details — we'll reach out soon
                  </p>
                </div>
              </div>

             
              {product && (
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 border border-gray-100 mb-5">
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover shrink-0"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-bold text-[#111] truncate">
                      {product.name}
                    </p>
                    <p className="text-[11px] text-gray-500">
                      {product.price}
                    </p>
                  </div>
                </div>
              )}

             
              <form onSubmit={handleSubmit} className="space-y-3.5">
                {fields.map((f) => (
                  <div key={f.name}>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.1em] text-gray-500 mb-1.5">
                      {f.label} <span className="text-red-500">*</span>
                    </label>
                    <div
                      className={`
                        flex items-center gap-2 px-3.5 rounded-xl
                        border-2 transition-all
                        ${
                          errors[f.name]
                            ? "border-red-300 bg-red-50/30 focus-within:border-red-500"
                            : "border-gray-200 bg-gray-50 focus-within:border-black focus-within:bg-white"
                        }
                      `}
                    >
                      <span
                        className={`shrink-0 ${
                          errors[f.name] ? "text-red-400" : "text-gray-400"
                        }`}
                      >
                        {f.icon}
                      </span>
                      <input
                        type={f.type}
                        name={f.name}
                        value={form[f.name]}
                        onChange={handleChange}
                        placeholder={f.placeholder}
                        disabled={submitting}
                        className="w-full bg-transparent text-[13px] text-gray-800 py-3 outline-none placeholder:text-gray-400 disabled:opacity-50"
                      />
                    </div>
                    {errors[f.name] && (
                      <p className="text-[10.5px] text-red-500 mt-1 font-medium">
                        {errors[f.name]}
                      </p>
                    )}
                  </div>
                ))}

                {submitError && (
                  <div className="px-3 py-2 rounded-lg bg-red-50 border border-red-100 text-[12px] text-red-600 text-center">
                    {submitError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-black text-white text-[13px] font-semibold hover:bg-gray-800 active:scale-[0.98] transition-all disabled:opacity-60 mt-2"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <FiSend size={14} />
                      Confirm Booking
                    </>
                  )}
                </button>

                <p className="text-center text-[10.5px] text-gray-400">
                  No payment required — this is just a booking request
                </p>
              </form>
            </>
          )}
        </div>

        <style>{`
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes popIn {
            from { opacity: 0; transform: translateY(20px) scale(0.96); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          .hide-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
          .hide-scrollbar::-webkit-scrollbar { display: none; }
        `}</style>
      </div>
    </div>
  );
}