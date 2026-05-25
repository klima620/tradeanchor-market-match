"use client";

import { useSyncExternalStore } from "react";

const storageEventName = "tradeanchor-local-storage";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(storageEventName, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(storageEventName, onStoreChange);
  };
}

export function notifyLocalStorageChange() {
  window.dispatchEvent(new Event(storageEventName));
}

export function useLocalStorageValue(key: string) {
  return useSyncExternalStore(
    subscribe,
    () => window.localStorage.getItem(key),
    () => null,
  );
}
