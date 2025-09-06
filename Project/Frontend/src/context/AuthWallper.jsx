
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthWrapper = ({ children, mode }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
console.log(isAuthenticated)
  // Agar route AUTH required hai
  if (mode === "auth" && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Agar route GUEST only hai
  if (mode === "guest" && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthWrapper;














// In this file you can't get token and verify the not good way to this good way ek to context redux props 
// constext bana  authwallpwer and and use home me set karo and jab  and useContext se call karo in Authwallper file me 
// redux me store karo api though asyce se value ko save karo effectlfiy way to do this 

