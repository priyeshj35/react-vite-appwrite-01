import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authState = useSelector((state) => state.auth.status);
  useEffect(() => {
    if (authentication && authState !== authentication) {
      navigate("/login");
    } else if (!authentication && authState !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [authState, navigate, authentication]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}
