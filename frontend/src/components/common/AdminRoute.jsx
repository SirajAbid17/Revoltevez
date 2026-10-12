import React, { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import Loader from "./Loader";
import { openAuthModal } from "../../utils/authEvents";
import { toastError } from "../../utils/toast";

export default function AdminRoute({ children }) {
  const navigate = useNavigate();
  const { isLoaded, isSignedIn } = useAuth();
  const { user, synced } = useAppSelector((s) => s.auth);

  useEffect(() => {
    if (!isLoaded) return;
    if (!synced) return; 

    if (!isSignedIn) {
      toastError("Please sign in to continue");
      openAuthModal("signin");
      navigate("/", { replace: true });
      return;
    }

    if (user && user.role !== "admin") {
      toastError("Access denied — admin only");
      navigate("/", { replace: true });
    }
  }, [isLoaded, isSignedIn, user, synced, navigate]);

  if (!isLoaded) {
    return <Loader fullPage size="lg" text="Verifying access..." />;
  }

  if (!synced) {
    return <Loader fullPage size="lg" text="Syncing account..." />;
  }

  if (!isSignedIn) {
    return <Loader fullPage size="lg" text="Redirecting..." />;
  }

  if (!user) {
    return <Loader fullPage size="lg" text="Syncing account..." />;
  }

  if (user.role !== "admin") {
    return <Loader fullPage size="lg" text="Access denied" />;
  }

  return children;
}