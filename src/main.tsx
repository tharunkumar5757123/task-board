import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./state/AuthContext";
import { BoardProvider } from "./state/BoardContext";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <BoardProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </BoardProvider>
    </AuthProvider>
  </React.StrictMode>
);
