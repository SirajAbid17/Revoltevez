import "./utils/suppressClerkWarnings";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { store } from "./store/store";
import App from "./App.jsx";
import "./index.css";

const PUBLISHABLE_KEY =
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY in .env");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <Provider store={store}>
        <BrowserRouter>
          <App />

          <ToastContainer
            position="top-center"
            autoClose={2800}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
            theme="light"
            limit={3}
            toastClassName="!rounded-xl !shadow-[0_15px_40px_rgba(0,0,0,0.15)] !border !border-gray-100 !bg-white !text-[12.5px] !font-medium"
            bodyClassName="!text-[12.5px] !font-medium"
            progressClassName="!bg-black"
          />
        </BrowserRouter>
      </Provider>
    </ClerkProvider>
  </StrictMode>
);