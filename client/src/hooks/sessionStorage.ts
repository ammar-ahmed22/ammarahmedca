import { useEffect, useState } from "react";

export const useSessionStorage = (
  key: string
): [string, (value: string) => void, () => void] => {
  const get = () => sessionStorage.getItem(key) ?? "";
  const [value, setValue] = useState(get());

  const set = (value: string) => {
    sessionStorage.setItem(key, value);
    dispatchEvent(new Event("session-storage"));
  };

  const remove = () => sessionStorage.removeItem(key);

  useEffect(() => {
    const sessionStorageListener = (ev: Event) => {
      setValue(get());
    };

    window.addEventListener("session-storage", sessionStorageListener);

    // return () =>
    //   window.removeEventListener("session-storage", sessionStorageListener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [value, set, remove];
};
