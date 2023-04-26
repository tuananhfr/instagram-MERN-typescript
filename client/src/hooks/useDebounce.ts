import { useState, useEffect } from "react";

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDeboundedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDeboundedValue(value), delay);

    return () => clearTimeout(handler);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return debouncedValue;
}

export default useDebounce;
