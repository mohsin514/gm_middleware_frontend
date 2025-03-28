// src/index.js or src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot from react-dom/client
import { Provider } from "react-redux"; // Import the Redux Provider
import { store } from "./redux/store.js"; // Import the Redux store
import App from "./App.jsx"; // Import the App component
import "./main.css"; // ✅ Correct way to include CSS in React

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter

// Get the root element from your HTML file
const container = document.getElementById("root");

// Create a root using createRoot
const root = createRoot(container);

// Render the App component wrapped in the Redux Provider
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/gm_middleware_frontend">
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
