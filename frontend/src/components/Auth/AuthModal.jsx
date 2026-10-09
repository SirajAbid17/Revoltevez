import React, { useEffect, useState } from "react";
import {
  FiX,
  FiMail,
  FiLock,
  FiUser,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiArrowLeft,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useSignIn, useSignUp, useAuth } from "@clerk/clerk-react";

export default function AuthModal({
  isOpen,
  onClose,
  mode: initialMode = "signin",
}) {
  const [mode, setMode] = useState(initialMode);
  const [step, setStep] = useState("form"); 
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const { signIn, setActive: setSignInActive, isLoaded: signInLoaded } = useSignIn();
  const { signUp, setActive: setSignUpActive, isLoaded: signUpLoaded } = useSignUp();
  const { isSignedIn, isLoaded: authLoaded } = useAuth();

  
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setStep("form");
    }
  }, [isOpen, initialMode]);

  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setForm({ name: "", email: "", password: "" });
      setOtp("");
      setStep("form");
      setShowPassword(false);
      setError("");
      setLoading(false);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && isOpen && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  
  useEffect(() => {
    if (isOpen && authLoaded && isSignedIn) {
      const t = setTimeout(() => onClose(), 400);
      return () => clearTimeout(t);
    }
  }, [isSignedIn, authLoaded, isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  
  const handleSignIn = async () => {
    if (!signInLoaded) return;

    const result = await signIn.create({
      identifier: form.email,
      password: form.password,
    });

    if (result.status === "complete") {
      await setSignInActive({ session: result.createdSessionId });
      onClose();
    } else {
      setError("Sign in incomplete. Please try again.");
    }
  };

  
  const handleSignUp = async () => {
    if (!signUpLoaded) return;

    const [firstName, ...rest] = form.name.trim().split(" ");
    const lastName = rest.join(" ");

    const result = await signUp.create({
      firstName: firstName || "User",
      lastName: lastName || "",
      emailAddress: form.email,
      password: form.password,
    });

    
    if (result.status === "complete") {
      await setSignUpActive({ session: result.createdSessionId });
      onClose();
      return;
    }

    
    if (result.status === "missing_requirements") {
      const needsEmail = result.unverifiedFields?.includes("email_address");

      if (needsEmail) {
        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });
        setStep("verify");
        return;
      }
    }

   
    setError("Sign up incomplete. Please check your details.");
  };

 
  const handleVerifyOTP = async () => {
    if (!otp.trim() || otp.length < 6) {
      setError("Enter the 6-digit code from your email");
      return;
    }

    const result = await signUp.attemptEmailAddressVerification({
      code: otp.trim(),
    });

    if (result.status === "complete") {
      await setSignUpActive({ session: result.createdSessionId });
      onClose();
    } else {
      setError("Invalid code. Please try again.");
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError("");
    setLoading(true);

    try {
      if (step === "verify") {
        await handleVerifyOTP();
      } else if (mode === "signin") {
        await handleSignIn();
      } else {
        await handleSignUp();
      }
    } catch (err) {
      console.error("Auth error:", err);
      const msg =
        err.errors?.[0]?.longMessage ||
        err.errors?.[0]?.message ||
        err.message ||
        "Something went wrong";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

 
  const handleGoogle = async () => {
    if (loading) return;
    setError("");
    setLoading(true);

    try {
      const clerkInstance = mode === "signin" ? signIn : signUp;

      if (!clerkInstance) {
        setError("Clerk not loaded");
        setLoading(false);
        return;
      }

      await clerkInstance.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });
    } catch (err) {
      console.error("Google error:", err);
      setError(
        err.errors?.[0]?.longMessage ||
          err.errors?.[0]?.message ||
          "Google sign-in failed"
      );
      setLoading(false);
    }
  };

 
  const handleResendOTP = async () => {
    try {
      setError("");
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      setError("New code sent to your email");
    } catch (err) {
      setError(
        err.errors?.[0]?.longMessage || "Could not resend code"
      );
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
    >
      
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-md animate-[fadeIn_0.25s_ease]"
      />

  
      <div
        className="
          relative z-10 w-full max-w-[380px]
          rounded-2xl bg-white
          border border-gray-100
          shadow-[0_30px_90px_rgba(0,0,0,0.35)]
          max-h-[92vh] overflow-y-auto
          hide-scrollbar
          animate-[popIn_0.35s_cubic-bezier(.2,.9,.3,1.2)]
        "
      >
       
        <button
          onClick={onClose}
          aria-label="Close"
          className="
            absolute top-3 right-3 z-20
            w-7 h-7 rounded-full
            flex items-center justify-center
            text-gray-400 hover:text-black
            bg-gray-100 hover:bg-gray-200
            transition-all duration-300
          "
        >
          <FiX size={14} />
        </button>

        <div className="px-6 pt-6 pb-5">
        
          <div className="flex items-center gap-2 mb-3">
            <img
              src="./icons.png"
              alt="Revoltevez"
              className="w-6 h-6 object-contain"
            />
            <span className="text-[13px] font-bold tracking-tight">
              Revoltevez
            </span>
          </div>

         
          {step === "verify" ? (
            <>
              <button
                onClick={() => {
                  setStep("form");
                  setOtp("");
                  setError("");
                }}
                className="flex items-center gap-1 text-[11px] text-gray-500 hover:text-black transition-colors mb-3"
              >
                <FiArrowLeft size={12} /> Back
              </button>

              <h2 className="text-[20px] font-semibold tracking-[-0.03em] leading-tight text-[#111]">
                Check your email.
              </h2>
              <p className="mt-1 text-[11.5px] leading-4 text-gray-500">
                We sent a 6-digit code to <strong>{form.email}</strong>
              </p>

              {error && (
                <div className="mt-3 rounded-lg bg-red-50 border border-red-100 px-3 py-2 text-[11.5px] text-red-600 leading-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  placeholder="000000"
                  autoFocus
                  className="
                    w-full py-3 px-3
                    rounded-lg bg-gray-50
                    border border-gray-200
                    text-center text-[20px] tracking-[0.5em] font-semibold text-gray-800
                    placeholder:text-gray-300
                    outline-none
                    transition-all duration-300
                    focus:bg-white focus:border-black
                  "
                />

                <button
                  type="submit"
                  disabled={loading || otp.length < 6}
                  className="
                    group w-full
                    inline-flex items-center justify-center gap-2
                    rounded-lg bg-black text-white
                    py-2.5 text-[12.5px] font-semibold
                    transition-all duration-300
                    hover:bg-gray-800 active:scale-[0.98]
                    disabled:opacity-60 disabled:cursor-not-allowed
                  "
                >
                  {loading ? "Verifying..." : "Verify & Continue"}
                </button>
              </form>

              <p className="mt-3 text-center text-[11px] text-gray-500">
                Didn't get the code?{" "}
                <button
                  onClick={handleResendOTP}
                  className="font-semibold text-black hover:underline underline-offset-2"
                >
                  Resend
                </button>
              </p>
            </>
          ) : (
            <>
             
              <h2 className="text-[20px] font-semibold tracking-[-0.03em] leading-tight text-[#111]">
                {mode === "signin" ? "Welcome back." : "Create account."}
              </h2>
              <p className="mt-1 text-[11.5px] leading-4 text-gray-500">
                {mode === "signin"
                  ? "Sign in to continue your journey."
                  : "Join the Revoltevez movement."}
              </p>

              {error && (
                <div className="mt-3 rounded-lg bg-red-50 border border-red-100 px-3 py-2 text-[11.5px] text-red-600 leading-4">
                  {error}
                </div>
              )}

              
              <div className="mt-4 mb-4 relative flex p-1 rounded-full bg-gray-100">
                <div
                  className={`
                    absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-black
                    transition-all duration-400 ease-[cubic-bezier(.2,.9,.3,1)]
                    ${mode === "signin" ? "left-1" : "left-[calc(50%+3px)]"}
                  `}
                />
                <button
                  onClick={() => {
                    setMode("signin");
                    setError("");
                  }}
                  className={`relative z-10 flex-1 py-1.5 text-[12px] font-semibold rounded-full transition-colors duration-300 ${
                    mode === "signin" ? "text-white" : "text-gray-500"
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setMode("signup");
                    setError("");
                  }}
                  className={`relative z-10 flex-1 py-1.5 text-[12px] font-semibold rounded-full transition-colors duration-300 ${
                    mode === "signup" ? "text-white" : "text-gray-500"
                  }`}
                >
                  Sign Up
                </button>
              </div>

             
              <form onSubmit={handleSubmit} className="space-y-2.5">
                {mode === "signup" && (
                  <div className="relative animate-[slideDown_0.3s_ease]">
                    <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-[13px]" />
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Full name"
                      required
                      className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-[12.5px] text-gray-800 placeholder:text-gray-400 outline-none transition-all duration-300 focus:bg-white focus:border-black"
                    />
                  </div>
                )}

                <div className="relative">
                  <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-[13px]" />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    required
                    className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-[12.5px] text-gray-800 placeholder:text-gray-400 outline-none transition-all duration-300 focus:bg-white focus:border-black"
                  />
                </div>

                <div className="relative">
                  <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-[13px]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Password (min 8 characters)"
                    required
                    minLength={8}
                    className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-[12.5px] text-gray-800 placeholder:text-gray-400 outline-none transition-all duration-300 focus:bg-white focus:border-black"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-black transition-colors"
                  >
                    {showPassword ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                  </button>
                </div>

                {mode === "signin" && (
                  <div className="flex justify-end -mt-0.5">
                    <button
                      type="button"
                      className="text-[11px] font-medium text-gray-500 hover:text-black transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="group w-full mt-1 inline-flex items-center justify-center gap-2 rounded-lg bg-black text-white py-2.5 text-[12.5px] font-semibold transition-all duration-300 hover:bg-gray-800 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span>
                    {loading
                      ? "Please wait..."
                      : mode === "signin"
                      ? "Sign In"
                      : "Create Account"}
                  </span>
                  {!loading && (
                    <FiArrowRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  )}
                </button>
              </form>

             
              <div className="my-3.5 flex items-center gap-3">
                <span className="flex-1 h-px bg-gray-200" />
                <span className="text-[10px] font-medium text-gray-400 tracking-wider">
                  OR
                </span>
                <span className="flex-1 h-px bg-gray-200" />
              </div>

             
              <button
                type="button"
                onClick={handleGoogle}
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2.5 rounded-lg border border-gray-200 bg-white py-2.5 text-[12.5px] font-semibold text-gray-700 transition-all duration-300 hover:bg-gray-50 hover:border-gray-300 active:scale-[0.98] disabled:opacity-60"
              >
                <FcGoogle size={16} />
                <span>Continue with Google</span>
              </button>

              {/* Switch */}
              <p className="mt-3.5 text-center text-[11px] text-gray-500">
                {mode === "signin"
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <button
                  onClick={() => {
                    setMode((m) => (m === "signin" ? "signup" : "signin"));
                    setError("");
                  }}
                  className="font-semibold text-black hover:underline underline-offset-2"
                >
                  {mode === "signin" ? "Sign up" : "Sign in"}
                </button>
              </p>

              <p className="mt-3 text-center text-[9.5px] text-gray-300 tracking-wide">
                Secured by Clerk
              </p>
            </>
          )}
        </div>
      </div>

     
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes popIn {
          from { opacity: 0; transform: translateY(20px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }
      `}</style>
    </div>
  );
}