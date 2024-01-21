import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { NumbersLineContexProvider } from "./context/numbersLineContext.tsx";
import "./globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NumbersLineContexProvider>
      <App />
    </NumbersLineContexProvider>
  </React.StrictMode>
);
