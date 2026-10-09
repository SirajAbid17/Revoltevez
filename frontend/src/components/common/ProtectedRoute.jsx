import React from "react";
import { useAuth } from "@clerk/clerk-react";
import { FiLock, FiLogIn } from "react-icons/fi";
import { useAppSelector } from "../../store/hooks";
import Loader from "./Loader";
import { openAuthModal } from "../../utils/authEvents";


export default function ProtectedRoute({ children }) {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useAppSelector((s) => s.auth);

  
  if (!isLoaded) {
    return <Loader fullPage size="lg" text="Loading..." />;
  }

  
  if (!isSignedIn) {
    return <LoginRequiredView />;
  }


  if (!user) {
    return <Loader fullPage size="lg" text="Syncing account..." />;
  }

 
  return children;
}


function LoginRequiredView() {
  return (
    <div className="min-h-screen bg-[#f7f7f5] flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md text-center">
        
        <div className="w-20 h-20 rounded-3xl bg-white border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.06)] flex items-center justify-center mx-auto mb-6">
          <FiLock size={30} className="text-gray-400" />
        </div>

        
        <h1 className="text-[28px] sm:text-[32px] font-semibold tracking-[-0.04em] leading-tight text-[#111] mb-3">
          Login required.
        </h1>

       
        <p className="text-[13.5px] text-gray-500 leading-relaxed mb-8 max-w-sm mx-auto">
          Please sign in to view this page. Your account unlocks full access
          to every product and story.
        </p>

        
        <button
          onClick={() => openAuthModal("signin")}
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-black text-white text-[13.5px] font-semibold hover:bg-gray-800 active:scale-[0.98] transition-all"
        >
          <FiLogIn size={14} />
          Sign In
        </button>

        <p className="mt-5 text-[11px] text-gray-400 tracking-wide">
          Secured by Clerk
        </p>
      </div>
    </div>
  );
}