import { useEffect, useRef } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  syncSession,
  fetchMe,
  logoutUser,
} from "../store/slices/authSlice";

export default function ClerkSync() {
  const { isLoaded, isSignedIn, getToken, userId } = useAuth();
  const dispatch = useAppDispatch();
  const lastUserId = useRef(null);
  const hasFetchedRef = useRef(false);

  // Initial load: try JWT cookie
  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;
    dispatch(fetchMe());
  }, [dispatch]);

  // Clerk state change
  useEffect(() => {
    if (!isLoaded) return;

    const run = async () => {
      if (isSignedIn && userId) {
        // New login (user changed)
        if (lastUserId.current !== userId) {
          lastUserId.current = userId;
          const token = await getToken();
          if (token) dispatch(syncSession(token));
        }
      } else {
        // Logged out — clear JWT cookie on backend + Redux
        if (lastUserId.current !== null) {
          lastUserId.current = null;
          await dispatch(logoutUser()); // 🔑 clears cookie
        }
      }
    };

    run();
  }, [isLoaded, isSignedIn, userId, getToken, dispatch]);

  return null;
}