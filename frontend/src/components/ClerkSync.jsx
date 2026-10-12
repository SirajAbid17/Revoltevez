import { useEffect, useRef } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useAppDispatch } from "../store/hooks";
import {
  syncSession,
  logoutUser,
  clearUser,
} from "../store/slices/authSlice";

export default function ClerkSync() {
  const { isLoaded, isSignedIn, getToken, userId } = useAuth();
  const dispatch = useAppDispatch();
  const lastUserId = useRef(undefined);

  useEffect(() => {
    if (!isLoaded) return;

    
    if (isSignedIn && userId) {
      if (lastUserId.current === userId) return;

      if (lastUserId.current && lastUserId.current !== userId) {
       
        dispatch(clearUser());
      }
      lastUserId.current = userId;

      (async () => {
        try {
          const token = await getToken({ skipCache: true });
          if (!token) return;
          await dispatch(syncSession(token));
        } catch (err) {
          console.error("ClerkSync error:", err);
        }
      })();
      return;
    }

  
    if (lastUserId.current) {
      lastUserId.current = null;
      dispatch(clearUser());
      dispatch(logoutUser());  
    }
  }, [isLoaded, isSignedIn, userId, getToken, dispatch]);

  return null;
}