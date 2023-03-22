import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Header from "./component/Header/Header";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Header />
    <App />
  </>
);
