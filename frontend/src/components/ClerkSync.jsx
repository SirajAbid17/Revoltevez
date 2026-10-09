import { useEffect, useRef } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useAppDispatch } from "../store/hooks";
import {
  syncSession,
  fetchMe,
  logoutUser,
  clearUser,
} from "../store/slices/authSlice";

export default function ClerkSync() {
  const { isLoaded, isSignedIn, getToken, userId } = useAuth();
  const dispatch = useAppDispatch();
  const lastUserId = useRef(undefined);
  const hasBootstrapped = useRef(false);

 
  useEffect(() => {
    if (hasBootstrapped.current) return;
    hasBootstrapped.current = true;
    dispatch(fetchMe());
  }, [dispatch]);


  useEffect(() => {
    if (!isLoaded) return;

    const sync = async () => {
     
      if (isSignedIn && userId) {
      
        if (lastUserId.current === userId) return;

     
        if (lastUserId.current && lastUserId.current !== userId) {
          dispatch(clearUser());
        }

        lastUserId.current = userId;

       
        const token = await getToken({ skipCache: true });

        if (token) {
          const result = await dispatch(syncSession(token));

       
          if (
            result.type === "auth/syncSession/fulfilled" &&
            result.payload?.clerkId !== userId
          ) {
            console.warn(
              "Session user mismatch — clearing stale session"
            );
            await dispatch(logoutUser());
            dispatch(clearUser());
            lastUserId.current = undefined;
          }
        }
        return;
      }

     
      if (lastUserId.current !== undefined && lastUserId.current !== null) {
        lastUserId.current = null;
        dispatch(clearUser());
        await dispatch(logoutUser()); 
      }
    };

    sync();
  }, [isLoaded, isSignedIn, userId, getToken, dispatch]);

  return null;
}