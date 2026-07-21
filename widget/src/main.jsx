import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/global.css";

import App from "./App";

import { WidgetProvider } from "./context/WidgetContext";

ReactDOM.createRoot(

    document.getElementById("root")

).render(

    <React.StrictMode>

        <WidgetProvider>

            <App />

        </WidgetProvider>

    </React.StrictMode>

);