export const AUTH_MODAL_EVENT = "revoltevez:open-auth-modal";

export const openAuthModal = (mode = "signin") => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent(AUTH_MODAL_EVENT, { detail: { mode } })
  );
};