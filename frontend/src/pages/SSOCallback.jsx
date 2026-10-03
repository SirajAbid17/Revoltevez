import React, { useEffect } from "react";
import { AuthenticateWithRedirectCallback, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function SSOCallback() {
  const { isLoaded, isSignedIn } = useAuth();
  const navigate = useNavigate();

  // Fallback — agar Clerk khud redirect na kare to hum 2s baad home bhej dein
  useEffect(() => {
    if (!isLoaded) return;
    const t = setTimeout(() => {
      if (isSignedIn) navigate("/", { replace: true });
    }, 2000);
    return () => clearTimeout(t);
  }, [isLoaded, isSignedIn, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f7f5]">
      <div className="text-center">
        <div className="w-10 h-10 border-[3px] border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[13px] text-gray-500 font-medium">
          Completing sign in...
        </p>
      </div>

      {/* Clerk handles the OAuth callback and redirects */}
      <AuthenticateWithRedirectCallback
        signInFallbackRedirectUrl="/"
        signUpFallbackRedirectUrl="/"
        signInForceRedirectUrl="/"
        signUpForceRedirectUrl="/"
      />
    </div>
  );
}