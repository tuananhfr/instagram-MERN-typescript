import React, { useEffect } from "react";
import { HelmetProps } from "../utils/interface";

const Helmet: React.FC<HelmetProps> = (props) => {
  useEffect(() => {
    document.title = props.title;
    window.scrollTo(0, 0);
  }, [props.title]);

  return <div className="w-100">{props.children}</div>;
};

export default Helmet;
