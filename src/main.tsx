import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App, { myTimer } from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App timer={myTimer} />
  </React.StrictMode>,
);
