import { toast } from "react-toastify";



const BASE = {
  position: "top-center",
  autoClose: 2800,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  pauseOnFocusLoss: false,
  draggable: true,
  theme: "light",
};

export const toastSuccess = (msg, opts = {}) =>
  toast.success(msg, { ...BASE, ...opts });

export const toastError = (msg, opts = {}) =>
  toast.error(msg, { ...BASE, ...opts });

export const toastInfo = (msg, opts = {}) =>
  toast.info(msg, { ...BASE, ...opts });

export const toastWarn = (msg, opts = {}) =>
  toast.warn(msg, { ...BASE, ...opts });


export const getErrMsg = (err, fallback = "Something went wrong") => {
  if (!err) return fallback;
  if (typeof err === "string") return err;
  return (
    err.response?.data?.error ||
    err.payload ||
    err.message ||
    fallback
  );
};