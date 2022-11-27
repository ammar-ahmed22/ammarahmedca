import { useEffect, useState } from "react";

export const useSessionStorage = (key: string) : [string, (value: string) => void, () => void] => {

  const [value, setValue] = useState("")

  

  const get = () => sessionStorage.getItem(key) ?? "";
  const set = (value: string) =>{
    sessionStorage.setItem(key, value);
    // setValue(value)
    dispatchEvent(new Event("session-storage"))
  }

  const remove = () => sessionStorage.removeItem(key);
  // const value = sessionStorage.getItem(key);

  useEffect(() => {
    const sessionStorageListener = (ev: Event) => {
      setValue(get())
    }
    
    window.addEventListener("session-storage", sessionStorageListener)

    return () => window.removeEventListener("session-storage", sessionStorageListener)
  }, [])

  return [value, set, remove];
}