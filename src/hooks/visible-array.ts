import { useEffect, useState } from "react";

export function useVisibleArray<T>(items: T[], initial?: number) {
  const [visible, setVisible] = useState<T[]>(items);

  useEffect(() => {
    if (initial) {
      setVisible(items.slice(0, initial));
    }
  }, [initial, items]);

  const reset = () => setVisible(items.slice(0, initial));

  const showMore = (count: number) => {
    setVisible((prev) => [
      ...prev,
      ...items.slice(prev.length, prev.length + count),
    ]);
  };

  const showLess = (count: number) => {
    setVisible((prev) => prev.slice(0, prev.length - count));
  };

  return [visible, { reset, showMore, showLess }] as const;
}
