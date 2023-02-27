import { useEffect, useRef } from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default (callback: Function, dependencies: any) => {
  const firstRenderRef = useRef(true);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
    } else {
      callback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, ...dependencies]);
};
