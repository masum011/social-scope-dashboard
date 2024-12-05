import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { onUserStateChanged } from "./firebase/auth"; // Import the listener

function App() {
  const [user, setUser] = useState(null); // Track user state

  // Listen for authentication changes
  useEffect(() => {
    const unsubscribe = onUserStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser); // Set user when logged in
      } else {
        setUser(null); // Reset user when logged out
      }
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" /> : <Login />} // Redirect logged-in users to dashboard
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/dashboard" /> : <Signup />} // Redirect logged-in users to dashboard
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />{" "}
        {/* Redirect unknown routes to login */}
      </Routes>
    </Router>
  );
}

export default App;
