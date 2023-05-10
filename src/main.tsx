import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/header.tsx";

import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Header></Header>
    <App></App>
  </React.StrictMode>
);
