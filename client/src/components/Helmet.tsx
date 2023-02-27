import React, { useEffect } from "react";

interface HelmetProps {
  title: string;
  children: React.ReactNode;
}

const Helmet: React.FC<HelmetProps> = (props) => {
  useEffect(() => {
    document.title = props.title;
    window.scrollTo(0, 0);
  }, [props.title]);

  return <div>{props.children}</div>;
};

export default Helmet;
