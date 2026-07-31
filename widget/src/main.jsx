import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/global.css";

import App from "./App";

import { WidgetProvider } from "./context/WidgetContext";
import { MessagesProvider } from "./context/MessagesContext";

// Support both Standalone + Embedded Mode

const rootElement =
    window.ARAI_WIDGET_CONFIG?.rootElement ||
    document.getElementById("root");

if (!rootElement) {

    throw new Error("Root element not found");

}

ReactDOM.createRoot(rootElement).render(

    <React.StrictMode>

        <WidgetProvider>

            <MessagesProvider>

                <App />

            </MessagesProvider>

        </WidgetProvider>

    </React.StrictMode>

);