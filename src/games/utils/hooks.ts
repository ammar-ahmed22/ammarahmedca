import React, { useState, useRef } from "react";


type SetStateRef<T> = {
  (cb: (prev: T) => T): void,
  (value: T): void
}

type StateRef<T> = {
  ref: React.MutableRefObject<T>,
  state: T
}

export function useStateRef<T = null>(initial: T): [StateRef<T>, SetStateRef<T>]{
  const [state, setState] = useState<T>(initial);
  const ref = useRef<T>(initial);

  function setStateRef(cb: (prev: T) => T): void
  function setStateRef(value: T): void;

  function setStateRef(param: T | ((prev: T) => T)) : void {
    setState(param);
    if (param instanceof Function) {
      ref.current = param(ref.current);
    } else {
      ref.current = param;
    }
  }

  return [{ ref, state }, setStateRef]
}

export function useImage(paths: string[]): React.MutableRefObject<HTMLImageElement[]>
export function useImage(paths: string): React.MutableRefObject<HTMLImageElement | undefined>

export function useImage(paths: string | string[]): React.MutableRefObject<HTMLImageElement | undefined> | React.MutableRefObject<HTMLImageElement[]> {
  const arrayRef = useRef<HTMLImageElement[]>([]);
  const ref = useRef<HTMLImageElement>();
  if (Array.isArray(paths)) {
    for (let i = 0; i < paths.length; i++) {
      const image = document.createElement("img");
      image.onload = () => {
        arrayRef.current.push(image);
      }
      image.src = paths[i];
    }
  } else {
    const image = document.createElement("img");
    image.onload = () => {
      ref.current = image;
    }
    image.src = paths;
  }
  
  if (Array.isArray(paths)) return arrayRef;
  return ref
}