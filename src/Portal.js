import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children }) => {
  const elRef = useRef(null);
  elRef.current = document.createElement("div");

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);

    return () => {
      modalRoot.removeChild(elRef.current);
    };
  }, []);
  return createPortal(<div>{children}</div>, elRef.current);
};

export default Portal;
