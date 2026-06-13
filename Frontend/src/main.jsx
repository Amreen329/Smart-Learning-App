import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";

// Import API configuration to initialize interceptors
import './api/apiConfig.js';

console.log(`Frontend initialized with API URL: ${import.meta.env.VITE_API_URL || 'http://localhost:5000'}`);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);