import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import MemoStore from "./store/memo-store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App store={new MemoStore()} />);
