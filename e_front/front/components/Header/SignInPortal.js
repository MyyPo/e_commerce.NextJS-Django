import { createPortal } from "react-dom";
import { useState, useEffect } from "react";

function SignInPortal({ children, selector }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, [selector]);

  return mounted
    ? createPortal(children, document.querySelector(selector))
    : null;
}

export default SignInPortal;
