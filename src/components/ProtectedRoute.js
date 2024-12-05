import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase/firebase";

const ProtectedRoute = ({ children }) => {
  const user = auth.currentUser;
  
  return user ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
